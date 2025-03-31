
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useRoutePermission } from "@/hooks/useRoutePermission";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { 
  LayoutDashboard, Users, BookOpen, ClipboardCheck, LineChart, 
  FileText, BrainCircuit, User, Settings, LogOut, Layers,
  Calendar, GraduationCap, ScrollText, Award
} from "lucide-react";

interface SidebarProps {
  role: "superadmin" | "admin" | "teacher" | "student";
}

interface NavLinkProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
  visible?: boolean;
}

function NavLink({ href, icon: Icon, label, active, visible = true }: NavLinkProps) {
  if (!visible) return null;
  
  return (
    <Link to={href}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-2 font-normal",
          active && "bg-secondary"
        )}
      >
        <Icon className="h-5 w-5" />
        {label}
      </Button>
    </Link>
  );
}

export function Sidebar({ role }: SidebarProps) {
  const location = useLocation();
  const { logout, user } = useAuth();
  const { isAllowed } = useRoutePermission();
  const path = location.pathname;

  return (
    <div className="w-64 border-r bg-card flex flex-col h-screen">
      <div className="p-4 border-b">
        <Logo />
      </div>
      
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
            <User className="h-5 w-5" />
          </div>
          <div>
            <div className="font-medium">{user?.name}</div>
            <div className="text-xs text-muted-foreground capitalize">{role}</div>
          </div>
        </div>
        {user?.role === "student" && user.scholarType && (
          <div className="mt-2">
            <span className={cn(
              "scholar-badge",
              user.scholarType === "Junior Scholar" && "junior-scholar",
              user.scholarType === "Rising Intellect" && "rising-intellect",
              user.scholarType === "Mastermind Elite" && "mastermind-elite"
            )}>
              {user.scholarType}
            </span>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto py-2">
        <div className="px-3 py-2">
          <h3 className="mb-2 px-4 text-xs font-semibold text-muted-foreground">MENU</h3>
          
          {role === "superadmin" && (
            <>
              <NavLink 
                href="/superadmin/dashboard" 
                icon={LayoutDashboard} 
                label="Dashboard" 
                active={path === "/superadmin/dashboard"} 
              />
              <NavLink 
                href="/superadmin/user-management" 
                icon={Users} 
                label="User Management" 
                active={path === "/superadmin/user-management"} 
              />
              <NavLink 
                href="/superadmin/permission-management" 
                icon={Layers} 
                label="Permission Management" 
                active={path === "/superadmin/permission-management"} 
              />
            </>
          )}
          
          {role === "admin" && (
            <>
              <NavLink 
                href="/admin/dashboard" 
                icon={LayoutDashboard} 
                label="Dashboard" 
                active={path === "/admin/dashboard"} 
                visible={isAllowed("/admin/dashboard")}
              />
              <NavLink 
                href="/admin/user-management" 
                icon={Users} 
                label="User Management" 
                active={path === "/admin/user-management"} 
                visible={isAllowed("/admin/user-management")}
              />
              <NavLink 
                href="/admin/classroom" 
                icon={GraduationCap} 
                label="Classroom" 
                active={path === "/admin/classroom"} 
                visible={isAllowed("/admin/classroom")}
              />
              <NavLink 
                href="/admin/courses" 
                icon={BookOpen} 
                label="Courses" 
                active={path === "/admin/courses"} 
                visible={isAllowed("/admin/courses")}
              />
              <NavLink 
                href="/admin/approvals" 
                icon={ClipboardCheck} 
                label="Approvals" 
                active={path === "/admin/approvals"} 
                visible={isAllowed("/admin/approvals")}
              />
              <NavLink 
                href="/admin/student-management" 
                icon={Users} 
                label="Student Management" 
                active={path === "/admin/student-management"} 
                visible={isAllowed("/admin/student-management")}
              />
              <NavLink 
                href="/admin/progress-tracking" 
                icon={LineChart} 
                label="Progress Tracking" 
                active={path === "/admin/progress-tracking"} 
                visible={isAllowed("/admin/progress-tracking")}
              />
            </>
          )}
          
          {role === "teacher" && (
            <>
              <NavLink 
                href="/teacher/dashboard" 
                icon={LayoutDashboard} 
                label="Dashboard" 
                active={path === "/teacher/dashboard"} 
                visible={isAllowed("/teacher/dashboard")}
              />
              <NavLink 
                href="/teacher/my-classroom" 
                icon={Users} 
                label="My Classroom" 
                active={path === "/teacher/my-classroom"} 
                visible={isAllowed("/teacher/my-classroom")}
              />
              <NavLink 
                href="/teacher/subject" 
                icon={BookOpen} 
                label="Subject" 
                active={path === "/teacher/subject"} 
                visible={isAllowed("/teacher/subject")}
              />
              <NavLink 
                href="/teacher/student-performance" 
                icon={LineChart} 
                label="Student Performance" 
                active={path === "/teacher/student-performance"} 
                visible={isAllowed("/teacher/student-performance")}
              />
              <NavLink 
                href="/teacher/courses" 
                icon={GraduationCap} 
                label="Courses" 
                active={path === "/teacher/courses"} 
                visible={isAllowed("/teacher/courses")}
              />
              <NavLink 
                href="/teacher/assessments" 
                icon={ClipboardCheck} 
                label="Assessments" 
                active={path === "/teacher/assessments"} 
                visible={isAllowed("/teacher/assessments")}
              />
              <NavLink 
                href="/teacher/schedule" 
                icon={Calendar} 
                label="Schedule" 
                active={path === "/teacher/schedule"} 
                visible={isAllowed("/teacher/schedule")}
              />
              <NavLink 
                href="/teacher/marks" 
                icon={ScrollText} 
                label="Marks" 
                active={path === "/teacher/marks"} 
                visible={isAllowed("/teacher/marks")}
              />
              <NavLink 
                href="/teacher/study-material" 
                icon={FileText} 
                label="Study Material" 
                active={path === "/teacher/study-material"} 
                visible={isAllowed("/teacher/study-material")}
              />
            </>
          )}
          
          {role === "student" && (
            <>
              <NavLink 
                href="/student/dashboard" 
                icon={LayoutDashboard} 
                label="Dashboard" 
                active={path === "/student/dashboard"} 
                visible={isAllowed("/student/dashboard")}
              />
              <NavLink 
                href="/student/courses" 
                icon={BookOpen} 
                label="Courses" 
                active={path === "/student/courses"} 
                visible={isAllowed("/student/courses")}
              />
              <NavLink 
                href="/student/examination" 
                icon={ClipboardCheck} 
                label="Examination" 
                active={path === "/student/examination"} 
                visible={isAllowed("/student/examination")}
              />
              <NavLink 
                href="/student/marks" 
                icon={Award} 
                label="Marks" 
                active={path === "/student/marks"} 
                visible={isAllowed("/student/marks")}
              />
              <NavLink 
                href="/student/study-material" 
                icon={FileText} 
                label="Study Material" 
                active={path === "/student/study-material"} 
                visible={isAllowed("/student/study-material")}
              />
              <NavLink 
                href="/student/ai-assistant" 
                icon={BrainCircuit} 
                label="AI Learning Assistant" 
                active={path === "/student/ai-assistant"} 
                visible={isAllowed("/student/ai-assistant")}
              />
            </>
          )}
        </div>
      </div>

      <div className="p-4 border-t">
        <div className="px-3 py-2">
          <h3 className="mb-2 px-4 text-xs font-semibold text-muted-foreground">SETTINGS</h3>
          {(role === "superadmin" || role === "admin" || role === "teacher" || role === "student") && (
            <NavLink href="/profile" icon={User} label="Profile" active={path === "/profile"} />
          )}
          
          {(role === "superadmin" || role === "admin" || role === "teacher") && (
            <NavLink href="/settings" icon={Settings} label="Settings" active={path === "/settings"} />
          )}
          
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 font-normal"
            onClick={logout}
          >
            <LogOut className="h-5 w-5" />
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
}
