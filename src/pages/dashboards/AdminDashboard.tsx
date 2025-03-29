
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Users, BookOpen, FileText, Clock, LightbulbIcon
} from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import { ScholarshipBadge } from "@/components/ScholarshipBadge";

// Mock data
const grades = ["All Grades", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

const studentsByGradeAndLevel = [
  { grade: "1", juniorScholar: 10, risingIntellect: 15, mastermindElite: 5 },
  { grade: "2", juniorScholar: 12, risingIntellect: 18, mastermindElite: 10 },
  { grade: "3", juniorScholar: 8, risingIntellect: 16, mastermindElite: 6 },
  { grade: "4", juniorScholar: 15, risingIntellect: 20, mastermindElite: 5 },
  { grade: "5", juniorScholar: 11, risingIntellect: 14, mastermindElite: 5 },
  { grade: "6", juniorScholar: 13, risingIntellect: 17, mastermindElite: 5 },
  { grade: "7", juniorScholar: 9, risingIntellect: 19, mastermindElite: 12 },
  { grade: "8", juniorScholar: 7, risingIntellect: 13, mastermindElite: 9 },
  { grade: "9", juniorScholar: 14, risingIntellect: 16, mastermindElite: 7 },
  { grade: "10", juniorScholar: 11, risingIntellect: 15, mastermindElite: 10 },
  { grade: "11", juniorScholar: 10, risingIntellect: 18, mastermindElite: 8 },
  { grade: "12", juniorScholar: 12, risingIntellect: 14, mastermindElite: 6 },
];

export default function AdminDashboard() {
  const { user } = useAuth();
  const [selectedGrade, setSelectedGrade] = useState<string>("All Grades");
  
  const totalUsers = 548;
  const totalCourses = 48;
  const totalStudyMaterials = 324;
  const pendingApprovals = 12;
  
  // Calculate totals from mock data
  const totalJuniorScholars = studentsByGradeAndLevel.reduce((sum, item) => sum + item.juniorScholar, 0);
  const totalRisingIntellects = studentsByGradeAndLevel.reduce((sum, item) => sum + item.risingIntellect, 0);
  const totalMastermindElites = studentsByGradeAndLevel.reduce((sum, item) => sum + item.mastermindElite, 0);
  
  // Filter data based on selected grade
  const filteredData = selectedGrade === "All Grades" 
    ? studentsByGradeAndLevel 
    : studentsByGradeAndLevel.filter(item => item.grade === selectedGrade);
  
  return (
    <DashboardLayout 
      role="admin" 
      title="Admin Dashboard"
      subtitle={`Welcome back, ${user?.name}`}
    >
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Users"
            value={totalUsers}
            icon={<Users className="h-6 w-6 text-primary" />}
            description="25 active now"
            change="+12%"
          />
          <StatCard
            title="Total Courses"
            value={totalCourses}
            icon={<BookOpen className="h-6 w-6 text-primary" />}
            description="Across all departments"
            change="+5%"
          />
          <StatCard
            title="Study Materials"
            value={totalStudyMaterials}
            icon={<FileText className="h-6 w-6 text-primary" />}
            description="Published materials"
            change="+8%"
          />
          <StatCard
            title="Pending Approvals"
            value={pendingApprovals}
            icon={<Clock className="h-6 w-6 text-primary" />}
            description="Awaiting your review"
            change="-3%"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Student Classification by Grade</CardTitle>
            <Select
              value={selectedGrade}
              onValueChange={setSelectedGrade}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Grade" />
              </SelectTrigger>
              <SelectContent>
                {grades.map((grade) => (
                  <SelectItem key={grade} value={grade}>
                    {grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Distribution across performance levels</p>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={filteredData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="grade" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="juniorScholar" stackId="a" fill="#F97316" name="Junior Scholar" />
                  <Bar dataKey="risingIntellect" stackId="a" fill="#F59E0B" name="Rising Intellect" />
                  <Bar dataKey="mastermindElite" stackId="a" fill="#10B981" name="Mastermind Elite" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Student Classification</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-6">Classify your students across levels</p>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <LightbulbIcon className="h-6 w-6 text-scholar-junior" />
                  <div className="font-medium">Junior Scholars</div>
                </div>
                <div className="font-bold">{totalJuniorScholars} students</div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <LightbulbIcon className="h-6 w-6 text-scholar-rising" />
                  <div className="font-medium">Rising Intellects</div>
                </div>
                <div className="font-bold">{totalRisingIntellects} students</div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <LightbulbIcon className="h-6 w-6 text-scholar-elite" />
                  <div className="font-medium">Mastermind Elite</div>
                </div>
                <div className="font-bold">{totalMastermindElites} students</div>
              </div>
            </div>
            
            <Button className="w-full mt-8">Manage Classification</Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-start justify-between border-b pb-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      {i % 3 === 0 ? (
                        <Users className="h-4 w-4 text-primary" />
                      ) : i % 3 === 1 ? (
                        <FileText className="h-4 w-4 text-primary" />
                      ) : (
                        <BookOpen className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">
                        {i % 3 === 0
                          ? "New teacher added"
                          : i % 3 === 1
                          ? "Study material approved"
                          : "New course created"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {i % 3 === 0
                          ? "Physics department"
                          : i % 3 === 1
                          ? "Mathematics for Grade 10"
                          : "Advanced Biology for Grade 12"}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">2 hours ago</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
