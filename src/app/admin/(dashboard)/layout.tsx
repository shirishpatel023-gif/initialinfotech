import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { AdminShell } from "./admin-shell";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <AdminShell user={{ email: session.email, role: session.role }}>
      {children}
    </AdminShell>
  );
}
