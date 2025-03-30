
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ClipboardCheck, Search, Filter, Plus, Eye, BarChart3, Clock, CheckCircle, XCircle, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function AssessmentsPage() {
  const [selectedClass, setSelectedClass] = useState("Class 9A");
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("active");
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [questionType, setQuestionType] = useState("Multiple Choice");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Assessment created",
      description: "Your assessment has been created successfully",
    });
    setSelectedTab("active");
  };

  const handleAddQuestion = () => {
    setIsAddingQuestion(true);
  };

  const handleSaveQuestion = () => {
    setIsAddingQuestion(false);
    toast({
      title: "Question added",
      description: "Your question has been added to the assessment",
    });
  };

  // Mock data for assessments list
  const assessments = [
    { id: 1, title: "Midterm Examination", type: "Exam", status: "Completed", dueDate: "October 15, 2023", submissions: "26/28", avgScore: "84%" },
    { id: 2, title: "Algebra Quiz", type: "Quiz", status: "Completed", dueDate: "October 10, 2023", submissions: "28/28", avgScore: "78%" },
    { id: 3, title: "Geometry Assignment", type: "Assignment", status: "Active", dueDate: "October 25, 2023", submissions: "20/28", avgScore: "76%" },
    { id: 4, title: "Statistics Project", type: "Project", status: "Active", dueDate: "November 5, 2023", submissions: "12/28", avgScore: "82%" },
    { id: 5, title: "Calculus Pre-test", type: "Quiz", status: "Draft", dueDate: "November 15, 2023", submissions: "0/28", avgScore: "-" },
  ];

  // Mock data for student submissions
  const studentSubmissions = [
    { id: 1, name: "Emma Wilson", league: "Mastermind Elite", score: 92, status: "Graded" },
    { id: 2, name: "James Smith", league: "Rising Intellect", score: 78, status: "Graded" },
    { id: 3, name: "Daniel Johnson", league: "Junior Scholar", score: 65, status: "Graded" },
    { id: 4, name: "Sophia Lee", league: "Mastermind Elite", score: 96, status: "Graded" },
    { id: 5, name: "Liam Brown", league: "Rising Intellect", score: 85, status: "Graded" },
    { id: 6, name: "Olivia Garcia", league: "Junior Scholar", score: 72, status: "Graded" },
    { id: 7, name: "Noah Martinez", league: "Rising Intellect", score: 81, status: "Graded" },
  ];

  return (
    <DashboardLayout 
      role="teacher" 
      title="Assessments"
      subtitle="Create and manage assessments for your students"
    >
      <Tabs defaultValue="active" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="create">Create New</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Classes">All Classes</SelectItem>
                  <SelectItem value="Class 7A">Class 7A</SelectItem>
                  <SelectItem value="Class 8B">Class 8B</SelectItem>
                  <SelectItem value="Class 9A">Class 9A</SelectItem>
                  <SelectItem value="Class 10B">Class 10B</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Subjects">All Subjects</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="History">History</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search assessments..." 
                  className="pl-8 w-full" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button onClick={() => setSelectedTab("create")}>
                New Assessment
              </Button>
            </div>
          </div>

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
                  <th className="text-center p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {assessments
                  .filter(assessment => assessment.status === "Active")
                  .filter(assessment => assessment.title.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((assessment) => (
                    <tr key={assessment.id} className="border-b hover:bg-muted/30">
                      <td className="p-3">{assessment.title}</td>
                      <td className="p-3">{assessment.type}</td>
                      <td className="p-3">
                        <Badge variant="default">
                          Active
                        </Badge>
                      </td>
                      <td className="p-3">{assessment.dueDate}</td>
                      <td className="p-3">{assessment.submissions}</td>
                      <td className="p-3">{assessment.avgScore}</td>
                      <td className="p-3 text-center">
                        <div className="flex justify-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" /> View
                          </Button>
                          <Button size="sm">
                            <BarChart3 className="h-4 w-4 mr-1" /> Results
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          
          {/* Student Submissions Section - This would normally be conditionally rendered when a particular assessment is viewed */}
          <div className="mt-8">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>Student Submissions - Midterm Examination</CardTitle>
                <div className="text-sm text-muted-foreground">Review and grade student submissions for Class 9A</div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium">Student Name</th>
                        <th className="text-left p-3 font-medium">League</th>
                        <th className="text-center p-3 font-medium">Score</th>
                        <th className="text-center p-3 font-medium">Status</th>
                        <th className="text-center p-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentSubmissions.map((student) => (
                        <tr key={student.id} className="border-b hover:bg-muted/30">
                          <td className="p-3 font-medium">{student.name}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              student.league === "Mastermind Elite" ? "bg-yellow-100 text-yellow-800" :
                              student.league === "Rising Intellect" ? "bg-blue-100 text-blue-800" :
                              "bg-orange-100 text-orange-800"
                            }`}>
                              {student.league}
                            </span>
                          </td>
                          <td className="p-3 text-center">{student.score}%</td>
                          <td className="p-3 text-center">
                            <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                              Graded
                            </Badge>
                          </td>
                          <td className="p-3 text-center">
                            <Button variant="outline" size="sm">
                              View
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
        </TabsContent>
        
        <TabsContent value="completed">
          <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Select defaultValue={selectedClass}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Classes">All Classes</SelectItem>
                  <SelectItem value="Class 7A">Class 7A</SelectItem>
                  <SelectItem value="Class 8B">Class 8B</SelectItem>
                  <SelectItem value="Class 9A">Class 9A</SelectItem>
                  <SelectItem value="Class 10B">Class 10B</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue={selectedSubject}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Subjects">All Subjects</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="History">History</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search assessments..." 
                  className="pl-8 w-full" 
                />
              </div>
            </div>
          </div>

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
                  <th className="text-center p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {assessments
                  .filter(assessment => assessment.status === "Completed")
                  .map((assessment) => (
                    <tr key={assessment.id} className="border-b hover:bg-muted/30">
                      <td className="p-3">{assessment.title}</td>
                      <td className="p-3">{assessment.type}</td>
                      <td className="p-3">
                        <Badge variant="outline">
                          Completed
                        </Badge>
                      </td>
                      <td className="p-3">{assessment.dueDate}</td>
                      <td className="p-3">{assessment.submissions}</td>
                      <td className="p-3">{assessment.avgScore}</td>
                      <td className="p-3 text-center">
                        <Button size="sm">
                          <BarChart3 className="h-4 w-4 mr-1" /> View Results
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
        
        <TabsContent value="draft">
          <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Select defaultValue={selectedClass}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Classes">All Classes</SelectItem>
                  <SelectItem value="Class 7A">Class 7A</SelectItem>
                  <SelectItem value="Class 8B">Class 8B</SelectItem>
                  <SelectItem value="Class 9A">Class 9A</SelectItem>
                  <SelectItem value="Class 10B">Class 10B</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue={selectedSubject}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Subjects">All Subjects</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="History">History</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

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
                  <th className="text-center p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {assessments
                  .filter(assessment => assessment.status === "Draft")
                  .map((assessment) => (
                    <tr key={assessment.id} className="border-b hover:bg-muted/30">
                      <td className="p-3">{assessment.title}</td>
                      <td className="p-3">{assessment.type}</td>
                      <td className="p-3">
                        <Badge variant="secondary">
                          Draft
                        </Badge>
                      </td>
                      <td className="p-3">{assessment.dueDate}</td>
                      <td className="p-3">{assessment.submissions}</td>
                      <td className="p-3">{assessment.avgScore}</td>
                      <td className="p-3 text-center">
                        <div className="flex justify-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" /> Edit
                          </Button>
                          <Button size="sm">
                            Publish
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
        
        <TabsContent value="create">
          {isAddingQuestion ? (
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>Add New Question</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="questionType">Question Type</Label>
                  <Select value={questionType} onValueChange={setQuestionType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Multiple Choice">Multiple Choice</SelectItem>
                      <SelectItem value="True/False">True/False</SelectItem>
                      <SelectItem value="Short Answer">Short Answer</SelectItem>
                      <SelectItem value="Long Answer">Long Answer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="questionText">Question Text</Label>
                  <Textarea 
                    id="questionText" 
                    placeholder="Enter question here..." 
                    rows={3}
                    defaultValue="What is Newton's first law of motion?"
                  />
                </div>
                
                {(questionType === "Multiple Choice") && (
                  <div className="space-y-3">
                    <Label>Answer Options</Label>
                    <div className="space-y-2">
                      {["Objects at rest stay at rest unless acted upon by a force", 
                        "Force equals mass times acceleration", 
                        "For every action, there is an equal and opposite reaction", 
                        "The acceleration of an object is directly proportional to the force"
                      ].map((option, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-10">
                            <input 
                              type="radio" 
                              name="correct-answer" 
                              id={`option-${idx}`} 
                              className="mr-2" 
                              defaultChecked={idx === 0}
                            />
                          </div>
                          <Input value={option} className="flex-1" />
                          {idx > 1 && (
                            <Button variant="ghost" size="icon" type="button">
                              <XCircle className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" type="button" className="mt-2">
                      <Plus className="h-4 w-4 mr-1" /> Add Option
                    </Button>
                    <div className="text-xs text-muted-foreground">
                      Select the radio button next to the correct answer
                    </div>
                  </div>
                )}
                
                {(questionType === "True/False") && (
                  <div className="space-y-3">
                    <Label>Answer</Label>
                    <div className="flex gap-4">
                      <div className="flex items-center">
                        <input type="radio" id="true" name="tf-answer" className="mr-2" />
                        <Label htmlFor="true">True</Label>
                      </div>
                      <div className="flex items-center">
                        <input type="radio" id="false" name="tf-answer" className="mr-2" defaultChecked />
                        <Label htmlFor="false">False</Label>
                      </div>
                    </div>
                  </div>
                )}
                
                {(questionType === "Short Answer") && (
                  <div className="space-y-2">
                    <Label htmlFor="shortAnswer">Correct Answer</Label>
                    <Input id="shortAnswer" placeholder="Enter the correct answer" />
                    <div className="text-xs text-muted-foreground">
                      Student answers will be checked against this answer.
                    </div>
                  </div>
                )}
                
                {(questionType === "Long Answer") && (
                  <div className="space-y-2">
                    <Label htmlFor="rubric">Grading Rubric</Label>
                    <Textarea 
                      id="rubric" 
                      placeholder="Enter grading criteria or information for manual grading" 
                      rows={3}
                    />
                    <div className="text-xs text-muted-foreground">
                      Long answers will require manual grading.
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="points">Points</Label>
                  <Input id="points" type="number" defaultValue="5" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setIsAddingQuestion(false)}>Cancel</Button>
                <Button onClick={handleSaveQuestion}>Add Question</Button>
              </CardFooter>
            </Card>
          ) : (
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>Create New Assessment</CardTitle>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Assessment Title</Label>
                    <Input id="title" placeholder="e.g., Midterm Examination" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="class">Class</Label>
                      <Select defaultValue="Class 9A">
                        <SelectTrigger>
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Class 7A">Class 7A</SelectItem>
                          <SelectItem value="Class 8B">Class 8B</SelectItem>
                          <SelectItem value="Class 9A">Class 9A</SelectItem>
                          <SelectItem value="Class 10B">Class 10B</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Select defaultValue="Mathematics">
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Mathematics">Mathematics</SelectItem>
                          <SelectItem value="Science">Science</SelectItem>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="History">History</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="type">Assessment Type</Label>
                      <Select defaultValue="Quiz">
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Quiz">Quiz</SelectItem>
                          <SelectItem value="Exam">Exam</SelectItem>
                          <SelectItem value="Assignment">Assignment</SelectItem>
                          <SelectItem value="Project">Project</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Due Date</Label>
                      <Input id="date" type="date" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration (minutes)</Label>
                      <Input id="duration" type="number" defaultValue="45" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="instructions">Instructions</Label>
                    <Textarea id="instructions" placeholder="Provide instructions for students" rows={3} />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label>Questions (0)</Label>
                      <Button type="button" variant="outline" size="sm" className="gap-1" onClick={handleAddQuestion}>
                        <Plus className="h-4 w-4" /> Add Question
                      </Button>
                    </div>
                    
                    <Card className="border border-dashed">
                      <CardContent className="p-8 text-center">
                        <ClipboardCheck className="h-10 w-10 mx-auto mb-2 text-muted-foreground opacity-50" />
                        <p className="text-muted-foreground">No questions added yet</p>
                        <p className="text-sm text-muted-foreground mb-4">Click the 'Add Question' button to start creating questions</p>
                        <Button type="button" onClick={handleAddQuestion}>Add First Question</Button>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button">Save as Draft</Button>
                  <Button type="submit">Create Assessment</Button>
                </CardFooter>
              </form>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
