
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { BookOpen, Plus, FileText, Upload, Edit, Eye } from "lucide-react";

export default function CoursesPage() {
  const [selectedClass, setSelectedClass] = useState("Class 9A");
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");
  const [addingModule, setAddingModule] = useState(false);
  const [addingChapter, setAddingChapter] = useState(false);
  
  const handleAddModule = () => {
    toast({
      title: "Module created",
      description: "New course module has been created successfully",
    });
    setAddingModule(false);
  };
  
  const handleAddChapter = () => {
    toast({
      title: "Chapter added",
      description: "New chapter has been added to the module",
    });
    setAddingChapter(false);
  };

  return (
    <DashboardLayout 
      role="teacher" 
      title="Course Management"
      subtitle="Create and manage course content by class and subject"
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex flex-col md:flex-row gap-4 mb-4 md:mb-0">
            <div>
              <Label htmlFor="class" className="mb-2 block text-sm font-medium">Select Class</Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Class 7A">Class 7A</SelectItem>
                  <SelectItem value="Class 8B">Class 8B</SelectItem>
                  <SelectItem value="Class 9A">Class 9A</SelectItem>
                  <SelectItem value="Class 10B">Class 10B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="subject" className="mb-2 block text-sm font-medium">Select Subject</Label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="History">History</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Dialog open={addingModule} onOpenChange={setAddingModule}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> Add New Module
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Course Module</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="moduleTitle">Module Title</Label>
                  <Input id="moduleTitle" placeholder="e.g., Algebra Fundamentals" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="moduleDescription">Module Description</Label>
                  <Textarea 
                    id="moduleDescription" 
                    placeholder="Brief description of the module content" 
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setAddingModule(false)}>Cancel</Button>
                <Button onClick={handleAddModule}>Create Module</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="text-xl font-semibold">
          Mathematics for {selectedClass}
        </div>
        
        {/* Algebra Fundamentals Module */}
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>Algebra Fundamentals</CardTitle>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-1" /> Add Chapter
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">Basic algebraic operations and equations</div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-6">
              {/* Chapter - Introduction to Algebra */}
              <div className="border-b pb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">Introduction to Algebra</h3>
                    <div className="text-sm text-muted-foreground">Progress</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="rounded-full px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 border-none">
                      Completed
                    </Badge>
                  </div>
                </div>
                
                <Progress value={100} className="h-2 mb-2" />
                
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>5 questions</span>
                  <span>100%</span>
                </div>
                
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                </div>
              </div>
              
              {/* Chapter - Linear Equations */}
              <div className="border-b pb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">Linear Equations</h3>
                    <div className="text-sm text-muted-foreground">Progress</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="rounded-full px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 border-none">
                      Completed
                    </Badge>
                  </div>
                </div>
                
                <Progress value={100} className="h-2 mb-2" />
                
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>5 questions</span>
                  <span>100%</span>
                </div>
                
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                </div>
              </div>
              
              {/* Chapter - Quadratic Equations */}
              <div className="border-b pb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">Quadratic Equations</h3>
                    <div className="text-sm text-muted-foreground">Progress</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="rounded-full px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-800 border-none">
                      In Progress
                    </Badge>
                  </div>
                </div>
                
                <Progress value={80} className="h-2 mb-2" />
                
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>5 questions</span>
                  <span>80%</span>
                </div>
                
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                </div>
              </div>
              
              {/* Chapter - Polynomials */}
              <div className="pb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">Polynomials</h3>
                    <div className="text-sm text-muted-foreground">Progress</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="rounded-full px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 border-none">
                      Not Started
                    </Badge>
                  </div>
                </div>
                
                <Progress value={0} className="h-2 mb-2" />
                
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>5 questions</span>
                  <span>0%</span>
                </div>
                
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground">
                4 chapters • 2 completed
              </div>
              
              <div className="flex justify-end">
                <Button variant="outline" size="sm">Manage Module</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Geometry Basics Module */}
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>Geometry Basics</CardTitle>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-1" /> Add Chapter
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">Fundamental concepts in geometry</div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-6">
              {/* Chapter - Introduction to Geometry */}
              <div className="border-b pb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">Introduction to Geometry</h3>
                    <div className="text-sm text-muted-foreground">Progress</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="rounded-full px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 border-none">
                      Completed
                    </Badge>
                  </div>
                </div>
                
                <Progress value={100} className="h-2 mb-2" />
                
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>5 questions</span>
                  <span>100%</span>
                </div>
                
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                </div>
              </div>
              
              {/* Chapter - Triangles */}
              <div className="pb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">Triangles</h3>
                    <div className="text-sm text-muted-foreground">Progress</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="rounded-full px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-800 border-none">
                      In Progress
                    </Badge>
                  </div>
                </div>
                
                <Progress value={60} className="h-2 mb-2" />
                
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>5 questions</span>
                  <span>60%</span>
                </div>
                
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground">
                2 chapters • 1 completed
              </div>
              
              <div className="flex justify-end">
                <Button variant="outline" size="sm">Manage Module</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Add Chapter Dialog */}
        <Dialog open={addingChapter} onOpenChange={setAddingChapter}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Chapter</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="chapterTitle">Chapter Title</Label>
                <Input id="chapterTitle" placeholder="e.g., Introduction to Geometry" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="chapterDescription">Description</Label>
                <Textarea 
                  id="chapterDescription" 
                  placeholder="Brief description of this chapter's content" 
                  rows={2}
                />
              </div>
              
              <div className="space-y-3 border p-4 rounded-md">
                <Label>Content</Label>
                
                <div className="space-y-2">
                  <Label htmlFor="textContent">Text Content</Label>
                  <Textarea 
                    id="textContent" 
                    placeholder="Enter readable content for students to study" 
                    rows={6}
                  />
                </div>
                
                <div className="border-t pt-3">
                  <Label>Attachments</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="border-2 border-dashed rounded-md p-6 text-center">
                      <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm mb-2">Upload PDF Document</p>
                      <Button variant="secondary" size="sm" type="button">
                        <Upload className="h-4 w-4 mr-1" /> Browse Files
                      </Button>
                    </div>
                    
                    <div className="border-2 border-dashed rounded-md p-6 text-center">
                      <BookOpen className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm mb-2">Upload Presentation</p>
                      <Button variant="secondary" size="sm" type="button">
                        <Upload className="h-4 w-4 mr-1" /> Browse Files
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center mb-2">
                    <Label>Quiz Questions</Label>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-1" /> Add Question
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="border p-3 rounded-md">
                      <div className="font-medium mb-2">Question 1</div>
                      <Input placeholder="Enter question text" defaultValue="What is a right-angled triangle?" className="mb-2" />
                      
                      <div className="space-y-2 mt-3">
                        <div className="flex items-center gap-2">
                          <input type="radio" id="q1-option1" name="q1" className="mr-1" defaultChecked />
                          <Input placeholder="Option 1" defaultValue="A triangle with one angle measuring 90 degrees" className="flex-1" />
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="radio" id="q1-option2" name="q1" className="mr-1" />
                          <Input placeholder="Option 2" defaultValue="A triangle with all sides equal" className="flex-1" />
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="radio" id="q1-option3" name="q1" className="mr-1" />
                          <Input placeholder="Option 3" defaultValue="A triangle with all angles equal" className="flex-1" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      Add at least 5 questions to complete the chapter
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddingChapter(false)}>Cancel</Button>
              <Button onClick={handleAddChapter}>Add Chapter</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}

// Badge component for this page
function Badge({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`inline-flex items-center rounded-full text-xs px-2.5 py-0.5 font-medium ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
