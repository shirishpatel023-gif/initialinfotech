import { Badge } from "@/components/ui/badge";
import { getEmployees } from "@/lib/data";
import { RegistryClient } from "./registry-client";

export const metadata = {
  title: "Employee Directory",
};

export default async function RegistryPage() {
  const employees = await getEmployees();

  return (
    <div className="page-shell py-14">
      <div className="md:pr-6">
        <Badge>Employee directory</Badge>
        <h1 className="mt-4 font-mono text-4xl font-semibold md:text-5xl">
          Public employee directory
        </h1>
      </div>

      <div className="mt-6 max-w-4xl space-y-3 text-sm leading-7 text-[var(--color-muted)]">
        <p>
          This directory is maintained to help with employment verification when the business owner
          or team may not be able to respond to every email request individually.
        </p>
        <p>
          Former employees, current employees, employers, recruiters, agencies, and document
          reviewers can refer to this page to confirm employment details, dates, and role history
          published by Initial Infotech.
        </p>
        <p>
          This page is designed to support professional and official verification needs by giving
          reviewers a clear reference point for employment records published by Initial Infotech.
        </p>
        <div className="mt-4 rounded-2xl border border-[var(--color-line)] bg-[var(--color-paper)] px-5 py-4">
          <p className="font-medium text-[var(--color-text)]">About our compensation structure</p>
          <p className="mt-1 text-[var(--color-muted)]">
            Initial Infotech is a small, closely-held technology firm. Employee salaries are paid
            directly in cash as our primary mode of compensation. Payments are settled on an
            agreed schedule and are not processed through a formal payroll system. Employers,
            banks, visa officers, and other verification reviewers should take this into account
            when assessing employment and income history for our team members.
          </p>
        </div>
      </div>

      <RegistryClient
        employees={employees.map((e) => ({
          id: e.id,
          name: e.name,
          slug: e.slug,
          employeeNumber: e.employeeNumber ?? null,
          designation: e.designation ?? null,
          photoUrl: e.photoUrl ?? null,
          dob: e.dob.toISOString(),
          personalEmail: e.personalEmail,
          startDate: e.startDate.toISOString(),
          endDate: e.endDate ? e.endDate.toISOString() : null,
          isActive: e.isActive,
        }))}
      />
    </div>
  );
}
