
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from "@/components/ui/tabs";
import { Filter, Users, LightbulbIcon, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";

// Mock data for student classification by grade
const studentsByGradeData = [
  { grade: 1, juniorScholar: 38, risingIntellect: 21, mastermindElite: 11 },
  { grade: 2, juniorScholar: 23, risingIntellect: 18, mastermindElite: 10 },
  { grade: 3, juniorScholar: 30, risingIntellect: 26, mastermindElite: 10 },
  { grade: 4, juniorScholar: 16, risingIntellect: 12, mastermindElite: 7 },
  { grade: 5, juniorScholar: 22, risingIntellect: 18, mastermindElite: 8 },
  { grade: 6, juniorScholar: 15, risingIntellect: 14, mastermindElite: 6 },
  { grade: 7, juniorScholar: 25, risingIntellect: 17, mastermindElite: 12 },
  { grade: 8, juniorScholar: 14, risingIntellect: 18, mastermindElite: 10 },
  { grade: 9, juniorScholar: 16, risingIntellect: 16, mastermindElite: 10 },
  { grade: 10, juniorScholar: 16, risingIntellect: 15, mastermindElite: 5 },
  { grade: 11, juniorScholar: 23, risingIntellect: 16, mastermindElite: 7 },
  { grade: 12, juniorScholar: 12, risingIntellect: 12, mastermindElite: 8 },
];

// Mock data for student performance over time
const performanceOverTimeData = [
  { month: 'Jan', score: 65 },
  { month: 'Feb', score: 68 },
  { month: 'Mar', score: 72 },
  { month: 'Apr', score: 75 },
  { month: 'May', score: 79 },
  { month: 'Jun', score: 82 },
];

// Mock data for student list
const studentsList = [
  { 
    id: 1, 
    name: "Alice Johnson", 
    grade: "1", 
    section: "A", 
    performanceLevel: "Junior Scholar", 
    score: 65,
    attendance: 92,
    subjects: [
      { name: "Mathematics", score: 68, grade: "B" },
      { name: "Science", score: 72, grade: "B" },
      { name: "English", score: 62, grade: "C" },
      { name: "History", score: 58, grade: "C" }
    ],
    behavior: "Good",
    parentContact: "+1 234-567-8901",
    notes: "Shows improvement in group activities."
  },
  { 
    id: 2, 
    name: "Bob Smith", 
    grade: "2", 
    section: "B", 
    performanceLevel: "Rising Intellect", 
    score: 78,
    attendance: 96,
    subjects: [
      { name: "Mathematics", score: 82, grade: "A" },
      { name: "Science", score: 75, grade: "B" },
      { name: "English", score: 79, grade: "B" },
      { name: "History", score: 76, grade: "B" }
    ],
    behavior: "Excellent",
    parentContact: "+1 234-567-8902",
    notes: "Very attentive in class."
  },
  { 
    id: 3, 
    name: "Charlie Brown", 
    grade: "3", 
    section: "A", 
    performanceLevel: "Mastermind Elite", 
    score: 92,
    attendance: 98,
    subjects: [
      { name: "Mathematics", score: 95, grade: "A+" },
      { name: "Science", score: 90, grade: "A" },
      { name: "English", score: 92, grade: "A" },
      { name: "History", score: 91, grade: "A" }
    ],
    behavior: "Excellent",
    parentContact: "+1 234-567-8903",
    notes: "Shows exceptional problem-solving abilities."
  },
  { 
    id: 4, 
    name: "Diana Miller", 
    grade: "4", 
    section: "A", 
    performanceLevel: "Junior Scholar", 
    score: 68,
    attendance: 88,
    subjects: [
      { name: "Mathematics", score: 65, grade: "C" },
      { name: "Science", score: 70, grade: "B-" },
      { name: "English", score: 72, grade: "B-" },
      { name: "History", score: 65, grade: "C" }
    ],
    behavior: "Good",
    parentContact: "+1 234-567-8904",
    notes: "Needs help with mathematics."
  },
  { 
    id: 5, 
    name: "Edward Wilson", 
    grade: "5", 
    section: "B", 
    performanceLevel: "Rising Intellect", 
    score: 82,
    attendance: 94,
    subjects: [
      { name: "Mathematics", score: 85, grade: "A-" },
      { name: "Science", score: 80, grade: "B+" },
      { name: "English", score: 81, grade: "B+" },
      { name: "History", score: 82, grade: "B+" }
    ],
    behavior: "Very Good",
    parentContact: "+1 234-567-8905",
    notes: "Participates actively in class discussions."
  },
  { 
    id: 6, 
    name: "Fiona Davis", 
    grade: "6", 
    section: "C", 
    performanceLevel: "Mastermind Elite", 
    score: 95,
    attendance: 99,
    subjects: [
      { name: "Mathematics", score: 98, grade: "A+" },
      { name: "Science", score: 96, grade: "A+" },
      { name: "English", score: 94, grade: "A" },
      { name: "History", score: 92, grade: "A" }
    ],
    behavior: "Excellent",
    parentContact: "+1 234-567-8906",
    notes: "Exceptional across all subjects."
  },
  { 
    id: 7, 
    name: "George White", 
    grade: "7", 
    section: "A", 
    performanceLevel: "Junior Scholar", 
    score: 63,
    attendance: 85,
    subjects: [
      { name: "Mathematics", score: 60, grade: "C-" },
      { name: "Science", score: 65, grade: "C" },
      { name: "English", score: 68, grade: "C+" },
      { name: "History", score: 59, grade: "D+" }
    ],
    behavior: "Needs Improvement",
    parentContact: "+1 234-567-8907",
    notes: "Requires additional attention in class."
  },
  { 
    id: 8, 
    name: "Hannah Martinez", 
    grade: "8", 
    section: "B", 
    performanceLevel: "Rising Intellect", 
    score: 85,
    attendance: 93,
    subjects: [
      { name: "Mathematics", score: 87, grade: "A-" },
      { name: "Science", score: 84, grade: "B+" },
      { name: "English", score: 86, grade: "B+" },
      { name: "History", score: 83, grade: "B+" }
    ],
    behavior: "Very Good",
    parentContact: "+1 234-567-8908",
    notes: "Great team player during group projects."
  },
];

export default function StudentManagementPage() {
  const [selectedGrade, setSelectedGrade] = useState<string>("All Grades");
  const [selectedSection, setSelectedSection] = useState<string>("All Sections");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [showStudentDetails, setShowStudentDetails] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  
  const juniorCount = studentsList.filter(s => s.performanceLevel === "Junior Scholar").length;
  const risingCount = studentsList.filter(s => s.performanceLevel === "Rising Intellect").length;
  const eliteCount = studentsList.filter(s => s.performanceLevel === "Mastermind Elite").length;
  const totalCount = juniorCount + risingCount + eliteCount;

  // Get filtered data for the chart based on selected grade
  const getFilteredChartData = () => {
    if (selectedGrade === "All Grades") {
      // For "All Grades", return data for all grades
      return studentsByGradeData;
    } else {
      // For a specific grade, return only that grade's data
      const gradeNumber = parseInt(selectedGrade);
      return studentsByGradeData.filter(item => item.grade === gradeNumber);
    }
  };
  
  // Filter students based on active tab
  const filteredStudents = studentsList.filter(student => {
    if (activeTab === "junior") return student.performanceLevel === "Junior Scholar";
    if (activeTab === "rising") return student.performanceLevel === "Rising Intellect";
    if (activeTab === "mastermind") return student.performanceLevel === "Mastermind Elite";
    return true; // "all" tab
  });

  // Open student details dialog
  const handleViewDetails = (student: any) => {
    setSelectedStudent(student);
    setShowStudentDetails(true);
  };
  
  return (
    <DashboardLayout 
      role="admin" 
      title="Student Management"
      subtitle="Classify and manage students"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-6">Student Management</h2>
        
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="flex gap-3">
            <Select value={selectedGrade} onValueChange={setSelectedGrade}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Grades">All Grades</SelectItem>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((grade) => (
                  <SelectItem key={grade} value={grade.toString()}>
                    Grade {grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedSection} onValueChange={setSelectedSection}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Sections">All Sections</SelectItem>
                <SelectItem value="A">Section A</SelectItem>
                <SelectItem value="B">Section B</SelectItem>
                <SelectItem value="C">Section C</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button>
            <Filter className="h-4 w-4 mr-2" /> Reclassify Students
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Student Classification</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Implement actual chart */}
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getFilteredChartData()} barSize={30}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="grade" label={{ value: 'Grade', position: 'insideBottomRight', offset: -5 }} />
                  <YAxis label={{ value: 'Number of Students', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="juniorScholar" name="Junior Scholar" fill="#f59e0b" />
                  <Bar dataKey="risingIntellect" name="Rising Intellect" fill="#f59e0b" stackId="a" />
                  <Bar dataKey="mastermindElite" name="Mastermind Elite" fill="#10b981" stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Classification Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 bg-amber-500 rounded-full"></div>
                  <span className="font-medium">Junior Scholars</span>
                  <span className="ml-auto font-bold">{juniorCount} students</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${(juniorCount / totalCount) * 100}%` }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 bg-amber-400 rounded-full"></div>
                  <span className="font-medium">Rising Intellects</span>
                  <span className="ml-auto font-bold">{risingCount} students</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-amber-400 h-2 rounded-full" style={{ width: `${(risingCount / totalCount) * 100}%` }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="font-medium">Mastermind Elite</span>
                  <span className="ml-auto font-bold">{eliteCount} students</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(eliteCount / totalCount) * 100}%` }}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-between items-center">
              <div className="text-sm text-muted-foreground">Total Students</div>
              <div className="text-xl font-bold">{totalCount}</div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Student List</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Students</TabsTrigger>
              <TabsTrigger value="junior">Junior Scholars</TabsTrigger>
              <TabsTrigger value="rising">Rising Intellects</TabsTrigger>
              <TabsTrigger value="mastermind">Mastermind Elite</TabsTrigger>
            </TabsList>
            
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Section</TableHead>
                    <TableHead>Performance Level</TableHead>
                    <TableHead>Overall Score</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>Grade {student.grade}</TableCell>
                      <TableCell>Section {student.section}</TableCell>
                      <TableCell>
                        <Badge
                          className={`${
                            student.performanceLevel === "Junior Scholar" 
                              ? "bg-amber-500" 
                              : student.performanceLevel === "Rising Intellect" 
                                ? "bg-amber-400" 
                                : "bg-green-500"
                          } text-white hover:bg-opacity-80`}
                        >
                          {student.performanceLevel}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 h-2 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                student.score > 85 
                                  ? "bg-green-500" 
                                  : student.score > 70 
                                    ? "bg-amber-400" 
                                    : "bg-amber-500"
                              }`}
                              style={{ width: `${student.score}%` }}
                            />
                          </div>
                          <span className="text-sm">{student.score}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleViewDetails(student)}>View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* Student Details Dialog */}
      <Dialog open={showStudentDetails} onOpenChange={setShowStudentDetails}>
        <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center">
              Student Profile: {selectedStudent?.name}
              <Badge
                className={`ml-3 ${
                  selectedStudent?.performanceLevel === "Junior Scholar" 
                    ? "bg-amber-500" 
                    : selectedStudent?.performanceLevel === "Rising Intellect" 
                      ? "bg-amber-400" 
                      : "bg-green-500"
                } text-white`}
              >
                {selectedStudent?.performanceLevel}
              </Badge>
            </DialogTitle>
            <DialogDescription>
              Grade {selectedStudent?.grade}, Section {selectedStudent?.section}
            </DialogDescription>
          </DialogHeader>

          {selectedStudent && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm font-medium text-muted-foreground">Overall Score</div>
                    <div className="text-2xl font-bold mt-1">{selectedStudent.score}%</div>
                    <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                      <div 
                        className={`h-full rounded-full ${
                          selectedStudent.score > 85 ? "bg-green-500" : 
                          selectedStudent.score > 70 ? "bg-amber-400" : "bg-amber-500"
                        }`}
                        style={{ width: `${selectedStudent.score}%` }}
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
                        className={`h-full rounded-full ${
                          selectedStudent.attendance > 90 ? "bg-green-500" : 
                          selectedStudent.attendance > 80 ? "bg-amber-400" : "bg-red-500"
                        }`}
                        style={{ width: `${selectedStudent.attendance}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm font-medium text-muted-foreground">Behavior</div>
                    <div className="text-2xl font-bold mt-1">{selectedStudent.behavior}</div>
                    <div className="text-xs text-muted-foreground mt-2">
                      Teacher assessment
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceOverTimeData}>
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
                  </div>
                </CardContent>
              </Card>

              {/* Subject Performance Table */}
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
                      {selectedStudent.subjects.map((subject: any, idx: number) => (
                        <TableRow key={idx}>
                          <TableCell className="font-medium">{subject.name}</TableCell>
                          <TableCell>{subject.score}%</TableCell>
                          <TableCell>{subject.grade}</TableCell>
                          <TableCell>
                            <div className="w-full bg-gray-200 h-2 rounded-full">
                              <div 
                                className={`h-full rounded-full ${
                                  subject.score > 85 ? "bg-green-500" : 
                                  subject.score > 70 ? "bg-amber-400" : "bg-amber-500"
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

              {/* Additional Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Additional Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-medium">Parent Contact</div>
                      <div className="text-muted-foreground">{selectedStudent.parentContact}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Teacher Notes</div>
                      <div className="text-muted-foreground">{selectedStudent.notes}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStudentDetails(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
