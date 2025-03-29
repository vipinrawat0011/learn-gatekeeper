
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Download, UserPlus, Users, Medal, Award, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function StudentManagementPage() {
  const [selectedClass, setSelectedClass] = useState("all");
  
  return (
    <DashboardLayout 
      role="admin" 
      title="Student Management"
      subtitle="Manage students and view their classifications"
    >
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((classNum) => (
                <SelectItem key={classNum} value={classNum.toString()}>
                  Class {classNum}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search students..." 
              className="pl-8 w-full" 
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" /> Add Student
          </Button>
        </div>
      </div>

      <div className="grid gap-6 mb-8 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Medal className="h-5 w-5 text-blue-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Junior Scholars</p>
                <p className="text-2xl font-bold">143</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <Award className="h-5 w-5 text-purple-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rising Intellects</p>
                <p className="text-2xl font-bold">98</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <TrendingUp className="h-5 w-5 text-amber-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Mastermind Elites</p>
                <p className="text-2xl font-bold">64</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Students Classification</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Students</TabsTrigger>
              <TabsTrigger value="junior">Junior Scholars</TabsTrigger>
              <TabsTrigger value="rising">Rising Intellects</TabsTrigger>
              <TabsTrigger value="mastermind">Mastermind Elites</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">ID</th>
                      <th className="text-left p-3 font-medium">Name</th>
                      <th className="text-left p-3 font-medium">Class</th>
                      <th className="text-left p-3 font-medium">Section</th>
                      <th className="text-left p-3 font-medium">Classification</th>
                      <th className="text-left p-3 font-medium">Progress</th>
                      <th className="text-right p-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 1, name: "Alice Johnson", class: "10", section: "A", classification: "Mastermind Elite", progress: 92 },
                      { id: 2, name: "Bob Smith", class: "10", section: "A", classification: "Rising Intellect", progress: 78 },
                      { id: 3, name: "Charlie Brown", class: "10", section: "B", classification: "Junior Scholar", progress: 65 },
                      { id: 4, name: "Diana Miller", class: "9", section: "A", classification: "Mastermind Elite", progress: 95 },
                      { id: 5, name: "Edward Wilson", class: "9", section: "B", classification: "Rising Intellect", progress: 82 },
                      { id: 6, name: "Fiona Davis", class: "8", section: "A", classification: "Junior Scholar", progress: 68 },
                    ].map((student) => (
                      <tr key={student.id} className="border-b hover:bg-muted/30">
                        <td className="p-3">{student.id}</td>
                        <td className="p-3">{student.name}</td>
                        <td className="p-3">{student.class}</td>
                        <td className="p-3">{student.section}</td>
                        <td className="p-3">
                          <Badge variant={
                            student.classification === "Mastermind Elite" 
                              ? "default" 
                              : student.classification === "Rising Intellect" 
                                ? "secondary" 
                                : "outline"
                          }>
                            {student.classification}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className="bg-gray-200 h-2 rounded-full w-24">
                              <div 
                                className={`h-full rounded-full ${
                                  student.progress > 85 
                                    ? "bg-green-500" 
                                    : student.progress > 70 
                                      ? "bg-blue-500" 
                                      : "bg-orange-500"
                                }`}
                                style={{ width: `${student.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs">{student.progress}%</span>
                          </div>
                        </td>
                        <td className="p-3 text-right">
                          <Button variant="ghost" size="sm">View Details</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="junior">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">ID</th>
                      <th className="text-left p-3 font-medium">Name</th>
                      <th className="text-left p-3 font-medium">Class</th>
                      <th className="text-left p-3 font-medium">Section</th>
                      <th className="text-left p-3 font-medium">Progress</th>
                      <th className="text-right p-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 3, name: "Charlie Brown", class: "10", section: "B", progress: 65 },
                      { id: 6, name: "Fiona Davis", class: "8", section: "A", progress: 68 },
                    ].map((student) => (
                      <tr key={student.id} className="border-b hover:bg-muted/30">
                        <td className="p-3">{student.id}</td>
                        <td className="p-3">{student.name}</td>
                        <td className="p-3">{student.class}</td>
                        <td className="p-3">{student.section}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className="bg-gray-200 h-2 rounded-full w-24">
                              <div 
                                className="h-full rounded-full bg-orange-500"
                                style={{ width: `${student.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs">{student.progress}%</span>
                          </div>
                        </td>
                        <td className="p-3 text-right">
                          <Button variant="ghost" size="sm">View Details</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="rising">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">ID</th>
                      <th className="text-left p-3 font-medium">Name</th>
                      <th className="text-left p-3 font-medium">Class</th>
                      <th className="text-left p-3 font-medium">Section</th>
                      <th className="text-left p-3 font-medium">Progress</th>
                      <th className="text-right p-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 2, name: "Bob Smith", class: "10", section: "A", progress: 78 },
                      { id: 5, name: "Edward Wilson", class: "9", section: "B", progress: 82 },
                    ].map((student) => (
                      <tr key={student.id} className="border-b hover:bg-muted/30">
                        <td className="p-3">{student.id}</td>
                        <td className="p-3">{student.name}</td>
                        <td className="p-3">{student.class}</td>
                        <td className="p-3">{student.section}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className="bg-gray-200 h-2 rounded-full w-24">
                              <div 
                                className="h-full rounded-full bg-blue-500"
                                style={{ width: `${student.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs">{student.progress}%</span>
                          </div>
                        </td>
                        <td className="p-3 text-right">
                          <Button variant="ghost" size="sm">View Details</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="mastermind">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">ID</th>
                      <th className="text-left p-3 font-medium">Name</th>
                      <th className="text-left p-3 font-medium">Class</th>
                      <th className="text-left p-3 font-medium">Section</th>
                      <th className="text-left p-3 font-medium">Progress</th>
                      <th className="text-right p-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 1, name: "Alice Johnson", class: "10", section: "A", progress: 92 },
                      { id: 4, name: "Diana Miller", class: "9", section: "A", progress: 95 },
                    ].map((student) => (
                      <tr key={student.id} className="border-b hover:bg-muted/30">
                        <td className="p-3">{student.id}</td>
                        <td className="p-3">{student.name}</td>
                        <td className="p-3">{student.class}</td>
                        <td className="p-3">{student.section}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className="bg-gray-200 h-2 rounded-full w-24">
                              <div 
                                className="h-full rounded-full bg-green-500"
                                style={{ width: `${student.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs">{student.progress}%</span>
                          </div>
                        </td>
                        <td className="p-3 text-right">
                          <Button variant="ghost" size="sm">View Details</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
