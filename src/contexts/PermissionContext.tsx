
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

interface InstitutionPermissions {
  [institute: string]: {
    adminPermissions: AdminPermissions;
    teacherPermissions: TeacherPermissions;
    studentPermissions: StudentPermissions;
  }
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
  selectedInstitute: string;
  setSelectedInstitute: (institute: string) => void;
  allInstitutions: string[];
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

// Default institutions
const defaultInstitutions = ["City School", "Valley Academy", "Tech Institute", "Global Academy"];

const PermissionContext = createContext<PermissionContextType>({
  adminPermissions: defaultAdminPermissions,
  teacherPermissions: defaultTeacherPermissions,
  studentPermissions: defaultStudentPermissions,
  updateAdminPermission: () => {},
  updateTeacherPermission: () => {},
  updateStudentPermission: () => {},
  savePermissions: () => {},
  hasPermission: () => true,
  selectedInstitute: "City School",
  setSelectedInstitute: () => {},
  allInstitutions: defaultInstitutions,
});

export const usePermissions = () => useContext(PermissionContext);

export const PermissionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedInstitute, setSelectedInstitute] = useState<string>("City School");
  const [institutionPermissions, setInstitutionPermissions] = useState<InstitutionPermissions>({});
  const { user } = useAuth();

  // Initialize all institutions with default permissions if not already in localStorage
  useEffect(() => {
    const savedPermissions = localStorage.getItem("institutionPermissions");
    
    if (savedPermissions) {
      setInstitutionPermissions(JSON.parse(savedPermissions));
    } else {
      // Initialize with default permissions for all institutions
      const initialPermissions: InstitutionPermissions = {};
      
      defaultInstitutions.forEach(institute => {
        initialPermissions[institute] = {
          adminPermissions: { ...defaultAdminPermissions },
          teacherPermissions: { ...defaultTeacherPermissions },
          studentPermissions: { ...defaultStudentPermissions }
        };
      });
      
      setInstitutionPermissions(initialPermissions);
      localStorage.setItem("institutionPermissions", JSON.stringify(initialPermissions));
    }
    
    // If user is logged in and has an institute, select that institute
    if (user?.institute && defaultInstitutions.includes(user.institute)) {
      setSelectedInstitute(user.institute);
    }
  }, [user?.institute]);

  // Get current institute permissions or default if not set
  const currentInstitutePermissions = institutionPermissions[selectedInstitute] || {
    adminPermissions: defaultAdminPermissions,
    teacherPermissions: defaultTeacherPermissions,
    studentPermissions: defaultStudentPermissions
  };

  const updateAdminPermission = (key: keyof AdminPermissions, value: boolean) => {
    setInstitutionPermissions(prev => {
      const updated = { ...prev };
      if (!updated[selectedInstitute]) {
        updated[selectedInstitute] = {
          adminPermissions: { ...defaultAdminPermissions },
          teacherPermissions: { ...defaultTeacherPermissions },
          studentPermissions: { ...defaultStudentPermissions }
        };
      }
      updated[selectedInstitute].adminPermissions = {
        ...updated[selectedInstitute].adminPermissions,
        [key]: value
      };
      return updated;
    });
  };

  const updateTeacherPermission = (key: keyof TeacherPermissions, value: boolean) => {
    setInstitutionPermissions(prev => {
      const updated = { ...prev };
      if (!updated[selectedInstitute]) {
        updated[selectedInstitute] = {
          adminPermissions: { ...defaultAdminPermissions },
          teacherPermissions: { ...defaultTeacherPermissions },
          studentPermissions: { ...defaultStudentPermissions }
        };
      }
      updated[selectedInstitute].teacherPermissions = {
        ...updated[selectedInstitute].teacherPermissions,
        [key]: value
      };
      return updated;
    });
  };

  const updateStudentPermission = (key: keyof StudentPermissions, value: boolean) => {
    setInstitutionPermissions(prev => {
      const updated = { ...prev };
      if (!updated[selectedInstitute]) {
        updated[selectedInstitute] = {
          adminPermissions: { ...defaultAdminPermissions },
          teacherPermissions: { ...defaultTeacherPermissions },
          studentPermissions: { ...defaultStudentPermissions }
        };
      }
      updated[selectedInstitute].studentPermissions = {
        ...updated[selectedInstitute].studentPermissions,
        [key]: value
      };
      return updated;
    });
  };

  const savePermissions = () => {
    localStorage.setItem("institutionPermissions", JSON.stringify(institutionPermissions));
    console.log("Permissions saved successfully for all institutions");
  };

  const hasPermission = (role: string, permission: string): boolean => {
    if (role === "superadmin") return true; // Superadmin has all permissions
    
    // If user is not superadmin, check their specific institution permissions
    const userInstitute = user?.institute || selectedInstitute;
    const institutePermissions = institutionPermissions[userInstitute];
    
    if (!institutePermissions) {
      return false; // No permissions defined for this institution
    }
    
    if (role === "admin") {
      return institutePermissions.adminPermissions[permission as keyof AdminPermissions] ?? false;
    }
    
    if (role === "teacher") {
      return institutePermissions.teacherPermissions[permission as keyof TeacherPermissions] ?? false;
    }
    
    if (role === "student") {
      return institutePermissions.studentPermissions[permission as keyof StudentPermissions] ?? false;
    }
    
    return false;
  };

  return (
    <PermissionContext.Provider
      value={{
        adminPermissions: currentInstitutePermissions.adminPermissions,
        teacherPermissions: currentInstitutePermissions.teacherPermissions,
        studentPermissions: currentInstitutePermissions.studentPermissions,
        updateAdminPermission,
        updateTeacherPermission,
        updateStudentPermission,
        savePermissions,
        hasPermission,
        selectedInstitute,
        setSelectedInstitute,
        allInstitutions: defaultInstitutions,
      }}
    >
      {children}
    </PermissionContext.Provider>
  );
};
