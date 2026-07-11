import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SettingsClient } from "./settings-client";

export const metadata = { title: "Settings & Security | Admin" };

export default async function AdminSettingsPage() {
  const session = await getSession();
  
  let users: { id: string; email: string; role: string; createdAt: string }[] = [];
  if (session?.role === "admin" && process.env.DATABASE_URL) {
    const rows = await prisma.adminUser.findMany({
      select: { id: true, email: true, role: true, createdAt: true },
      orderBy: { createdAt: "asc" },
    });
    users = rows.map((r) => ({ ...r, createdAt: r.createdAt.toISOString() }));
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-mono text-3xl font-semibold text-[var(--color-text)]">Settings & Security</h1>
        <p className="mt-2 text-[var(--color-muted)]">Manage your password and platform access.</p>
      </div>

      <SettingsClient 
        userEmail={session?.email || ""}
        userRole={session?.role || "editor"}
        initialUsers={users}
      />
    </div>
  );
}
