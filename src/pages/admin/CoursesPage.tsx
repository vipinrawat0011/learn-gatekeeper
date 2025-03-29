
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, FileText, Clock, CheckCircle } from "lucide-react";

export default function CoursesPage() {
  const [selectedClass, setSelectedClass] = useState("1");

  return (
    <DashboardLayout 
      role="admin" 
      title="Courses Management"
      subtitle="Manage courses for all classes"
    >
      <div className="mb-6 flex justify-between items-center">
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select class" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((classNum) => (
              <SelectItem key={classNum} value={classNum.toString()}>
                Class {classNum}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button>
          <PlusCircle className="h-4 w-4 mr-2" /> Add New Course
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Class {selectedClass} Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Courses</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              <div className="space-y-4">
                {[
                  { id: 1, title: "Mathematics Fundamentals", subject: "Mathematics", completed: 25, total: 30 },
                  { id: 2, title: "English Grammar", subject: "English", completed: 18, total: 30 },
                  { id: 3, title: "Science Basics", subject: "Science", completed: 29, total: 30 },
                  { id: 4, title: "History Fundamentals", subject: "History", completed: 15, total: 30 },
                ].map((course) => (
                  <div key={course.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">{course.title}</h3>
                        <p className="text-sm text-muted-foreground">Subject: {course.subject}</p>
                        <div className="flex items-center mt-2">
                          <FileText className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {course.completed}/{course.total} students completed
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            course.completed === course.total 
                              ? "success" 
                              : course.completed > course.total / 2 
                                ? "default" 
                                : "secondary"
                          }
                        >
                          {course.completed === course.total 
                            ? "Completed" 
                            : course.completed > course.total / 2 
                              ? "In Progress" 
                              : "Just Started"}
                        </Badge>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="active" className="mt-6">
              <div className="space-y-4">
                {[
                  { id: 2, title: "English Grammar", subject: "English", completed: 18, total: 30 },
                  { id: 4, title: "History Fundamentals", subject: "History", completed: 15, total: 30 },
                ].map((course) => (
                  <div key={course.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">{course.title}</h3>
                        <p className="text-sm text-muted-foreground">Subject: {course.subject}</p>
                        <div className="flex items-center mt-2">
                          <FileText className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {course.completed}/{course.total} students completed
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="default">In Progress</Badge>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="pending" className="mt-6">
              <div className="text-center py-10 text-muted-foreground">
                <Clock className="h-10 w-10 mx-auto mb-4" />
                <p>No pending courses for Class {selectedClass}</p>
              </div>
            </TabsContent>
            <TabsContent value="completed" className="mt-6">
              <div className="space-y-4">
                {[
                  { id: 1, title: "Mathematics Fundamentals", subject: "Mathematics", completed: 25, total: 30 },
                  { id: 3, title: "Science Basics", subject: "Science", completed: 29, total: 30 },
                ].map((course) => (
                  <div key={course.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">{course.title}</h3>
                        <p className="text-sm text-muted-foreground">Subject: {course.subject}</p>
                        <div className="flex items-center mt-2">
                          <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                          <span className="text-sm text-muted-foreground">
                            {course.completed}/{course.total} students completed
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="success">Completed</Badge>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
