"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type CompanyPayload = {
  companyName: string;
  tagline: string;
  address: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  ownerName: string;
  ownerTitle: string;
  aboutTitle: string;
  aboutBody: string;
  mission: string;
  globalReach: string;
  contactEmail: string;
  contactPhone: string;
  googleMapsEmbedUrl: string;
};

export function CompanyClient({ company }: { company: CompanyPayload }) {
  const [form, setForm] = useState(company);
  const [busy, setBusy] = useState(false);

  async function save() {
    setBusy(true);
    try {
      const res = await fetch("/api/admin/company", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Update failed");
      }
      toast.success("Company information updated.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="section-card rounded-[2rem] p-6 lg:p-8">
      <div className="grid gap-6 md:grid-cols-2">
        <Input
          placeholder="Company name"
          value={form.companyName}
          onChange={(event) => setForm({ ...form, companyName: event.target.value })}
        />
        <Input
          placeholder="Tagline"
          value={form.tagline}
          onChange={(event) => setForm({ ...form, tagline: event.target.value })}
        />
      </div>

      <div className="mt-8">
        <p className="mb-4 font-mono font-semibold">Location & Contact</p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Input
            placeholder="Address"
            value={form.address}
            onChange={(event) => setForm({ ...form, address: event.target.value })}
          />
          <Input
            placeholder="City"
            value={form.city}
            onChange={(event) => setForm({ ...form, city: event.target.value })}
          />
          <Input
            placeholder="Region / State"
            value={form.region}
            onChange={(event) => setForm({ ...form, region: event.target.value })}
          />
          <Input
            placeholder="Postal code"
            value={form.postalCode}
            onChange={(event) => setForm({ ...form, postalCode: event.target.value })}
          />
          <Input
            placeholder="Country"
            value={form.country}
            onChange={(event) => setForm({ ...form, country: event.target.value })}
          />
          <Input
            placeholder="Owner name"
            value={form.ownerName}
            onChange={(event) => setForm({ ...form, ownerName: event.target.value })}
          />
          <Input
            placeholder="Owner title (e.g. Founder & Director)"
            value={form.ownerTitle}
            onChange={(event) => setForm({ ...form, ownerTitle: event.target.value })}
          />
          <Input
            placeholder="Contact email"
            value={form.contactEmail}
            onChange={(event) => setForm({ ...form, contactEmail: event.target.value })}
          />
          <Input
            placeholder="Contact phone"
            value={form.contactPhone}
            onChange={(event) => setForm({ ...form, contactPhone: event.target.value })}
          />
          <Input
            placeholder="Google Maps embed URL"
            value={form.googleMapsEmbedUrl}
            onChange={(event) => setForm({ ...form, googleMapsEmbedUrl: event.target.value })}
          />
        </div>
      </div>

      <div className="mt-8">
        <p className="mb-4 font-mono font-semibold">About Page Content</p>
        <div className="grid gap-4">
          <Input
            placeholder="About title"
            value={form.aboutTitle}
            onChange={(event) => setForm({ ...form, aboutTitle: event.target.value })}
          />
          <Textarea
            placeholder="About body text"
            value={form.aboutBody}
            onChange={(event) => setForm({ ...form, aboutBody: event.target.value })}
          />
          <Textarea
            placeholder="Mission statement"
            value={form.mission}
            onChange={(event) => setForm({ ...form, mission: event.target.value })}
          />
          <Textarea
            placeholder="Global reach text"
            value={form.globalReach}
            onChange={(event) => setForm({ ...form, globalReach: event.target.value })}
          />
        </div>
      </div>

      <Button className="mt-8" disabled={busy} onClick={save}>
        Save changes
      </Button>
    </section>
  );
}
