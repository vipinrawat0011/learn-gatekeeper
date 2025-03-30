
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

// Mock data
const classOptions = ["Class 7A", "Class 8B", "Class 9A", "Class 10B"];
const subjectOptions = ["Mathematics", "Science", "English", "History"];

const chapterData = [
  { id: 1, name: "Chapter 1: Introduction to Algebra", progress: 95, type: "Completed" },
  { id: 2, name: "Chapter 2: Linear Equations", progress: 88, type: "Completed" },
  { id: 3, name: "Chapter 3: Quadratic Equations", progress: 70, type: "In Progress" },
  { id: 4, name: "Chapter 4: Polynomials", progress: 60, type: "In Progress" },
  { id: 5, name: "Chapter 5: Trigonometry", progress: 40, type: "In Progress" },
];

const upcomingContent = [
  { id: 6, name: "Chapter 6: Trigonometry", scheduledIn: "two weeks" },
  { id: 7, name: "Chapter 7: Probability", scheduledIn: "three weeks" },
  { id: 8, name: "Chapter 8: Statistics", scheduledIn: "four weeks" },
];

const studentData = [
  { id: 1, name: "Emma Wilson", progress: 85, score: 94, league: "Mastermind Elite" },
  { id: 2, name: "James Smith", progress: 78, score: 81, league: "Rising Intellect" },
  { id: 3, name: "Daniel Johnson", progress: 65, score: 72, league: "Junior Scholar" },
  { id: 4, name: "Sophia Lee", progress: 98, score: 96, league: "Mastermind Elite" },
  { id: 5, name: "Liam Brown", progress: 85, score: 86, league: "Rising Intellect" },
  { id: 6, name: "Olivia Garcia", progress: 71, score: 75, league: "Junior Scholar" },
  { id: 7, name: "Noah Martinez", progress: 88, score: 89, league: "Rising Intellect" },
];

export default function SubjectPage() {
  const [selectedClass, setSelectedClass] = useState("Class 9A");
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");
  
  return (
    <DashboardLayout 
      role="teacher" 
      title="Subject Teaching"
      subtitle="Manage and track your subject teaching across different classes"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-[180px]">
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
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {subjectOptions.map((subjectOption) => (
                <SelectItem key={subjectOption} value={subjectOption}>
                  {subjectOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">72%</div>
              <div className="text-sm text-muted-foreground">Overall Completion</div>
              <div className="text-xs mt-1">38 of 45 students on track</div>
            </div>
            <Progress value={72} className="h-2 mt-4" />
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">84%</div>
              <div className="text-sm text-muted-foreground">Average Score</div>
              <div className="text-xs mt-1">Class 9A • Mathematics</div>
            </div>
            <Progress value={84} className="h-2 mt-4" />
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">3 Leagues</div>
              <div className="text-sm text-muted-foreground">League Distribution</div>
              <div className="text-xs mt-1">Class 9A • Mathematics</div>
            </div>
            <div className="flex justify-center gap-2 mt-4">
              <div className="px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800">Junior: 25%</div>
              <div className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">Rising: 50%</div>
              <div className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">Elite: 25%</div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="course-progress">
        <TabsList>
          <TabsTrigger value="course-progress">Course Progress</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="course-progress" className="mt-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Mathematics for Class 9A</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Chapter Status</h3>
                  <div className="space-y-4">
                    {chapterData.map((chapter) => (
                      <div key={chapter.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{chapter.name}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              chapter.type === "Completed" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                            }`}>
                              {chapter.type}
                            </span>
                          </div>
                          <span className="text-sm">{chapter.progress}%</span>
                        </div>
                        <Progress value={chapter.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Upcoming Content</h3>
                  <div className="space-y-4">
                    {upcomingContent.map((content) => (
                      <div key={content.id} className="flex items-center gap-4 border-b pb-3 last:border-0">
                        <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-blue-800 font-medium">
                          {content.id}
                        </div>
                        <div>
                          <div className="font-medium">{content.name}</div>
                          <div className="text-sm text-muted-foreground">Scheduled in {content.scheduledIn}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="assessments" className="mt-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Assessments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium">Title</th>
                        <th className="text-left p-3 font-medium">Type</th>
                        <th className="text-left p-3 font-medium">Status</th>
                        <th className="text-left p-3 font-medium">Due Date</th>
                        <th className="text-left p-3 font-medium">Submissions</th>
                        <th className="text-left p-3 font-medium">Average Score</th>
                        <th className="text-right p-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { id: 1, title: "Midterm Examination", type: "Exam", status: "Completed", dueDate: "October 15, 2023", submissions: "26/28", avgScore: "84%" },
                        { id: 2, title: "Algebra Quiz", type: "Quiz", status: "Completed", dueDate: "October 10, 2023", submissions: "28/28", avgScore: "78%" },
                        { id: 3, title: "Geometry Assignment", type: "Assignment", status: "Active", dueDate: "October 25, 2023", submissions: "20/28", avgScore: "76%" },
                        { id: 4, title: "Statistics Project", type: "Project", status: "Active", dueDate: "November 5, 2023", submissions: "12/28", avgScore: "82%" },
                        { id: 5, title: "Calculus Pre-test", type: "Quiz", status: "Draft", dueDate: "November 15, 2023", submissions: "0/28", avgScore: "-" },
                      ].map((assessment) => (
                        <tr key={assessment.id} className="border-b hover:bg-muted/30">
                          <td className="p-3">{assessment.title}</td>
                          <td className="p-3">{assessment.type}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              assessment.status === "Completed" ? "bg-green-100 text-green-800" :
                              assessment.status === "Active" ? "bg-blue-100 text-blue-800" :
                              "bg-gray-100 text-gray-800"
                            }`}>
                              {assessment.status}
                            </span>
                          </td>
                          <td className="p-3">{assessment.dueDate}</td>
                          <td className="p-3">{assessment.submissions}</td>
                          <td className="p-3">{assessment.avgScore}</td>
                          <td className="p-3 text-right">
                            <Button variant="outline" size="sm">View</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="mt-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Student List - 9A</CardTitle>
              <div className="text-sm text-muted-foreground">Performance in Mathematics</div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Name</th>
                      <th className="text-left p-3 font-medium">Course Progress</th>
                      <th className="text-left p-3 font-medium">Assessments</th>
                      <th className="text-left p-3 font-medium">Average Score</th>
                      <th className="text-left p-3 font-medium">League</th>
                      <th className="text-right p-3 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentData.map((student) => (
                      <tr key={student.id} className="border-b hover:bg-muted/30">
                        <td className="p-3 font-medium">{student.name}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Progress value={student.progress} className="h-2 w-24" />
                            <span className="text-sm">{student.progress}%</span>
                          </div>
                        </td>
                        <td className="p-3">9/10</td>
                        <td className="p-3">{student.score}%</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            student.league === "Mastermind Elite" ? "bg-yellow-100 text-yellow-800" :
                            student.league === "Rising Intellect" ? "bg-blue-100 text-blue-800" :
                            "bg-orange-100 text-orange-800"
                          }`}>
                            {student.league}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <Button variant="outline" size="sm">View Details</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
