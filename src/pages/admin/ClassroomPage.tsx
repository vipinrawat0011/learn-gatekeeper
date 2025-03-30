
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Search, UserPlus, Edit, Trash2, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

// Mock classroom data
const classroomsData = [
  { 
    id: 1, 
    name: "Class 1A", 
    grade: 1, 
    section: "A", 
    teacher: "Dr. Alan Turing", 
    students: 2, 
    subjects: 3 
  },
  { 
    id: 2, 
    name: "Class 1B", 
    grade: 1, 
    section: "B", 
    teacher: "Dr. Marie Curie", 
    students: 1, 
    subjects: 3 
  },
  { 
    id: 3, 
    name: "Class 2A", 
    grade: 2, 
    section: "A", 
    teacher: "Prof. Grace Hopper", 
    students: 2, 
    subjects: 3 
  },
  { 
    id: 4, 
    name: "Class 12A", 
    grade: 12, 
    section: "A", 
    teacher: "Dr. Rosalind Franklin", 
    students: 2, 
    subjects: 4 
  },
  { 
    id: 5, 
    name: "Class 12B", 
    grade: 12, 
    section: "B", 
    teacher: "Prof. Grace Hopper", 
    students: 1, 
    subjects: 4 
  },
];

// Mock teachers data
const teachersData = [
  { id: 1, name: "Dr. Alan Turing" },
  { id: 2, name: "Dr. Marie Curie" },
  { id: 3, name: "Prof. Grace Hopper" },
  { id: 4, name: "Dr. Rosalind Franklin" },
];

// Mock subjects data
const subjectsData = [
  { id: 1, name: "Mathematics" },
  { id: 2, name: "Science" },
  { id: 3, name: "English" },
  { id: 4, name: "Physics" },
  { id: 5, name: "Chemistry" },
  { id: 6, name: "Biology" },
  { id: 7, name: "Computer Science" },
  { id: 8, name: "History" },
  { id: 9, name: "Geography" },
];

export default function ClassroomPage() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedTeacher, setSelectedTeacher] = useState<string>("");
  const [assignedSubjects, setAssignedSubjects] = useState<{subject: string, teacher: string}[]>([
    { subject: "Mathematics", teacher: "Dr. Alan Turing" }
  ]);
  
  const handleAddSubject = () => {
    if (selectedSubject && selectedTeacher) {
      setAssignedSubjects([
        ...assignedSubjects,
        { subject: selectedSubject, teacher: selectedTeacher }
      ]);
      setSelectedSubject("");
      setSelectedTeacher("");
    }
  };
  
  const handleRemoveSubject = (index: number) => {
    setAssignedSubjects(assignedSubjects.filter((_, i) => i !== index));
  };
  
  return (
    <DashboardLayout 
      role="admin" 
      title="Classroom Management"
      subtitle="Create and manage classrooms"
    >
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Classroom Management</h2>
          <Button onClick={() => setShowCreateDialog(true)}>
            <UserPlus className="h-4 w-4 mr-2" /> Create Classroom
          </Button>
        </div>
      </div>
      
      <div className="relative w-full max-w-sm mb-6">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          type="search" 
          placeholder="Search classrooms..." 
          className="pl-8" 
        />
      </div>
      
      <div className="bg-white rounded-lg border overflow-hidden">
        <h3 className="p-4 font-semibold text-lg border-b">All Classrooms</h3>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Section</TableHead>
              <TableHead>Class Teacher</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Subjects</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classroomsData.map((classroom) => (
              <TableRow key={classroom.id}>
                <TableCell className="font-medium">{classroom.name}</TableCell>
                <TableCell>{classroom.grade}</TableCell>
                <TableCell>{classroom.section}</TableCell>
                <TableCell>{classroom.teacher}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{classroom.students} students</span>
                  </div>
                </TableCell>
                <TableCell>{classroom.subjects} subjects</TableCell>
                <TableCell className="text-right space-x-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Users className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Classroom</DialogTitle>
            <DialogDescription>
              Set up a new classroom and assign teachers and subjects.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="grade">Grade</Label>
                <Select>
                  <SelectTrigger id="grade">
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((grade) => (
                      <SelectItem key={grade} value={grade.toString()}>
                        Grade {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="section">Section</Label>
                <Select>
                  <SelectTrigger id="section">
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">Section A</SelectItem>
                    <SelectItem value="B">Section B</SelectItem>
                    <SelectItem value="C">Section C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="class-teacher">Class Teacher</Label>
              <Select>
                <SelectTrigger id="class-teacher">
                  <SelectValue placeholder="Assign class teacher" />
                </SelectTrigger>
                <SelectContent>
                  {teachersData.map((teacher) => (
                    <SelectItem key={teacher.id} value={teacher.name}>
                      {teacher.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Subjects</Label>
              
              <div className="flex flex-col gap-2">
                {assignedSubjects.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 bg-blue-50 p-2 rounded">
                    <div className="flex-1">{item.subject} - {item.teacher}</div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                      onClick={() => handleRemoveSubject(index)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                
                <div className="grid grid-cols-[1fr,1fr,auto] gap-2 items-end">
                  <div>
                    <Select 
                      value={selectedSubject} 
                      onValueChange={setSelectedSubject}
                    >
                      <SelectTrigger id="subject">
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjectsData.map((subject) => (
                          <SelectItem key={subject.id} value={subject.name}>
                            {subject.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Select
                      value={selectedTeacher}
                      onValueChange={setSelectedTeacher}
                    >
                      <SelectTrigger id="teacher">
                        <SelectValue placeholder="Assign teacher" />
                      </SelectTrigger>
                      <SelectContent>
                        {teachersData.map((teacher) => (
                          <SelectItem key={teacher.id} value={teacher.name}>
                            {teacher.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    size="sm" 
                    type="button" 
                    onClick={handleAddSubject}
                    disabled={!selectedSubject || !selectedTeacher}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Classroom</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
