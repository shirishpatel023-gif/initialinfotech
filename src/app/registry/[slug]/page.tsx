import Image from "next/image";
import { notFound } from "next/navigation";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { getEmployeeBySlug } from "@/lib/data";
import { sanitizeRichText } from "@/lib/rich-text";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const employee = await getEmployeeBySlug(slug);

  return {
    title: employee ? employee.name : "Employee profile",
  };
}

export default async function EmployeeProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const employee = await getEmployeeBySlug(slug);

  if (!employee) {
    notFound();
  }

  return (
    <div className="page-shell py-14">
      <div className="section-card rounded-[2rem] p-7 md:p-10">
        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
          <img
            src={employee.photoUrl || "https://placehold.co/320x320/0d1b31/e8f0ff?text=II"}
            alt={employee.name}
            className="h-56 w-full rounded-[1.75rem] object-cover"
          />
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <Badge>{employee.isActive ? "Currently Working" : "Former Employee"}</Badge>
              {employee.employeeNumber && (
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-muted)] border border-[var(--color-line)] rounded-full px-2.5 py-0.5 bg-[var(--color-paper)]">
                  ID: {employee.employeeNumber}
                </span>
              )}
            </div>
            <h1 className="mt-4 font-mono text-4xl font-semibold text-[var(--color-text)]">{employee.name}</h1>
            {employee.designation && (
              <p className="mt-1 text-base font-medium text-[var(--color-accent)]">{employee.designation}</p>
            )}
            <div className="mt-5 grid gap-3 text-sm text-[var(--color-muted)] md:grid-cols-2">
              <p>Date of Birth: {format(employee.dob, "dd MMM yyyy")}</p>
              <p>Personal Email: {employee.personalEmail}</p>
              <p>Phone: {employee.phone || "Not listed"}</p>
              <p>Start Date: {format(employee.startDate, "dd MMM yyyy")}</p>
              <p>
                End Date: {employee.endDate ? format(employee.endDate, "dd MMM yyyy") : "Active"}
              </p>
            </div>
            <div
              className="prose-rich mt-8 rounded-[1.75rem] border border-[var(--color-line)] bg-[var(--color-paper)] p-5"
              dangerouslySetInnerHTML={{ __html: sanitizeRichText(employee.dutiesHtml) }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
