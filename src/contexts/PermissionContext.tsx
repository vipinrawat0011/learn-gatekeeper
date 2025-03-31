
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

// Define permission types for each role
export interface AdminPermissions {
  dashboard: boolean;
  userManagement: boolean;
  contentReview: boolean;
  approvals: boolean;
  studentClassification: boolean;
  aiLearning: boolean;
  systemStatus: boolean;
}

export interface TeacherPermissions {
  dashboard: boolean;
  studyMaterials: boolean;
  students: boolean;
  exams: boolean;
}

export interface StudentPermissions {
  dashboard: boolean;
  progress: boolean;
  upcomingTests: boolean;
}

interface PermissionContextType {
  adminPermissions: AdminPermissions;
  teacherPermissions: TeacherPermissions;
  studentPermissions: StudentPermissions;
  updateAdminPermission: (key: keyof AdminPermissions, value: boolean) => void;
  updateTeacherPermission: (key: keyof TeacherPermissions, value: boolean) => void;
  updateStudentPermission: (key: keyof StudentPermissions, value: boolean) => void;
  savePermissions: () => void;
  hasPermission: (role: string, permission: string) => boolean;
}

const defaultAdminPermissions: AdminPermissions = {
  dashboard: true,
  userManagement: true,
  contentReview: true,
  approvals: true,
  studentClassification: true,
  aiLearning: true,
  systemStatus: true,
};

const defaultTeacherPermissions: TeacherPermissions = {
  dashboard: true,
  studyMaterials: true,
  students: true,
  exams: true,
};

const defaultStudentPermissions: StudentPermissions = {
  dashboard: true,
  progress: true,
  upcomingTests: true,
};

const PermissionContext = createContext<PermissionContextType>({
  adminPermissions: defaultAdminPermissions,
  teacherPermissions: defaultTeacherPermissions,
  studentPermissions: defaultStudentPermissions,
  updateAdminPermission: () => {},
  updateTeacherPermission: () => {},
  updateStudentPermission: () => {},
  savePermissions: () => {},
  hasPermission: () => true,
});

export const usePermissions = () => useContext(PermissionContext);

export const PermissionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminPermissions, setAdminPermissions] = useState<AdminPermissions>(defaultAdminPermissions);
  const [teacherPermissions, setTeacherPermissions] = useState<TeacherPermissions>(defaultTeacherPermissions);
  const [studentPermissions, setStudentPermissions] = useState<StudentPermissions>(defaultStudentPermissions);
  const { user } = useAuth();

  // Load saved permissions from localStorage on initial render
  useEffect(() => {
    const savedAdminPermissions = localStorage.getItem("adminPermissions");
    const savedTeacherPermissions = localStorage.getItem("teacherPermissions");
    const savedStudentPermissions = localStorage.getItem("studentPermissions");

    if (savedAdminPermissions) {
      setAdminPermissions(JSON.parse(savedAdminPermissions));
    }
    if (savedTeacherPermissions) {
      setTeacherPermissions(JSON.parse(savedTeacherPermissions));
    }
    if (savedStudentPermissions) {
      setStudentPermissions(JSON.parse(savedStudentPermissions));
    }
  }, []);

  const updateAdminPermission = (key: keyof AdminPermissions, value: boolean) => {
    setAdminPermissions(prev => ({ ...prev, [key]: value }));
  };

  const updateTeacherPermission = (key: keyof TeacherPermissions, value: boolean) => {
    setTeacherPermissions(prev => ({ ...prev, [key]: value }));
  };

  const updateStudentPermission = (key: keyof StudentPermissions, value: boolean) => {
    setStudentPermissions(prev => ({ ...prev, [key]: value }));
  };

  const savePermissions = () => {
    localStorage.setItem("adminPermissions", JSON.stringify(adminPermissions));
    localStorage.setItem("teacherPermissions", JSON.stringify(teacherPermissions));
    localStorage.setItem("studentPermissions", JSON.stringify(studentPermissions));
    console.log("Permissions saved successfully");
  };

  const hasPermission = (role: string, permission: string): boolean => {
    if (role === "superadmin") return true; // Superadmin has all permissions
    
    if (role === "admin") {
      return adminPermissions[permission as keyof AdminPermissions] ?? false;
    }
    
    if (role === "teacher") {
      return teacherPermissions[permission as keyof TeacherPermissions] ?? false;
    }
    
    if (role === "student") {
      return studentPermissions[permission as keyof StudentPermissions] ?? false;
    }
    
    return false;
  };

  return (
    <PermissionContext.Provider
      value={{
        adminPermissions,
        teacherPermissions,
        studentPermissions,
        updateAdminPermission,
        updateTeacherPermission,
        updateStudentPermission,
        savePermissions,
        hasPermission,
      }}
    >
      {children}
    </PermissionContext.Provider>
  );
};
