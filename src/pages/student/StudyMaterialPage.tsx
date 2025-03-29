
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Download, FileText, Search, Filter, Bookmark, BookmarkPlus, 
  FileDown, Book, Video, File, Play, Clock 
} from "lucide-react";

export default function StudentStudyMaterialPage() {
  const [selectedSubject, setSelectedSubject] = useState("all");

  return (
    <DashboardLayout
      role="student"
      title="Study Material"
      subtitle="Access course notes, books, and resources"
    >
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
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
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="history">History</SelectItem>
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
          <Button variant="outline" className="gap-2">
            <Bookmark className="h-4 w-4" /> Bookmarked
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="notes">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="books">Books</TabsTrigger>
          <TabsTrigger value="videos">Video Lessons</TabsTrigger>
          <TabsTrigger value="practice">Practice Material</TabsTrigger>
        </TabsList>
        
        <TabsContent value="notes">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { id: 1, title: "Physics Formulas and Laws", subject: "Physics", type: "PDF", size: "2.4 MB", date: "2023-10-15", downloads: 128 },
              { id: 2, title: "Chemical Equations and Balancing", subject: "Chemistry", type: "PDF", size: "1.8 MB", date: "2023-10-12", downloads: 95 },
              { id: 3, title: "Biology Cell Structure Notes", subject: "Biology", type: "DOCX", size: "1.2 MB", date: "2023-10-10", downloads: 112 },
              { id: 4, title: "Algebraic Expressions", subject: "Mathematics", type: "PDF", size: "3.1 MB", date: "2023-10-05", downloads: 145 },
              { id: 5, title: "Grammar Rules and Applications", subject: "English", type: "PDF", size: "1.5 MB", date: "2023-10-02", downloads: 87 },
              { id: 6, title: "World History Timeline", subject: "History", type: "PPTX", size: "4.2 MB", date: "2023-09-28", downloads: 76 },
            ].map((material) => (
              <Card key={material.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="mb-2 bg-blue-50 text-blue-700">
                      {material.subject}
                    </Badge>
                    <Badge variant="secondary">
                      {material.type}
                    </Badge>
                  </div>
                  <CardTitle className="text-base">{material.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-1" />
                      <span>{material.size}</span>
                    </div>
                    <div>
                      <span>Uploaded: {new Date(material.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost" size="sm" className="gap-1">
                    <BookmarkPlus className="h-4 w-4" /> Save
                  </Button>
                  <Button size="sm" className="gap-1">
                    <Download className="h-4 w-4" /> Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="books">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { id: 1, title: "Fundamentals of Physics", author: "David Johnson", subject: "Physics", cover: "https://i.pravatar.cc/150?u=book1", pages: 520 },
              { id: 2, title: "Chemistry: Principles and Applications", author: "Sarah Williams", subject: "Chemistry", cover: "https://i.pravatar.cc/150?u=book2", pages: 480 },
              { id: 3, title: "Modern Biology", author: "Michael Roberts", subject: "Biology", cover: "https://i.pravatar.cc/150?u=book3", pages: 560 },
              { id: 4, title: "Advanced Mathematics", author: "Jennifer Lee", subject: "Mathematics", cover: "https://i.pravatar.cc/150?u=book4", pages: 620 },
              { id: 5, title: "English Language and Composition", author: "Robert Smith", subject: "English", cover: "https://i.pravatar.cc/150?u=book5", pages: 380 },
              { id: 6, title: "World History: A Comprehensive Guide", author: "Thomas Anderson", subject: "History", cover: "https://i.pravatar.cc/150?u=book6", pages: 720 },
            ].map((book) => (
              <Card key={book.id} className="overflow-hidden">
                <div className="aspect-[3/4] relative">
                  <img 
                    src={book.cover} 
                    alt={book.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <Badge className="mb-2">
                      {book.subject}
                    </Badge>
                    <h3 className="text-white font-bold">{book.title}</h3>
                    <p className="text-gray-200 text-sm">{book.author}</p>
                  </div>
                </div>
                <CardContent className="pt-4 pb-2">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <Book className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{book.pages} pages</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" className="gap-1">
                    <BookmarkPlus className="h-4 w-4" /> Save
                  </Button>
                  <Button size="sm" className="gap-1">
                    <FileDown className="h-4 w-4" /> Read
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="videos">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { id: 1, title: "Newton's Laws of Motion", subject: "Physics", duration: "32:15", instructor: "Dr. Richard Feynman", thumbnail: "https://i.pravatar.cc/150?u=video1", views: 2450 },
              { id: 2, title: "Chemical Bonding Explained", subject: "Chemistry", duration: "28:42", instructor: "Prof. Maria Curie", thumbnail: "https://i.pravatar.cc/150?u=video2", views: 1820 },
              { id: 3, title: "Cell Division: Mitosis and Meiosis", subject: "Biology", duration: "41:05", instructor: "Dr. James Watson", thumbnail: "https://i.pravatar.cc/150?u=video3", views: 2120 },
              { id: 4, title: "Trigonometry Fundamentals", subject: "Mathematics", duration: "35:50", instructor: "Prof. Alan Turing", thumbnail: "https://i.pravatar.cc/150?u=video4", views: 1950 },
              { id: 5, title: "Shakespeare's Macbeth Analysis", subject: "English", duration: "45:30", instructor: "Dr. Emily Brontë", thumbnail: "https://i.pravatar.cc/150?u=video5", views: 1680 },
              { id: 6, title: "World War II: Key Events", subject: "History", duration: "52:18", instructor: "Prof. Winston Churchill", thumbnail: "https://i.pravatar.cc/150?u=video6", views: 2340 },
            ].map((video) => (
              <Card key={video.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/60 rounded-full p-3">
                      <Play className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {video.duration}
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="mb-2 bg-blue-50 text-blue-700">
                      {video.subject}
                    </Badge>
                  </div>
                  <CardTitle className="text-base">{video.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <div>
                      <span>Instructor: {video.instructor}</span>
                    </div>
                    <div>
                      <span>{video.views} views</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost" size="sm" className="gap-1">
                    <BookmarkPlus className="h-4 w-4" /> Save
                  </Button>
                  <Button size="sm" className="gap-1">
                    <Play className="h-4 w-4" /> Watch
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="practice">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { id: 1, title: "Physics Problem Set - Mechanics", subject: "Physics", type: "PDF", questions: 25, difficulty: "Medium", date: "2023-10-14" },
              { id: 2, title: "Chemistry Worksheet - Periodic Table", subject: "Chemistry", type: "DOCX", questions: 20, difficulty: "Easy", date: "2023-10-11" },
              { id: 3, title: "Biology Quiz - Ecology", subject: "Biology", type: "PDF", questions: 30, difficulty: "Hard", date: "2023-10-08" },
              { id: 4, title: "Mathematics Problems - Calculus", subject: "Mathematics", type: "PDF", questions: 35, difficulty: "Hard", date: "2023-10-05" },
              { id: 5, title: "English Practice - Grammar", subject: "English", type: "PDF", questions: 40, difficulty: "Medium", date: "2023-10-02" },
              { id: 6, title: "History Quiz - Ancient Civilizations", subject: "History", type: "DOCX", questions: 28, difficulty: "Medium", date: "2023-09-29" },
            ].map((material) => (
              <Card key={material.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="mb-2 bg-blue-50 text-blue-700">
                      {material.subject}
                    </Badge>
                    <Badge variant={
                      material.difficulty === "Easy" ? "outline" : 
                      material.difficulty === "Medium" ? "secondary" : 
                      "default"
                    }>
                      {material.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-base">{material.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <File className="h-4 w-4 mr-1" />
                      <span>{material.type} • {material.questions} questions</span>
                    </div>
                    <div>
                      <span>Added: {new Date(material.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost" size="sm" className="gap-1">
                    <BookmarkPlus className="h-4 w-4" /> Save
                  </Button>
                  <Button size="sm" className="gap-1">
                    <Download className="h-4 w-4" /> Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
