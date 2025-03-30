
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
import { Filter, Users, LightbulbIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

// Mock data for student list
const studentsList = [
  { id: 1, name: "Alice Johnson", grade: "1", section: "A", performanceLevel: "Junior Scholar", score: 65 },
  { id: 2, name: "Bob Smith", grade: "2", section: "B", performanceLevel: "Rising Intellect", score: 78 },
  { id: 3, name: "Charlie Brown", grade: "3", section: "A", performanceLevel: "Mastermind Elite", score: 92 },
  { id: 4, name: "Diana Miller", grade: "4", section: "A", performanceLevel: "Junior Scholar", score: 68 },
  { id: 5, name: "Edward Wilson", grade: "5", section: "B", performanceLevel: "Rising Intellect", score: 82 },
  { id: 6, name: "Fiona Davis", grade: "6", section: "C", performanceLevel: "Mastermind Elite", score: 95 },
  { id: 7, name: "George White", grade: "7", section: "A", performanceLevel: "Junior Scholar", score: 63 },
  { id: 8, name: "Hannah Martinez", grade: "8", section: "B", performanceLevel: "Rising Intellect", score: 85 },
];

export default function StudentManagementPage() {
  const [selectedGrade, setSelectedGrade] = useState<string>("All Grades");
  const [selectedSection, setSelectedSection] = useState<string>("All Sections");
  const [activeTab, setActiveTab] = useState<string>("all");
  
  const juniorCount = studentsList.filter(s => s.performanceLevel === "Junior Scholar").length;
  const risingCount = studentsList.filter(s => s.performanceLevel === "Rising Intellect").length;
  const eliteCount = studentsList.filter(s => s.performanceLevel === "Mastermind Elite").length;
  const totalCount = juniorCount + risingCount + eliteCount;
  
  // Filter students based on active tab
  const filteredStudents = studentsList.filter(student => {
    if (activeTab === "junior") return student.performanceLevel === "Junior Scholar";
    if (activeTab === "rising") return student.performanceLevel === "Rising Intellect";
    if (activeTab === "mastermind") return student.performanceLevel === "Mastermind Elite";
    return true; // "all" tab
  });
  
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
            {/* This would be a chart component in a real app */}
            <div className="h-[300px] bg-muted flex items-center justify-center rounded-md">
              {selectedGrade === "All Grades" ? (
                <p className="text-muted-foreground">Bar chart showing student classification across all grades would appear here</p>
              ) : (
                <p className="text-muted-foreground">Bar chart showing student classification for Grade {selectedGrade} would appear here</p>
              )}
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
                        <Button variant="ghost" size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
