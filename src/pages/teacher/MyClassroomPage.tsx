
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Search, Filter, CheckCircle, XCircle, BookOpen, ClipboardCheck, Award
} from "lucide-react";

// Mock data for a student details that will show when a student is selected
const studentDetail = {
  id: 1,
  name: "Emma Wilson",
  class: "9A",
  scholarLevel: "Mastermind Elite",
  courseProgress: 87,
  completedCourses: 3,
  totalCourses: 4,
  averageScore: 94,
  completedAssessments: 18,
  totalAssessments: 20,
  pendingAssessments: 1,
  leagueRank: 12,
  totalInLeague: 30,
  pointsToNextLeague: 45,
  attendance: 92
};

// Mock data for student list
const students = [
  { id: 1, name: "Emma Wilson", scholarLevel: "Mastermind Elite", attendance: 92, courseProgress: 87, assessmentScore: 94 },
  { id: 2, name: "James Smith", scholarLevel: "Rising Intellect", attendance: 88, courseProgress: 78, assessmentScore: 81 },
  { id: 3, name: "Daniel Johnson", scholarLevel: "Junior Scholar", attendance: 85, courseProgress: 65, assessmentScore: 72 },
  { id: 4, name: "Sophia Lee", scholarLevel: "Mastermind Elite", attendance: 96, courseProgress: 98, assessmentScore: 96 },
  { id: 5, name: "Liam Brown", scholarLevel: "Rising Intellect", attendance: 90, courseProgress: 85, assessmentScore: 86 },
  { id: 6, name: "Olivia Garcia", scholarLevel: "Junior Scholar", attendance: 82, courseProgress: 71, assessmentScore: 75 },
  { id: 7, name: "Noah Martinez", scholarLevel: "Rising Intellect", attendance: 89, courseProgress: 88, assessmentScore: 87 },
];

export default function MyClassroomPage() {
  const [selectedStudent, setSelectedStudent] = useState<number | null>(1); // Default to the first student
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter students based on search term
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const selectedStudentData = students.find(student => student.id === selectedStudent);
  
  const handleCloseDetails = () => {
    setSelectedStudent(null);
  };
  
  return (
    <DashboardLayout 
      role="teacher" 
      title="My Classroom"
      subtitle="Manage and track students in your class"
    >
      {selectedStudent ? (
        // Student detail view
        <>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600">
                {studentDetail.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{studentDetail.name}</h2>
                <div className="flex items-center gap-2">
                  <span>Class {studentDetail.class}</span>
                  <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                    {studentDetail.scholarLevel}
                  </span>
                </div>
              </div>
            </div>
            <Button variant="outline" onClick={handleCloseDetails}>
              Close
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  League Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Current League</span>
                    <span className="font-medium">{studentDetail.scholarLevel}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">League Rank</span>
                    <span className="font-medium">{studentDetail.leagueRank} of {studentDetail.totalInLeague}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Points to Next League</span>
                    <span className="font-medium">{studentDetail.pointsToNextLeague} points</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-500" />
                  Course Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-muted-foreground">Overall Progress</span>
                      <span className="font-medium">{studentDetail.courseProgress}%</span>
                    </div>
                    <Progress value={studentDetail.courseProgress} className="h-2" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Completed Courses</span>
                    <span className="font-medium">{studentDetail.completedCourses} of {studentDetail.totalCourses}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <ClipboardCheck className="h-5 w-5 text-green-500" />
                  Assessment Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Average Score</span>
                    <span className="font-medium">{studentDetail.averageScore}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Completed Assessments</span>
                    <span className="font-medium">{studentDetail.completedAssessments} of {studentDetail.totalAssessments}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Pending Assessments</span>
                    <span className="font-medium">{studentDetail.pendingAssessments}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="subjects">
            <TabsList>
              <TabsTrigger value="subjects">Subjects</TabsTrigger>
              <TabsTrigger value="assessments">Assessments</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="subjects" className="mt-6">
              <Card className="border-none shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Performance by Subject</h3>
                  <div className="space-y-5">
                    {[
                      { name: "Mathematics", score: 92, progress: 85 },
                      { name: "Science", score: 88, progress: 90 },
                      { name: "English", score: 95, progress: 92 },
                      { name: "History", score: 78, progress: 75 },
                    ].map((subject, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{subject.name}</span>
                          <span className="text-sm">{subject.score}%</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Course Progress</span>
                            <span>{subject.progress}%</span>
                          </div>
                          <Progress value={subject.progress} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="assessments" className="mt-6">
              <Card className="border-none shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Recent Assessments</h3>
                  <div className="space-y-4">
                    {[
                      { name: "Midterm Exam", subject: "Mathematics", date: "2023-10-15", score: 92, status: "Completed" },
                      { name: "Chapter 5 Quiz", subject: "Science", date: "2023-10-18", score: 88, status: "Completed" },
                      { name: "Essay Assignment", subject: "English", date: "2023-10-25", score: null, status: "Pending" },
                    ].map((assessment, index) => (
                      <div key={index} className="flex justify-between items-center py-3 border-b last:border-b-0">
                        <div>
                          <div className="font-medium">{assessment.name}</div>
                          <div className="text-sm text-muted-foreground">{assessment.subject} • {new Date(assessment.date).toLocaleDateString()}</div>
                        </div>
                        <div className="flex items-center">
                          {assessment.status === "Completed" ? (
                            <span className="flex items-center text-green-600 gap-1">
                              <CheckCircle className="h-4 w-4" /> {assessment.score}%
                            </span>
                          ) : (
                            <span className="text-amber-600 flex items-center gap-1">
                              <span className="h-2 w-2 bg-amber-600 rounded-full"></span> Pending
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="attendance" className="mt-6">
              <Card className="border-none shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Attendance Record</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-muted-foreground">Overall Attendance</span>
                        <span className="font-medium">{studentDetail.attendance}%</span>
                      </div>
                      <Progress value={studentDetail.attendance} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="border rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-blue-600">46</div>
                        <div className="text-sm text-muted-foreground">Present Days</div>
                      </div>
                      <div className="border rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-red-600">4</div>
                        <div className="text-sm text-muted-foreground">Absent Days</div>
                      </div>
                      <div className="border rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold">50</div>
                        <div className="text-sm text-muted-foreground">Total School Days</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      ) : (
        // Student list view
        <>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
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
          </div>
          
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Class 9A Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Name</th>
                      <th className="text-left p-3 font-medium">League</th>
                      <th className="text-left p-3 font-medium">Attendance</th>
                      <th className="text-left p-3 font-medium">Course Progress</th>
                      <th className="text-left p-3 font-medium">Assessment Score</th>
                      <th className="text-right p-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="border-b hover:bg-muted/30">
                        <td className="p-3">{student.name}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            student.scholarLevel === "Mastermind Elite" ? "bg-yellow-100 text-yellow-800" :
                            student.scholarLevel === "Rising Intellect" ? "bg-blue-100 text-blue-800" :
                            "bg-orange-100 text-orange-800"
                          }`}>
                            {student.scholarLevel}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Progress value={student.attendance} className="h-2 w-32" />
                            <span className="text-sm">{student.attendance}%</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Progress value={student.courseProgress} className="h-2 w-32" />
                            <span className="text-sm">{student.courseProgress}%</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Progress value={student.assessmentScore} className="h-2 w-32" />
                            <span className="text-sm">{student.assessmentScore}%</span>
                          </div>
                        </td>
                        <td className="p-3 text-right">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setSelectedStudent(student.id)}
                          >
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </DashboardLayout>
  );
}
