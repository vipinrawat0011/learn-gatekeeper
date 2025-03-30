
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  Search, Edit, Trash2, UserPlus, Lock, Unlock
} from "lucide-react";
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
import {
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger
} from "@/components/ui/tabs";

// Mock teacher data
const teachersData = [
  { 
    id: 1, 
    name: "Dr. Alan Turing", 
    email: "turing@scholarway.com", 
    subjects: ["Mathematics", "Computer Science"], 
    classes: ["1A", "2B", "12A"], 
    status: "Active" 
  },
  { 
    id: 2, 
    name: "Dr. Marie Curie", 
    email: "curie@scholarway.com", 
    subjects: ["Physics", "Chemistry"], 
    classes: ["9A", "10B", "12A"], 
    status: "Active" 
  },
  { 
    id: 3, 
    name: "Prof. Grace Hopper", 
    email: "hopper@scholarway.com", 
    subjects: ["Computer Science"], 
    classes: ["11A", "12B"], 
    status: "Active" 
  },
  { 
    id: 4, 
    name: "Dr. Rosalind Franklin", 
    email: "franklin@scholarway.com", 
    subjects: ["Chemistry", "Biology"], 
    classes: ["9A", "10B"], 
    status: "Active" 
  },
];

// Mock student data
const studentsData = [
  { 
    id: 1, 
    name: "Alex Johnson", 
    email: "alex@scholarway.com", 
    class: "1", 
    section: "A", 
    scholarLevel: "Junior Scholar" 
  },
  { 
    id: 2, 
    name: "Sarah Davis", 
    email: "sarah@scholarway.com", 
    class: "2", 
    section: "B", 
    scholarLevel: "Rising Intellect" 
  },
  { 
    id: 3, 
    name: "Michael Brown", 
    email: "michael@scholarway.com", 
    class: "3", 
    section: "A", 
    scholarLevel: "Mastermind Elite" 
  },
  { 
    id: 4, 
    name: "Emma Wilson", 
    email: "emma@scholarway.com", 
    class: "4", 
    section: "A", 
    scholarLevel: "Junior Scholar" 
  },
];

export default function UserManagementPage() {
  const [activeTab, setActiveTab] = useState<string>("teachers");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [classes, setClasses] = useState<string[]>([]);
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  
  const SubjectBadge = ({ subject }: { subject: string }) => (
    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-blue-50 text-blue-700 border-blue-200 mr-1">
      {subject}
    </span>
  );
  
  const ClassBadge = ({ className }: { className: string }) => (
    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-slate-50 text-slate-700 border-slate-200 mr-1">
      {className}
    </span>
  );
  
  const ScholarLevelBadge = ({ level }: { level: string }) => {
    let bgColor = "";
    
    switch (level) {
      case "Junior Scholar":
        bgColor = "bg-amber-100 text-amber-800 border-amber-200";
        break;
      case "Rising Intellect":
        bgColor = "bg-amber-200 text-amber-800 border-amber-300";
        break;
      case "Mastermind Elite":
        bgColor = "bg-green-100 text-green-800 border-green-200";
        break;
      default:
        bgColor = "bg-gray-100 text-gray-800 border-gray-200";
    }
    
    return (
      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${bgColor}`}>
        {level}
      </span>
    );
  };
  
  return (
    <DashboardLayout 
      role="admin" 
      title="User Management"
      subtitle="Manage teachers and students"
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-2xl font-bold">User Management</h2>
          
          <Button onClick={() => setShowAddDialog(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Create {activeTab === "teachers" ? "Teacher" : "Student"}
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-1">
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="teachers">Teachers</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
            </TabsList>
            
            <div className="p-4">
              <div className="relative w-full max-w-sm mb-6">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder={`Search ${activeTab}...`}
                  className="pl-8" 
                />
              </div>
              
              <TabsContent value="teachers" className="mt-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Subjects</TableHead>
                      <TableHead>Classes</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teachersData.map((teacher) => (
                      <TableRow key={teacher.id}>
                        <TableCell className="font-medium">{teacher.name}</TableCell>
                        <TableCell>{teacher.email}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {teacher.subjects.map((subject) => (
                              <SubjectBadge key={subject} subject={subject} />
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {teacher.classes.map((cls) => (
                              <ClassBadge key={cls} className={cls} />
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                            teacher.status === "Active" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-gray-100 text-gray-800"
                          }`}>
                            {teacher.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right space-x-1">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            {teacher.status === "Active" ? (
                              <Lock className="h-4 w-4" />
                            ) : (
                              <Unlock className="h-4 w-4" />
                            )}
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="students" className="mt-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Section</TableHead>
                      <TableHead>Scholar Level</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentsData.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>Grade {student.class}</TableCell>
                        <TableCell>Section {student.section}</TableCell>
                        <TableCell>
                          <ScholarLevelBadge level={student.scholarLevel} />
                        </TableCell>
                        <TableCell className="text-right space-x-1">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Lock className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
      
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              Create New {activeTab === "teachers" ? "Teacher" : "Student"}
            </DialogTitle>
            <DialogDescription>
              Fill in the details to create a new {activeTab === "teachers" ? "teacher" : "student"} account.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" placeholder="Full Name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input id="email" type="email" placeholder="Email Address" className="col-span-3" />
            </div>
            
            {activeTab === "teachers" ? (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="subjects" className="text-right">
                    Subjects
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select subjects" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="history">History</SelectItem>
                      <SelectItem value="geography">Geography</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="chemistry">Chemistry</SelectItem>
                      <SelectItem value="biology">Biology</SelectItem>
                      <SelectItem value="computerscience">Computer Science</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="classes" className="text-right">
                    Classes
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select classes" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      <SelectItem value="1a">Class 1A</SelectItem>
                      <SelectItem value="1b">Class 1B</SelectItem>
                      <SelectItem value="2a">Class 2A</SelectItem>
                      <SelectItem value="2b">Class 2B</SelectItem>
                      <SelectItem value="3a">Class 3A</SelectItem>
                      <SelectItem value="3b">Class 3B</SelectItem>
                      <SelectItem value="4a">Class 4A</SelectItem>
                      <SelectItem value="4b">Class 4B</SelectItem>
                      <SelectItem value="5a">Class 5A</SelectItem>
                      <SelectItem value="5b">Class 5B</SelectItem>
                      <SelectItem value="6a">Class 6A</SelectItem>
                      <SelectItem value="6b">Class 6B</SelectItem>
                      <SelectItem value="7a">Class 7A</SelectItem>
                      <SelectItem value="7b">Class 7B</SelectItem>
                      <SelectItem value="8a">Class 8A</SelectItem>
                      <SelectItem value="8b">Class 8B</SelectItem>
                      <SelectItem value="9a">Class 9A</SelectItem>
                      <SelectItem value="9b">Class 9B</SelectItem>
                      <SelectItem value="10a">Class 10A</SelectItem>
                      <SelectItem value="10b">Class 10B</SelectItem>
                      <SelectItem value="11a">Class 11A</SelectItem>
                      <SelectItem value="11b">Class 11B</SelectItem>
                      <SelectItem value="12a">Class 12A</SelectItem>
                      <SelectItem value="12b">Class 12B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="class" className="text-right">
                    Class
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a class" />
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
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="section" className="text-right">
                    Section
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a section" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">A</SelectItem>
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select defaultValue="active">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Create {activeTab === "teachers" ? "Teacher" : "Student"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
