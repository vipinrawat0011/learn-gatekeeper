
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import StudentPerformancePage from "./pages/teacher/StudentPerformancePage";
import StudyMaterialPage from "./pages/teacher/StudyMaterialPage";
import AssessmentsPage from "./pages/teacher/AssessmentsPage";
import MarksPage from "./pages/teacher/MarksPage";
import TeacherProfilePage from "./pages/teacher/ProfilePage";

// Student Pages
import StudentCoursesPage from "./pages/student/CoursesPage";
import ExaminationPage from "./pages/student/ExaminationPage";
import StudentMarksPage from "./pages/student/MarksPage";
import StudentStudyMaterialPage from "./pages/student/StudyMaterialPage";
import AiLearningAssistantPage from "./pages/student/AiLearningAssistantPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Main Landing Page */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Auth Routes */}
          <Route path="/login/superadmin" element={<SuperAdminLogin />} />
          <Route path="/login/admin" element={<AdminLogin />} />
          <Route path="/login/teacher" element={<TeacherLogin />} />
          <Route path="/login/student" element={<StudentLogin />} />
          
          {/* Dashboard Routes */}
          <Route path="/superadmin/dashboard" element={<SuperAdminDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          
          {/* SuperAdmin Routes */}
          <Route path="/superadmin/user-management" element={<UserManagementPage />} />
          <Route path="/superadmin/permission-management" element={<PermissionManagementPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin/user-management" element={<AdminUserManagementPage />} />
          <Route path="/admin/courses" element={<CoursesPage />} />
          <Route path="/admin/approvals" element={<ApprovalPage />} />
          <Route path="/admin/student-management" element={<StudentManagementPage />} />
          <Route path="/admin/progress-tracking" element={<ProgressTrackingPage />} />
          <Route path="/admin/classroom" element={<ClassroomPage />} />
          
          {/* Teacher Routes */}
          <Route path="/teacher/student-performance" element={<StudentPerformancePage />} />
          <Route path="/teacher/study-material" element={<StudyMaterialPage />} />
          <Route path="/teacher/assessments" element={<AssessmentsPage />} />
          <Route path="/teacher/marks" element={<MarksPage />} />
          <Route path="/teacher/profile" element={<TeacherProfilePage />} />
          
          {/* Student Routes */}
          <Route path="/student/courses" element={<StudentCoursesPage />} />
          <Route path="/student/examination" element={<ExaminationPage />} />
          <Route path="/student/marks" element={<StudentMarksPage />} />
          <Route path="/student/study-material" element={<StudentStudyMaterialPage />} />
          <Route path="/student/ai-assistant" element={<AiLearningAssistantPage />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
