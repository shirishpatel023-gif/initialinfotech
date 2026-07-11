"use client";

import { useState, useRef } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/components/rich-text-editor";
import { Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";

type EmployeePayload = {
  id?: string;
  name: string;
  employeeNumber: string;
  designation: string;
  photoUrl: string;
  dob: string;
  personalEmail: string;
  phone: string;
  startDate: string;
  endDate: string;
  dutiesHtml: string;
  isActive: boolean;
};

const blankEmployee: EmployeePayload = {
  name: "",
  employeeNumber: "",
  designation: "",
  photoUrl: "",
  dob: "",
  personalEmail: "",
  phone: "",
  startDate: "",
  endDate: "",
  dutiesHtml: "<p></p>",
  isActive: true,
};

function EmployeePhotoUpload({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (url: string) => void;
  disabled?: boolean;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to upload image");
      }

      const data = await response.json();
      onChange(data.url);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error uploading file");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 rounded-[1.5rem] border border-[var(--color-line)] bg-white px-4 py-3">
      <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text)]">
        Employee Photo
      </label>
      
      <div className="flex items-center gap-4 mt-1">
        {/* Preview Frame */}
        <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[var(--color-line)] bg-[var(--color-bg-alt)]">
          {value ? (
            <img 
              src={value} 
              alt="Employee preview" 
              className="h-full w-full object-cover" 
            />
          ) : (
            <Upload className="h-5 w-5 text-[var(--color-muted)]" />
          )}

          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
              <Loader2 className="h-5 w-5 animate-spin text-white" />
            </div>
          )}
        </div>

        {/* Upload buttons */}
        <div className="flex flex-col gap-1.5">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/png, image/jpeg, image/webp"
            onChange={handleFileChange}
            disabled={disabled || isUploading}
          />
          <div className="flex gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled || isUploading}
            >
              Choose file
            </Button>
            {value && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => onChange("")}
                disabled={disabled || isUploading}
              >
                <X className="h-4 w-4 text-rose-500" />
              </Button>
            )}
          </div>
          <span className="text-[10px] text-[var(--color-muted)]">
            PNG, JPEG, WebP (Max 4MB)
          </span>
        </div>
      </div>
    </div>
  );
}

export function EmployeesClient({ initialEmployees }: { initialEmployees: EmployeePayload[] }) {
  const [employees, setEmployees] = useState(initialEmployees);
  const [form, setForm] = useState<EmployeePayload>(blankEmployee);
  const [busy, setBusy] = useState(false);

  async function syncEmployees() {
    // A quick hack since we don't have a GET endpoint for employees: reload the page to get fresh data
    window.location.reload();
  }

  async function save() {
    setBusy(true);
    try {
      const method = form.id ? "PATCH" : "POST";
      const res = await fetch("/api/admin/employees", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save employee");
      }
      toast.success(form.id ? "Employee updated." : "Employee created.");
      setForm(blankEmployee);
      await syncEmployees();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Remove this employee?")) return;
    setBusy(true);
    try {
      const res = await fetch("/api/admin/employees", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete employee");
      }
      toast.success("Employee removed.");
      await syncEmployees();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Existing employees */}
      <div className="grid gap-4 md:grid-cols-2">
        {employees.map((e) => (
          <div key={e.id} className="section-card flex flex-col justify-between rounded-[2rem] p-6">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-mono text-lg font-semibold text-[var(--color-text)]">
                    {e.name} {e.employeeNumber && <span className="text-xs text-[var(--color-muted)] font-normal ml-2">({e.employeeNumber})</span>}
                  </p>
                  {e.designation && (
                    <p className="mt-0.5 text-sm font-medium text-[var(--color-accent)]">{e.designation}</p>
                  )}
                  <p className="mt-1 text-sm text-[var(--color-muted)]">{e.personalEmail}</p>
                </div>
                {!e.isActive && (
                  <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold tracking-wide text-rose-700">
                    Former
                  </span>
                )}
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <Button variant="secondary" onClick={() => setForm(e)} disabled={busy}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => remove(e.id!)} disabled={busy}>
                Delete
              </Button>
            </div>
          </div>
        ))}
        {employees.length === 0 && (
          <p className="col-span-full text-sm text-[var(--color-muted)]">No employees configured yet.</p>
        )}
      </div>

      {/* Editor */}
      <div className="section-card rounded-[2rem] p-6 text-sm lg:p-8">
        <h2 className="font-mono text-2xl font-semibold">
          {form.id ? "Edit employee" : "Add employee"}
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Input
            placeholder="Full name"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
          />
          <Input
            placeholder="Employee ID (e.g. EMP-001)"
            value={form.employeeNumber || ""}
            onChange={(event) => setForm({ ...form, employeeNumber: event.target.value })}
          />
          <Input
            placeholder="Designation (e.g. Senior Developer)"
            value={form.designation}
            onChange={(event) => setForm({ ...form, designation: event.target.value })}
          />
          <EmployeePhotoUpload
            value={form.photoUrl}
            onChange={(url) => setForm({ ...form, photoUrl: url })}
            disabled={busy}
          />
          <Input
            type="date"
            placeholder="Date of Birth"
            value={form.dob}
            onChange={(event) => setForm({ ...form, dob: event.target.value })}
          />
          <Input
            placeholder="Personal email"
            value={form.personalEmail}
            onChange={(event) => setForm({ ...form, personalEmail: event.target.value })}
          />
          <Input
            placeholder="Phone number"
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
          />
          <Input
            type="date"
            placeholder="Start date"
            value={form.startDate}
            onChange={(event) => setForm({ ...form, startDate: event.target.value })}
          />
          <Input
            type="date"
            placeholder="End date"
            value={form.endDate}
            onChange={(event) => setForm({ ...form, endDate: event.target.value })}
          />
          <label className="flex items-center gap-3 rounded-[1rem] border border-[var(--color-line)] bg-white px-4 py-3 text-[var(--color-text)] cursor-pointer">
            <input
              type="checkbox"
              className="h-5 w-5 rounded-md border-gray-300 text-[var(--color-accent)] focus:ring-[var(--color-accent)]"
              checked={form.isActive}
              onChange={(event) => setForm({ ...form, isActive: event.target.checked })}
            />
            Currently working
          </label>
        </div>
        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium text-[var(--color-text)]">
            Duties & Achievements
          </label>
          <div className="rounded-xl border border-[var(--color-line)] bg-white overflow-hidden">
            <RichTextEditor
              value={form.dutiesHtml}
              onChange={(val) => setForm({ ...form, dutiesHtml: val })}
            />
          </div>
        </div>
        <div className="mt-6 flex items-center gap-3">
          <Button disabled={busy} onClick={save}>
            {form.id ? "Update employee" : "Create employee"}
          </Button>
          <Button variant="ghost" disabled={busy} onClick={() => setForm(blankEmployee)}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
