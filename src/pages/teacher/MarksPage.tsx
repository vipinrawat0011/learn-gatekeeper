
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Save, Download, Upload, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function MarksPage() {
  const [selectedClass, setSelectedClass] = useState("10");
  const [selectedSection, setSelectedSection] = useState("A");
  const [selectedSubject, setSelectedSubject] = useState("physics");
  const [selectedExam, setSelectedExam] = useState("midterm");

  const handleSaveMarks = () => {
    toast({
      title: "Marks saved successfully",
      description: "Student marks have been updated",
    });
  };

  return (
    <DashboardLayout
      role="teacher"
      title="Marks Management"
      subtitle="Enter and manage student marks for various assessments"
    >
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-[180px]">
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
        
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="physics">Physics</SelectItem>
            <SelectItem value="chemistry">Chemistry</SelectItem>
            <SelectItem value="biology">Biology</SelectItem>
            <SelectItem value="mathematics">Mathematics</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="flex-grow">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search students..." 
              className="pl-8 w-full" 
            />
          </div>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Enter Marks - Class {selectedClass}{selectedSection} ({selectedSubject.charAt(0).toUpperCase() + selectedSubject.slice(1)})</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={selectedExam} onValueChange={setSelectedExam}>
            <TabsList className="mb-6">
              <TabsTrigger value="midterm">Mid-Term</TabsTrigger>
              <TabsTrigger value="final">Final Exam</TabsTrigger>
              <TabsTrigger value="practicals">Practicals</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
            </TabsList>
            
            <TabsContent value="midterm">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-medium">Mid-Term Examination</h3>
                  <p className="text-sm text-muted-foreground">Maximum marks: 50</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Upload className="h-4 w-4" /> Import
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-4 w-4" /> Export
                  </Button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Roll No.</th>
                      <th className="text-left p-3 font-medium">Student Name</th>
                      <th className="text-left p-3 font-medium">Obtained Marks</th>
                      <th className="text-left p-3 font-medium">Percentage</th>
                      <th className="text-left p-3 font-medium">Grade</th>
                      <th className="text-left p-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 1, rollNo: "10A01", name: "Alice Johnson", marks: 42, status: "Entered" },
                      { id: 2, rollNo: "10A02", name: "Bob Smith", marks: 38, status: "Entered" },
                      { id: 3, rollNo: "10A03", name: "Charlie Brown", marks: 29, status: "Entered" },
                      { id: 4, rollNo: "10A04", name: "Diana Miller", marks: 45, status: "Entered" },
                      { id: 5, rollNo: "10A05", name: "Edward Wilson", marks: "", status: "Pending" },
                    ].map((student) => {
                      const percentage = student.marks ? (parseInt(student.marks as string) / 50) * 100 : 0;
                      let grade = "F";
                      if (percentage >= 90) grade = "A+";
                      else if (percentage >= 80) grade = "A";
                      else if (percentage >= 70) grade = "B+";
                      else if (percentage >= 60) grade = "B";
                      else if (percentage >= 50) grade = "C";
                      else if (percentage >= 40) grade = "D";
                      
                      return (
                        <tr key={student.id} className="border-b hover:bg-muted/30">
                          <td className="p-3">{student.rollNo}</td>
                          <td className="p-3">{student.name}</td>
                          <td className="p-3">
                            <Input
                              type="number"
                              min="0"
                              max="50"
                              defaultValue={student.marks}
                              className="w-24"
                            />
                          </td>
                          <td className="p-3">
                            {student.marks ? `${percentage.toFixed(1)}%` : "-"}
                          </td>
                          <td className="p-3">
                            {student.marks ? grade : "-"}
                          </td>
                          <td className="p-3">
                            <Badge
                              variant={student.status === "Entered" ? "default" : "secondary"}
                            >
                              {student.status}
                            </Badge>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 text-right">
                <Button variant="outline" className="mr-2">Cancel</Button>
                <Button onClick={handleSaveMarks} className="gap-1">
                  <Save className="h-4 w-4" /> Save Marks
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="final">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-medium">Final Examination</h3>
                  <p className="text-sm text-muted-foreground">Maximum marks: 100</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Upload className="h-4 w-4" /> Import
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-4 w-4" /> Export
                  </Button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Roll No.</th>
                      <th className="text-left p-3 font-medium">Student Name</th>
                      <th className="text-left p-3 font-medium">Obtained Marks</th>
                      <th className="text-left p-3 font-medium">Percentage</th>
                      <th className="text-left p-3 font-medium">Grade</th>
                      <th className="text-left p-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 1, rollNo: "10A01", name: "Alice Johnson", marks: "", status: "Upcoming" },
                      { id: 2, rollNo: "10A02", name: "Bob Smith", marks: "", status: "Upcoming" },
                      { id: 3, rollNo: "10A03", name: "Charlie Brown", marks: "", status: "Upcoming" },
                      { id: 4, rollNo: "10A04", name: "Diana Miller", marks: "", status: "Upcoming" },
                      { id: 5, rollNo: "10A05", name: "Edward Wilson", marks: "", status: "Upcoming" },
                    ].map((student) => (
                      <tr key={student.id} className="border-b hover:bg-muted/30">
                        <td className="p-3">{student.rollNo}</td>
                        <td className="p-3">{student.name}</td>
                        <td className="p-3">
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            defaultValue={student.marks}
                            className="w-24"
                            disabled={student.status === "Upcoming"}
                          />
                        </td>
                        <td className="p-3">-</td>
                        <td className="p-3">-</td>
                        <td className="p-3">
                          <Badge variant="secondary">
                            {student.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="practicals">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-medium">Practical Assessments</h3>
                  <p className="text-sm text-muted-foreground">Maximum marks: 30</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Upload className="h-4 w-4" /> Import
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-4 w-4" /> Export
                  </Button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Roll No.</th>
                      <th className="text-left p-3 font-medium">Student Name</th>
                      <th className="text-left p-3 font-medium">Obtained Marks</th>
                      <th className="text-left p-3 font-medium">Percentage</th>
                      <th className="text-left p-3 font-medium">Grade</th>
                      <th className="text-left p-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 1, rollNo: "10A01", name: "Alice Johnson", marks: 28, status: "Entered" },
                      { id: 2, rollNo: "10A02", name: "Bob Smith", marks: 25, status: "Entered" },
                      { id: 3, rollNo: "10A03", name: "Charlie Brown", marks: 20, status: "Entered" },
                      { id: 4, rollNo: "10A04", name: "Diana Miller", marks: 29, status: "Entered" },
                      { id: 5, rollNo: "10A05", name: "Edward Wilson", marks: 24, status: "Entered" },
                    ].map((student) => {
                      const percentage = (parseInt(student.marks as string) / 30) * 100;
                      let grade = "F";
                      if (percentage >= 90) grade = "A+";
                      else if (percentage >= 80) grade = "A";
                      else if (percentage >= 70) grade = "B+";
                      else if (percentage >= 60) grade = "B";
                      else if (percentage >= 50) grade = "C";
                      else if (percentage >= 40) grade = "D";
                      
                      return (
                        <tr key={student.id} className="border-b hover:bg-muted/30">
                          <td className="p-3">{student.rollNo}</td>
                          <td className="p-3">{student.name}</td>
                          <td className="p-3">
                            <Input
                              type="number"
                              min="0"
                              max="30"
                              defaultValue={student.marks}
                              className="w-24"
                            />
                          </td>
                          <td className="p-3">{percentage.toFixed(1)}%</td>
                          <td className="p-3">{grade}</td>
                          <td className="p-3">
                            <Badge variant="default">
                              {student.status}
                            </Badge>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 text-right">
                <Button variant="outline" className="mr-2">Cancel</Button>
                <Button onClick={handleSaveMarks} className="gap-1">
                  <Save className="h-4 w-4" /> Save Marks
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="assignments">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-medium">Assignments</h3>
                  <p className="text-sm text-muted-foreground">Maximum marks: 20</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Upload className="h-4 w-4" /> Import
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-4 w-4" /> Export
                  </Button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Roll No.</th>
                      <th className="text-left p-3 font-medium">Student Name</th>
                      <th className="text-left p-3 font-medium">Assignment 1</th>
                      <th className="text-left p-3 font-medium">Assignment 2</th>
                      <th className="text-left p-3 font-medium">Total</th>
                      <th className="text-left p-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 1, rollNo: "10A01", name: "Alice Johnson", assign1: 9, assign2: 10, status: "Complete" },
                      { id: 2, rollNo: "10A02", name: "Bob Smith", assign1: 8, assign2: 9, status: "Complete" },
                      { id: 3, rollNo: "10A03", name: "Charlie Brown", assign1: 7, assign2: 8, status: "Complete" },
                      { id: 4, rollNo: "10A04", name: "Diana Miller", assign1: 10, assign2: 9, status: "Complete" },
                      { id: 5, rollNo: "10A05", name: "Edward Wilson", assign1: 8, assign2: "", status: "Partial" },
                    ].map((student) => {
                      const total = (student.assign1 || 0) + (student.assign2 || 0);
                      
                      return (
                        <tr key={student.id} className="border-b hover:bg-muted/30">
                          <td className="p-3">{student.rollNo}</td>
                          <td className="p-3">{student.name}</td>
                          <td className="p-3">
                            <Input
                              type="number"
                              min="0"
                              max="10"
                              defaultValue={student.assign1}
                              className="w-20"
                            />
                          </td>
                          <td className="p-3">
                            <Input
                              type="number"
                              min="0"
                              max="10"
                              defaultValue={student.assign2}
                              className="w-20"
                            />
                          </td>
                          <td className="p-3">{total}/20</td>
                          <td className="p-3">
                            <Badge
                              variant={student.status === "Complete" ? "default" : "secondary"}
                            >
                              {student.status}
                            </Badge>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 text-right">
                <Button variant="outline" className="mr-2">Cancel</Button>
                <Button onClick={handleSaveMarks} className="gap-1">
                  <Save className="h-4 w-4" /> Save Marks
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Class Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Class Average</p>
              <p className="text-3xl font-bold text-primary">76%</p>
              <div className="mt-2 flex justify-center">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Grade B+</Badge>
              </div>
            </div>
            
            <div className="border rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Highest Score</p>
              <p className="text-3xl font-bold text-green-600">95%</p>
              <div className="mt-2 flex justify-center">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Alice Johnson</Badge>
              </div>
            </div>
            
            <div className="border rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Students Below Passing</p>
              <p className="text-3xl font-bold text-amber-600">2</p>
              <div className="mt-2 flex justify-center">
                <Badge variant="outline" className="bg-amber-50">Need Attention</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
