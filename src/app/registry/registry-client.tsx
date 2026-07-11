"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Employee = {
  id: string;
  name: string;
  slug: string;
  employeeNumber: string | null;
  designation: string | null;
  photoUrl: string | null;
  dob: string;
  personalEmail: string;
  startDate: string;
  endDate: string | null;
  isActive: boolean;
};

type Filter = "all" | "active" | "former";

export function RegistryClient({ employees }: { employees: Employee[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = employees.filter((e) => {
    const matchesSearch = [e.name, e.personalEmail, e.designation ?? "", e.employeeNumber ?? ""]
      .join(" ")
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && e.isActive) ||
      (filter === "former" && !e.isActive);
    return matchesSearch && matchesFilter;
  });

  const tabs: { label: string; value: Filter }[] = [
    { label: `All (${employees.length})`, value: "all" },
    { label: `Current (${employees.filter((e) => e.isActive).length})`, value: "active" },
    { label: `Former (${employees.filter((e) => !e.isActive).length})`, value: "former" },
  ];

  return (
    <>
      {/* Search + filter row */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, email or designation…"
          className="h-12 flex-1 rounded-full border border-[var(--color-line)] bg-white px-5 text-sm text-[var(--color-text)] outline-none placeholder:text-[var(--color-muted)]"
        />
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`h-12 rounded-full px-5 text-sm font-medium transition-colors ${
                filter === tab.value
                  ? "bg-[var(--color-accent)] text-white"
                  : "border border-[var(--color-line)] bg-white text-[var(--color-muted)] hover:text-[var(--color-text)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="mt-10 rounded-[1.75rem] border border-[var(--color-line)] bg-[var(--color-paper)] px-6 py-10 text-center text-sm text-[var(--color-muted)]">
          No employees match your search or filter.
        </div>
      ) : (
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((employee) => (
            <div key={employee.id} className="section-card rounded-[1.8rem] p-5">
              <div className="flex items-start gap-4">
                <img
                  src={employee.photoUrl || "https://placehold.co/160x160/0d1b31/e8f0ff?text=II"}
                  alt={employee.name}
                  className="h-20 w-20 rounded-2xl object-cover"
                />
                <div className="min-w-0">
                  <p className="font-mono text-xl font-semibold text-[var(--color-text)]">
                    {employee.name}
                  </p>
                  {employee.employeeNumber && (
                    <p className="text-xs font-mono text-[var(--color-muted)] mt-0.5">#{employee.employeeNumber}</p>
                  )}
                  {employee.designation && (
                    <p className="mt-1 text-sm font-medium text-[var(--color-accent)]">
                      {employee.designation}
                    </p>
                  )}
                  <p className="mt-1 text-sm text-[var(--color-muted)]">{employee.personalEmail}</p>
                  <Badge className="mt-3">
                    {employee.isActive ? "Currently Working" : "Former Employee"}
                  </Badge>
                </div>
              </div>
              <div className="mt-5 grid gap-2 text-sm text-[var(--color-muted)]">
                <p>Start Date: {format(new Date(employee.startDate), "dd MMM yyyy")}</p>
                <p>
                  End Date:{" "}
                  {employee.endDate ? format(new Date(employee.endDate), "dd MMM yyyy") : "Active"}
                </p>
              </div>
              <Link href={`/registry/${employee.slug}`} className="mt-5 inline-flex">
                <Button variant="secondary">Open profile</Button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
