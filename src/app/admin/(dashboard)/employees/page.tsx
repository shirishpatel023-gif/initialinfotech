import { getEmployees } from "@/lib/data";
import { EmployeesClient } from "./employees-client";

export const metadata = { title: "Employees | Admin" };

export default async function AdminEmployeesPage() {
  const employees = await getEmployees();
  
  // Transform dates to strings for easier serialization
  const serialized = employees.map(e => ({
    ...e,
    designation: e.designation || "",
    employeeNumber: e.employeeNumber || "",
    photoUrl: e.photoUrl || "",
    phone: e.phone || "",
    dob: e.dob.toISOString().slice(0, 10),
    startDate: e.startDate.toISOString().slice(0, 10),
    endDate: e.endDate ? e.endDate.toISOString().slice(0, 10) : "",
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-mono text-3xl font-semibold text-[var(--color-text)]">Employees</h1>
        <p className="mt-2 text-[var(--color-muted)]">Manage team members, roles, and profiles in the public directories.</p>
      </div>
      <EmployeesClient initialEmployees={serialized} />
    </div>
  );
}
