
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, BarChart, BookOpen } from "lucide-react";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function StudentMarksPage() {
  const subjects = [
    { name: "Mathematics", midterm: 85, final: 88, practical: 90, assignment: 82, color: "#8884d8" },
    { name: "Physics", midterm: 78, final: 82, practical: 85, assignment: 75, color: "#82ca9d" },
    { name: "Chemistry", midterm: 70, final: 75, practical: 80, assignment: 72, color: "#ffc658" },
    { name: "Biology", midterm: 88, final: 92, practical: 85, assignment: 90, color: "#ff8042" },
    { name: "English", midterm: 75, final: 80, practical: null, assignment: 78, color: "#0088fe" },
  ];

  // Calculate overall percentage
  const overallPercentage = subjects.reduce((acc, subject) => {
    let total = 0;
    let count = 0;
    
    if (subject.midterm) { total += subject.midterm; count++; }
    if (subject.final) { total += subject.final; count++; }
    if (subject.practical) { total += subject.practical; count++; }
    if (subject.assignment) { total += subject.assignment; count++; }
    
    return acc + (total / count);
  }, 0) / subjects.length;

  // Format for chart
  const barChartData = subjects.map(subject => ({
    name: subject.name,
    Midterm: subject.midterm,
    Final: subject.final,
    Practical: subject.practical || 0,
    Assignment: subject.assignment
  }));

  return (
    <DashboardLayout
      role="student"
      title="Academic Marks"
      subtitle="View your marks, grades, and academic progress"
    >
      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Overall Percentage</p>
              <p className="text-4xl font-bold text-primary">{overallPercentage.toFixed(1)}%</p>
              <Badge className="mt-2" variant={
                overallPercentage >= 85 ? "default" : 
                overallPercentage >= 70 ? "secondary" : 
                "outline"
              }>
                {overallPercentage >= 85 ? "Excellent" : 
                 overallPercentage >= 70 ? "Good" : 
                 "Average"}
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Academic Ranking</p>
              <p className="text-4xl font-bold text-green-600">5<span className="text-base font-normal">/30</span></p>
              <Badge className="mt-2 bg-green-100 text-green-800">
                Top Performer
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Scholar Category</p>
              <p className="text-xl font-bold text-amber-600">Mastermind Elite</p>
              <div className="mt-2 flex justify-center">
                <TrendingUp className="text-amber-600 h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Performance Overview</CardTitle>
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" /> Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={barChartData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Midterm" fill="#8884d8" />
                  <Bar dataKey="Final" fill="#82ca9d" />
                  <Bar dataKey="Practical" fill="#ffc658" />
                  <Bar dataKey="Assignment" fill="#ff8042" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Detailed Marks</CardTitle>
            <Select defaultValue="current">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select term" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Current Term</SelectItem>
                <SelectItem value="previous">Previous Term</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Subjects</TabsTrigger>
              <TabsTrigger value="midterm">Mid-Term</TabsTrigger>
              <TabsTrigger value="final">Final Exam</TabsTrigger>
              <TabsTrigger value="practical">Practical</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Subject</th>
                      <th className="text-center p-3 font-medium">Mid-Term</th>
                      <th className="text-center p-3 font-medium">Final Exam</th>
                      <th className="text-center p-3 font-medium">Practical</th>
                      <th className="text-center p-3 font-medium">Assignment</th>
                      <th className="text-center p-3 font-medium">Average</th>
                      <th className="text-center p-3 font-medium">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map((subject, index) => {
                      // Calculate average
                      let total = 0;
                      let count = 0;
                      if (subject.midterm) { total += subject.midterm; count++; }
                      if (subject.final) { total += subject.final; count++; }
                      if (subject.practical) { total += subject.practical; count++; }
                      if (subject.assignment) { total += subject.assignment; count++; }
                      
                      const average = total / count;
                      
                      // Determine grade
                      let grade = "F";
                      if (average >= 90) grade = "A+";
                      else if (average >= 80) grade = "A";
                      else if (average >= 75) grade = "B+";
                      else if (average >= 70) grade = "B";
                      else if (average >= 60) grade = "C";
                      else if (average >= 50) grade = "D";
                      
                      return (
                        <tr key={index} className="border-b">
                          <td className="p-3">
                            <div className="flex items-center">
                              <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: subject.color }}></div>
                              {subject.name}
                            </div>
                          </td>
                          <td className="text-center p-3">{subject.midterm}%</td>
                          <td className="text-center p-3">{subject.final}%</td>
                          <td className="text-center p-3">{subject.practical ? `${subject.practical}%` : "N/A"}</td>
                          <td className="text-center p-3">{subject.assignment}%</td>
                          <td className="text-center p-3 font-medium">{average.toFixed(1)}%</td>
                          <td className="text-center p-3">
                            <Badge variant={
                              grade.startsWith("A") ? "default" : 
                              grade.startsWith("B") ? "secondary" : 
                              "outline"
                            }>
                              {grade}
                            </Badge>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="bg-muted/50">
                      <td className="p-3 font-medium">Overall</td>
                      <td className="text-center p-3 font-medium">
                        {(subjects.reduce((acc, subj) => acc + subj.midterm, 0) / subjects.length).toFixed(1)}%
                      </td>
                      <td className="text-center p-3 font-medium">
                        {(subjects.reduce((acc, subj) => acc + subj.final, 0) / subjects.length).toFixed(1)}%
                      </td>
                      <td className="text-center p-3 font-medium">
                        {(subjects.reduce((acc, subj) => acc + (subj.practical || 0), 0) / subjects.filter(s => s.practical).length).toFixed(1)}%
                      </td>
                      <td className="text-center p-3 font-medium">
                        {(subjects.reduce((acc, subj) => acc + subj.assignment, 0) / subjects.length).toFixed(1)}%
                      </td>
                      <td className="text-center p-3 font-medium">{overallPercentage.toFixed(1)}%</td>
                      <td className="text-center p-3 font-medium">
                        <Badge variant="default">
                          {overallPercentage >= 90 ? "A+" : 
                           overallPercentage >= 80 ? "A" : 
                           overallPercentage >= 75 ? "B+" : 
                           overallPercentage >= 70 ? "B" : 
                           overallPercentage >= 60 ? "C" : 
                           overallPercentage >= 50 ? "D" : "F"}
                        </Badge>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="midterm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Subject</th>
                      <th className="text-center p-3 font-medium">Total Marks</th>
                      <th className="text-center p-3 font-medium">Obtained Marks</th>
                      <th className="text-center p-3 font-medium">Percentage</th>
                      <th className="text-center p-3 font-medium">Grade</th>
                      <th className="text-center p-3 font-medium">Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map((subject, index) => {
                      let grade = "F";
                      if (subject.midterm >= 90) grade = "A+";
                      else if (subject.midterm >= 80) grade = "A";
                      else if (subject.midterm >= 75) grade = "B+";
                      else if (subject.midterm >= 70) grade = "B";
                      else if (subject.midterm >= 60) grade = "C";
                      else if (subject.midterm >= 50) grade = "D";
                      
                      return (
                        <tr key={index} className="border-b">
                          <td className="p-3">
                            <div className="flex items-center">
                              <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: subject.color }}></div>
                              {subject.name}
                            </div>
                          </td>
                          <td className="text-center p-3">50</td>
                          <td className="text-center p-3">{(subject.midterm / 100 * 50).toFixed(1)}</td>
                          <td className="text-center p-3">{subject.midterm}%</td>
                          <td className="text-center p-3">
                            <Badge variant={
                              grade.startsWith("A") ? "default" : 
                              grade.startsWith("B") ? "secondary" : 
                              "outline"
                            }>
                              {grade}
                            </Badge>
                          </td>
                          <td className="text-center p-3 text-sm">
                            {subject.midterm >= 80 ? "Excellent" : 
                             subject.midterm >= 70 ? "Good" : 
                             subject.midterm >= 60 ? "Satisfactory" : 
                             "Needs Improvement"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="final">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Subject</th>
                      <th className="text-center p-3 font-medium">Total Marks</th>
                      <th className="text-center p-3 font-medium">Obtained Marks</th>
                      <th className="text-center p-3 font-medium">Percentage</th>
                      <th className="text-center p-3 font-medium">Grade</th>
                      <th className="text-center p-3 font-medium">Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map((subject, index) => {
                      let grade = "F";
                      if (subject.final >= 90) grade = "A+";
                      else if (subject.final >= 80) grade = "A";
                      else if (subject.final >= 75) grade = "B+";
                      else if (subject.final >= 70) grade = "B";
                      else if (subject.final >= 60) grade = "C";
                      else if (subject.final >= 50) grade = "D";
                      
                      return (
                        <tr key={index} className="border-b">
                          <td className="p-3">
                            <div className="flex items-center">
                              <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: subject.color }}></div>
                              {subject.name}
                            </div>
                          </td>
                          <td className="text-center p-3">100</td>
                          <td className="text-center p-3">{subject.final}</td>
                          <td className="text-center p-3">{subject.final}%</td>
                          <td className="text-center p-3">
                            <Badge variant={
                              grade.startsWith("A") ? "default" : 
                              grade.startsWith("B") ? "secondary" : 
                              "outline"
                            }>
                              {grade}
                            </Badge>
                          </td>
                          <td className="text-center p-3 text-sm">
                            {subject.final >= 80 ? "Excellent" : 
                             subject.final >= 70 ? "Good" : 
                             subject.final >= 60 ? "Satisfactory" : 
                             "Needs Improvement"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="practical">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Subject</th>
                      <th className="text-center p-3 font-medium">Total Marks</th>
                      <th className="text-center p-3 font-medium">Obtained Marks</th>
                      <th className="text-center p-3 font-medium">Percentage</th>
                      <th className="text-center p-3 font-medium">Grade</th>
                      <th className="text-center p-3 font-medium">Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects
                      .filter(subject => subject.practical !== null)
                      .map((subject, index) => {
                        let grade = "F";
                        if (subject.practical! >= 90) grade = "A+";
                        else if (subject.practical! >= 80) grade = "A";
                        else if (subject.practical! >= 75) grade = "B+";
                        else if (subject.practical! >= 70) grade = "B";
                        else if (subject.practical! >= 60) grade = "C";
                        else if (subject.practical! >= 50) grade = "D";
                        
                        return (
                          <tr key={index} className="border-b">
                            <td className="p-3">
                              <div className="flex items-center">
                                <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: subject.color }}></div>
                                {subject.name}
                              </div>
                            </td>
                            <td className="text-center p-3">30</td>
                            <td className="text-center p-3">{(subject.practical! / 100 * 30).toFixed(1)}</td>
                            <td className="text-center p-3">{subject.practical}%</td>
                            <td className="text-center p-3">
                              <Badge variant={
                                grade.startsWith("A") ? "default" : 
                                grade.startsWith("B") ? "secondary" : 
                                "outline"
                              }>
                                {grade}
                              </Badge>
                            </td>
                            <td className="text-center p-3 text-sm">
                              {subject.practical! >= 80 ? "Excellent" : 
                               subject.practical! >= 70 ? "Good" : 
                               subject.practical! >= 60 ? "Satisfactory" : 
                               "Needs Improvement"}
                            </td>
                          </tr>
                        );
                      })}
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
