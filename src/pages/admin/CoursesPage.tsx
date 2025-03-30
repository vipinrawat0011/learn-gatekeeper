
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { FileText, Search, Filter, Plus } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";

// Mock course data
const coursesData = [
  {
    id: 1,
    title: "Advanced Mathematics",
    description: "Master the concepts of differential equations and calculus",
    image: "/lovable-uploads/be63b126-6fdb-4777-913e-c98b7850e453.png",
    subject: "Mathematics",
    instructor: "Dr. Alan Turing",
    level: "Intermediate",
    duration: 8,
    progress: 25,
    students: 325
  },
  {
    id: 2,
    title: "Quantum Physics",
    description: "Explore the fascinating world of quantum mechanics",
    image: "/lovable-uploads/23e826e0-5038-4adb-a01a-e4fbd403f860.png",
    subject: "Physics",
    instructor: "Dr. Marie Curie",
    level: "Advanced",
    duration: 10,
    progress: 68,
    students: 248
  },
  {
    id: 3,
    title: "Introduction to Programming",
    description: "Learn the fundamentals of computer science, algorithms, and coding",
    image: "/lovable-uploads/586ac424-f00c-4e54-af47-75d6d5128ad4.png",
    subject: "Computer Science",
    instructor: "Prof. Grace Hopper",
    level: "Beginner",
    duration: 6,
    progress: 92,
    students: 420
  },
  {
    id: 4,
    title: "Organic Chemistry",
    description: "Understand the principles and reactions in organic chemistry",
    image: "/lovable-uploads/9b896478-0b27-4bc3-a097-4b9484e32bdf.png",
    subject: "Chemistry",
    instructor: "Dr. Rosalind Franklin",
    level: "Intermediate",
    duration: 8,
    progress: 0,
    students: 305
  }
];

export default function CoursesPage() {
  const [selectedGrade, setSelectedGrade] = useState("1");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [activeTab, setActiveTab] = useState("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showCurriculumDialog, setShowCurriculumDialog] = useState(false);
  
  return (
    <DashboardLayout 
      role="admin" 
      title="Courses Management"
      subtitle="Discover and enroll in a wide range of educational content"
    >
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold">Courses</h2>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowCurriculumDialog(true)}>
              <FileText className="h-4 w-4 mr-2" /> View Curriculum
            </Button>
            <Button onClick={() => setShowAddDialog(true)}>
              <Plus className="h-4 w-4 mr-2" /> Add Course
            </Button>
          </div>
        </div>
        <p className="text-muted-foreground mb-6">Discover and manage courses for different grade levels</p>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Courses</TabsTrigger>
            <TabsTrigger value="my">My Courses</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search courses..." 
                className="pl-8 w-[300px]" 
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Select value={selectedGrade} onValueChange={setSelectedGrade}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Select Grade" />
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
            
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Select Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Levels">All Levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {coursesData.map((course) => (
            <div key={course.id} className="bg-white rounded-lg border overflow-hidden flex flex-col">
              <div className="h-40 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="text-xs font-medium text-blue-600 mb-1">{course.subject}</div>
                <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">{course.description}</p>
                
                <div className="text-sm text-muted-foreground mb-2">
                  <span className="inline-block w-4 h-4 rounded-full bg-gray-200 mr-2 align-text-bottom">
                    <span className="sr-only">Instructor</span>
                  </span>
                  {course.instructor}
                </div>
                
                <div className="mb-2 flex items-center text-sm text-gray-600">
                  <span className="font-medium mr-auto">{course.level}</span>
                  <span className="text-right">{course.duration} weeks</span>
                </div>
                
                <div className="mt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Overall Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {course.students} students
                  </div>
                </div>
                
                <Button variant="outline" className="mt-4 w-full">View Course Details</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Add New Course Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Course</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new course for students.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Course title" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Brief description of the course"
                className="resize-none"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="grade">Grade</Label>
                <Select>
                  <SelectTrigger>
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
                <Label htmlFor="subject">Subject</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                    <SelectItem value="biology">Biology</SelectItem>
                    <SelectItem value="computerscience">Computer Science</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="geography">Geography</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (weeks)</Label>
                <Input id="duration" type="number" min="1" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="level">Level</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Course</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Curriculum Dialog */}
      <Dialog open={showCurriculumDialog} onOpenChange={setShowCurriculumDialog}>
        <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Curriculum for Grade 1</DialogTitle>
            <DialogDescription>
              Syllabus and learning outcomes for each subject
            </DialogDescription>
          </DialogHeader>
          
          <div className="mb-6">
            <Label htmlFor="curriculum-grade">Select Grade:</Label>
            <Select defaultValue="1">
              <SelectTrigger className="w-[200px] mt-2">
                <SelectValue placeholder="Select Grade" />
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
          
          <div className="space-y-6">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">Mathematics</h3>
                <Button variant="ghost" size="sm">
                  <span className="sr-only">Toggle</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m18 15-6-6-6 6"></path></svg>
                </Button>
              </div>
              
              <div className="mt-4">
                <h4 className="font-medium mb-2">Numbers and counting (6 weeks)</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li className="text-sm">Counting to 10</li>
                  <li className="text-sm">Number recognition</li>
                  <li className="text-sm">Basic addition</li>
                </ul>
                
                <h4 className="font-medium mt-4 mb-2">Shapes and patterns (4 weeks)</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li className="text-sm">Basic shapes</li>
                  <li className="text-sm">Pattern recognition</li>
                  <li className="text-sm">Size comparison</li>
                </ul>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">Science</h3>
                <Button variant="ghost" size="sm">
                  <span className="sr-only">Toggle</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m18 15-6-6-6 6"></path></svg>
                </Button>
              </div>
              
              <div className="mt-4">
                <h4 className="font-medium mb-2">Plants and animals (5 weeks)</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li className="text-sm">Living things</li>
                  <li className="text-sm">Plant parts</li>
                  <li className="text-sm">Animal homes</li>
                </ul>
                
                <h4 className="font-medium mt-4 mb-2">Weather (3 weeks)</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li className="text-sm">Seasons</li>
                  <li className="text-sm">Weather conditions</li>
                </ul>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
