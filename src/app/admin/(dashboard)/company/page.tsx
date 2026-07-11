import { getCompanyInfo } from "@/lib/data";
import { CompanyClient } from "./company-client";

export const metadata = { title: "Company Information | Admin" };

export default async function AdminCompanyPage() {
  const company = await getCompanyInfo();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-mono text-3xl font-semibold text-[var(--color-text)]">Company Information</h1>
        <p className="mt-2 text-[var(--color-muted)]">Manage your core business details and identity.</p>
      </div>
      <CompanyClient
        company={{
          companyName: company.companyName,
          tagline: company.tagline,
          address: company.address,
          city: company.city,
          region: company.region,
          postalCode: company.postalCode,
          country: company.country,
          ownerName: company.ownerName,
          ownerTitle: company.ownerTitle,
          aboutTitle: company.aboutTitle,
          aboutBody: company.aboutBody,
          mission: company.mission,
          globalReach: company.globalReach,
          contactEmail: company.contactEmail,
          contactPhone: company.contactPhone,
          googleMapsEmbedUrl: company.googleMapsEmbedUrl,
        }}
      />
    </div>
  );
}
