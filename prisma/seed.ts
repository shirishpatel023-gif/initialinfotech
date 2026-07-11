import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/lib/auth";

const prisma = new PrismaClient();

async function main() {
  await prisma.companyInfo.upsert({
    where: { id: "primary" },
    update: {
      companyName: "Initial Infotech",
      tagline: "Website development | Desktop development | Mobile application",
      address: "Suthar Faliya Road, J P Nagar",
      city: "Bardoli",
      region: "Gujarat",
      postalCode: "394601",
      country: "India",
      ownerName: "Shirish Patel",
      ownerTitle: "Founder & Director",
      contactPhone: "+91 9099460498, +91 9727713885",
      contactEmail: "initialinfotech@gmail.com, contact@initialinfotech.com",
      aboutTitle: "Leading Software Development in Bardoli",
      aboutBody: "Initial Infotech is a premier software developer in Bardoli specializing in computer software development, ERP systems, and application delivery services. We pride ourselves on creating reliable software solutions tailored to regional and international business needs.",
      mission: "To deliver high-quality, scalable ERP solutions and bespoke software applications that empower businesses to thrive in the digital age.",
      globalReach: "Based in Bardoli, our impact spans globally. We have consistently provided technical excellence to partners looking for robust software and ERP implementations.",
      googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3722.5186445580875!2d73.1165217!3d21.1219602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be05b7662b66d73%3A0xe7a505b2203ddbcf!2sInitial%20Infotech!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus",
    },
    create: {
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
      contactPhone: "+91 9099460498, +91 9727713885",
      contactEmail: "initialinfotech@gmail.com, contact@initialinfotech.com",
      aboutTitle: "Leading Software Development in Bardoli",
      aboutBody: "Initial Infotech is a premier software developer in Bardoli specializing in computer software development, ERP systems, and application delivery services. We pride ourselves on creating reliable software solutions tailored to regional and international business needs.",
      mission: "To deliver high-quality, scalable ERP solutions and bespoke software applications that empower businesses to thrive in the digital age.",
      globalReach: "Based in Bardoli, our impact spans globally. We have consistently provided technical excellence to partners looking for robust software and ERP implementations.",
      googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3722.5186445580875!2d73.1165217!3d21.1219602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be05b7662b66d73%3A0xe7a505b2203ddbcf!2sInitial%20Infotech!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus",
    },
  });

  const services = [
    {
      title: "Custom Software Development",
      slug: "custom-software-development",
      description: "Business systems, portals, and workflow tools tailored to your exact operating model.",
      iconName: "code-xml",
      order: 1,
    },
    {
      title: "Mobile App Development",
      slug: "mobile-app-development",
      description: "Cross-platform and native-ready mobile experiences designed for performance and trust.",
      iconName: "smartphone",
      order: 2,
    },
    {
      title: "AI and Automation",
      slug: "ai-and-automation",
      description: "AI-assisted workflows, copilots, and internal automations that remove repetitive work.",
      iconName: "brain-circuit",
      order: 3,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }

  const employees = [
    {
      name: "Aarav Desai",
      slug: "aarav-desai",
      designation: "Lead Technical Architect",
      photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
      dob: new Date("1996-06-18"),
      personalEmail: "aarav.desai@example.com",
      phone: "+91 98765 12345",
      startDate: new Date("2021-02-01"),
      endDate: null,
      dutiesHtml: "<p>Leads delivery for custom web platforms and coordinates architecture decisions across backend, frontend, and deployment workflows.</p><ul><li>Technical discovery</li><li>Platform architecture</li><li>Team mentoring</li></ul>",
      isActive: true,
    },
    {
      name: "Mira Patel",
      slug: "mira-patel",
      designation: "UI/UX Developer",
      photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
      dob: new Date("1998-11-02"),
      personalEmail: "mira.patel@example.com",
      phone: "+91 98989 45678",
      startDate: new Date("2022-07-15"),
      endDate: null,
      dutiesHtml: "<p>Builds mobile product experiences and owns UI implementation for customer-facing applications.</p><ul><li>Product UI development</li><li>Design systems</li><li>Frontend QA</li></ul>",
      isActive: true,
    },
  ];

  for (const employee of employees) {
    await prisma.employee.upsert({
      where: { slug: employee.slug },
      update: employee,
      create: employee,
    });
  }

  // Seed AdminUser rows from env vars (only if table is empty)
  const existingUsers = await prisma.adminUser.count();
  if (existingUsers === 0) {
    const adminPwd = process.env.ADMIN_PASSWORD || "ChangeMe123!";
    const editorPwd = process.env.EDITOR_PASSWORD || "ChangeMe123!";
    const adminEmail = process.env.ADMIN_EMAIL || "admin@initialinfotech.com";
    const editorEmail = process.env.EDITOR_EMAIL || "editor@initialinfotech.com";

    await prisma.adminUser.createMany({
      data: [
        { email: adminEmail, passwordHash: await hashPassword(adminPwd), role: "admin" },
        { email: editorEmail, passwordHash: await hashPassword(editorPwd), role: "editor" },
      ],
    });
    console.log("Seeded admin users from env vars.");
  } else {
    console.log(`Skipped user seed — ${existingUsers} user(s) already exist.`);
  }
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
