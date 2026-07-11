import { z } from "zod";

export const companyInfoSchema = z.object({
  companyName: z.string().min(2),
  tagline: z.string().min(10),
  address: z.string().min(5),
  city: z.string().min(2),
  region: z.string().min(2),
  postalCode: z.string().min(3),
  country: z.string().min(2),
  ownerName: z.string().min(2),
  ownerTitle: z.string().min(2),
  aboutTitle: z.string().min(5),
  aboutBody: z.string().min(20),
  mission: z.string().min(20),
  globalReach: z.string().min(20),
  contactEmail: z.string().min(5),
  contactPhone: z.string().min(6),
  googleMapsEmbedUrl: z.url(),
});

export const serviceSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3),
  description: z.string().min(12),
  iconName: z.string().min(3),
  order: z.coerce.number().int().min(0).default(0),
});

export const employeeSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, "Name must be at least 3 characters long"),
  employeeNumber: z.string().optional().or(z.literal("")),
  designation: z.string().optional(),
  photoUrl: z.url().optional().or(z.literal("")),
  dob: z.string().min(1, "Date of birth is required"),
  personalEmail: z.string().email("Valid email address is required"),
  phone: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  dutiesHtml: z.string().optional().default(""),
  isActive: z.coerce.boolean(),
});

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(20),
});
