"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type UserPayload = {
  id: string;
  email: string;
  role: string;
  createdAt: string;
};

export function SettingsClient({
  userEmail,
  userRole,
  initialUsers,
}: {
  userEmail: string;
  userRole: string;
  initialUsers: UserPayload[];
}) {
  const [users, setUsers] = useState(initialUsers);
  const [pwForm, setPwForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [userForm, setUserForm] = useState({ email: "", password: "", role: "editor" });
  const [busy, setBusy] = useState(false);

  const canManageEverything = userRole === "admin";

  async function changePassword() {
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: pwForm.currentPassword,
          newPassword: pwForm.newPassword,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Password update failed");
      }
      toast.success("Password updated successfully.");
      setPwForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setBusy(false);
    }
  }

  async function syncUsers() {
    window.location.reload();
  }

  async function createUser() {
    setBusy(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userForm),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create user");
      }
      toast.success("User created.");
      setUserForm({ email: "", password: "", role: "editor" });
      await syncUsers();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setBusy(false);
    }
  }

  async function deleteUser(id: string) {
    if (!confirm("Remove this user?")) return;
    setBusy(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete user");
      }
      toast.success("User removed.");
      await syncUsers();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* ── Change Password ─────────────────────────────────────────────── */}
      <section className="section-card rounded-[2rem] p-6 lg:p-8">
        <h2 className="font-mono text-2xl font-semibold">Change Password</h2>
        <p className="mt-1 text-sm text-[var(--color-muted)]">Update your own account password.</p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <Input
            type="password"
            placeholder="Current password"
            value={pwForm.currentPassword}
            onChange={(e) => setPwForm({ ...pwForm, currentPassword: e.target.value })}
          />
          <Input
            type="password"
            placeholder="New password (min 8 chars)"
            value={pwForm.newPassword}
            onChange={(e) => setPwForm({ ...pwForm, newPassword: e.target.value })}
          />
          <Input
            type="password"
            placeholder="Confirm new password"
            value={pwForm.confirmPassword}
            onChange={(e) => setPwForm({ ...pwForm, confirmPassword: e.target.value })}
          />
        </div>
        <Button className="mt-6" disabled={busy} onClick={changePassword}>
          Update password
        </Button>
      </section>

      {/* ── User Management (admin only) ────────────────────────────────── */}
      {canManageEverything && (
        <section className="section-card rounded-[2rem] p-6 lg:p-8">
          <h2 className="font-mono text-2xl font-semibold">User Management</h2>
          <p className="mt-1 text-sm text-[var(--color-muted)]">Manage administrative accounts.</p>

          <div className="mt-5 space-y-3">
            {users.map((u) => (
              <div key={u.id} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-[var(--color-line)] bg-white px-5 py-4">
                <div>
                  <p className="text-sm font-medium text-[var(--color-text)]">{u.email}</p>
                  <p className="mt-0.5 text-xs text-[var(--color-muted)] capitalize">{u.role}</p>
                </div>
                {u.email !== userEmail && (
                  <Button variant="danger" disabled={busy} onClick={() => deleteUser(u.id)}>
                    Remove
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[1.75rem] border border-[var(--color-line)] bg-[var(--color-paper)] p-6">
            <p className="font-medium text-[var(--color-text)]">Add new user</p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <Input
                type="email"
                placeholder="Email address"
                value={userForm.email}
                onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
              />
              <Input
                type="password"
                placeholder="Secure password"
                value={userForm.password}
                onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
              />
              <select
                className="h-12 rounded-2xl border border-[var(--color-line)] bg-white px-4 text-sm text-[var(--color-text)] outline-none"
                value={userForm.role}
                onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
              >
                <option value="editor">Editor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <Button className="mt-6" disabled={busy} onClick={createUser}>
              Create user
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}
