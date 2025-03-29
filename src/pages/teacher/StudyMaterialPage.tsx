
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { FileUp, FileText, Clock, CheckCircle, XCircle, Download, PlusCircle, Filter, Search } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function StudyMaterialPage() {
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Study material submitted",
      description: "Your study material has been sent for admin approval",
    });
  };

  return (
    <DashboardLayout 
      role="teacher" 
      title="Study Material"
      subtitle="Create and manage study materials for your students"
    >
      <Tabs defaultValue="browse">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="browse">Browse Materials</TabsTrigger>
          <TabsTrigger value="create">Create New</TabsTrigger>
        </TabsList>
        
        <TabsContent value="browse">
          <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {[6, 7, 8, 9, 10].map((classNum) => (
                    <SelectItem key={classNum} value={classNum.toString()}>
                      Class {classNum}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                  <SelectItem value="biology">Biology</SelectItem>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search materials..." 
                  className="pl-8 w-full" 
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { id: 1, title: "Physics Formulas", class: "10", subject: "Physics", type: "PDF", date: "2023-10-15", status: "Approved" },
              { id: 2, title: "Chemical Equations", class: "9", subject: "Chemistry", type: "PDF", date: "2023-10-12", status: "Approved" },
              { id: 3, title: "Biology Notes - Chapter 1", class: "8", subject: "Biology", type: "DOCX", date: "2023-10-10", status: "Approved" },
              { id: 4, title: "Algebra Worksheet", class: "10", subject: "Mathematics", type: "PDF", date: "2023-10-05", status: "Pending" },
              { id: 5, title: "Physics Lab Manual", class: "9", subject: "Physics", type: "PDF", date: "2023-10-02", status: "Rejected" },
              { id: 6, title: "Mathematics Tricks", class: "7", subject: "Mathematics", type: "PPTX", date: "2023-09-28", status: "Approved" },
            ].map((material) => (
              <Card key={material.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <Badge
                      variant={
                        material.status === "Approved" 
                          ? "default" 
                          : material.status === "Pending" 
                            ? "secondary" 
                            : "destructive"
                      }
                      className="mb-2"
                    >
                      {material.status}
                    </Badge>
                    <Badge variant="outline">
                      {material.type}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{material.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="font-medium text-muted-foreground">Class:</span> {material.class}
                    </div>
                    <div>
                      <span className="font-medium text-muted-foreground">Subject:</span> {material.subject}
                    </div>
                    <div className="col-span-2">
                      <span className="font-medium text-muted-foreground">Date:</span> {new Date(material.date).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 flex gap-2">
                  {material.status === "Approved" ? (
                    <Button className="w-full" size="sm">
                      <Download className="h-4 w-4 mr-2" /> Download
                    </Button>
                  ) : material.status === "Pending" ? (
                    <div className="flex items-center justify-center w-full gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" /> Awaiting approval
                    </div>
                  ) : (
                    <Button variant="outline" className="w-full" size="sm">
                      Edit & Resubmit
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Create New Study Material</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Enter title of the study material" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="class">Class</Label>
                    <Select defaultValue="10">
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        {[6, 7, 8, 9, 10].map((classNum) => (
                          <SelectItem key={classNum} value={classNum.toString()}>
                            Class {classNum}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select defaultValue="physics">
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="physics">Physics</SelectItem>
                        <SelectItem value="chemistry">Chemistry</SelectItem>
                        <SelectItem value="biology">Biology</SelectItem>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Provide a brief description of this material" rows={3} />
                </div>
                
                <div className="space-y-2">
                  <Label>Upload File</Label>
                  <div className="border-2 border-dashed rounded-md p-6 text-center">
                    <FileUp className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm mb-2">Drag and drop your file here, or click to browse</p>
                    <p className="text-xs text-muted-foreground mb-3">Supports PDF, DOCX, PPTX, and other document formats (Max 10MB)</p>
                    <Button variant="secondary" size="sm" type="button">
                      Browse Files
                    </Button>
                    <Input id="file-upload" type="file" className="hidden" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button">Cancel</Button>
                <Button type="submit">Submit for Approval</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
