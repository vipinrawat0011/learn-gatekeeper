
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { PermissionProvider, usePermissions } from "./contexts/PermissionContext";
import { useRoutePermission } from "./hooks/useRoutePermission";

// Pages
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";

// Auth Pages
import SuperAdminLogin from "./pages/auth/SuperAdminLogin";
import AdminLogin from "./pages/auth/AdminLogin";
import TeacherLogin from "./pages/auth/TeacherLogin";
import StudentLogin from "./pages/auth/StudentLogin";

// Dashboard Pages
import SuperAdminDashboard from "./pages/dashboards/SuperAdminDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import TeacherDashboard from "./pages/dashboards/TeacherDashboard";
import StudentDashboard from "./pages/dashboards/StudentDashboard";

// SuperAdmin Pages
import UserManagementPage from "./pages/superadmin/UserManagementPage";
import PermissionManagementPage from "./pages/superadmin/PermissionManagementPage";

// Admin Pages
import AdminUserManagementPage from "./pages/admin/UserManagementPage";
import CoursesPage from "./pages/admin/CoursesPage";
import ApprovalPage from "./pages/admin/ApprovalPage";
import StudentManagementPage from "./pages/admin/StudentManagementPage";
import ProgressTrackingPage from "./pages/admin/ProgressTrackingPage";
import ClassroomPage from "./pages/admin/ClassroomPage";

// Teacher Pages
import MyClassroomPage from "./pages/teacher/MyClassroomPage";
import SubjectPage from "./pages/teacher/SubjectPage";
import StudentPerformancePage from "./pages/teacher/StudentPerformancePage";
import StudyMaterialPage from "./pages/teacher/StudyMaterialPage";
import AssessmentsPage from "./pages/teacher/AssessmentsPage";
import MarksPage from "./pages/teacher/MarksPage";
import TeacherProfilePage from "./pages/teacher/ProfilePage";
import SchedulePage from "./pages/teacher/SchedulePage";
import TeacherCoursesPage from "./pages/teacher/CoursesPage";

// Student Pages
import StudentCoursesPage from "./pages/student/CoursesPage";
import ExaminationPage from "./pages/student/ExaminationPage";
import StudentMarksPage from "./pages/student/MarksPage";
import StudentStudyMaterialPage from "./pages/student/StudyMaterialPage";
import AiLearningAssistantPage from "./pages/student/AiLearningAssistantPage";

const queryClient = new QueryClient();

// Protected Route Component that checks permissions
const ProtectedRoute = ({ 
  element, 
  requiredRole, 
  path,
  requiredPermission 
}: { 
  element: JSX.Element, 
  requiredRole: string,
  path: string,
  requiredPermission?: string 
}) => {
  const { user, isAuthenticated } = useAuth();
  const { isAllowed } = useRoutePermission();
  
  // First check if the user is authenticated and has the required role
  if (!isAuthenticated || user?.role !== requiredRole) {
    // Not authenticated or wrong role, redirect to login
    return <Navigate to={`/login/${requiredRole}`} replace />;
  }
  
  // Then check if the path is allowed based on permissions
  if (!isAllowed(path)) {
    // Path is not allowed due to permissions
    console.log(`Access denied to ${path} due to permissions`);
    
    // Redirect based on user role to their dashboard if they have permission, otherwise to login
    if (user?.role === "superadmin") {
      return <Navigate to="/superadmin/dashboard" replace />;
    } else if (user?.role === "admin") {
      const adminAllowed = isAllowed("/admin/dashboard");
      return adminAllowed 
        ? <Navigate to="/admin/dashboard" replace />
        : <Navigate to={`/login/${user.role}`} replace />;
    } else if (user?.role === "teacher") {
      const teacherAllowed = isAllowed("/teacher/dashboard");
      return teacherAllowed 
        ? <Navigate to="/teacher/dashboard" replace />
        : <Navigate to={`/login/${user.role}`} replace />;
    } else if (user?.role === "student") {
      const studentAllowed = isAllowed("/student/dashboard");
      return studentAllowed 
        ? <Navigate to="/student/dashboard" replace />
        : <Navigate to={`/login/${user.role}`} replace />;
    }
    
    // Default redirect if role doesn't match any expected value
    return <Navigate to="/" replace />;
  }
  
  return element;
};

const AppContent = () => {
  return (
    <Routes>
      {/* Main Landing Page */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Auth Routes */}
      <Route path="/login/superadmin" element={<SuperAdminLogin />} />
      <Route path="/login/admin" element={<AdminLogin />} />
      <Route path="/login/teacher" element={<TeacherLogin />} />
      <Route path="/login/student" element={<StudentLogin />} />
      
      {/* Dashboard Routes */}
      <Route 
        path="/superadmin/dashboard" 
        element={<ProtectedRoute element={<SuperAdminDashboard />} requiredRole="superadmin" path="/superadmin/dashboard" />} 
      />
      <Route 
        path="/admin/dashboard" 
        element={<ProtectedRoute element={<AdminDashboard />} requiredRole="admin" path="/admin/dashboard" requiredPermission="dashboard" />} 
      />
      <Route 
        path="/teacher/dashboard" 
        element={<ProtectedRoute element={<TeacherDashboard />} requiredRole="teacher" path="/teacher/dashboard" requiredPermission="dashboard" />} 
      />
      <Route 
        path="/student/dashboard" 
        element={<ProtectedRoute element={<StudentDashboard />} requiredRole="student" path="/student/dashboard" requiredPermission="dashboard" />} 
      />
      
      {/* SuperAdmin Routes */}
      <Route 
        path="/superadmin/user-management" 
        element={<ProtectedRoute element={<UserManagementPage />} requiredRole="superadmin" path="/superadmin/user-management" />} 
      />
      <Route 
        path="/superadmin/permission-management" 
        element={<ProtectedRoute element={<PermissionManagementPage />} requiredRole="superadmin" path="/superadmin/permission-management" />} 
      />
      
      {/* Admin Routes */}
      <Route 
        path="/admin/user-management" 
        element={<ProtectedRoute element={<AdminUserManagementPage />} requiredRole="admin" path="/admin/user-management" requiredPermission="userManagement" />} 
      />
      <Route 
        path="/admin/courses" 
        element={<ProtectedRoute element={<CoursesPage />} requiredRole="admin" path="/admin/courses" requiredPermission="contentReview" />} 
      />
      <Route 
        path="/admin/approvals" 
        element={<ProtectedRoute element={<ApprovalPage />} requiredRole="admin" path="/admin/approvals" requiredPermission="approvals" />} 
      />
      <Route 
        path="/admin/student-management" 
        element={<ProtectedRoute element={<StudentManagementPage />} requiredRole="admin" path="/admin/student-management" requiredPermission="studentClassification" />} 
      />
      <Route 
        path="/admin/progress-tracking" 
        element={<ProtectedRoute element={<ProgressTrackingPage />} requiredRole="admin" path="/admin/progress-tracking" requiredPermission="studentClassification" />} 
      />
      <Route 
        path="/admin/classroom" 
        element={<ProtectedRoute element={<ClassroomPage />} requiredRole="admin" path="/admin/classroom" requiredPermission="userManagement" />} 
      />
      
      {/* Teacher Routes */}
      <Route 
        path="/teacher/my-classroom" 
        element={<ProtectedRoute element={<MyClassroomPage />} requiredRole="teacher" path="/teacher/my-classroom" requiredPermission="students" />} 
      />
      <Route 
        path="/teacher/subject" 
        element={<ProtectedRoute element={<SubjectPage />} requiredRole="teacher" path="/teacher/subject" requiredPermission="studyMaterials" />} 
      />
      <Route 
        path="/teacher/student-performance" 
        element={<ProtectedRoute element={<StudentPerformancePage />} requiredRole="teacher" path="/teacher/student-performance" requiredPermission="students" />} 
      />
      <Route 
        path="/teacher/courses" 
        element={<ProtectedRoute element={<TeacherCoursesPage />} requiredRole="teacher" path="/teacher/courses" requiredPermission="studyMaterials" />} 
      />
      <Route 
        path="/teacher/study-material" 
        element={<ProtectedRoute element={<StudyMaterialPage />} requiredRole="teacher" path="/teacher/study-material" requiredPermission="studyMaterials" />} 
      />
      <Route 
        path="/teacher/assessments" 
        element={<ProtectedRoute element={<AssessmentsPage />} requiredRole="teacher" path="/teacher/assessments" requiredPermission="exams" />} 
      />
      <Route 
        path="/teacher/schedule" 
        element={<ProtectedRoute element={<SchedulePage />} requiredRole="teacher" path="/teacher/schedule" />} 
      />
      <Route 
        path="/teacher/marks" 
        element={<ProtectedRoute element={<MarksPage />} requiredRole="teacher" path="/teacher/marks" requiredPermission="exams" />} 
      />
      <Route 
        path="/teacher/profile" 
        element={<ProtectedRoute element={<TeacherProfilePage />} requiredRole="teacher" path="/teacher/profile" />} 
      />
      <Route 
        path="/profile" 
        element={<TeacherProfilePage />} 
      />
      <Route 
        path="/settings" 
        element={<TeacherProfilePage />} 
      />
      
      {/* Student Routes */}
      <Route 
        path="/student/courses" 
        element={<ProtectedRoute element={<StudentCoursesPage />} requiredRole="student" path="/student/courses" />} 
      />
      <Route 
        path="/student/examination" 
        element={<ProtectedRoute element={<ExaminationPage />} requiredRole="student" path="/student/examination" requiredPermission="upcomingTests" />} 
      />
      <Route 
        path="/student/marks" 
        element={<ProtectedRoute element={<StudentMarksPage />} requiredRole="student" path="/student/marks" requiredPermission="progress" />} 
      />
      <Route 
        path="/student/study-material" 
        element={<ProtectedRoute element={<StudentStudyMaterialPage />} requiredRole="student" path="/student/study-material" />} 
      />
      <Route 
        path="/student/ai-assistant" 
        element={<ProtectedRoute element={<AiLearningAssistantPage />} requiredRole="student" path="/student/ai-assistant" />} 
      />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <PermissionProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </TooltipProvider>
      </PermissionProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
