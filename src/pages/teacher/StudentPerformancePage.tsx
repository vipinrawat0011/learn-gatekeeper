import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { ScholarshipBadge } from "@/components/ScholarshipBadge";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, CartesianGrid } from "recharts";

export default function StudentPerformancePage() {
  const [selectedClass, setSelectedClass] = useState("10");
  const [selectedSection, setSelectedSection] = useState("A");
  
  // Mock data
  const classOptions = ["7", "8", "9", "10", "11", "12"];
  const sectionOptions = ["A", "B", "C"];
  
  const students = [
    { id: 1, name: "Alex Johnson", scholarLevel: "Junior Scholar", attendance: 92, assignments: 85, tests: 78 },
    { id: 2, name: "Sarah Davis", scholarLevel: "Rising Intellect", attendance: 95, assignments: 88, tests: 84 },
    { id: 3, name: "Michael Brown", scholarLevel: "Mastermind Elite", attendance: 98, assignments: 94, tests: 92 },
    { id: 4, name: "Emma Wilson", scholarLevel: "Junior Scholar", attendance: 90, assignments: 82, tests: 75 },
    { id: 5, name: "James Taylor", scholarLevel: "Rising Intellect", attendance: 94, assignments: 89, tests: 86 },
  ];
  
  const performanceData = [
    { name: "Quiz 1", juniorAvg: 65, risingAvg: 75, eliteAvg: 90 },
    { name: "Quiz 2", juniorAvg: 68, risingAvg: 78, eliteAvg: 92 },
    { name: "Mid-term", juniorAvg: 70, risingAvg: 82, eliteAvg: 95 },
    { name: "Quiz 3", juniorAvg: 72, risingAvg: 80, eliteAvg: 91 },
    { name: "Final Exam", juniorAvg: 75, risingAvg: 85, eliteAvg: 94 },
  ];
  
  const studentProgress = [
    { name: "Week 1", Alex: 40, Sarah: 50, Michael: 60, Emma: 35, James: 45 },
    { name: "Week 2", Alex: 43, Sarah: 55, Michael: 65, Emma: 40, James: 50 },
    { name: "Week 3", Alex: 48, Sarah: 60, Michael: 72, Emma: 46, James: 58 },
    { name: "Week 4", Alex: 52, Sarah: 65, Michael: 78, Emma: 50, James: 62 },
    { name: "Week 5", Alex: 55, Sarah: 70, Michael: 85, Emma: 55, James: 68 },
    { name: "Week 6", Alex: 60, Sarah: 75, Michael: 88, Emma: 62, James: 74 },
  ];
  
  return (
    <DashboardLayout 
      role="teacher" 
      title="Student Performance"
      subtitle="Track and analyze student progress in your classes"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Class:</span>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {classOptions.map((classOption) => (
                <SelectItem key={classOption} value={classOption}>
                  {classOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Section:</span>
          <Select value={selectedSection} onValueChange={setSelectedSection}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sectionOptions.map((sectionOption) => (
                <SelectItem key={sectionOption} value={sectionOption}>
                  {sectionOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button variant="outline">View Subject Details</Button>
      </div>
      
      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Class {selectedClass}{selectedSection} - Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={performanceData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="juniorAvg" name="Junior Scholar" fill="#F97316" />
                  <Bar dataKey="risingAvg" name="Rising Intellect" fill="#F59E0B" />
                  <Bar dataKey="eliteAvg" name="Mastermind Elite" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Student Progress Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={studentProgress}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Alex" stroke="#8884d8" />
                  <Line type="monotone" dataKey="Sarah" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="Michael" stroke="#ff7300" />
                  <Line type="monotone" dataKey="Emma" stroke="#0088fe" />
                  <Line type="monotone" dataKey="James" stroke="#00C49F" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Student List</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Students</TabsTrigger>
              <TabsTrigger value="junior">Junior Scholars</TabsTrigger>
              <TabsTrigger value="rising">Rising Intellects</TabsTrigger>
              <TabsTrigger value="elite">Mastermind Elite</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Name</th>
                      <th className="text-left p-3 font-medium">Level</th>
                      <th className="text-left p-3 font-medium">Attendance</th>
                      <th className="text-left p-3 font-medium">Assignments</th>
                      <th className="text-left p-3 font-medium">Test Scores</th>
                      <th className="text-right p-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id} className="border-b hover:bg-muted/30">
                        <td className="p-3">{student.name}</td>
                        <td className="p-3">
                          <ScholarshipBadge level={student.scholarLevel as any} />
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Progress value={student.attendance} className="h-2 w-32" />
                            <span className="text-sm">{student.attendance}%</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Progress value={student.assignments} className="h-2 w-32" />
                            <span className="text-sm">{student.assignments}%</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Progress value={student.tests} className="h-2 w-32" />
                            <span className="text-sm">{student.tests}%</span>
                          </div>
                        </td>
                        <td className="p-3 text-right">
                          <Button variant="outline" size="sm">View Details</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            {/* Other tabs would filter the student list by scholar level */}
            <TabsContent value="junior" className="mt-6">
              <div className="overflow-x-auto">
                {/* Filtered table for Junior Scholars */}
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Name</th>
                      <th className="text-left p-3 font-medium">Level</th>
                      <th className="text-left p-3 font-medium">Attendance</th>
                      <th className="text-left p-3 font-medium">Assignments</th>
                      <th className="text-left p-3 font-medium">Test Scores</th>
                      <th className="text-right p-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students
                      .filter(student => student.scholarLevel === "Junior Scholar")
                      .map((student) => (
                        <tr key={student.id} className="border-b hover:bg-muted/30">
                          <td className="p-3">{student.name}</td>
                          <td className="p-3">
                            <ScholarshipBadge level={student.scholarLevel as any} />
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <Progress value={student.attendance} className="h-2 w-32" />
                              <span className="text-sm">{student.attendance}%</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <Progress value={student.assignments} className="h-2 w-32" />
                              <span className="text-sm">{student.assignments}%</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <Progress value={student.tests} className="h-2 w-32" />
                              <span className="text-sm">{student.tests}%</span>
                            </div>
                          </td>
                          <td className="p-3 text-right">
                            <Button variant="outline" size="sm">View Details</Button>
                          </td>
                        </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            {/* Similar filtered tables for Rising Intellects and Mastermind Elite */}
          </Tabs>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
