
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScholarshipBadge } from "@/components/ScholarshipBadge";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Clock, FileText, BookOpen, Calendar
} from "lucide-react";

// Mock data
const overallProgress = 68;

const upcomingAssignments = [
  {
    id: 1,
    title: "Physics Lab Report",
    subject: "Physics",
    dueDate: "10/15/2023",
  },
  {
    id: 2,
    title: "Mathematics Problem Set",
    subject: "Mathematics",
    dueDate: "10/18/2023",
  },
  {
    id: 3,
    title: "Literature Essay",
    subject: "Literature",
    dueDate: "10/20/2023",
  },
];

const upcomingExams = [
  {
    id: 1,
    title: "Mid-term Calculus Exam",
    room: "301",
    date: "10/25/2023",
    time: "10:00 AM",
  },
  {
    id: 2,
    title: "Physics Quiz",
    room: "Lab 102",
    date: "10/20/2023",
    time: "2:30 PM",
  },
];

const recentCourses = [
  {
    id: 1,
    title: "Advanced Calculus",
    instructor: "Dr. Jane Smith",
    progress: 65,
    lastAccessed: "2 hours ago",
  },
  {
    id: 2,
    title: "Physics Fundamentals",
    instructor: "Prof. Richard Brown",
    progress: 42,
    lastAccessed: "1 day ago",
  },
  {
    id: 3,
    title: "English Literature",
    instructor: "Ms. Emily Jones",
    progress: 78,
    lastAccessed: "3 days ago",
  },
];

export default function StudentDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("recent-courses");
  
  return (
    <DashboardLayout 
      role="student" 
      title="Student Dashboard"
      subtitle={`Welcome back, ${user?.name}`}
    >
      <div className="flex justify-end mb-4">
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Current Level</div>
          <ScholarshipBadge level={user?.scholarType || "Junior Scholar"} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Overall Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-5xl font-bold mb-4">{overallProgress}%</div>
              <Progress value={overallProgress} className="h-2 mb-4" />
              <p className="text-sm text-muted-foreground">Keep going! You're making great progress.</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Upcoming Assignments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAssignments.slice(0, 3).map((assignment) => (
                <div key={assignment.id} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{assignment.title}</div>
                    <div className="text-sm text-muted-foreground">{assignment.subject}</div>
                  </div>
                  <div className="text-sm text-right">
                    <div>Due:</div>
                    <div className="font-medium">{assignment.dueDate}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Upcoming Exams
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingExams.map((exam) => (
                <div key={exam.id} className="space-y-1">
                  <div className="font-medium">{exam.title}</div>
                  <div className="text-sm text-muted-foreground">Room {exam.room}</div>
                  <div className="flex justify-between text-sm">
                    <span>{exam.date}</span>
                    <span>{exam.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-8">
        <CardHeader className="pb-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="recent-courses">Recent Courses</TabsTrigger>
              <TabsTrigger value="todays-schedule">Today's Schedule</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="pt-6">
          <TabsContent value="recent-courses" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="p-6">
                    <h3 className="font-medium text-lg mb-1">{course.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">Instructor: {course.instructor}</p>
                    
                    <div className="space-y-1 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-muted-foreground">
                        Last accessed: {course.lastAccessed}
                      </div>
                      <Button>Continue</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="todays-schedule" className="m-0">
            <div className="space-y-4">
              {[
                { time: "9:00 AM - 10:30 AM", subject: "Mathematics", room: "Room 201", teacher: "Dr. Smith" },
                { time: "11:00 AM - 12:30 PM", subject: "Physics", room: "Lab 102", teacher: "Prof. Johnson" },
                { time: "2:00 PM - 3:30 PM", subject: "English", room: "Room 305", teacher: "Ms. Williams" },
              ].map((class_, index) => (
                <div key={index} className="flex border-b pb-4">
                  <div className="w-36 font-medium">{class_.time}</div>
                  <div className="flex-1">
                    <div className="font-medium">{class_.subject}</div>
                    <div className="text-sm text-muted-foreground">{class_.room}</div>
                    <div className="text-sm text-muted-foreground">Teacher: {class_.teacher}</div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Materials
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Learning Path</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { name: "Introduction to Physics", status: "Completed", score: "92%" },
                { name: "Advanced Mathematics", status: "In Progress", progress: 68 },
                { name: "Literature Analysis", status: "Not Started" },
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex-shrink-0 mr-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      item.status === "Completed" 
                        ? "bg-green-100 text-green-600" 
                        : item.status === "In Progress" 
                        ? "bg-blue-100 text-blue-600" 
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="flex items-center">
                      <span className={`text-sm ${
                        item.status === "Completed" 
                          ? "text-green-600" 
                          : item.status === "In Progress" 
                          ? "text-blue-600" 
                          : "text-gray-600"
                      }`}>
                        {item.status}
                      </span>
                      {item.score && <span className="text-sm text-muted-foreground ml-2">Score: {item.score}</span>}
                      {item.progress && (
                        <div className="flex-1 ml-2">
                          <Progress value={item.progress} className="h-1" />
                        </div>
                      )}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    {item.status === "Completed" ? "Review" : item.status === "In Progress" ? "Continue" : "Start"}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Academic Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "Perfect Attendance", description: "No absences for 3 months", icon: "🏆" },
                { name: "Math Wizard", description: "Top score in Mathematics", icon: "🧮" },
                { name: "Science Star", description: "Completed all Physics modules", icon: "⚗️" },
                { name: "Literature Lover", description: "Read 15 books this semester", icon: "📚" },
              ].map((achievement, index) => (
                <Card key={index} className="border">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div>
                      <div className="font-medium">{achievement.name}</div>
                      <div className="text-xs text-muted-foreground">{achievement.description}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
