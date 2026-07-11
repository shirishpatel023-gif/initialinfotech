"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Building2, Layers, Users, MessageSquare, Settings, LogOut } from "lucide-react";

const navigation = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Company", href: "/admin/company", icon: Building2 },
  { name: "Services", href: "/admin/services", icon: Layers },
  { name: "Employees", href: "/admin/employees", icon: Users },
  { name: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminShell({
  children,
  user,
}: {
  children: React.ReactNode;
  user: { email: string; role: "admin" | "editor" };
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[var(--color-bg)]">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-[var(--color-line)] bg-white">
        <div className="flex h-16 shrink-0 items-center px-6">
          <Link href="/" className="font-mono text-xl font-bold tracking-tight text-[var(--color-text)]">
            Initial Infotech
          </Link>
        </div>

        <nav className="flex flex-1 flex-col px-4 py-6 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-[1rem] px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[var(--color-accent)] text-white"
                    : "text-[var(--color-muted)] hover:bg-[var(--color-paper)] hover:text-[var(--color-text)]"
                }`}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 flex-col gap-3 border-t border-[var(--color-line)] p-4">
          <div className="px-2">
            <p className="truncate text-sm font-medium text-[var(--color-text)]">{user.email}</p>
            <p className="text-xs capitalize text-[var(--color-muted)]">{user.role}</p>
          </div>
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-[1rem] px-4 py-3 text-sm font-medium text-[var(--color-muted)] transition-colors hover:bg-rose-50 hover:text-rose-600"
            >
              <LogOut className="h-5 w-5 shrink-0" />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Main content area */}
      <main className="flex-1 pl-72">
        <div className="mx-auto max-w-5xl p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
