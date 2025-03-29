
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, FileText, ClipboardList } from "lucide-react";

export default function ApprovalPage() {
  return (
    <DashboardLayout 
      role="admin" 
      title="Approvals"
      subtitle="Review and approve teacher-submitted materials"
    >
      <Tabs defaultValue="pending">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="pending">Pending Approvals</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending">
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { id: 1, title: "Algebra Formulas", type: "Study Material", teacher: "Robert Johnson", class: "8A", subject: "Mathematics", date: "2023-11-05" },
              { id: 2, title: "Science Quiz Week 3", type: "Assessment", teacher: "Mary Smith", class: "5B", subject: "Science", date: "2023-11-04" },
              { id: 3, title: "English Grammar Rules", type: "Study Material", teacher: "Jane Wilson", class: "6C", subject: "English", date: "2023-11-03" },
              { id: 4, title: "History Timeline Project", type: "Assessment", teacher: "John Davis", class: "9A", subject: "History", date: "2023-11-02" },
            ].map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <Badge className="w-fit mb-2" variant={item.type === "Study Material" ? "outline" : "secondary"}>
                    {item.type}
                  </Badge>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>
                    Submitted by {item.teacher} on {new Date(item.date).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex gap-2">
                    <span className="text-sm font-medium">Class:</span>
                    <span className="text-sm">{item.class}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-sm font-medium">Subject:</span>
                    <span className="text-sm">{item.subject}</span>
                  </div>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button size="sm" variant="outline" className="w-full">
                    Preview
                  </Button>
                  <Button size="sm" className="w-full gap-1">
                    <CheckCircle className="h-4 w-4" /> Approve
                  </Button>
                  <Button size="sm" variant="destructive" className="w-full gap-1">
                    <XCircle className="h-4 w-4" /> Reject
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="approved">
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { id: 5, title: "Physics Formulas", type: "Study Material", teacher: "Alan Walker", class: "10A", subject: "Physics", date: "2023-11-01", approvedDate: "2023-11-01" },
              { id: 6, title: "Mathematics Mid-Term", type: "Assessment", teacher: "Sarah Johnson", class: "7B", subject: "Mathematics", date: "2023-10-29", approvedDate: "2023-10-30" },
            ].map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <Badge className="w-fit mb-2" variant={item.type === "Study Material" ? "outline" : "secondary"}>
                    {item.type}
                  </Badge>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>
                    Submitted by {item.teacher} on {new Date(item.date).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex gap-2">
                    <span className="text-sm font-medium">Class:</span>
                    <span className="text-sm">{item.class}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-sm font-medium">Subject:</span>
                    <span className="text-sm">{item.subject}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-sm font-medium">Approved on:</span>
                    <span className="text-sm">{new Date(item.approvedDate).toLocaleDateString()}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button size="sm" variant="outline" className="w-full">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="rejected">
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { id: 7, title: "Chemistry Lab Experiment", type: "Study Material", teacher: "Michael Brown", class: "11B", subject: "Chemistry", date: "2023-10-28", rejectedDate: "2023-10-29", reason: "Content needs more detailed safety instructions." },
            ].map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <Badge className="w-fit mb-2" variant={item.type === "Study Material" ? "outline" : "secondary"}>
                    {item.type}
                  </Badge>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>
                    Submitted by {item.teacher} on {new Date(item.date).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex gap-2">
                    <span className="text-sm font-medium">Class:</span>
                    <span className="text-sm">{item.class}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-sm font-medium">Subject:</span>
                    <span className="text-sm">{item.subject}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-sm font-medium">Rejected on:</span>
                    <span className="text-sm">{new Date(item.rejectedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm font-medium">Reason:</span>
                    <p className="text-sm mt-1 text-muted-foreground">{item.reason}</p>
                  </div>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button size="sm" variant="outline" className="w-full">
                    View Content
                  </Button>
                  <Button size="sm" className="w-full gap-1">
                    Request Revision
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
