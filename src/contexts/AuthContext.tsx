
import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "superadmin" | "admin" | "teacher" | "student";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  institute?: string;
  class?: string;
  section?: string;
  subject?: string;
  scholarType?: "Junior Scholar" | "Rising Intellect" | "Mastermind Elite";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  logout: () => {},
  isAuthenticated: false,
});

export const useAuth = () => useContext(AuthContext);

// Mock users for demonstration - expanded with multiple users per role and institution
const mockUsers = [
  // Super Admin - has access to everything
  {
    id: "1",
    name: "Super Admin",
    email: "superadmin@example.com",
    password: "password",
    role: "superadmin" as UserRole,
  },
  
  // City School Admins
  {
    id: "2",
    name: "City School Admin 1",
    email: "admin1@cityschool.com",
    password: "password",
    role: "admin" as UserRole,
    institute: "City School",
  },
  {
    id: "3",
    name: "City School Admin 2",
    email: "admin2@cityschool.com",
    password: "password",
    role: "admin" as UserRole,
    institute: "City School",
  },
  
  // Valley Academy Admins
  {
    id: "4",
    name: "Valley Academy Admin",
    email: "admin@valleyacademy.com",
    password: "password",
    role: "admin" as UserRole,
    institute: "Valley Academy",
  },
  
  // City School Teachers
  {
    id: "5",
    name: "Jane Smith - Physics",
    email: "teacher1@cityschool.com",
    password: "password",
    role: "teacher" as UserRole,
    institute: "City School",
    subject: "Physics",
  },
  {
    id: "6",
    name: "Robert Brown - Math",
    email: "teacher2@cityschool.com",
    password: "password",
    role: "teacher" as UserRole,
    institute: "City School",
    subject: "Mathematics",
  },
  
  // Valley Academy Teachers
  {
    id: "7",
    name: "Alice Johnson - Biology",
    email: "teacher1@valleyacademy.com",
    password: "password",
    role: "teacher" as UserRole,
    institute: "Valley Academy",
    subject: "Biology",
  },
  
  // City School Students
  {
    id: "8",
    name: "John Student - City School",
    email: "student1@cityschool.com",
    password: "password",
    role: "student" as UserRole,
    institute: "City School",
    class: "10",
    section: "A",
    scholarType: "Junior Scholar" as "Junior Scholar" | "Rising Intellect" | "Mastermind Elite",
  },
  {
    id: "9",
    name: "Emma Wilson - City School",
    email: "student2@cityschool.com",
    password: "password",
    role: "student" as UserRole,
    institute: "City School",
    class: "11",
    section: "B",
    scholarType: "Rising Intellect" as "Junior Scholar" | "Rising Intellect" | "Mastermind Elite",
  },
  
  // Valley Academy Students
  {
    id: "10",
    name: "Michael Davis - Valley Academy",
    email: "student1@valleyacademy.com",
    password: "password",
    role: "student" as UserRole,
    institute: "Valley Academy",
    class: "9",
    section: "A",
    scholarType: "Mastermind Elite" as "Junior Scholar" | "Rising Intellect" | "Mastermind Elite",
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is stored in local storage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    // Modified to be more flexible: if a role is provided, prioritize it but don't strictly require it
    // This allows logins to work even if the role doesn't match exactly what was provided
    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password && (role ? u.role === role : true)
    );

    if (foundUser) {
      // Log the successful login attempt for debugging
      console.log("Login successful for user:", foundUser.email, "with role:", foundUser.role, "institute:", foundUser.institute);
      
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      return true;
    }
    
    // Log the failed login attempt for debugging
    console.log("Login failed for:", email, "with requested role:", role);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
