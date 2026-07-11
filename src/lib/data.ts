import type { CompanyInfo, ContactInquiry, Employee, Service } from "@prisma/client";

import { companyDefaults, fallbackEmployees, fallbackServices } from "@/lib/constants";
import { prisma } from "@/lib/prisma";

function hasDatabase() {
  return Boolean(process.env.DATABASE_URL);
}

export async function getCompanyInfo(): Promise<CompanyInfo> {
  if (!hasDatabase()) {
    return companyDefaults as CompanyInfo;
  }

  try {
    const company = await prisma.companyInfo.findUnique({ where: { id: "primary" } });
    return (company ?? companyDefaults) as CompanyInfo;
  } catch (error) {
    console.warn("Database lookup failed, falling back to defaults:", error);
    return companyDefaults as CompanyInfo;
  }
}

export async function getServices(): Promise<Service[]> {
  if (!hasDatabase()) {
    return fallbackServices as Service[];
  }

  try {
    return await prisma.service.findMany({ orderBy: [{ order: "asc" }, { title: "asc" }] });
  } catch (error) {
    console.warn("Database lookup failed, falling back to services default:", error);
    return fallbackServices as Service[];
  }
}

export async function getEmployees(): Promise<Employee[]> {
  if (!hasDatabase()) {
    return fallbackEmployees as Employee[];
  }

  try {
    return await prisma.employee.findMany({ orderBy: [{ isActive: "desc" }, { name: "asc" }] });
  } catch (error) {
    console.warn("Database lookup failed, falling back to employees default:", error);
    return fallbackEmployees as Employee[];
  }
}

export async function getEmployeeBySlug(slug: string) {
  if (!hasDatabase()) {
    return (fallbackEmployees as Employee[]).find((employee) => employee.slug === slug) ?? null;
  }

  try {
    return await prisma.employee.findUnique({ where: { slug } });
  } catch (error) {
    console.warn(`Database lookup failed for employee slug ${slug}, using fallback:`, error);
    return (fallbackEmployees as Employee[]).find((employee) => employee.slug === slug) ?? null;
  }
}

export async function getContactInquiries(): Promise<ContactInquiry[]> {
  if (!hasDatabase()) {
    return [];
  }

  try {
    return await prisma.contactInquiry.findMany({ orderBy: { createdAt: "desc" } });
  } catch (error) {
    console.warn("Database lookup failed for inquiries, using empty list:", error);
    return [];
  }
}
