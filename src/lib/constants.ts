import { BriefcaseBusiness, BrainCircuit, CodeXml, Globe2, Smartphone } from "lucide-react";

export const companyDefaults = {
  id: "primary",
  companyName: "Initial Infotech",
  tagline: "Website development | Desktop development | Mobile application",
  address: "Suthar Faliya Road, J P Nagar",
  city: "Bardoli",
  region: "Gujarat",
  postalCode: "394601",
  country: "India",
  ownerName: "Shirish Patel",
  ownerTitle: "Founder & Director",
  aboutTitle: "Built in Bardoli, delivered globally.",
  aboutBody:
    "Initial Infotech is a software and app development agency focused on modern product engineering, business workflows, and digital transformation. We partner with clients that need reliable execution, transparent communication, and technology that creates measurable operational value.",
  mission:
    "We build high-trust digital products that help organizations move faster, serve customers better, and scale with confidence.",
  globalReach:
    "Our teams work from Bardoli with delivery standards aligned to global product companies, supporting clients across industries and geographies.",
  contactEmail: "initialinfotech@gmail.com, contact@initialinfotech.com",
  contactPhone: "+91 9099460498, +91 9727713885",
  googleMapsEmbedUrl:
    "https://www.google.com/maps?q=Suthar%20Faliya%20Road%2C%20J%20P%20Nagar%2C%20Bardoli%2C%20Gujarat%20394601%2C%20India&output=embed",
};

export const fallbackServices = [
  {
    id: "service-1",
    title: "Custom Software Development",
    slug: "custom-software-development",
    description:
      "Workflow systems, dashboards, portals, and internal platforms tailored to your business.",
    iconName: "code-xml",
    order: 1,
  },
  {
    id: "service-2",
    title: "Mobile App Development",
    slug: "mobile-app-development",
    description:
      "Scalable iOS and Android experiences with product-focused UX and strong release discipline.",
    iconName: "smartphone",
    order: 2,
  },
  {
    id: "service-3",
    title: "AI and Automation",
    slug: "ai-and-automation",
    description:
      "Operational automation, copilots, and intelligent workflows that reduce repetitive effort.",
    iconName: "brain-circuit",
    order: 3,
  },
];

export const fallbackEmployees = [
  {
    id: "employee-1",
    name: "Aarav Desai",
    slug: "aarav-desai",
    employeeNumber: "EMP-2101",
    photoUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
    dob: new Date("1996-06-18"),
    personalEmail: "aarav.desai@example.com",
    phone: "+91 98765 12345",
    startDate: new Date("2021-02-01"),
    endDate: null,
    dutiesHtml:
      "<p>Leads delivery for custom web platforms and coordinates architecture decisions across backend, frontend, and deployment workflows.</p><ul><li>Technical discovery</li><li>Architecture planning</li><li>Delivery leadership</li></ul>",
    isActive: true,
  },
  {
    id: "employee-2",
    name: "Mira Patel",
    slug: "mira-patel",
    employeeNumber: "EMP-2204",
    photoUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
    dob: new Date("1998-11-02"),
    personalEmail: "mira.patel@example.com",
    phone: "+91 98989 45678",
    startDate: new Date("2022-07-15"),
    endDate: null,
    dutiesHtml:
      "<p>Builds mobile product experiences and owns UI implementation for customer-facing applications.</p><ul><li>Product UI development</li><li>Design systems</li><li>Frontend QA</li></ul>",
    isActive: true,
  },
];

export const techStack = [
  "React",
  "Next.js",
  "TypeScript",
  "PostgreSQL",
  "Prisma",
  "Tailwind CSS",
  "Mobile Apps",
  "AI Workflows",
  "Cloud Deployments",
  "ASP.NET",
  "C#",
  "VB.NET",
  ".NET Framework",
  ".NET Core",
  "MSSQL",
  "Software Development",
  "Web Design",
  "UI/UX",
];

export const iconMap = {
  "briefcase-business": BriefcaseBusiness,
  "brain-circuit": BrainCircuit,
  "code-xml": CodeXml,
  "globe-2": Globe2,
  smartphone: Smartphone,
};

export const serviceImageMap: Record<string, string> = {
  "code-xml": "/services/software-dev.png",
  smartphone: "/services/mobile-app.png",
  "brain-circuit": "/services/ai-automation.png",
  "briefcase-business": "/services/software-dev.png",
  "globe-2": "/services/software-dev.png",
};
