import { getContactInquiries } from "@/lib/data";
import { format } from "date-fns";

export const metadata = { title: "Inquiries | Admin" };

export default async function AdminInquiriesPage() {
  const inquiries = await getContactInquiries();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-mono text-3xl font-semibold text-[var(--color-text)]">Contact Inquiries</h1>
        <p className="mt-2 text-[var(--color-muted)]">View messages submitted through the website contact form.</p>
      </div>

      <div className="space-y-4">
        {inquiries.map((inq) => (
          <div key={inq.id} className="section-card rounded-[1.5rem] p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
              <p className="font-mono text-lg font-semibold text-[var(--color-text)]">{inq.name}</p>
              <p className="text-sm font-medium text-[var(--color-muted)]">
                {format(inq.createdAt, "MMM d, yyyy h:mm a")}
              </p>
            </div>
            <div className="mt-2 text-sm text-[var(--color-muted)]">
              <p>Email: <a href={`mailto:${inq.email}`} className="text-[var(--color-accent)]">{inq.email}</a></p>
              {inq.phone && <p>Phone: {inq.phone}</p>}
              {inq.company && <p>Company: {inq.company}</p>}
            </div>
            <div className="mt-4 rounded-xl border border-[var(--color-line)] bg-white p-4 text-sm text-[var(--color-text)]">
              {inq.message}
            </div>
          </div>
        ))}
        {inquiries.length === 0 && (
          <p className="text-sm text-[var(--color-muted)]">No inquiries received yet.</p>
        )}
      </div>
    </div>
  );
}
