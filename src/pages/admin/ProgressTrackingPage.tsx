
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronRight, Filter, Search } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

// Sample data for charts
const performanceData = [
  {
    name: "Jan",
    mathematics: 78,
    science: 65,
    english: 82,
    history: 70,
  },
  {
    name: "Feb",
    mathematics: 80,
    science: 68,
    english: 80,
    history: 72,
  },
  {
    name: "Mar",
    mathematics: 83,
    science: 72,
    english: 81,
    history: 75,
  },
  {
    name: "Apr",
    mathematics: 85,
    science: 76,
    english: 83,
    history: 78,
  },
  {
    name: "May",
    mathematics: 88,
    science: 80,
    english: 85,
    history: 80,
  },
  {
    name: "Jun",
    mathematics: 90,
    science: 85,
    english: 88,
    history: 83,
  },
];

// Sample attendance data
const attendanceData = [
  {
    name: "Jan",
    present: 90,
    absent: 10,
  },
  {
    name: "Feb",
    present: 88,
    absent: 12,
  },
  {
    name: "Mar",
    present: 92,
    absent: 8,
  },
  {
    name: "Apr",
    present: 94,
    absent: 6,
  },
  {
    name: "May",
    present: 91,
    absent: 9,
  },
  {
    name: "Jun",
    present: 93,
    absent: 7,
  },
];

// Sample student data
const studentData = [
  {
    id: 1,
    name: "Alex Johnson",
    class: "10",
    section: "A",
    overallScore: 87,
    attendance: 94,
    tasksCompleted: 25,
    tasksTotal: 30,
    scholarLevel: "Rising Intellect",
  },
  {
    id: 2,
    name: "Maria Rodriguez",
    class: "10",
    section: "A",
    overallScore: 92,
    attendance: 98,
    tasksCompleted: 28,
    tasksTotal: 30,
    scholarLevel: "Mastermind Elite",
  },
  {
    id: 3,
    name: "Jason Smith",
    class: "10",
    section: "A",
    overallScore: 75,
    attendance: 88,
    tasksCompleted: 22,
    tasksTotal: 30,
    scholarLevel: "Junior Scholar",
  },
  {
    id: 4,
    name: "Priya Patel",
    class: "10",
    section: "A",
    overallScore: 95,
    attendance: 99,
    tasksCompleted: 30,
    tasksTotal: 30,
    scholarLevel: "Mastermind Elite",
  },
  {
    id: 5,
    name: "David Lee",
    class: "10",
    section: "B",
    overallScore: 88,
    attendance: 92,
    tasksCompleted: 26,
    tasksTotal: 30,
    scholarLevel: "Rising Intellect",
  },
  {
    id: 6,
    name: "Sophia Chen",
    class: "10",
    section: "B",
    overallScore: 83,
    attendance: 90,
    tasksCompleted: 24,
    tasksTotal: 30,
    scholarLevel: "Rising Intellect",
  },
];

export default function ProgressTrackingPage() {
  const [selectedClass, setSelectedClass] = useState("10");
  const [selectedSection, setSelectedSection] = useState("A");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter students based on selected class, section, and search term
  const filteredStudents = studentData.filter(
    (student) =>
      student.class === selectedClass &&
      student.section === selectedSection &&
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate counts for each scholar level
  const scholarLevelCounts = {
    juniorScholar: filteredStudents.filter(
      (s) => s.scholarLevel === "Junior Scholar"
    ).length,
    risingIntellect: filteredStudents.filter(
      (s) => s.scholarLevel === "Rising Intellect"
    ).length,
    mastermindElite: filteredStudents.filter(
      (s) => s.scholarLevel === "Mastermind Elite"
    ).length,
  };

  // Get badge color based on scholar level
  const getScholarLevelColor = (level) => {
    switch (level) {
      case "Junior Scholar":
        return "bg-blue-100 text-blue-800";
      case "Rising Intellect":
        return "bg-purple-100 text-purple-800";
      case "Mastermind Elite":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get badge variant based on completion percentage
  const getTaskCompletionVariant = (completed, total) => {
    const percentage = (completed / total) * 100;
    if (percentage >= 90) return "default";
    if (percentage >= 70) return "secondary";
    return "destructive";
  };

  return (
    <DashboardLayout
      role="admin"
      title="Progress Tracking"
      subtitle="Track and analyze student progress across classes"
    >
      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Select
              value={selectedClass}
              onValueChange={setSelectedClass}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Class" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((classNum) => (
                  <SelectItem key={classNum} value={classNum.toString()}>
                    Class {classNum}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedSection}
              onValueChange={setSelectedSection}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">Section A</SelectItem>
                <SelectItem value="B">Section B</SelectItem>
                <SelectItem value="C">Section C</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search students..."
                className="pl-8 w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-4">
            <Button variant="outline">Export Report</Button>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <Card>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Junior Scholar
                </p>
                <p className="text-2xl font-bold">{scholarLevelCounts.juniorScholar}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Rising Intellect
                </p>
                <p className="text-2xl font-bold">{scholarLevelCounts.risingIntellect}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Mastermind Elite
                </p>
                <p className="text-2xl font-bold">{scholarLevelCounts.mastermindElite}</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <div className="w-4 h-4 bg-amber-500 rounded-full"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Overview - Class {selectedClass}{selectedSection}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="academic">
              <TabsList className="mb-4">
                <TabsTrigger value="academic">Academic Performance</TabsTrigger>
                <TabsTrigger value="attendance">Attendance</TabsTrigger>
              </TabsList>

              <TabsContent value="academic">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={performanceData}
                      margin={{
                        top: 5,
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
                      <Line
                        type="monotone"
                        dataKey="mathematics"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                      <Line type="monotone" dataKey="science" stroke="#82ca9d" />
                      <Line type="monotone" dataKey="english" stroke="#ffc658" />
                      <Line type="monotone" dataKey="history" stroke="#ff8042" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="attendance">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={attendanceData}
                      margin={{
                        top: 5,
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
                      <Bar dataKey="present" fill="#82ca9d" name="Present %" />
                      <Bar dataKey="absent" fill="#ff8042" name="Absent %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Students Progress - Class {selectedClass}{selectedSection}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Student Name</th>
                    <th className="text-left p-3 font-medium">Overall Score</th>
                    <th className="text-left p-3 font-medium">Attendance</th>
                    <th className="text-left p-3 font-medium">Tasks Completed</th>
                    <th className="text-left p-3 font-medium">Scholar Level</th>
                    <th className="text-right p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="border-b hover:bg-muted/30">
                      <td className="p-3 font-medium">{student.name}</td>
                      <td className="p-3">{student.overallScore}%</td>
                      <td className="p-3">{student.attendance}%</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={getTaskCompletionVariant(
                              student.tasksCompleted,
                              student.tasksTotal
                            )}
                          >
                            {student.tasksCompleted}/{student.tasksTotal}
                          </Badge>
                          {student.tasksCompleted === student.tasksTotal && (
                            <Check className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                      </td>
                      <td className="p-3">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs ${getScholarLevelColor(
                            student.scholarLevel
                          )}`}
                        >
                          {student.scholarLevel}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <Button variant="ghost" size="sm">
                          View Details <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
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
