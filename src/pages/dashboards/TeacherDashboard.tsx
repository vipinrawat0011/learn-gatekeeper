
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Progress } from "@/components/ui/progress";
import { 
  Users, BookOpen, FileText, ClipboardCheck, Calendar, Clock, ArrowRight
} from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

// Mock data
const studentCount = 85;
const courseCount = 4;
const materialsCount = 18;
const pendingApprovalsCount = 2;

// Performance data for chart
const performanceData = [
  { name: "Week 1", juniorAvg: 65, risingAvg: 75, eliteAvg: 90 },
  { name: "Week 2", juniorAvg: 68, risingAvg: 78, eliteAvg: 92 },
  { name: "Week 3", juniorAvg: 70, risingAvg: 82, eliteAvg: 95 },
  { name: "Week 4", juniorAvg: 72, risingAvg: 80, eliteAvg: 91 },
  { name: "Week 5", juniorAvg: 75, risingAvg: 85, eliteAvg: 94 },
];

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
    dueDate: "Oct 18, 2023",
    progress: "18/28",
  },
  {
    id: 2,
    name: "Linear Algebra Problem Set",
    dueDate: "Oct 22, 2023",
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
        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Total Students</div>
                <div className="text-2xl font-bold">{studentCount}</div>
                <div className="text-xs text-muted-foreground">Across all your classes</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Courses Teaching</div>
                <div className="text-2xl font-bold">{courseCount}</div>
                <div className="text-xs text-muted-foreground">Active this semester</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Study Materials</div>
                <div className="text-2xl font-bold">{materialsCount}</div>
                <div className="text-xs text-muted-foreground">Published materials</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <ClipboardCheck className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Pending Assessments</div>
                <div className="text-2xl font-bold">{pendingApprovalsCount}</div>
                <div className="text-xs text-muted-foreground">Need review</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-0">
            <CardTitle className="text-lg font-medium">Today's Classes</CardTitle>
            <div className="text-sm text-muted-foreground">Your scheduled classes for today</div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mt-4">
              {todaysClasses.map((classItem) => (
                <div key={classItem.id} className="border rounded-lg overflow-hidden">
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <Calendar className="h-5 w-5 text-blue-600" />
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
        
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-0">
            <CardTitle className="text-lg font-medium">Student Performance</CardTitle>
            <div className="text-sm text-muted-foreground">League performance by week</div>
          </CardHeader>
          <CardContent>
            <div className="h-[265px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={performanceData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="juniorAvg" name="Junior Scholar" fill="#F97316" />
                  <Bar dataKey="risingAvg" name="Rising Intellect" fill="#8884d8" />
                  <Bar dataKey="eliteAvg" name="Mastermind Elite" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-0">
            <CardTitle className="text-lg font-medium">Pending Assignments</CardTitle>
            <div className="text-sm text-muted-foreground">Review and grade student submissions</div>
          </CardHeader>
          <CardContent>
            <div className="space-y-5 mt-4">
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
                      <span>Submissions</span>
                      <span className="font-medium text-primary">{assignment.progress}</span>
                    </div>
                    <Progress value={parseInt(assignment.progress.split('/')[0]) / parseInt(assignment.progress.split('/')[1]) * 100} className="h-2" />
                  </div>
                  
                  <Button className="w-full" size="sm">Review Submissions</Button>
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
        
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-0">
            <CardTitle className="text-lg font-medium">Recent Activities</CardTitle>
            <div className="text-sm text-muted-foreground">Latest actions and updates</div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mt-4">
              {[
                { title: "Emma Wilson completed Algebra Quiz", time: "2 hours ago", icon: <ClipboardCheck className="h-4 w-4" /> },
                { title: "New study material approved", time: "1 day ago", icon: <FileText className="h-4 w-4" /> },
                { title: "Assignment deadline extended for Class 9A", time: "1 day ago", icon: <Clock className="h-4 w-4" /> },
                { title: "Sophia Lee submitted Geometry Assignment", time: "2 days ago", icon: <ClipboardCheck className="h-4 w-4" /> },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-4 border-b last:border-0 pb-4 last:pb-0">
                  <div className="bg-muted rounded-full p-2 h-8 w-8 flex items-center justify-center">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">{activity.title}</p>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
