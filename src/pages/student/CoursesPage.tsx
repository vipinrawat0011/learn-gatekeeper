
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, Clock, FileText, CheckCircle, PlayCircle
} from "lucide-react";

const subjects = ["All", "Mathematics", "Physics", "Chemistry", "Biology", "English"];

const courses = [
  {
    id: 1,
    title: "Advanced Calculus",
    subject: "Mathematics",
    progress: 65,
    instructor: "Dr. Jane Smith",
    totalModules: 12,
    completedModules: 8,
    duration: "10 weeks",
    lastAccessed: "2 hours ago",
  },
  {
    id: 2,
    title: "Physics Fundamentals",
    subject: "Physics",
    progress: 42,
    instructor: "Prof. Richard Brown",
    totalModules: 10,
    completedModules: 4,
    duration: "8 weeks",
    lastAccessed: "1 day ago",
  },
  {
    id: 3,
    title: "English Literature",
    subject: "English",
    progress: 78,
    instructor: "Ms. Emily Jones",
    totalModules: 8,
    completedModules: 6,
    duration: "6 weeks",
    lastAccessed: "3 days ago",
  },
  {
    id: 4,
    title: "Organic Chemistry",
    subject: "Chemistry",
    progress: 30,
    instructor: "Dr. Michael Wilson",
    totalModules: 15,
    completedModules: 4,
    duration: "12 weeks",
    lastAccessed: "1 week ago",
  },
];

const recommendedCourses = [
  {
    id: 5,
    title: "Advanced Physics",
    subject: "Physics",
    instructor: "Dr. Robert Anderson",
    duration: "10 weeks",
    level: "Advanced",
  },
  {
    id: 6,
    title: "Creative Writing",
    subject: "English",
    instructor: "Prof. Sarah Johnson",
    duration: "6 weeks",
    level: "Intermediate",
  },
];

export default function StudentCoursesPage() {
  const [selectedSubject, setSelectedSubject] = useState("All");
  
  // Filter courses based on selected subject
  const filteredCourses = selectedSubject === "All" 
    ? courses 
    : courses.filter(course => course.subject === selectedSubject);
  
  return (
    <DashboardLayout 
      role="student" 
      title="My Courses"
      subtitle="Access and manage your enrolled courses"
    >
      <div className="mb-6">
        <Tabs defaultValue="enrolled">
          <TabsList>
            <TabsTrigger value="enrolled">Enrolled Courses</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <div className="mt-6 mb-4">
            <div className="flex items-center flex-wrap gap-2">
              <span className="text-sm font-medium">Filter by Subject:</span>
              {subjects.map((subject) => (
                <Button 
                  key={subject} 
                  variant={selectedSubject === subject ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSelectedSubject(subject)}
                >
                  {subject}
                </Button>
              ))}
            </div>
          </div>
          
          <TabsContent value="enrolled" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="bg-primary/10 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-xs font-medium text-muted-foreground mb-1">{course.subject}</div>
                        <h3 className="text-lg font-semibold">{course.title}</h3>
                      </div>
                      <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Instructor</div>
                        <div className="font-medium">{course.instructor}</div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Modules</div>
                          <div className="font-medium">{course.completedModules}/{course.totalModules}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Duration</div>
                          <div className="font-medium">{course.duration}</div>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-medium">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      
                      <div className="flex justify-between items-center text-sm text-muted-foreground">
                        <span>Last accessed: {course.lastAccessed}</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button className="flex-1" variant="outline">
                          <FileText className="h-4 w-4 mr-2" /> Materials
                        </Button>
                        <Button className="flex-1">
                          <PlayCircle className="h-4 w-4 mr-2" /> Continue
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredCourses.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-20" />
                  <h3 className="text-lg font-medium mb-2">No courses found</h3>
                  <p className="text-muted-foreground">Try selecting a different subject filter</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="recommended" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedCourses.map((course) => (
                <Card key={course.id}>
                  <div className="bg-primary/10 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-xs font-medium text-muted-foreground mb-1">{course.subject}</div>
                        <h3 className="text-lg font-semibold">{course.title}</h3>
                      </div>
                      <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Instructor</div>
                        <div className="font-medium">{course.instructor}</div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Duration</div>
                          <div className="font-medium">{course.duration}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Level</div>
                          <div className="font-medium">{course.level}</div>
                        </div>
                      </div>
                      
                      <Button className="w-full">Enroll Now</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <div className="bg-green-50 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-xs font-medium text-muted-foreground mb-1">Mathematics</div>
                      <h3 className="text-lg font-semibold">Basic Algebra</h3>
                    </div>
                    <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Instructor</div>
                      <div className="font-medium">Dr. Anna Williams</div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Final Grade</div>
                        <div className="font-medium">A (92%)</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Completed On</div>
                        <div className="font-medium">May 15, 2023</div>
                      </div>
                    </div>
                    
                    <Button className="w-full" variant="outline">
                      View Certificate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
