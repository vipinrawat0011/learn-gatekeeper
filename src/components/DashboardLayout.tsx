
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { useAuth } from "@/contexts/AuthContext";

interface DashboardLayoutProps {
  children: ReactNode;
  role: "superadmin" | "admin" | "teacher" | "student";
  title: string;
  subtitle?: string;
}

export function DashboardLayout({ children, role, title, subtitle }: DashboardLayoutProps) {
  const { user, isAuthenticated } = useAuth();

  // Redirect if not authenticated or wrong role
  if (!isAuthenticated || user?.role !== role) {
    return <Navigate to={`/login/${role}`} />;
  }

  return (
    <div className="flex h-screen">
      <Sidebar role={role} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader title={title} subtitle={subtitle} />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
