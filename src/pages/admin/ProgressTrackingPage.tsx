
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Badge } from "@/components/ui/badge";

export default function ProgressTrackingPage() {
  const [selectedClass, setSelectedClass] = useState("10");
  const [selectedSection, setSelectedSection] = useState("A");

  // Sample data
  const performanceData = [
    { subject: "Mathematics", excellent: 12, good: 8, average: 5, poor: 2 },
    { subject: "Science", excellent: 10, good: 10, average: 6, poor: 1 },
    { subject: "English", excellent: 8, good: 12, average: 7, poor: 0 },
    { subject: "History", excellent: 7, good: 11, average: 8, poor: 1 },
    { subject: "Geography", excellent: 9, good: 10, average: 6, poor: 2 },
  ];

  const completionRateData = [
    { name: "Completed", value: 75 },
    { name: "In Progress", value: 20 },
    { name: "Not Started", value: 5 },
  ];

  const COLORS = ["#22c55e", "#3b82f6", "#ef4444"];

  return (
    <DashboardLayout 
      role="admin" 
      title="Progress Tracking"
      subtitle="Track student progress and academic performance"
    >
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select class" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((classNum) => (
              <SelectItem key={classNum} value={classNum.toString()}>
                Class {classNum}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={selectedSection} onValueChange={setSelectedSection}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select section" />
          </SelectTrigger>
          <SelectContent>
            {["A", "B", "C"].map((section) => (
              <SelectItem key={section} value={section}>
                Section {section}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Overall Completion Rate</p>
              <p className="text-4xl font-bold text-green-600">75%</p>
              <p className="text-xs text-muted-foreground mt-1">+5% from last month</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Average Performance</p>
              <p className="text-4xl font-bold text-blue-600">B+</p>
              <p className="text-xs text-muted-foreground mt-1">Improved from B</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Student Classification</p>
              <div className="flex justify-center gap-2 mt-2">
                <Badge variant="outline" className="bg-green-50">
                  15 Elite
                </Badge>
                <Badge variant="outline" className="bg-blue-50">
                  10 Rising
                </Badge>
                <Badge variant="outline" className="bg-orange-50">
                  8 Junior
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Subject Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
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
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="excellent" stackId="a" fill="#22c55e" />
                <Bar dataKey="good" stackId="a" fill="#3b82f6" />
                <Bar dataKey="average" stackId="a" fill="#f59e0b" />
                <Bar dataKey="poor" stackId="a" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Course Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={completionRateData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {completionRateData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Student Progress Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="topPerformers">
            <TabsList className="mb-6">
              <TabsTrigger value="topPerformers">Top Performers</TabsTrigger>
              <TabsTrigger value="needsImprovement">Needs Improvement</TabsTrigger>
              <TabsTrigger value="mostImproved">Most Improved</TabsTrigger>
            </TabsList>
            
            <TabsContent value="topPerformers">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Name</th>
                      <th className="text-left p-3 font-medium">Roll No.</th>
                      <th className="text-left p-3 font-medium">Classification</th>
                      <th className="text-left p-3 font-medium">Average Grade</th>
                      <th className="text-left p-3 font-medium">Completion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 1, name: "Alice Johnson", rollNo: "10A01", classification: "Mastermind Elite", grade: "A+", completion: 98 },
                      { id: 2, name: "Bob Smith", rollNo: "10A05", classification: "Mastermind Elite", grade: "A", completion: 95 },
                      { id: 3, name: "Charlie Davis", rollNo: "10A12", classification: "Rising Intellect", grade: "A", completion: 90 },
                      { id: 4, name: "Diana Miller", rollNo: "10A08", classification: "Mastermind Elite", grade: "A+", completion: 97 },
                      { id: 5, name: "Ethan Wilson", rollNo: "10A15", classification: "Rising Intellect", grade: "A-", completion: 92 },
                    ].map((student) => (
                      <tr key={student.id} className="border-b hover:bg-muted/30">
                        <td className="p-3">{student.name}</td>
                        <td className="p-3">{student.rollNo}</td>
                        <td className="p-3">
                          <Badge variant={
                            student.classification === "Mastermind Elite" 
                              ? "default" 
                              : "secondary"
                          }>
                            {student.classification}
                          </Badge>
                        </td>
                        <td className="p-3">{student.grade}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className="bg-gray-200 h-2 rounded-full w-24">
                              <div 
                                className="h-full rounded-full bg-green-500"
                                style={{ width: `${student.completion}%` }}
                              ></div>
                            </div>
                            <span className="text-xs">{student.completion}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="needsImprovement">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Name</th>
                      <th className="text-left p-3 font-medium">Roll No.</th>
                      <th className="text-left p-3 font-medium">Classification</th>
                      <th className="text-left p-3 font-medium">Average Grade</th>
                      <th className="text-left p-3 font-medium">Completion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 6, name: "Fiona Roberts", rollNo: "10A24", classification: "Junior Scholar", grade: "C", completion: 65 },
                      { id: 7, name: "George Thompson", rollNo: "10A18", classification: "Junior Scholar", grade: "C+", completion: 68 },
                      { id: 8, name: "Hannah Martin", rollNo: "10A22", classification: "Junior Scholar", grade: "C", completion: 62 },
                    ].map((student) => (
                      <tr key={student.id} className="border-b hover:bg-muted/30">
                        <td className="p-3">{student.name}</td>
                        <td className="p-3">{student.rollNo}</td>
                        <td className="p-3">
                          <Badge variant="outline">
                            {student.classification}
                          </Badge>
                        </td>
                        <td className="p-3">{student.grade}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className="bg-gray-200 h-2 rounded-full w-24">
                              <div 
                                className="h-full rounded-full bg-orange-500"
                                style={{ width: `${student.completion}%` }}
                              ></div>
                            </div>
                            <span className="text-xs">{student.completion}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="mostImproved">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Name</th>
                      <th className="text-left p-3 font-medium">Roll No.</th>
                      <th className="text-left p-3 font-medium">Classification</th>
                      <th className="text-left p-3 font-medium">Current Grade</th>
                      <th className="text-left p-3 font-medium">Improvement</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 9, name: "Ian Baker", rollNo: "10A14", classification: "Rising Intellect", grade: "B+", improvement: "+2 grades" },
                      { id: 10, name: "Jessica Clark", rollNo: "10A09", classification: "Rising Intellect", grade: "B", improvement: "+1.5 grades" },
                      { id: 11, name: "Kevin Adams", rollNo: "10A17", classification: "Junior Scholar", grade: "B-", improvement: "+1.5 grades" },
                    ].map((student) => (
                      <tr key={student.id} className="border-b hover:bg-muted/30">
                        <td className="p-3">{student.name}</td>
                        <td className="p-3">{student.rollNo}</td>
                        <td className="p-3">
                          <Badge variant={
                            student.classification === "Rising Intellect" 
                              ? "secondary" 
                              : "outline"
                          }>
                            {student.classification}
                          </Badge>
                        </td>
                        <td className="p-3">{student.grade}</td>
                        <td className="p-3">
                          <Badge variant="success">
                            {student.improvement}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
