
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
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

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

// Sample student data with more detailed information
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
    subjects: [
      { name: "Mathematics", score: 92, grade: "A" },
      { name: "Science", score: 88, grade: "A-" },
      { name: "English", score: 85, grade: "B+" },
      { name: "History", score: 83, grade: "B+" }
    ],
    recentAssessments: [
      { name: "Math Quiz 3", score: 18, total: 20, date: "2023-05-15" },
      { name: "Science Project", score: 45, total: 50, date: "2023-05-10" },
      { name: "English Essay", score: 23, total: 25, date: "2023-05-05" }
    ],
    behavior: "Very Good",
    skills: [
      { name: "Problem Solving", level: 4 },
      { name: "Communication", level: 3 },
      { name: "Teamwork", level: 4 }
    ],
    monthlyProgress: [
      { month: "Jan", score: 82 },
      { month: "Feb", score: 84 },
      { month: "Mar", score: 85 },
      { month: "Apr", score: 86 },
      { month: "May", score: 87 }
    ],
    parentInfo: {
      name: "Sarah Johnson",
      contact: "+1 555-123-4567",
      email: "sarah.johnson@example.com"
    },
    notes: "Alex shows consistent improvement and participates actively in class discussions."
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
    subjects: [
      { name: "Mathematics", score: 95, grade: "A+" },
      { name: "Science", score: 94, grade: "A" },
      { name: "English", score: 90, grade: "A" },
      { name: "History", score: 89, grade: "A-" }
    ],
    recentAssessments: [
      { name: "Math Quiz 3", score: 20, total: 20, date: "2023-05-15" },
      { name: "Science Project", score: 48, total: 50, date: "2023-05-10" },
      { name: "English Essay", score: 24, total: 25, date: "2023-05-05" }
    ],
    behavior: "Excellent",
    skills: [
      { name: "Problem Solving", level: 5 },
      { name: "Communication", level: 4 },
      { name: "Teamwork", level: 5 }
    ],
    monthlyProgress: [
      { month: "Jan", score: 88 },
      { month: "Feb", score: 90 },
      { month: "Mar", score: 91 },
      { month: "Apr", score: 91 },
      { month: "May", score: 92 }
    ],
    parentInfo: {
      name: "Carlos Rodriguez",
      contact: "+1 555-234-5678",
      email: "carlos.rodriguez@example.com"
    },
    notes: "Maria consistently demonstrates exceptional analytical skills and leadership qualities."
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
    subjects: [
      { name: "Mathematics", score: 72, grade: "B-" },
      { name: "Science", score: 78, grade: "B" },
      { name: "English", score: 80, grade: "B" },
      { name: "History", score: 70, grade: "C+" }
    ],
    recentAssessments: [
      { name: "Math Quiz 3", score: 14, total: 20, date: "2023-05-15" },
      { name: "Science Project", score: 40, total: 50, date: "2023-05-10" },
      { name: "English Essay", score: 21, total: 25, date: "2023-05-05" }
    ],
    behavior: "Good",
    skills: [
      { name: "Problem Solving", level: 3 },
      { name: "Communication", level: 3 },
      { name: "Teamwork", level: 4 }
    ],
    monthlyProgress: [
      { month: "Jan", score: 70 },
      { month: "Feb", score: 72 },
      { month: "Mar", score: 73 },
      { month: "Apr", score: 74 },
      { month: "May", score: 75 }
    ],
    parentInfo: {
      name: "Robert Smith",
      contact: "+1 555-345-6789",
      email: "robert.smith@example.com"
    },
    notes: "Jason works hard and shows improvement with consistent effort. Extra math support would be beneficial."
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
    subjects: [
      { name: "Mathematics", score: 98, grade: "A+" },
      { name: "Science", score: 96, grade: "A+" },
      { name: "English", score: 94, grade: "A" },
      { name: "History", score: 92, grade: "A" }
    ],
    recentAssessments: [
      { name: "Math Quiz 3", score: 20, total: 20, date: "2023-05-15" },
      { name: "Science Project", score: 50, total: 50, date: "2023-05-10" },
      { name: "English Essay", score: 25, total: 25, date: "2023-05-05" }
    ],
    behavior: "Excellent",
    skills: [
      { name: "Problem Solving", level: 5 },
      { name: "Communication", level: 5 },
      { name: "Teamwork", level: 5 }
    ],
    monthlyProgress: [
      { month: "Jan", score: 93 },
      { month: "Feb", score: 94 },
      { month: "Mar", score: 94 },
      { month: "Apr", score: 95 },
      { month: "May", score: 95 }
    ],
    parentInfo: {
      name: "Raj Patel",
      contact: "+1 555-456-7890",
      email: "raj.patel@example.com"
    },
    notes: "Priya is an outstanding student who often helps fellow students understand complex topics."
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
    subjects: [
      { name: "Mathematics", score: 90, grade: "A-" },
      { name: "Science", score: 87, grade: "B+" },
      { name: "English", score: 86, grade: "B+" },
      { name: "History", score: 89, grade: "A-" }
    ],
    recentAssessments: [
      { name: "Math Quiz 3", score: 18, total: 20, date: "2023-05-15" },
      { name: "Science Project", score: 43, total: 50, date: "2023-05-10" },
      { name: "English Essay", score: 22, total: 25, date: "2023-05-05" }
    ],
    behavior: "Very Good",
    skills: [
      { name: "Problem Solving", level: 4 },
      { name: "Communication", level: 4 },
      { name: "Teamwork", level: 3 }
    ],
    monthlyProgress: [
      { month: "Jan", score: 84 },
      { month: "Feb", score: 85 },
      { month: "Mar", score: 86 },
      { month: "Apr", score: 87 },
      { month: "May", score: 88 }
    ],
    parentInfo: {
      name: "Grace Lee",
      contact: "+1 555-567-8901",
      email: "grace.lee@example.com"
    },
    notes: "David excels in analytical subjects and has shown improvement in group activities."
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
    subjects: [
      { name: "Mathematics", score: 85, grade: "B+" },
      { name: "Science", score: 84, grade: "B" },
      { name: "English", score: 87, grade: "B+" },
      { name: "History", score: 76, grade: "C+" }
    ],
    recentAssessments: [
      { name: "Math Quiz 3", score: 17, total: 20, date: "2023-05-15" },
      { name: "Science Project", score: 42, total: 50, date: "2023-05-10" },
      { name: "English Essay", score: 21, total: 25, date: "2023-05-05" }
    ],
    behavior: "Good",
    skills: [
      { name: "Problem Solving", level: 4 },
      { name: "Communication", level: 4 },
      { name: "Teamwork", level: 3 }
    ],
    monthlyProgress: [
      { month: "Jan", score: 78 },
      { month: "Feb", score: 79 },
      { month: "Mar", score: 81 },
      { month: "Apr", score: 82 },
      { month: "May", score: 83 }
    ],
    parentInfo: {
      name: "Wei Chen",
      contact: "+1 555-678-9012",
      email: "wei.chen@example.com"
    },
    notes: "Sophia has strong language skills and is making good progress in sciences."
  }
];

// Colors for pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function ProgressTrackingPage() {
  const [selectedClass, setSelectedClass] = useState("10");
  const [selectedSection, setSelectedSection] = useState("A");
  const [searchTerm, setSearchTerm] = useState("");
  const [showStudentDetails, setShowStudentDetails] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

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

  // Prepare data for pie chart
  const scholarLevelPieData = [
    { name: "Junior Scholar", value: scholarLevelCounts.juniorScholar },
    { name: "Rising Intellect", value: scholarLevelCounts.risingIntellect },
    { name: "Mastermind Elite", value: scholarLevelCounts.mastermindElite },
  ];

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

  // Open student details dialog
  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setShowStudentDetails(true);
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
                <TabsTrigger value="distribution">Level Distribution</TabsTrigger>
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

              <TabsContent value="distribution">
                <div className="h-[300px] flex justify-center items-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={scholarLevelPieData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {scholarLevelPieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
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
                        <Button variant="ghost" size="sm" onClick={() => handleViewDetails(student)}>
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

      {/* Student Details Dialog */}
      <Dialog open={showStudentDetails} onOpenChange={setShowStudentDetails}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center">
              Student Progress: {selectedStudent?.name}
              <Badge
                className={`ml-3 ${
                  selectedStudent?.scholarLevel === "Junior Scholar" 
                    ? "bg-blue-100 text-blue-800" 
                    : selectedStudent?.scholarLevel === "Rising Intellect" 
                      ? "bg-purple-100 text-purple-800" 
                      : "bg-amber-100 text-amber-800"
                }`}
              >
                {selectedStudent?.scholarLevel}
              </Badge>
            </DialogTitle>
            <DialogDescription>
              Class {selectedStudent?.class}, Section {selectedStudent?.section}
            </DialogDescription>
          </DialogHeader>
          
          {selectedStudent && (
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-6 pb-4">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium text-muted-foreground">Overall Score</div>
                      <div className="text-2xl font-bold mt-1">{selectedStudent.overallScore}%</div>
                      <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                        <div 
                          className={`h-full rounded-full ${
                            selectedStudent.overallScore >= 90 ? "bg-green-500" : 
                            selectedStudent.overallScore >= 75 ? "bg-amber-400" : "bg-amber-500"
                          }`}
                          style={{ width: `${selectedStudent.overallScore}%` }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium text-muted-foreground">Attendance</div>
                      <div className="text-2xl font-bold mt-1">{selectedStudent.attendance}%</div>
                      <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                        <div 
                          className="h-full rounded-full bg-green-500"
                          style={{ width: `${selectedStudent.attendance}%` }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium text-muted-foreground">Tasks Completed</div>
                      <div className="text-2xl font-bold mt-1">{selectedStudent.tasksCompleted}/{selectedStudent.tasksTotal}</div>
                      <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                        <div 
                          className="h-full rounded-full bg-blue-500"
                          style={{ width: `${(selectedStudent.tasksCompleted / selectedStudent.tasksTotal) * 100}%` }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Monthly Progress Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={selectedStudent.monthlyProgress}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="score" 
                          stroke="#8884d8" 
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Subject Performance */}
                <Card>
                  <CardHeader>
                    <CardTitle>Subject Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Subject</TableHead>
                          <TableHead>Score</TableHead>
                          <TableHead>Grade</TableHead>
                          <TableHead>Performance</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedStudent.subjects.map((subject, idx) => (
                          <TableRow key={idx}>
                            <TableCell className="font-medium">{subject.name}</TableCell>
                            <TableCell>{subject.score}%</TableCell>
                            <TableCell>{subject.grade}</TableCell>
                            <TableCell>
                              <div className="w-full bg-gray-200 h-2 rounded-full">
                                <div 
                                  className={`h-full rounded-full ${
                                    subject.score >= 90 ? "bg-green-500" : 
                                    subject.score >= 75 ? "bg-amber-400" : "bg-amber-500"
                                  }`}
                                  style={{ width: `${subject.score}%` }}
                                />
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Recent Assessments */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Assessments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Assessment</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Score</TableHead>
                          <TableHead>Percentage</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedStudent.recentAssessments.map((assessment, idx) => (
                          <TableRow key={idx}>
                            <TableCell className="font-medium">{assessment.name}</TableCell>
                            <TableCell>{assessment.date}</TableCell>
                            <TableCell>{assessment.score}/{assessment.total}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="w-24 bg-gray-200 h-2 rounded-full">
                                  <div 
                                    className={`h-full rounded-full ${
                                      (assessment.score / assessment.total) >= 0.9 ? "bg-green-500" : 
                                      (assessment.score / assessment.total) >= 0.75 ? "bg-amber-400" : "bg-amber-500"
                                    }`}
                                    style={{ width: `${(assessment.score / assessment.total) * 100}%` }}
                                  />
                                </div>
                                <span className="text-sm">{Math.round((assessment.score / assessment.total) * 100)}%</span>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Skills Assessment */}
                <Card>
                  <CardHeader>
                    <CardTitle>Skills Assessment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedStudent.skills.map((skill, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">{skill.name}</span>
                            <span className="text-sm text-muted-foreground">{skill.level}/5</span>
                          </div>
                          <div className="w-full flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((level) => (
                              <div 
                                key={level}
                                className={`h-2 flex-1 rounded-full ${
                                  level <= skill.level ? "bg-blue-500" : "bg-gray-200"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Additional Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Additional Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm font-medium">Behavior</div>
                        <div className="text-muted-foreground">{selectedStudent.behavior}</div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <div className="text-sm font-medium">Parent Information</div>
                        <div className="text-muted-foreground mt-2">
                          <div>{selectedStudent.parentInfo.name}</div>
                          <div>{selectedStudent.parentInfo.contact}</div>
                          <div>{selectedStudent.parentInfo.email}</div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <div className="text-sm font-medium">Teacher Notes</div>
                        <div className="text-muted-foreground">{selectedStudent.notes}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          )}
          
          <DialogFooter className="mt-6 pt-2 border-t">
            <Button onClick={() => setShowStudentDetails(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
