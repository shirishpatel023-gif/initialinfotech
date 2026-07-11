"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type ServicePayload = {
  id?: string;
  title: string;
  slug?: string;
  description: string;
  iconName: string;
  order: number;
};

export function ServicesClient({ initialServices }: { initialServices: ServicePayload[] }) {
  const [services, setServices] = useState(initialServices);
  const [form, setForm] = useState<ServicePayload>({
    title: "",
    description: "",
    iconName: "circle",
    order: 0,
  });
  const [busy, setBusy] = useState(false);

  async function syncServices() {
    const res = await fetch("/api/admin/services");
    if (res.ok) {
      const data = await res.json();
      setServices(data.services);
    }
  }

  async function save() {
    setBusy(true);
    try {
      const method = form.id ? "PATCH" : "POST";
      const res = await fetch("/api/admin/services", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save service");
      }
      toast.success(form.id ? "Service updated." : "Service created.");
      setForm({ title: "", description: "", iconName: "circle", order: 0 });
      await syncServices();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this service?")) return;
    setBusy(true);
    try {
      const res = await fetch("/api/admin/services", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete service");
      }
      toast.success("Service deleted.");
      await syncServices();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Existing services */}
      <div className="space-y-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex flex-col gap-4 rounded-[1.5rem] border border-[var(--color-line)] bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-mono text-lg font-semibold text-[var(--color-text)]">
                {service.title}
              </p>
              <p className="mt-1 text-sm text-[var(--color-muted)]">{service.description}</p>
              <div className="mt-2 flex gap-4 text-xs font-medium text-[var(--color-muted)]">
                <span>Icon: {service.iconName}</span>
                <span>Order: {service.order}</span>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <Button variant="secondary" disabled={busy} onClick={() => setForm(service)}>
                Edit
              </Button>
              <Button variant="danger" disabled={busy} onClick={() => remove(service.id!)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
        {services.length === 0 && (
          <p className="text-sm text-[var(--color-muted)]">No services configured yet.</p>
        )}
      </div>

      {/* Editor */}
      <div className="section-card rounded-[2rem] p-6 lg:p-8">
        <h2 className="font-mono text-xl font-semibold">
          {form.id ? "Edit service" : "Add service"}
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Input
            placeholder="Service title"
            value={form.title}
            onChange={(event) => setForm({ ...form, title: event.target.value })}
          />
          <Input
            placeholder="Lucide icon name (e.g. smartphone)"
            value={form.iconName}
            onChange={(event) => setForm({ ...form, iconName: event.target.value })}
          />
          <Input
            type="number"
            placeholder="Display order (e.g. 1)"
            value={form.order.toString()}
            onChange={(event) => setForm({ ...form, order: parseInt(event.target.value) || 0 })}
          />
          <div className="md:col-span-2">
            <Textarea
              placeholder="Short description"
              value={form.description}
              onChange={(event) => setForm({ ...form, description: event.target.value })}
            />
          </div>
        </div>
        <div className="mt-6 flex items-center gap-3">
          <Button disabled={busy} onClick={save}>
            {form.id ? "Update service" : "Create service"}
          </Button>
          <Button
            variant="ghost"
            disabled={busy}
            onClick={() => setForm({ title: "", description: "", iconName: "circle", order: 0 })}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
