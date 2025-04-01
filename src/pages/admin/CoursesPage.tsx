import { useState, useCallback } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { FileText, Search, Filter, Plus, Upload, Video, File, Trash2, X, AlertCircle } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

// Mock course data
const coursesData = [
  {
    id: 1,
    title: "Advanced Mathematics",
    description: "Master the concepts of differential equations and calculus",
    image: "/lovable-uploads/be63b126-6fdb-4777-913e-c98b7850e453.png",
    subject: "Mathematics",
    instructor: "Dr. Alan Turing",
    level: "Intermediate",
    duration: 8,
    progress: 25,
    students: 325
  },
  {
    id: 2,
    title: "Quantum Physics",
    description: "Explore the fascinating world of quantum mechanics",
    image: "/lovable-uploads/23e826e0-5038-4adb-a01a-e4fbd403f860.png",
    subject: "Physics",
    instructor: "Dr. Marie Curie",
    level: "Advanced",
    duration: 10,
    progress: 68,
    students: 248
  },
  {
    id: 3,
    title: "Introduction to Programming",
    description: "Learn the fundamentals of computer science, algorithms, and coding",
    image: "/lovable-uploads/586ac424-f00c-4e54-af47-75d6d5128ad4.png",
    subject: "Computer Science",
    instructor: "Prof. Grace Hopper",
    level: "Beginner",
    duration: 6,
    progress: 92,
    students: 420
  },
  {
    id: 4,
    title: "Organic Chemistry",
    description: "Understand the principles and reactions in organic chemistry",
    image: "/lovable-uploads/9b896478-0b27-4bc3-a097-4b9484e32bdf.png",
    subject: "Chemistry",
    instructor: "Dr. Rosalind Franklin",
    level: "Intermediate",
    duration: 8,
    progress: 0,
    students: 305
  }
];

// Initial chapter structure
const initialChapter = {
  title: "",
  content: "",
  materials: [] // For PDFs, PPTs, videos
};

export default function CoursesPage() {
  const [selectedGrade, setSelectedGrade] = useState("1");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [activeTab, setActiveTab] = useState("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showCurriculumDialog, setShowCurriculumDialog] = useState(false);
  
  // New course state
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    grade: "",
    subject: "",
    duration: "",
    level: "beginner",
    chapters: [{ ...initialChapter }]
  });

  // Chapter editing state
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [chapterContentType, setChapterContentType] = useState("text"); // text, video, file
  const [isAddingChapter, setIsAddingChapter] = useState(false);

  // Improved chapter addition with debounce and proper error handling
  const handleAddChapter = useCallback(() => {
    if (isAddingChapter) return; // Prevent multiple clicks
    
    setIsAddingChapter(true);
    
    try {
      setNewCourse(prev => {
        const updatedCourseData = {
          ...prev,
          chapters: [...prev.chapters, { ...initialChapter }]
        };
        
        // Set active chapter to the newly added one after state update
        setTimeout(() => {
          setActiveChapterIndex(updatedCourseData.chapters.length - 1);
        }, 0);
        
        return updatedCourseData;
      });
      
      toast({
        title: "Chapter added",
        description: `New chapter added successfully`,
      });
    } catch (error) {
      console.error("Error adding chapter:", error);
      toast({
        title: "Error",
        description: "Failed to add chapter. Please try again.",
        variant: "destructive",
      });
    } finally {
      // Reset flag after a short delay
      setTimeout(() => setIsAddingChapter(false), 300);
    }
  }, [isAddingChapter]);

  // Handle removing a chapter
  const handleRemoveChapter = (index: number) => {
    // Prevent removing the last chapter
    if (newCourse.chapters.length <= 1) {
      toast({
        title: "Cannot remove",
        description: "A course must have at least one chapter",
        variant: "destructive",
      });
      return;
    }
    
    const updatedChapters = [...newCourse.chapters];
    updatedChapters.splice(index, 1);
    setNewCourse(prev => ({
      ...prev,
      chapters: updatedChapters
    }));
    
    // Update active chapter index if needed
    if (activeChapterIndex >= updatedChapters.length) {
      setActiveChapterIndex(Math.max(0, updatedChapters.length - 1));
    }
  };

  // Handle updating chapter title
  const handleUpdateChapterTitle = (index: number, title: string) => {
    const updatedChapters = [...newCourse.chapters];
    updatedChapters[index] = {
      ...updatedChapters[index],
      title
    };
    setNewCourse(prev => ({
      ...prev,
      chapters: updatedChapters
    }));
  };

  // Handle updating chapter content
  const handleUpdateChapterContent = (index: number, content: string) => {
    const updatedChapters = [...newCourse.chapters];
    updatedChapters[index] = {
      ...updatedChapters[index],
      content
    };
    setNewCourse(prev => ({
      ...prev,
      chapters: updatedChapters
    }));
  };

  // Handle adding material to a chapter
  const handleAddMaterial = (index: number, type: string, name: string) => {
    const updatedChapters = [...newCourse.chapters];
    updatedChapters[index] = {
      ...updatedChapters[index],
      materials: [
        ...updatedChapters[index].materials,
        { type, name, url: `mock-${type}-url-${Date.now()}` } // In a real app, this would be a real URL
      ]
    };
    setNewCourse(prev => ({
      ...prev,
      chapters: updatedChapters
    }));
    
    toast({
      title: "Material added",
      description: `${name} has been added to chapter successfully`,
    });
  };

  // Handle removing material from a chapter
  const handleRemoveMaterial = (chapterIndex: number, materialIndex: number) => {
    const updatedChapters = [...newCourse.chapters];
    const materialName = updatedChapters[chapterIndex].materials[materialIndex]?.name || "Material";
    updatedChapters[chapterIndex].materials.splice(materialIndex, 1);
    
    setNewCourse(prev => ({
      ...prev,
      chapters: updatedChapters
    }));
    
    toast({
      title: "Material removed",
      description: `${materialName} has been removed from the chapter`,
    });
  };

  // Handle course form input changes
  const handleCourseInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewCourse(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmitCourse = () => {
    if (!newCourse.title.trim()) {
      toast({
        title: "Missing information",
        description: "Course title is required",
        variant: "destructive",
      });
      return;
    }
    
    console.log('Submitting course:', newCourse);
    // Here you would typically send this to your API
    toast({
      title: "Course created",
      description: `${newCourse.title} has been created successfully`,
    });
    
    // Reset form and close dialog
    setNewCourse({
      title: "",
      description: "",
      grade: "",
      subject: "",
      duration: "",
      level: "beginner",
      chapters: [{ ...initialChapter }]
    });
    setActiveChapterIndex(0);
    setShowAddDialog(false);
  };

  // Mock file upload handler
  const handleFileUpload = (type: string) => {
    // In a real app, this would handle actual file uploads
    // For now, we'll just simulate adding a file with a mock name
    const fileNames: Record<string, string> = {
      'pdf': 'Chapter Material.pdf',
      'ppt': 'Lecture Slides.ppt',
      'video': 'Lecture Video.mp4'
    };

    handleAddMaterial(activeChapterIndex, type, fileNames[type]);
  };
  
  return (
    <DashboardLayout 
      role="admin" 
      title="Courses Management"
      subtitle="Discover and enroll in a wide range of educational content"
    >
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold">Courses</h2>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowCurriculumDialog(true)}>
              <FileText className="h-4 w-4 mr-2" /> View Curriculum
            </Button>
            <Button onClick={() => setShowAddDialog(true)}>
              <Plus className="h-4 w-4 mr-2" /> Add Course
            </Button>
          </div>
        </div>
        <p className="text-muted-foreground mb-6">Discover and manage courses for different grade levels</p>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Courses</TabsTrigger>
            <TabsTrigger value="my">My Courses</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search courses..." 
                className="pl-8 w-[300px]" 
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Select value={selectedGrade} onValueChange={setSelectedGrade}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Select Grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Grades">All Grades</SelectItem>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((grade) => (
                  <SelectItem key={grade} value={grade.toString()}>
                    Grade {grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Select Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Levels">All Levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {coursesData.map((course) => (
            <div key={course.id} className="bg-white rounded-lg border overflow-hidden flex flex-col">
              <div className="h-40 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="text-xs font-medium text-blue-600 mb-1">{course.subject}</div>
                <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">{course.description}</p>
                
                <div className="text-sm text-muted-foreground mb-2">
                  <span className="inline-block w-4 h-4 rounded-full bg-gray-200 mr-2 align-text-bottom">
                    <span className="sr-only">Instructor</span>
                  </span>
                  {course.instructor}
                </div>
                
                <div className="mb-2 flex items-center text-sm text-gray-600">
                  <span className="font-medium mr-auto">{course.level}</span>
                  <span className="text-right">{course.duration} weeks</span>
                </div>
                
                <div className="mt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Overall Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {course.students} students
                  </div>
                </div>
                
                <Button variant="outline" className="mt-4 w-full">View Course Details</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Enhanced Add New Course Dialog with Chapter Management */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Add New Course</DialogTitle>
            <DialogDescription>
              Fill in the details and add chapters to create a comprehensive course.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col md:flex-row gap-6 flex-1 overflow-hidden">
            {/* Left side - Course details */}
            <div className="md:w-1/3 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Course Title</Label>
                <Input 
                  id="title" 
                  name="title"
                  value={newCourse.title}
                  onChange={handleCourseInputChange}
                  placeholder="e.g., Mathematics for Grade 5" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  name="description"
                  value={newCourse.description}
                  onChange={handleCourseInputChange}
                  placeholder="Brief description of the course"
                  className="resize-none"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="grade">Grade</Label>
                  <Select name="grade" value={newCourse.grade} onValueChange={(value) => setNewCourse(prev => ({ ...prev, grade: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((grade) => (
                        <SelectItem key={grade} value={grade.toString()}>
                          Grade {grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select name="subject" value={newCourse.subject} onValueChange={(value) => setNewCourse(prev => ({ ...prev, subject: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="chemistry">Chemistry</SelectItem>
                      <SelectItem value="biology">Biology</SelectItem>
                      <SelectItem value="computerscience">Computer Science</SelectItem>
                      <SelectItem value="history">History</SelectItem>
                      <SelectItem value="geography">Geography</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (weeks)</Label>
                  <Input 
                    id="duration" 
                    name="duration"
                    value={newCourse.duration}
                    onChange={handleCourseInputChange}
                    type="number" 
                    min="1" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="level">Level</Label>
                  <Select name="level" value={newCourse.level} onValueChange={(value) => setNewCourse(prev => ({ ...prev, level: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  onClick={handleAddChapter} 
                  variant="outline" 
                  className="w-full"
                  disabled={isAddingChapter}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Chapter
                </Button>
              </div>
            </div>
            
            {/* Separator */}
            <Separator orientation="vertical" className="hidden md:block" />
            
            {/* Right side - Chapters */}
            <div className="md:w-2/3 flex flex-col overflow-hidden">
              <div className="text-sm font-medium mb-2">
                Chapters ({newCourse.chapters.length})
              </div>
              
              {newCourse.chapters.length > 0 ? (
                <div className="flex flex-col h-full">
                  {/* Chapter navigation */}
                  <ScrollArea className="h-[80px] border rounded-md p-2 mb-4">
                    <div className="flex flex-wrap gap-2">
                      {newCourse.chapters.map((chapter, index) => (
                        <div key={`chapter-${index}`} className="flex items-center">
                          <Button 
                            variant={activeChapterIndex === index ? "default" : "outline"}
                            size="sm"
                            onClick={() => setActiveChapterIndex(index)}
                            className="text-xs flex items-center"
                          >
                            {chapter.title || `Chapter ${index + 1}`}
                          </Button>
                          {newCourse.chapters.length > 1 && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6 ml-1"
                              onClick={() => handleRemoveChapter(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  {/* Active chapter editing */}
                  <div className="flex-1 overflow-auto">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`chapter-${activeChapterIndex}-title`}>Chapter Title</Label>
                        <Input 
                          id={`chapter-${activeChapterIndex}-title`}
                          value={newCourse.chapters[activeChapterIndex]?.title || ''}
                          onChange={(e) => handleUpdateChapterTitle(activeChapterIndex, e.target.value)}
                          placeholder={`Chapter ${activeChapterIndex + 1}`}
                        />
                      </div>
                      
                      {/* Content type selector */}
                      <div>
                        <Label className="mb-2 block">Content Type</Label>
                        <div className="flex flex-wrap gap-2">
                          <Button 
                            variant={chapterContentType === "text" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setChapterContentType("text")}
                          >
                            <FileText className="h-4 w-4 mr-2" /> Text Content
                          </Button>
                          <Button 
                            variant={chapterContentType === "video" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setChapterContentType("video")}
                          >
                            <Video className="h-4 w-4 mr-2" /> Video
                          </Button>
                          <Button 
                            variant={chapterContentType === "file" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setChapterContentType("file")}
                          >
                            <File className="h-4 w-4 mr-2" /> Files (PDF/PPT)
                          </Button>
                        </div>
                      </div>
                      
                      {/* Content editor based on type */}
                      <div className="space-y-2 mt-4">
                        {chapterContentType === "text" && (
                          <>
                            <Label htmlFor={`chapter-${activeChapterIndex}-content`}>Text Content</Label>
                            <Textarea 
                              id={`chapter-${activeChapterIndex}-content`}
                              value={newCourse.chapters[activeChapterIndex]?.content || ''}
                              onChange={(e) => handleUpdateChapterContent(activeChapterIndex, e.target.value)}
                              placeholder="Enter chapter content here..."
                              className="resize-none min-h-[200px]"
                            />
                          </>
                        )}
                        
                        {chapterContentType === "video" && (
                          <div className="border rounded-md p-4">
                            <Label className="mb-2 block">Upload Video</Label>
                            <div className="flex items-center justify-center h-32 border-2 border-dashed rounded-md cursor-pointer hover:bg-muted/50"
                              onClick={() => handleFileUpload('video')}
                            >
                              <div className="text-center">
                                <Video className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">Click to upload video</p>
                                <p className="text-xs text-muted-foreground">MP4, MOV up to 500MB</p>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {chapterContentType === "file" && (
                          <div className="border rounded-md p-4">
                            <Label className="mb-4 block">Upload Materials</Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="flex items-center justify-center h-24 border-2 border-dashed rounded-md cursor-pointer hover:bg-muted/50"
                                onClick={() => handleFileUpload('pdf')}
                              >
                                <div className="text-center">
                                  <File className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                                  <p className="text-sm text-muted-foreground">Upload PDF</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-center h-24 border-2 border-dashed rounded-md cursor-pointer hover:bg-muted/50"
                                onClick={() => handleFileUpload('ppt')}
                              >
                                <div className="text-center">
                                  <FileText className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                                  <p className="text-sm text-muted-foreground">Upload PPT</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Materials list */}
                      {newCourse.chapters[activeChapterIndex]?.materials?.length > 0 && (
                        <div className="mt-4">
                          <Label className="mb-2 block">Uploaded Materials</Label>
                          <div className="space-y-2">
                            {newCourse.chapters[activeChapterIndex].materials.map((material, idx) => (
                              <div key={idx} className="flex justify-between items-center border rounded-md p-2">
                                <div className="flex items-center">
                                  {material.type === 'video' ? (
                                    <Video className="h-4 w-4 mr-2" />
                                  ) : material.type === 'pdf' ? (
                                    <File className="h-4 w-4 mr-2" />
                                  ) : (
                                    <FileText className="h-4 w-4 mr-2" />
                                  )}
                                  <span className="text-sm">{material.name}</span>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => handleRemoveMaterial(activeChapterIndex, idx)} 
                                  className="h-6 w-6 p-0"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8 border-2 border-dashed rounded-md">
                  <AlertCircle className="h-12 w-12 mb-2 text-muted-foreground" />
                  <p className="text-center">No chapters added yet</p>
                  <Button 
                    variant="outline" 
                    onClick={handleAddChapter} 
                    className="mt-4"
                    disabled={isAddingChapter}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add First Chapter
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSubmitCourse}>Create Course</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Curriculum Dialog */}
      <Dialog open={showCurriculumDialog} onOpenChange={setShowCurriculumDialog}>
        <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Curriculum for Grade 1</DialogTitle>
            <DialogDescription>
              Syllabus and learning outcomes for each subject
            </DialogDescription>
          </DialogHeader>
          
          <div className="mb-6">
            <Label htmlFor="curriculum-grade">Select Grade:</Label>
            <Select defaultValue="1">
              <SelectTrigger className="w-[200px] mt-2">
                <SelectValue placeholder="Select Grade" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((grade) => (
                  <SelectItem key={grade} value={grade.toString()}>
                    Grade {grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-6">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">Mathematics</h3>
                <Button variant="ghost" size="sm">
                  <span className="sr-only">Toggle</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m18 15-6-6-6 6"></path></svg>
                </Button>
              </div>
              
              <div className="mt-4">
                <h4 className="font-medium mb-2">Numbers and counting (6 weeks)</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li className="text-sm">Counting to 10</li>
                  <li className="text-sm">Number recognition</li>
                  <li className="text-sm">Basic addition</li>
                </ul>
                
                <h4 className="font-medium mt-4 mb-2">Shapes and patterns (4 weeks)</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li className="text-sm">Basic shapes</li>
                  <li className="text-sm">Pattern recognition</li>
                  <li className="text-sm">Size comparison</li>
                </ul>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">Science</h3>
                <Button variant="ghost" size="sm">
                  <span className="sr-only">Toggle</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m18 15-6-6-6 6"></path></svg>
                </Button>
              </div>
              
              <div className="mt-4">
                <h4 className="font-medium mb-2">Plants and animals (5 weeks)</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li className="text-sm">Living things</li>
                  <li className="text-sm">Plant parts</li>
                  <li className="text-sm">Animal homes</li>
                </ul>
                
                <h4 className="font-medium mt-4 mb-2">Weather (3 weeks)</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li className="text-sm">Seasons</li>
                  <li className="text-sm">Weather conditions</li>
                </ul>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
