
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Users, BookOpen, FileText, ClipboardCheck, Calendar, Clock
} from "lucide-react";

// Mock data
const studentCount = 85;
const courseCount = 4;
const materialsCount = 18;
const pendingApprovalsCount = 2;

const todaysClasses = [
  {
    id: 1,
    name: "Advanced Calculus",
    room: "301",
    studentCount: 28,
    startTime: "10:00 AM",
    endTime: "11:30 AM",
  },
  {
    id: 2,
    name: "Linear Algebra",
    room: "204",
    studentCount: 32,
    startTime: "01:00 PM",
    endTime: "02:30 PM",
  },
];

const pendingAssignments = [
  {
    id: 1,
    name: "Calculus Mid-term Paper",
    dueDate: "10/18/2023",
    progress: "18/28",
  },
  {
    id: 2,
    name: "Linear Algebra Problem Set",
    dueDate: "10/22/2023",
    progress: "22/32",
  },
];

export default function TeacherDashboard() {
  const { user } = useAuth();
  
  return (
    <DashboardLayout 
      role="teacher" 
      title="Teacher Dashboard"
      subtitle={`Welcome back, ${user?.name}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-muted-foreground text-sm">Students</div>
                <div className="text-3xl font-bold">{studentCount}</div>
                <div className="text-xs text-muted-foreground">Across all your courses</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-muted-foreground text-sm">Courses</div>
                <div className="text-3xl font-bold">{courseCount}</div>
                <div className="text-xs text-muted-foreground">Active courses this semester</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-muted-foreground text-sm">Materials</div>
                <div className="text-3xl font-bold">{materialsCount}</div>
                <div className="text-xs text-muted-foreground">Published study materials</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <ClipboardCheck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-muted-foreground text-sm">Pending Approvals</div>
                <div className="text-3xl font-bold">{pendingApprovalsCount}</div>
                <div className="text-xs text-muted-foreground">Materials awaiting admin approval</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Today's Classes</CardTitle>
            <div className="text-sm text-muted-foreground">Your scheduled classes for today</div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {todaysClasses.map((classItem) => (
                <div key={classItem.id} className="border rounded-lg overflow-hidden">
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{classItem.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {classItem.startTime} - {classItem.endTime}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Room {classItem.room} 
                      <span className="ml-2 flex items-center gap-1">
                        <Users className="h-3 w-3" /> {classItem.studentCount}
                      </span>
                    </div>
                  </div>
                  <div className="bg-muted p-3 flex justify-between">
                    <Button variant="outline" size="sm">View Materials</Button>
                    <Button size="sm">Start Class</Button>
                  </div>
                </div>
              ))}
              
              {todaysClasses.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-10 w-10 mx-auto mb-2 opacity-20" />
                  <p>No classes scheduled for today</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Pending Assignments</CardTitle>
            <div className="text-sm text-muted-foreground">Review and grade student submissions</div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {pendingAssignments.map((assignment) => (
                <div key={assignment.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{assignment.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Due: {assignment.dueDate}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium text-primary">{assignment.progress}</span>
                    </div>
                    <Progress value={parseInt(assignment.progress.split('/')[0]) / parseInt(assignment.progress.split('/')[1]) * 100} />
                  </div>
                  
                  <Button className="w-full">Review Submissions</Button>
                </div>
              ))}
              
              {pendingAssignments.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <ClipboardCheck className="h-10 w-10 mx-auto mb-2 opacity-20" />
                  <p>No pending assignments to review</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-start gap-4 border-b pb-4">
                <div className="bg-muted rounded-full p-2 h-8 w-8 flex items-center justify-center">
                  {i % 3 === 0 ? (
                    <Users className="h-4 w-4" />
                  ) : i % 3 === 1 ? (
                    <FileText className="h-4 w-4" />
                  ) : (
                    <Clock className="h-4 w-4" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">
                      {i % 3 === 0
                        ? "Student submission received"
                        : i % 3 === 1
                        ? "Study material approved"
                        : "Assignment deadline extended"}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {i % 2 === 0 ? "2 hours ago" : "1 day ago"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {i % 3 === 0
                      ? "John Smith submitted Math Assignment #3"
                      : i % 3 === 1
                      ? "Introduction to Calculus was approved by Admin"
                      : "Linear Algebra Problem Set deadline extended by 2 days"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
