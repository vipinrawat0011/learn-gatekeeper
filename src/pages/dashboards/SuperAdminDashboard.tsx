
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, School, GraduationCap, BarChart4, LucideIcon
} from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

// Mock data
const institutionData = [
  { id: "1", name: "City School", admins: 2, teachers: 15, students: 150 },
  { id: "2", name: "Valley Academy", admins: 1, teachers: 10, students: 120 },
  { id: "3", name: "Tech Institute", admins: 2, teachers: 20, students: 180 },
];

const userDistributionData = [
  { name: "Students", value: 450 },
  { name: "Teachers", value: 45 },
  { name: "Admins", value: 5 },
];

const featureAccessData = [
  { name: "Dashboard", students: 450, teachers: 45, admins: 5 },
  { name: "Courses", students: 450, teachers: 45, admins: 5 },
  { name: "Tests", students: 450, teachers: 35, admins: 4 },
  { name: "AI Learning", students: 300, teachers: 30, admins: 3 },
];

const COLORS = ["#10B981", "#3B82F6", "#8B5CF6"];

export default function SuperAdminDashboard() {
  const [selectedInstitute, setSelectedInstitute] = useState<string>("all");
  
  // Filter data based on selected institution
  const filteredData = selectedInstitute === "all" 
    ? institutionData 
    : institutionData.filter(inst => inst.id === selectedInstitute);
  
  const totalAdmins = filteredData.reduce((sum, inst) => sum + inst.admins, 0);
  const totalTeachers = filteredData.reduce((sum, inst) => sum + inst.teachers, 0);
  const totalStudents = filteredData.reduce((sum, inst) => sum + inst.students, 0);
  const totalRoleChanges = 47; // Mock data
  
  return (
    <DashboardLayout 
      role="superadmin" 
      title="Superadmin Control Panel"
    >
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Overview</h2>
          <Select
            value={selectedInstitute}
            onValueChange={setSelectedInstitute}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Institute" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Institutes</SelectItem>
              {institutionData.map((inst) => (
                <SelectItem key={inst.id} value={inst.id}>
                  {inst.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Students"
            value={totalStudents}
            icon={<GraduationCap className="h-6 w-6 text-primary" />}
          />
          <StatCard
            title="Total Teachers"
            value={totalTeachers}
            icon={<GraduationCap className="h-6 w-6 text-primary" />}
          />
          <StatCard
            title="Total Admins"
            value={totalAdmins}
            icon={<Users className="h-6 w-6 text-primary" />}
          />
          <StatCard
            title="Role Changes"
            value={totalRoleChanges}
            icon={<Users className="h-6 w-6 text-primary" />}
            change="+12% this week"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {userDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Feature Access Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={featureAccessData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="students" fill="#10B981" name="Students" />
                <Bar dataKey="teachers" fill="#3B82F6" name="Teachers" />
                <Bar dataKey="admins" fill="#8B5CF6" name="Admins" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Institutions Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Institution Name</th>
                    <th className="text-center p-3">Admins</th>
                    <th className="text-center p-3">Teachers</th>
                    <th className="text-center p-3">Students</th>
                    <th className="text-center p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((inst) => (
                    <tr key={inst.id} className="border-b hover:bg-muted/30">
                      <td className="p-3">{inst.name}</td>
                      <td className="text-center p-3">{inst.admins}</td>
                      <td className="text-center p-3">{inst.teachers}</td>
                      <td className="text-center p-3">{inst.students}</td>
                      <td className="text-center p-3">
                        <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
