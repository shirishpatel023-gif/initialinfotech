import { getServices } from "@/lib/data";
import { ServicesClient } from "./services-client";

export const metadata = { title: "Services | Admin" };

export default async function AdminServicesPage() {
  const services = await getServices();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-mono text-3xl font-semibold text-[var(--color-text)]">Services</h1>
        <p className="mt-2 text-[var(--color-muted)]">Manage the public offerings and capabilities of the company.</p>
      </div>
      <ServicesClient initialServices={services} />
    </div>
  );
}
