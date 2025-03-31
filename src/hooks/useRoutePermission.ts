
import { useAuth } from "@/contexts/AuthContext";
import { usePermissions } from "@/contexts/PermissionContext";

export const useRoutePermission = () => {
  const { user } = useAuth();
  const { hasPermission } = usePermissions();
  
  const isAllowed = (path: string): boolean => {
    // If no user is logged in, deny access to protected routes
    if (!user) return false;
    
    // Superadmin can access everything
    if (user.role === "superadmin") return true;
    
    // Admin role permissions - enforce strict permission checks
    if (user.role === "admin") {
      // Check permissions for all admin routes
      if (path === "/admin/dashboard") return hasPermission("admin", "dashboard");
      if (path === "/admin/user-management") return hasPermission("admin", "userManagement");
      if (path === "/admin/courses") return hasPermission("admin", "contentReview");
      if (path === "/admin/approvals") return hasPermission("admin", "approvals");
      if (path === "/admin/student-management") return hasPermission("admin", "studentClassification");
      if (path === "/admin/progress-tracking") return hasPermission("admin", "studentClassification");
      if (path === "/admin/classroom") return hasPermission("admin", "userManagement");
      
      // Default case - deny access for admin if no specific rule matches
      return false;
    }
    
    // Teacher role permissions - enforce strict permission checks
    if (user.role === "teacher") {
      // Check permissions for all teacher routes
      if (path === "/teacher/dashboard") return hasPermission("teacher", "dashboard");
      if (path === "/teacher/my-classroom") return hasPermission("teacher", "students");
      if (path === "/teacher/subject") return hasPermission("teacher", "studyMaterials");
      if (path === "/teacher/student-performance") return hasPermission("teacher", "students");
      if (path === "/teacher/courses") return hasPermission("teacher", "studyMaterials");
      if (path === "/teacher/assessments") return hasPermission("teacher", "exams");
      if (path === "/teacher/study-material") return hasPermission("teacher", "studyMaterials");
      if (path === "/teacher/marks") return hasPermission("teacher", "exams");
      if (path === "/teacher/schedule") return hasPermission("teacher", "dashboard");
      if (path === "/teacher/profile") return hasPermission("teacher", "dashboard");
      
      // Default case - deny access for teacher if no specific rule matches
      return false;
    }
    
    // Student role permissions - enforce strict permission checks
    if (user.role === "student") {
      if (path === "/student/dashboard") return hasPermission("student", "dashboard");
      if (path === "/student/examination") return hasPermission("student", "upcomingTests");
      if (path === "/student/marks") return hasPermission("student", "progress");
      if (path === "/student/courses") return hasPermission("student", "dashboard");
      if (path === "/student/study-material") return hasPermission("student", "dashboard");
      if (path === "/student/ai-assistant") return hasPermission("student", "dashboard");
      
      // Default case - deny access for student if no specific rule matches
      return false;
    }
    
    // Default case - profile and settings are allowed for any authenticated user
    if (path === "/profile" || path === "/settings") return true;
    
    // If no specific rule matches, deny access
    return false;
  };
  
  return { isAllowed };
};
