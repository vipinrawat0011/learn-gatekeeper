
import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calculator, Check, Edit, Filter, Save, Search } from "lucide-react";

// Mock data for testing
const studentsData = [
  { 
    id: 1, 
    name: "Alex Johnson", 
    class: "10A", 
    midTermMarks: 85, 
    finalMarks: 92, 
    assignments: 90, 
    practicals: 88
  },
  { 
    id: 2, 
    name: "Priya Sharma", 
    class: "10A", 
    midTermMarks: 78, 
    finalMarks: 82, 
    assignments: 75, 
    practicals: 85
  },
  { 
    id: 3, 
    name: "Michael Lee", 
    class: "10A", 
    midTermMarks: 92, 
    finalMarks: 95, 
    assignments: 88, 
    practicals: 94
  },
  { 
    id: 4, 
    name: "Sophia Chen", 
    class: "10A", 
    midTermMarks: 68, 
    finalMarks: 72, 
    assignments: 65, 
    practicals: 70
  },
  { 
    id: 5, 
    name: "James Wilson", 
    class: "10A", 
    midTermMarks: 75, 
    finalMarks: 80, 
    assignments: 82, 
    practicals: 78
  },
  { 
    id: 6, 
    name: "Emma Brown", 
    class: "10B", 
    midTermMarks: 88, 
    finalMarks: 90, 
    assignments: 92, 
    practicals: 85
  },
  { 
    id: 7, 
    name: "Daniel Taylor", 
    class: "10B", 
    midTermMarks: 72, 
    finalMarks: 68, 
    assignments: 70, 
    practicals: 75
  },
  { 
    id: 8, 
    name: "Olivia Davis", 
    class: "10B", 
    midTermMarks: 95, 
    finalMarks: 98, 
    assignments: 96, 
    practicals: 92
  }
];

export default function MarksPage() {
  const [selectedClass, setSelectedClass] = useState("10A");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingStudentId, setEditingStudentId] = useState<number | null>(null);
  const [editableMarks, setEditableMarks] = useState({
    midTerm: 0,
    final: 0,
    assignment: 0,
    practical: 0
  });
  
  // Filter students based on selected class and search term
  const filteredStudents = studentsData.filter(student => 
    student.class === selectedClass && 
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Calculate average for the selected class
  const classAverage = {
    midTerm: filteredStudents.reduce((sum, student) => sum + student.midTermMarks, 0) / filteredStudents.length,
    final: filteredStudents.reduce((sum, student) => sum + student.finalMarks, 0) / filteredStudents.length,
    assignment: filteredStudents.reduce((sum, student) => sum + student.assignments, 0) / filteredStudents.length,
    practical: filteredStudents.reduce((sum, student) => sum + student.practicals, 0) / filteredStudents.length,
  };
  
  // Start editing student marks
  const handleEditStudent = (student: typeof studentsData[0]) => {
    setEditingStudentId(student.id);
    setEditableMarks({
      midTerm: student.midTermMarks,
      final: student.finalMarks,
      assignment: student.assignments,
      practical: student.practicals
    });
  };
  
  // Save edited marks (would connect to API in real implementation)
  const handleSaveMarks = () => {
    // In a real app, you would save these changes to the database
    console.log("Saving marks for student ID:", editingStudentId, editableMarks);
    setEditingStudentId(null);
  };
  
  // Calculate total marks and grade
  const calculateTotal = (student: typeof studentsData[0]) => {
    const total = student.midTermMarks + student.finalMarks + student.assignments + student.practicals;
    return total / 4; // Simple average
  };
  
  const getGrade = (average: number) => {
    if (average >= 90) return "A+";
    if (average >= 80) return "A";
    if (average >= 70) return "B";
    if (average >= 60) return "C";
    if (average >= 50) return "D";
    return "F";
  };
  
  const getBadgeVariant = (average: number) => {
    if (average >= 80) return "default";
    if (average >= 60) return "secondary";
    return "destructive";
  };

  return (
    <DashboardLayout 
      role="teacher" 
      title="Student Marks"
      subtitle="Manage and view marks for all your students"
    >
      <div className="mb-6 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10A">Class 10A</SelectItem>
                <SelectItem value="10B">Class 10B</SelectItem>
                <SelectItem value="11A">Class 11A</SelectItem>
                <SelectItem value="11B">Class 11B</SelectItem>
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
          
          <Button>
            <Calculator className="h-4 w-4 mr-2" /> Calculate Class Average
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 flex flex-col items-center">
              <p className="text-sm font-medium text-muted-foreground mb-1">Mid-Term Average</p>
              <p className="text-2xl font-bold">
                {classAverage.midTerm.toFixed(1)}%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center">
              <p className="text-sm font-medium text-muted-foreground mb-1">Final Exam Average</p>
              <p className="text-2xl font-bold">
                {classAverage.final.toFixed(1)}%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center">
              <p className="text-sm font-medium text-muted-foreground mb-1">Assignment Average</p>
              <p className="text-2xl font-bold">
                {classAverage.assignment.toFixed(1)}%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center">
              <p className="text-sm font-medium text-muted-foreground mb-1">Practical Average</p>
              <p className="text-2xl font-bold">
                {classAverage.practical.toFixed(1)}%
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Student Marks - {selectedClass}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="marks">
            <TabsList className="mb-4">
              <TabsTrigger value="marks">Marks Sheet</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="marks">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Mid-Term</TableHead>
                      <TableHead>Final Exam</TableHead>
                      <TableHead>Assignments</TableHead>
                      <TableHead>Practicals</TableHead>
                      <TableHead>Average</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>
                          {editingStudentId === student.id ? (
                            <Input 
                              type="number" 
                              className="w-16" 
                              value={editableMarks.midTerm} 
                              onChange={(e) => setEditableMarks({...editableMarks, midTerm: parseInt(e.target.value) || 0})}
                            />
                          ) : (
                            <span>{student.midTermMarks}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {editingStudentId === student.id ? (
                            <Input 
                              type="number" 
                              className="w-16" 
                              value={editableMarks.final} 
                              onChange={(e) => setEditableMarks({...editableMarks, final: parseInt(e.target.value) || 0})}
                            />
                          ) : (
                            <span>{student.finalMarks}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {editingStudentId === student.id ? (
                            <Input 
                              type="number" 
                              className="w-16" 
                              value={editableMarks.assignment} 
                              onChange={(e) => setEditableMarks({...editableMarks, assignment: parseInt(e.target.value) || 0})}
                            />
                          ) : (
                            <span>{student.assignments}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {editingStudentId === student.id ? (
                            <Input 
                              type="number" 
                              className="w-16" 
                              value={editableMarks.practical} 
                              onChange={(e) => setEditableMarks({...editableMarks, practical: parseInt(e.target.value) || 0})}
                            />
                          ) : (
                            <span>{student.practicals}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {calculateTotal(student).toFixed(1)}
                        </TableCell>
                        <TableCell>
                          <Badge variant={getBadgeVariant(calculateTotal(student))}>
                            {getGrade(calculateTotal(student))}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {editingStudentId === student.id ? (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={handleSaveMarks}
                            >
                              <Save className="h-4 w-4 mr-1" /> Save
                            </Button>
                          ) : (
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => handleEditStudent(student)}
                            >
                              <Edit className="h-4 w-4 mr-1" /> Edit
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="analytics">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        Analytics charts would be displayed here, showing the performance distribution
                        for the selected class.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
