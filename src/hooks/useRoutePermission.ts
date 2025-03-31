
import { useAuth } from "@/contexts/AuthContext";
import { usePermissions } from "@/contexts/PermissionContext";

export const useRoutePermission = () => {
  const { user } = useAuth();
  const { hasPermission } = usePermissions();
  
  const isAllowed = (path: string): boolean => {
    // Superadmin can access everything
    if (user?.role === "superadmin") return true;
    
    // Admin role permissions
    if (user?.role === "admin") {
      if (path === "/admin/dashboard") return hasPermission("admin", "dashboard");
      if (path === "/admin/user-management") return hasPermission("admin", "userManagement");
      if (path === "/admin/courses") return hasPermission("admin", "contentReview");
      if (path === "/admin/approvals") return hasPermission("admin", "approvals");
      if (path === "/admin/student-management") return hasPermission("admin", "studentClassification");
      if (path === "/admin/progress-tracking") return hasPermission("admin", "studentClassification");
      if (path === "/admin/classroom") return hasPermission("admin", "userManagement");
    }
    
    // Teacher role permissions
    if (user?.role === "teacher") {
      if (path === "/teacher/dashboard") return hasPermission("teacher", "dashboard");
      if (path === "/teacher/my-classroom") return hasPermission("teacher", "students");
      if (path === "/teacher/subject") return hasPermission("teacher", "studyMaterials");
      if (path === "/teacher/student-performance") return hasPermission("teacher", "students");
      if (path === "/teacher/courses") return hasPermission("teacher", "studyMaterials");
      if (path === "/teacher/assessments") return hasPermission("teacher", "exams");
      if (path === "/teacher/study-material") return hasPermission("teacher", "studyMaterials");
      if (path === "/teacher/marks") return hasPermission("teacher", "exams");
      // These routes are always accessible for teachers
      if (path === "/teacher/schedule") return true;
      if (path === "/teacher/profile") return true;
    }
    
    // Student role permissions
    if (user?.role === "student") {
      if (path === "/student/dashboard") return hasPermission("student", "dashboard");
      if (path === "/student/examination") return hasPermission("student", "upcomingTests");
      if (path === "/student/marks") return hasPermission("student", "progress");
      // These routes are always accessible for students
      if (path === "/student/courses") return true;
      if (path === "/student/study-material") return true;
      if (path === "/student/ai-assistant") return true;
    }
    
    // Default case - profile and settings are allowed for any authenticated user
    if (path === "/profile" || path === "/settings") return true;
    
    return false;
  };
  
  return { isAllowed };
};
