
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function PermissionManagementPage() {
  return (
    <DashboardLayout 
      role="superadmin" 
      title="Permission Management"
      subtitle="Manage feature access for admins, teachers, and students"
    >
      <div className="mb-6">
        <Select defaultValue="City School">
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select institution" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="City School">City School</SelectItem>
            <SelectItem value="Valley Academy">Valley Academy</SelectItem>
            <SelectItem value="Tech Institute">Tech Institute</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="admin">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="admin">Admin Features</TabsTrigger>
          <TabsTrigger value="teacher">Teacher Features</TabsTrigger>
          <TabsTrigger value="student">Student Features</TabsTrigger>
        </TabsList>
        
        <TabsContent value="admin">
          <Card>
            <CardHeader>
              <CardTitle>Admin Feature Access</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="font-medium">User Management</h3>
                    <p className="text-sm text-muted-foreground">Manage teachers and students</p>
                  </div>
                  <Switch id="admin-user-management" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="font-medium">Courses Management</h3>
                    <p className="text-sm text-muted-foreground">Manage courses and curriculum</p>
                  </div>
                  <Switch id="admin-courses" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="font-medium">Approvals</h3>
                    <p className="text-sm text-muted-foreground">Approve study materials and assessments</p>
                  </div>
                  <Switch id="admin-approvals" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="font-medium">Student Management</h3>
                    <p className="text-sm text-muted-foreground">Manage student classifications and data</p>
                  </div>
                  <Switch id="admin-student-management" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Progress Tracking</h3>
                    <p className="text-sm text-muted-foreground">Access to analytics and reports</p>
                  </div>
                  <Switch id="admin-progress-tracking" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="teacher">
          <Card>
            <CardHeader>
              <CardTitle>Teacher Feature Access</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="font-medium">Student Performance</h3>
                    <p className="text-sm text-muted-foreground">View student performance data</p>
                  </div>
                  <Switch id="teacher-student-performance" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="font-medium">Study Material</h3>
                    <p className="text-sm text-muted-foreground">Upload and manage study materials</p>
                  </div>
                  <Switch id="teacher-study-material" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="font-medium">Assessments</h3>
                    <p className="text-sm text-muted-foreground">Create and manage assessments</p>
                  </div>
                  <Switch id="teacher-assessments" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Marks Management</h3>
                    <p className="text-sm text-muted-foreground">Enter and manage student marks</p>
                  </div>
                  <Switch id="teacher-marks" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="student">
          <Card>
            <CardHeader>
              <CardTitle>Student Feature Access</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="font-medium">Courses</h3>
                    <p className="text-sm text-muted-foreground">Access to enrolled courses</p>
                  </div>
                  <Switch id="student-courses" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="font-medium">Examinations</h3>
                    <p className="text-sm text-muted-foreground">Access to take exams and assessments</p>
                  </div>
                  <Switch id="student-examinations" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="font-medium">Marks</h3>
                    <p className="text-sm text-muted-foreground">View marks and grades</p>
                  </div>
                  <Switch id="student-marks" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="font-medium">Study Material</h3>
                    <p className="text-sm text-muted-foreground">Access to study materials</p>
                  </div>
                  <Switch id="student-study-material" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">AI Learning Assistant</h3>
                    <p className="text-sm text-muted-foreground">Access to AI-powered learning tools</p>
                  </div>
                  <Switch id="student-ai-assistant" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
