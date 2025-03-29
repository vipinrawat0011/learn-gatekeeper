
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
import { ClipboardCheck, Search, Filter, Plus, Eye, BarChart3, Clock, CheckCircle, XCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function AssessmentsPage() {
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Assessment created",
      description: "Your assessment has been created successfully",
    });
  };

  return (
    <DashboardLayout 
      role="teacher" 
      title="Assessments"
      subtitle="Create and manage assessments for your students"
    >
      <Tabs defaultValue="active">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
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
                  <SelectItem value="all">All Classes</SelectItem>
                  {[6, 7, 8, 9, 10].map((classNum) => (
                    <SelectItem key={classNum} value={classNum.toString()}>
                      Class {classNum}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                  <SelectItem value="biology">Biology</SelectItem>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
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
            
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { id: 1, title: "Physics Mid-Term", class: "10", subject: "Physics", dueDate: "2023-11-15", submittedCount: 12, totalCount: 30 },
              { id: 2, title: "Chemistry Quiz - Periodic Table", class: "9", subject: "Chemistry", dueDate: "2023-11-12", submittedCount: 18, totalCount: 28 },
            ].map((assessment) => (
              <Card key={assessment.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <Badge className="mb-2">
                      Active
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      Due: {new Date(assessment.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{assessment.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="font-medium text-muted-foreground">Class:</span> {assessment.class}
                    </div>
                    <div>
                      <span className="font-medium text-muted-foreground">Subject:</span> {assessment.subject}
                    </div>
                    <div className="col-span-2">
                      <div className="flex items-center mt-2">
                        <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                        <span className="text-sm text-muted-foreground">
                          {assessment.submittedCount}/{assessment.totalCount} submitted
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 flex gap-2">
                  <Button variant="outline" className="w-full" size="sm">
                    <Eye className="h-4 w-4 mr-2" /> View
                  </Button>
                  <Button className="w-full" size="sm">
                    <BarChart3 className="h-4 w-4 mr-2" /> Results
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="upcoming">
          <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {[6, 7, 8, 9, 10].map((classNum) => (
                    <SelectItem key={classNum} value={classNum.toString()}>
                      Class {classNum}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                  <SelectItem value="biology">Biology</SelectItem>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { id: 3, title: "Biology Final Exam", class: "8", subject: "Biology", scheduledDate: "2023-12-10", status: "Scheduled" },
              { id: 4, title: "Mathematics Quiz - Algebra", class: "10", subject: "Mathematics", scheduledDate: "2023-11-25", status: "Ready" },
            ].map((assessment) => (
              <Card key={assessment.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <Badge variant="secondary" className="mb-2">
                      {assessment.status}
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      Scheduled: {new Date(assessment.scheduledDate).toLocaleDateString()}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{assessment.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="font-medium text-muted-foreground">Class:</span> {assessment.class}
                    </div>
                    <div>
                      <span className="font-medium text-muted-foreground">Subject:</span> {assessment.subject}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 flex gap-2">
                  <Button variant="outline" className="w-full" size="sm">
                    <Eye className="h-4 w-4 mr-2" /> Preview
                  </Button>
                  <Button className="w-full" size="sm">
                    <Clock className="h-4 w-4 mr-2" /> Reschedule
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed">
          <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {[6, 7, 8, 9, 10].map((classNum) => (
                    <SelectItem key={classNum} value={classNum.toString()}>
                      Class {classNum}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                  <SelectItem value="biology">Biology</SelectItem>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { id: 5, title: "Physics Quiz - Forces", class: "10", subject: "Physics", completedDate: "2023-10-20", avgScore: 85 },
              { id: 6, title: "Chemistry Mid-Term", class: "9", subject: "Chemistry", completedDate: "2023-10-15", avgScore: 78 },
              { id: 7, title: "Biology Test - Chapter 1-3", class: "8", subject: "Biology", completedDate: "2023-10-10", avgScore: 82 },
            ].map((assessment) => (
              <Card key={assessment.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="mb-2">
                      Completed
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      Completed: {new Date(assessment.completedDate).toLocaleDateString()}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{assessment.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="font-medium text-muted-foreground">Class:</span> {assessment.class}
                    </div>
                    <div>
                      <span className="font-medium text-muted-foreground">Subject:</span> {assessment.subject}
                    </div>
                    <div className="col-span-2">
                      <div className="flex items-center mt-2">
                        <BarChart3 className="h-4 w-4 mr-1 text-blue-500" />
                        <span className="text-sm text-muted-foreground">
                          Average Score: {assessment.avgScore}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 flex gap-2">
                  <Button className="w-full" size="sm">
                    <BarChart3 className="h-4 w-4 mr-2" /> View Results
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Create New Assessment</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Enter title of the assessment" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="class">Class</Label>
                    <Select defaultValue="10">
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        {[6, 7, 8, 9, 10].map((classNum) => (
                          <SelectItem key={classNum} value={classNum.toString()}>
                            Class {classNum}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select defaultValue="physics">
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="physics">Physics</SelectItem>
                        <SelectItem value="chemistry">Chemistry</SelectItem>
                        <SelectItem value="biology">Biology</SelectItem>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Assessment Date</Label>
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
                    <Label>Questions</Label>
                    <Button type="button" variant="outline" size="sm" className="gap-1">
                      <Plus className="h-4 w-4" /> Add Question
                    </Button>
                  </div>
                  
                  <Card className="border border-dashed">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <Label>Question 1</Label>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <XCircle className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </div>
                        </div>
                        <Input placeholder="Enter question text" defaultValue="What is Newton's first law of motion?" />
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Input placeholder="Option 1" defaultValue="Objects at rest stay at rest unless acted upon by a force" className="flex-1" />
                            <Button variant="ghost" size="icon">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input placeholder="Option 2" defaultValue="Force equals mass times acceleration" className="flex-1" />
                            <Button variant="ghost" size="icon">
                              <XCircle className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input placeholder="Option 3" defaultValue="For every action, there is an equal and opposite reaction" className="flex-1" />
                            <Button variant="ghost" size="icon">
                              <XCircle className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input placeholder="Option 4" defaultValue="The acceleration of an object is directly proportional to the force" className="flex-1" />
                            <Button variant="ghost" size="icon">
                              <XCircle className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </div>
                        </div>
                      </div>
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
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
