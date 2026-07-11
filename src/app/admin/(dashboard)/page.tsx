import { getCompanyInfo, getServices, getEmployees, getContactInquiries } from "@/lib/data";

export const metadata = { title: "Admin Overview" };

export default async function AdminOverviewPage() {
  const [services, employees, inquiries] = await Promise.all([
    getServices(),
    getEmployees(),
    getContactInquiries(),
  ]);

  const activeEmployees = employees.filter((e) => e.isActive).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-mono text-3xl font-semibold text-[var(--color-text)]">Admin Dashboard</h1>
        <p className="mt-2 text-[var(--color-muted)]">Welcome back. Here's what's happening today.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="section-card rounded-[2rem] p-6">
          <p className="text-sm font-medium text-[var(--color-muted)]">Active Employees</p>
          <p className="mt-2 font-mono text-4xl font-semibold text-[var(--color-text)]">
            {activeEmployees}
          </p>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            Out of {employees.length} total profiles
          </p>
        </div>

        <div className="section-card rounded-[2rem] p-6">
          <p className="text-sm font-medium text-[var(--color-muted)]">Total Services</p>
          <p className="mt-2 font-mono text-4xl font-semibold text-[var(--color-text)]">
            {services.length}
          </p>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            Active public offerings
          </p>
        </div>

        <div className="section-card rounded-[2rem] p-6">
          <p className="text-sm font-medium text-[var(--color-muted)]">Contact Inquiries</p>
          <p className="mt-2 font-mono text-4xl font-semibold text-[var(--color-text)]">
            {inquiries.length}
          </p>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            Total submissions received
          </p>
        </div>
      </div>
    </div>
  );
}
