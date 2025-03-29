
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

// Mock users for demonstration
const mockUsers = [
  {
    id: "1",
    name: "Super Admin",
    email: "superadmin@example.com",
    password: "password",
    role: "superadmin" as UserRole,
  },
  {
    id: "2",
    name: "City School Admin",
    email: "admin@cityschool.com",
    password: "password",
    role: "admin" as UserRole,
    institute: "City School",
  },
  {
    id: "3",
    name: "Jane Smith",
    email: "teacher@example.com",
    password: "password",
    role: "teacher" as UserRole,
    institute: "City School",
    subject: "Physics",
  },
  {
    id: "4",
    name: "John Student",
    email: "student@example.com",
    password: "password",
    role: "student" as UserRole,
    institute: "City School",
    class: "10",
    section: "A",
    scholarType: "Junior Scholar" as "Junior Scholar" | "Rising Intellect" | "Mastermind Elite",
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
      console.log("Login successful for user:", foundUser.email, "with role:", foundUser.role);
      
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
