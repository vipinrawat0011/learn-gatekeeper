
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { PermissionProvider, usePermissions } from "./contexts/PermissionContext";

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
  requiredPermission 
}: { 
  element: JSX.Element, 
  requiredRole: string, 
  requiredPermission?: string 
}) => {
  const { user, isAuthenticated } = useAuth();
  const { hasPermission } = usePermissions();
  
  if (!isAuthenticated || user?.role !== requiredRole) {
    // Not authenticated or wrong role, redirect to login
    return <Navigate to={`/login/${requiredRole}`} replace />;
  }
  
  if (requiredPermission && !hasPermission(requiredRole, requiredPermission)) {
    // Doesn't have the required permission, redirect to dashboard
    return <Navigate to={`/${requiredRole}/dashboard`} replace />;
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
      
      {/* Dashboard Routes - Only check role, not permissions */}
      <Route 
        path="/superadmin/dashboard" 
        element={<ProtectedRoute element={<SuperAdminDashboard />} requiredRole="superadmin" />} 
      />
      <Route 
        path="/admin/dashboard" 
        element={<ProtectedRoute element={<AdminDashboard />} requiredRole="admin" requiredPermission="dashboard" />} 
      />
      <Route 
        path="/teacher/dashboard" 
        element={<ProtectedRoute element={<TeacherDashboard />} requiredRole="teacher" requiredPermission="dashboard" />} 
      />
      <Route 
        path="/student/dashboard" 
        element={<ProtectedRoute element={<StudentDashboard />} requiredRole="student" requiredPermission="dashboard" />} 
      />
      
      {/* SuperAdmin Routes - Only check role, superadmin has all permissions */}
      <Route 
        path="/superadmin/user-management" 
        element={<ProtectedRoute element={<UserManagementPage />} requiredRole="superadmin" />} 
      />
      <Route 
        path="/superadmin/permission-management" 
        element={<ProtectedRoute element={<PermissionManagementPage />} requiredRole="superadmin" />} 
      />
      
      {/* Admin Routes - Check both role and permissions */}
      <Route 
        path="/admin/user-management" 
        element={<ProtectedRoute element={<AdminUserManagementPage />} requiredRole="admin" requiredPermission="userManagement" />} 
      />
      <Route 
        path="/admin/courses" 
        element={<ProtectedRoute element={<CoursesPage />} requiredRole="admin" requiredPermission="contentReview" />} 
      />
      <Route 
        path="/admin/approvals" 
        element={<ProtectedRoute element={<ApprovalPage />} requiredRole="admin" requiredPermission="approvals" />} 
      />
      <Route 
        path="/admin/student-management" 
        element={<ProtectedRoute element={<StudentManagementPage />} requiredRole="admin" requiredPermission="studentClassification" />} 
      />
      <Route 
        path="/admin/progress-tracking" 
        element={<ProtectedRoute element={<ProgressTrackingPage />} requiredRole="admin" requiredPermission="studentClassification" />} 
      />
      <Route 
        path="/admin/classroom" 
        element={<ProtectedRoute element={<ClassroomPage />} requiredRole="admin" requiredPermission="userManagement" />} 
      />
      
      {/* Teacher Routes - Check both role and permissions */}
      <Route 
        path="/teacher/my-classroom" 
        element={<ProtectedRoute element={<MyClassroomPage />} requiredRole="teacher" requiredPermission="students" />} 
      />
      <Route 
        path="/teacher/subject" 
        element={<ProtectedRoute element={<SubjectPage />} requiredRole="teacher" requiredPermission="studyMaterials" />} 
      />
      <Route 
        path="/teacher/student-performance" 
        element={<ProtectedRoute element={<StudentPerformancePage />} requiredRole="teacher" requiredPermission="students" />} 
      />
      <Route 
        path="/teacher/courses" 
        element={<ProtectedRoute element={<TeacherCoursesPage />} requiredRole="teacher" requiredPermission="studyMaterials" />} 
      />
      <Route 
        path="/teacher/study-material" 
        element={<ProtectedRoute element={<StudyMaterialPage />} requiredRole="teacher" requiredPermission="studyMaterials" />} 
      />
      <Route 
        path="/teacher/assessments" 
        element={<ProtectedRoute element={<AssessmentsPage />} requiredRole="teacher" requiredPermission="exams" />} 
      />
      <Route 
        path="/teacher/schedule" 
        element={<ProtectedRoute element={<SchedulePage />} requiredRole="teacher" />} 
      />
      <Route 
        path="/teacher/marks" 
        element={<ProtectedRoute element={<MarksPage />} requiredRole="teacher" requiredPermission="exams" />} 
      />
      <Route 
        path="/teacher/profile" 
        element={<ProtectedRoute element={<TeacherProfilePage />} requiredRole="teacher" />} 
      />
      <Route 
        path="/profile" 
        element={<TeacherProfilePage />} 
      />
      <Route 
        path="/settings" 
        element={<TeacherProfilePage />} 
      />
      
      {/* Student Routes - Check both role and permissions */}
      <Route 
        path="/student/courses" 
        element={<ProtectedRoute element={<StudentCoursesPage />} requiredRole="student" />} 
      />
      <Route 
        path="/student/examination" 
        element={<ProtectedRoute element={<ExaminationPage />} requiredRole="student" requiredPermission="upcomingTests" />} 
      />
      <Route 
        path="/student/marks" 
        element={<ProtectedRoute element={<StudentMarksPage />} requiredRole="student" requiredPermission="progress" />} 
      />
      <Route 
        path="/student/study-material" 
        element={<ProtectedRoute element={<StudentStudyMaterialPage />} requiredRole="student" />} 
      />
      <Route 
        path="/student/ai-assistant" 
        element={<ProtectedRoute element={<AiLearningAssistantPage />} requiredRole="student" />} 
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
