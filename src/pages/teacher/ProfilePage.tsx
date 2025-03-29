
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Phone, School, Notebook, Calendar, Medal, FileText, Clock, BookOpen, Lock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

export default function TeacherProfilePage() {
  const [editMode, setEditMode] = useState(false);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setEditMode(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully",
    });
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Password changed",
      description: "Your password has been changed successfully",
    });
  };

  return (
    <DashboardLayout
      role="teacher"
      title="My Profile"
      subtitle="View and manage your profile information"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex justify-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="https://i.pravatar.cc/150?u=teacherjohn" alt="John Smith" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
              </div>
              <div className="text-center mt-2">
                <CardTitle>John Smith</CardTitle>
                <CardDescription>Physics Teacher</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>john.smith@cityschool.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <School className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>City School</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Joined: August 2019</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant={editMode ? "outline" : "default"} 
                className="w-full"
                onClick={() => setEditMode(!editMode)}
              >
                {editMode ? "Cancel Editing" : "Edit Profile"}
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Teaching Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Classes</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Class 8</Badge>
                    <Badge variant="secondary">Class 9</Badge>
                    <Badge variant="secondary">Class 10</Badge>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Subjects</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Physics</Badge>
                    <Badge variant="secondary">General Science</Badge>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Specializations</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Mechanics</Badge>
                    <Badge variant="outline">Electromagnetics</Badge>
                    <Badge variant="outline">Modern Physics</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Tabs defaultValue="information">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="information">Information</TabsTrigger>
              <TabsTrigger value="statistics">Statistics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="information">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <form onSubmit={handleUpdateProfile}>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName" 
                          defaultValue="John" 
                          disabled={!editMode} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          defaultValue="Smith" 
                          disabled={!editMode} 
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          defaultValue="john.smith@cityschool.com" 
                          disabled={!editMode} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          defaultValue="+1 (555) 123-4567" 
                          disabled={!editMode} 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input 
                        id="address" 
                        defaultValue="123 Main St, Anytown, CA 12345" 
                        disabled={!editMode} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea 
                        id="bio" 
                        rows={4} 
                        defaultValue="Passionate physics teacher with over 10 years of experience. Specialized in making complex concepts simple and engaging for students of all levels."
                        disabled={!editMode} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="qualifications">Qualifications</Label>
                      <Textarea 
                        id="qualifications" 
                        rows={2} 
                        defaultValue="Master's in Physics, University of California. B.Ed in Science Education."
                        disabled={!editMode} 
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="justify-end">
                    {editMode && (
                      <Button type="submit">Update Profile</Button>
                    )}
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            
            <TabsContent value="statistics">
              <Card>
                <CardHeader>
                  <CardTitle>Teaching Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="border rounded-lg p-4 text-center">
                      <BookOpen className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold">8</p>
                      <p className="text-sm text-muted-foreground">Courses Taught</p>
                    </div>
                    <div className="border rounded-lg p-4 text-center">
                      <FileText className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold">24</p>
                      <p className="text-sm text-muted-foreground">Study Materials</p>
                    </div>
                    <div className="border rounded-lg p-4 text-center">
                      <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold">245</p>
                      <p className="text-sm text-muted-foreground">Hours Taught</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-3">Student Performance</h3>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Class 8</span>
                            <span className="text-sm font-medium">78%</span>
                          </div>
                          <div className="bg-gray-200 h-2 rounded-full">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: "78%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Class 9</span>
                            <span className="text-sm font-medium">82%</span>
                          </div>
                          <div className="bg-gray-200 h-2 rounded-full">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: "82%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Class 10</span>
                            <span className="text-sm font-medium">85%</span>
                          </div>
                          <div className="bg-gray-200 h-2 rounded-full">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-3">Achievements</h3>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <Medal className="h-5 w-5 mr-2 text-amber-500 mt-0.5" />
                          <div>
                            <p className="font-medium">Best Teacher Award</p>
                            <p className="text-sm text-muted-foreground">Awarded in 2022 for excellence in teaching</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Medal className="h-5 w-5 mr-2 text-amber-500 mt-0.5" />
                          <div>
                            <p className="font-medium">Science Exhibition Mentor</p>
                            <p className="text-sm text-muted-foreground">Led students to win the regional science competition</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Change Password</h3>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input id="currentPassword" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input id="confirmPassword" type="password" />
                      </div>
                      <Button type="submit" className="gap-1">
                        <Lock className="h-4 w-4" /> Change Password
                      </Button>
                    </form>
                  </div>
                  
                  <div className="pt-6 border-t">
                    <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive emails about your account activity</p>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="emailNotif" className="mr-2" defaultChecked />
                          <Label htmlFor="emailNotif">Enable</Label>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Student Submission Alerts</p>
                          <p className="text-sm text-muted-foreground">Get notified when students submit assignments</p>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="submissionNotif" className="mr-2" defaultChecked />
                          <Label htmlFor="submissionNotif">Enable</Label>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">System Updates</p>
                          <p className="text-sm text-muted-foreground">Receive notifications about system changes</p>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="systemNotif" className="mr-2" />
                          <Label htmlFor="systemNotif">Enable</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
}
