
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { usePermissions } from "@/contexts/PermissionContext";
import { useToast } from "@/components/ui/use-toast";
import {
  Shield, 
  School, 
  Users, 
  BookOpen, 
  GraduationCap, 
  Save, 
  Check,
  Layers,
  FileText,
  ClipboardCheck,
  BrainCircuit,
  BarChart4,
  Settings,
  Calendar
} from "lucide-react";

export default function PermissionManagementPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("admin");
  const { 
    adminPermissions, 
    teacherPermissions, 
    studentPermissions,
    updateAdminPermission,
    updateTeacherPermission,
    updateStudentPermission,
    savePermissions,
    selectedInstitute,
    setSelectedInstitute,
    allInstitutions
  } = usePermissions();
  
  const handleSavePermissions = () => {
    savePermissions();
    toast({
      title: "Permissions Saved",
      description: `Role permissions for ${selectedInstitute} have been updated successfully.`,
    });
  };

  const handleDiscardChanges = () => {
    // Reload permissions from localStorage
    window.location.reload();
    toast({
      title: "Changes Discarded",
      description: "All changes have been reverted.",
    });
  };

  return (
    <DashboardLayout 
      role="superadmin" 
      title="Permission Manager"
      subtitle="Control access to features for each user role by institution"
    >
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Select value={selectedInstitute} onValueChange={setSelectedInstitute}>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Select an institution" />
              </SelectTrigger>
              <SelectContent>
                {allInstitutions.map(institute => (
                  <SelectItem key={institute} value={institute}>
                    <div className="flex items-center">
                      <School className="h-4 w-4 mr-2" />
                      {institute}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleDiscardChanges}>
              Discard Changes
            </Button>
            <Button onClick={handleSavePermissions}>
              <Save className="h-4 w-4 mr-2" /> Save Changes
            </Button>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-muted-foreground">
          <p>Currently managing permissions for <span className="font-semibold">{selectedInstitute}</span></p>
          <p>Changes made here will affect all users of this institution with the selected role.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card className="border shadow-sm">
          <Tabs defaultValue="admin" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full flex justify-center border-b p-0 mb-0">
              <TabsTrigger value="admin" className="flex-1 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none py-3">
                <Shield className="h-4 w-4 mr-2" /> Admin
              </TabsTrigger>
              <TabsTrigger value="teacher" className="flex-1 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none py-3">
                <BookOpen className="h-4 w-4 mr-2" /> Teacher
              </TabsTrigger>
              <TabsTrigger value="student" className="flex-1 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none py-3">
                <GraduationCap className="h-4 w-4 mr-2" /> Student
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="admin" className="pt-0 mt-0">
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Shield className="h-5 w-5 mr-2" /> Admin Role Permissions for {selectedInstitute}
                  </h3>
                  <p className="text-sm text-muted-foreground">Control who has access to admin tools and dashboards</p>
                </div>
                
                {/* Dashboard Access Section */}
                <div className="mb-6">
                  <h4 className="font-medium text-sm text-center text-primary mb-2">Dashboard Access</h4>
                  <Separator className="mb-4" />
                  
                  <div className="bg-muted/30 p-4 rounded-lg mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">Admin Dashboard</h5>
                        <p className="text-sm text-muted-foreground">Access to admin dashboard</p>
                      </div>
                      <Switch 
                        checked={adminPermissions.dashboard} 
                        onCheckedChange={(checked) => updateAdminPermission('dashboard', checked)}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Feature Access Section */}
                <div>
                  <h4 className="font-medium text-sm text-center text-primary mb-2">Feature Access</h4>
                  <Separator className="mb-4" />
                  
                  <div className="space-y-4">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">User Management</h5>
                          <p className="text-sm text-muted-foreground">User Management functionality</p>
                        </div>
                        <Switch 
                          checked={adminPermissions.userManagement} 
                          onCheckedChange={(checked) => updateAdminPermission('userManagement', checked)}
                        />
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">Classroom</h5>
                          <p className="text-sm text-muted-foreground">Manage classrooms</p>
                        </div>
                        <Switch 
                          checked={adminPermissions.classroom} 
                          onCheckedChange={(checked) => updateAdminPermission('classroom', checked)}
                        />
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">Content Review</h5>
                          <p className="text-sm text-muted-foreground">Review and approve content</p>
                        </div>
                        <Switch 
                          checked={adminPermissions.contentReview} 
                          onCheckedChange={(checked) => updateAdminPermission('contentReview', checked)}
                        />
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">Approvals</h5>
                          <p className="text-sm text-muted-foreground">Approve requests</p>
                        </div>
                        <Switch 
                          checked={adminPermissions.approvals} 
                          onCheckedChange={(checked) => updateAdminPermission('approvals', checked)}
                        />
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">Student Management</h5>
                          <p className="text-sm text-muted-foreground">Manage student classification</p>
                        </div>
                        <Switch 
                          checked={adminPermissions.studentClassification} 
                          onCheckedChange={(checked) => updateAdminPermission('studentClassification', checked)}
                        />
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">Progress Tracking</h5>
                          <p className="text-sm text-muted-foreground">Track student progress</p>
                        </div>
                        <Switch 
                          checked={adminPermissions.progressTracking} 
                          onCheckedChange={(checked) => updateAdminPermission('progressTracking', checked)}
                        />
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">AI Learning</h5>
                          <p className="text-sm text-muted-foreground">Manage AI learning experience</p>
                        </div>
                        <Switch 
                          checked={adminPermissions.aiLearning} 
                          onCheckedChange={(checked) => updateAdminPermission('aiLearning', checked)}
                        />
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">System Status</h5>
                          <p className="text-sm text-muted-foreground">View system status</p>
                        </div>
                        <Switch 
                          checked={adminPermissions.systemStatus} 
                          onCheckedChange={(checked) => updateAdminPermission('systemStatus', checked)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="teacher" className="pt-0 mt-0">
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" /> Teacher Role Permissions for {selectedInstitute}
                  </h3>
                  <p className="text-sm text-muted-foreground">Control what features teachers can access</p>
                </div>
                
                {/* Dashboard Access Section */}
                <div className="mb-6">
                  <h4 className="font-medium text-sm text-center text-primary mb-2">Dashboard Access</h4>
                  <Separator className="mb-4" />
                  
                  <div className="bg-muted/30 p-4 rounded-lg mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">Teacher Dashboard</h5>
                        <p className="text-sm text-muted-foreground">Access to teacher dashboard</p>
                      </div>
                      <Switch 
                        checked={teacherPermissions.dashboard} 
                        onCheckedChange={(checked) => updateTeacherPermission('dashboard', checked)}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Feature Access Section */}
                <div>
                  <h4 className="font-medium text-sm text-center text-primary mb-2">Feature Access</h4>
                  <Separator className="mb-4" />
                  
                  <div className="space-y-4">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">My Classroom</h5>
                          <p className="text-sm text-muted-foreground">Manage classroom activities</p>
                        </div>
                        <Switch 
                          checked={teacherPermissions.myClassroom} 
                          onCheckedChange={(checked) => updateTeacherPermission('myClassroom', checked)}
                        />
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">Subject</h5>
                          <p className="text-sm text-muted-foreground">Manage subject materials</p>
                        </div>
                        <Switch 
                          checked={teacherPermissions.subject} 
                          onCheckedChange={(checked) => updateTeacherPermission('subject', checked)}
                        />
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">Student Performance</h5>
                          <p className="text-sm text-muted-foreground">View student performance</p>
                        </div>
                        <Switch 
                          checked={teacherPermissions.studentPerformance} 
                          onCheckedChange={(checked) => updateTeacherPermission('studentPerformance', checked)}
                        />
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">Courses</h5>
                          <p className="text-sm text-muted-foreground">Manage courses</p>
                        </div>
                        <Switch 
                          checked={teacherPermissions.courses} 
                          onCheckedChange={(checked) => updateTeacherPermission('courses', checked)}
                        />
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">Assessments</h5>
                          <p className="text-sm text-muted-foreground">Create and manage assessments</p>
                        </div>
                        <Switch 
                          checked={teacherPermissions.assessments} 
                          onCheckedChange={(checked) => updateTeacherPermission('assessments', checked)}
                        />
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">Schedule</h5>
                          <p className="text-sm text-muted-foreground">Manage schedule</p>
                        </div>
                        <Switch 
                          checked={teacherPermissions.schedule} 
                          onCheckedChange={(checked) => updateTeacherPermission('schedule', checked)}
                        />
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">Marks</h5>
                          <p className="text-sm text-muted-foreground">Manage student marks</p>
                        </div>
                        <Switch 
                          checked={teacherPermissions.marks} 
                          onCheckedChange={(checked) => updateTeacherPermission('marks', checked)}
                        />
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">Study Materials</h5>
                          <p className="text-sm text-muted-foreground">Upload and manage study materials</p>
                        </div>
                        <Switch 
                          checked={teacherPermissions.studyMaterials} 
                          onCheckedChange={(checked) => updateTeacherPermission('studyMaterials', checked)}
                        />
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">Students</h5>
                          <p className="text-sm text-muted-foreground">View and manage students</p>
                        </div>
                        <Switch 
                          checked={teacherPermissions.students} 
                          onCheckedChange={(checked) => updateTeacherPermission('students', checked)}
                        />
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">Exams</h5>
                          <p className="text-sm text-muted-foreground">Create and manage examinations</p>
                        </div>
                        <Switch 
                          checked={teacherPermissions.exams} 
                          onCheckedChange={(checked) => updateTeacherPermission('exams', checked)}
                        />
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">Profile</h5>
                          <p className="text-sm text-muted-foreground">Manage teacher profile</p>
                        </div>
                        <Switch 
                          checked={teacherPermissions.profile} 
                          onCheckedChange={(checked) => updateTeacherPermission('profile', checked)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="student" className="pt-0 mt-0">
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2" /> Student Role Permissions for {selectedInstitute}
                  </h3>
                  <p className="text-sm text-muted-foreground">Control what features students can access</p>
                </div>
                
                {/* Dashboard Access Section */}
                <div className="mb-6">
                  <h4 className="font-medium text-sm text-center text-primary mb-2">Dashboard Access</h4>
                  <Separator className="mb-4" />
                  
                  <div className="bg-muted/30 p-4 rounded-lg mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">Student Dashboard</h5>
                        <p className="text-sm text-muted-foreground">Access to student dashboard</p>
                      </div>
                      <Switch 
                        checked={studentPermissions.dashboard} 
                        onCheckedChange={(checked) => updateStudentPermission('dashboard', checked)}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Feature Access Section */}
                <div>
                  <h4 className="font-medium text-sm text-center text-primary mb-2">Feature Access</h4>
                  <Separator className="mb-4" />
                  
                  <div className="space-y-4">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">Courses</h5>
                          <p className="text-sm text-muted-foreground">Access to courses</p>
                        </div>
                        <Switch 
                          checked={studentPermissions.courses} 
                          onCheckedChange={(checked) => updateStudentPermission('courses', checked)}
                        />
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">Examination</h5>
                          <p className="text-sm text-muted-foreground">View upcoming examinations</p>
                        </div>
                        <Switch 
                          checked={studentPermissions.upcomingTests} 
                          onCheckedChange={(checked) => updateStudentPermission('upcomingTests', checked)}
                        />
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">Marks</h5>
                          <p className="text-sm text-muted-foreground">View marks and grades</p>
                        </div>
                        <Switch 
                          checked={studentPermissions.marks} 
                          onCheckedChange={(checked) => updateStudentPermission('marks', checked)}
                        />
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">Study Material</h5>
                          <p className="text-sm text-muted-foreground">Access study materials</p>
                        </div>
                        <Switch 
                          checked={studentPermissions.studyMaterial} 
                          onCheckedChange={(checked) => updateStudentPermission('studyMaterial', checked)}
                        />
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">AI Learning Assistant</h5>
                          <p className="text-sm text-muted-foreground">Access AI learning assistant</p>
                        </div>
                        <Switch 
                          checked={studentPermissions.aiAssistant} 
                          onCheckedChange={(checked) => updateStudentPermission('aiAssistant', checked)}
                        />
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">Progress</h5>
                          <p className="text-sm text-muted-foreground">View learning progress</p>
                        </div>
                        <Switch 
                          checked={studentPermissions.progress} 
                          onCheckedChange={(checked) => updateStudentPermission('progress', checked)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
        
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle>Permission Overview for {selectedInstitute}</CardTitle>
            <p className="text-sm text-muted-foreground">Summarized view of all role permissions</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border rounded-lg p-4 relative">
                <Badge className="mb-2 absolute right-4 top-4" variant="outline">Admin</Badge>
                <h3 className="text-md font-medium flex items-center mb-4">
                  <Shield className="h-4 w-4 mr-2" /> Admin Dashboard
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">User Management</span>
                    {adminPermissions.userManagement ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <span className="h-4 w-4 block"></span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Classroom</span>
                    {adminPermissions.classroom ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <span className="h-4 w-4 block"></span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Content Review</span>
                    {adminPermissions.contentReview ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <span className="h-4 w-4 block"></span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Approvals</span>
                    {adminPermissions.approvals ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <span className="h-4 w-4 block"></span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Student Management</span>
                    {adminPermissions.studentClassification ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <span className="h-4 w-4 block"></span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Progress Tracking</span>
                    {adminPermissions.progressTracking ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <span className="h-4 w-4 block"></span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 relative">
                <Badge className="mb-2 absolute right-4 top-4" variant="outline">Teacher</Badge>
                <h3 className="text-md font-medium flex items-center mb-4">
                  <BookOpen className="h-4 w-4 mr-2" /> Teacher Dashboard
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">My Classroom</span>
                    {teacherPermissions.myClassroom ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <span className="h-4 w-4 block"></span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Subject</span>
                    {teacherPermissions.subject ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <span className="h-4 w-4 block"></span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Student Performance</span>
                    {teacherPermissions.studentPerformance ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <span className="h-4 w-4 block"></span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Courses</span>
                    {teacherPermissions.courses ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <span className="h-4 w-4 block"></span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Assessments</span>
                    {teacherPermissions.assessments ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <span className="h-4 w-4 block"></span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Marks</span>
                    {teacherPermissions.marks ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <span className="h-4 w-4 block"></span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 relative">
                <Badge className="mb-2 absolute right-4 top-4" variant="outline">Student</Badge>
                <h3 className="text-md font-medium flex items-center mb-4">
                  <GraduationCap className="h-4 w-4 mr-2" /> Student Dashboard
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Courses</span>
                    {studentPermissions.courses ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <span className="h-4 w-4 block"></span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Examination</span>
                    {studentPermissions.upcomingTests ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <span className="h-4 w-4 block"></span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Marks</span>
                    {studentPermissions.marks ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <span className="h-4 w-4 block"></span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Study Material</span>
                    {studentPermissions.studyMaterial ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <span className="h-4 w-4 block"></span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">AI Assistant</span>
                    {studentPermissions.aiAssistant ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <span className="h-4 w-4 block"></span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
