
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Shield, School, Users, BookOpen, GraduationCap, Save } from "lucide-react";

export default function PermissionManagementPage() {
  const [selectedAdmin, setSelectedAdmin] = useState("city-school");
  
  // Mock data for admin institutions
  const admins = [
    { id: "city-school", name: "City School" },
    { id: "valley-academy", name: "Valley Academy" },
    { id: "tech-institute", name: "Tech Institute" },
    { id: "global-academy", name: "Global Academy" },
  ];
  
  // Mock permissions data
  const adminPermissions = [
    { id: 1, module: "Dashboard", feature: "Analytics View", enabled: true },
    { id: 2, module: "Dashboard", feature: "Performance Metrics", enabled: true },
    { id: 3, module: "User Management", feature: "Create Teachers", enabled: true },
    { id: 4, module: "User Management", feature: "Create Students", enabled: true },
    { id: 5, module: "User Management", feature: "Delete Users", enabled: true },
    { id: 6, module: "Courses", feature: "Create Courses", enabled: true },
    { id: 7, module: "Courses", feature: "Manage Course Content", enabled: true },
    { id: 8, module: "Approval", feature: "Approve Study Materials", enabled: true },
    { id: 9, module: "Student Management", feature: "View Student Classifications", enabled: true },
    { id: 10, module: "Progress Tracking", feature: "View Progress Reports", enabled: true },
  ];
  
  const teacherPermissions = [
    { id: 1, module: "Dashboard", feature: "Analytics View", enabled: true },
    { id: 2, module: "Student Performance", feature: "View Performance", enabled: true },
    { id: 3, module: "Student Performance", feature: "Filter by Class/Section", enabled: true },
    { id: 4, module: "Study Material", feature: "Add Study Material", enabled: true },
    { id: 5, module: "Study Material", feature: "Edit Study Material", enabled: true },
    { id: 6, module: "Assessments", feature: "Create Assessments", enabled: true },
    { id: 7, module: "Assessments", feature: "View Student Results", enabled: true },
    { id: 8, module: "Marks", feature: "Add/Edit Marks", enabled: true },
    { id: 9, module: "Profile", feature: "Edit Profile", enabled: true },
  ];
  
  const studentPermissions = [
    { id: 1, module: "Dashboard", feature: "View Progress", enabled: true },
    { id: 2, module: "Dashboard", feature: "View Classification", enabled: true },
    { id: 3, module: "Courses", feature: "Access Course Content", enabled: true },
    { id: 4, module: "Examination", feature: "Take Assessments", enabled: true },
    { id: 5, module: "Marks", feature: "View Marks", enabled: true },
    { id: 6, module: "Study Material", feature: "Access Study Material", enabled: true },
    { id: 7, module: "AI Learning Assistant", feature: "Use AI Assistant", enabled: true },
  ];
  
  const [adminPerms, setAdminPerms] = useState(adminPermissions);
  const [teacherPerms, setTeacherPerms] = useState(teacherPermissions);
  const [studentPerms, setStudentPerms] = useState(studentPermissions);
  
  // Toggle permission handler
  const toggleAdminPermission = (id) => {
    setAdminPerms(adminPerms.map(p => 
      p.id === id ? { ...p, enabled: !p.enabled } : p
    ));
  };
  
  const toggleTeacherPermission = (id) => {
    setTeacherPerms(teacherPerms.map(p => 
      p.id === id ? { ...p, enabled: !p.enabled } : p
    ));
  };
  
  const toggleStudentPermission = (id) => {
    setStudentPerms(studentPerms.map(p => 
      p.id === id ? { ...p, enabled: !p.enabled } : p
    ));
  };
  
  const savePermissions = () => {
    // In a real application, this would save to backend
    console.log("Saving permissions for:", selectedAdmin);
    console.log("Admin permissions:", adminPerms);
    console.log("Teacher permissions:", teacherPerms);
    console.log("Student permissions:", studentPerms);
  };

  return (
    <DashboardLayout 
      role="superadmin" 
      title="Permission Management"
      subtitle="Manage feature access for admins, teachers, and students"
    >
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Select value={selectedAdmin} onValueChange={setSelectedAdmin}>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Select an institution" />
              </SelectTrigger>
              <SelectContent>
                {admins.map(admin => (
                  <SelectItem key={admin.id} value={admin.id}>
                    <div className="flex items-center">
                      <School className="h-4 w-4 mr-2" />
                      {admin.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button onClick={savePermissions}>
            <Save className="h-4 w-4 mr-2" /> Save Changes
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <School className="h-5 w-5 mr-2" />
            Permission Settings for {admins.find(a => a.id === selectedAdmin)?.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="admin">
            <TabsList className="mb-4">
              <TabsTrigger value="admin" className="flex items-center">
                <Shield className="h-4 w-4 mr-2" /> Admin
              </TabsTrigger>
              <TabsTrigger value="teacher" className="flex items-center">
                <BookOpen className="h-4 w-4 mr-2" /> Teachers
              </TabsTrigger>
              <TabsTrigger value="student" className="flex items-center">
                <GraduationCap className="h-4 w-4 mr-2" /> Students
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="admin">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Module</TableHead>
                    <TableHead className="w-[350px]">Feature</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {adminPerms.map(permission => (
                    <TableRow key={permission.id}>
                      <TableCell className="font-medium">{permission.module}</TableCell>
                      <TableCell>{permission.feature}</TableCell>
                      <TableCell className="text-center">
                        <Switch 
                          checked={permission.enabled} 
                          onCheckedChange={() => toggleAdminPermission(permission.id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="teacher">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Module</TableHead>
                    <TableHead className="w-[350px]">Feature</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teacherPerms.map(permission => (
                    <TableRow key={permission.id}>
                      <TableCell className="font-medium">{permission.module}</TableCell>
                      <TableCell>{permission.feature}</TableCell>
                      <TableCell className="text-center">
                        <Switch 
                          checked={permission.enabled} 
                          onCheckedChange={() => toggleTeacherPermission(permission.id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="student">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Module</TableHead>
                    <TableHead className="w-[350px]">Feature</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentPerms.map(permission => (
                    <TableRow key={permission.id}>
                      <TableCell className="font-medium">{permission.module}</TableCell>
                      <TableCell>{permission.feature}</TableCell>
                      <TableCell className="text-center">
                        <Switch 
                          checked={permission.enabled} 
                          onCheckedChange={() => toggleStudentPermission(permission.id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
