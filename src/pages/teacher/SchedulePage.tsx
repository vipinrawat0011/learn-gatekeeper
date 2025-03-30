
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, FileText, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data for schedule
const scheduleData = [
  { 
    id: 1, 
    day: "Monday", 
    classes: [
      { id: 101, name: "Mathematics", class: "9A", time: "9:00 AM - 10:30 AM", room: "301", students: 28 },
      { id: 102, name: "Mathematics", class: "10B", time: "11:00 AM - 12:30 PM", room: "305", students: 32 },
      { id: 103, name: "Science", class: "8A", time: "2:00 PM - 3:30 PM", room: "Lab 2", students: 30 }
    ]
  },
  { 
    id: 2, 
    day: "Tuesday", 
    classes: [
      { id: 201, name: "Mathematics", class: "7A", time: "9:00 AM - 10:30 AM", room: "201", students: 25 },
      { id: 202, name: "Mathematics", class: "8B", time: "11:00 AM - 12:30 PM", room: "202", students: 27 }
    ]
  },
  { 
    id: 3, 
    day: "Wednesday", 
    classes: [
      { id: 301, name: "Mathematics", class: "9A", time: "9:00 AM - 10:30 AM", room: "301", students: 28 },
      { id: 302, name: "Mathematics", class: "10B", time: "11:00 AM - 12:30 PM", room: "305", students: 32 },
      { id: 303, name: "Science", class: "8A", time: "2:00 PM - 3:30 PM", room: "Lab 2", students: 30 }
    ]
  },
  { 
    id: 4, 
    day: "Thursday", 
    classes: [
      { id: 401, name: "Mathematics", class: "7A", time: "9:00 AM - 10:30 AM", room: "201", students: 25 },
      { id: 402, name: "Mathematics", class: "8B", time: "11:00 AM - 12:30 PM", room: "202", students: 27 }
    ]
  },
  { 
    id: 5, 
    day: "Friday", 
    classes: [
      { id: 501, name: "Mathematics", class: "9A", time: "9:00 AM - 10:30 AM", room: "301", students: 28 },
      { id: 502, name: "Science", class: "10A", time: "11:00 AM - 12:30 PM", room: "Lab 1", students: 30 }
    ]
  }
];

// Mock data for upcoming events
const upcomingEvents = [
  { id: 1, title: "Staff Meeting", date: "October 25, 2023", time: "3:30 PM - 4:30 PM", location: "Conference Room" },
  { id: 2, title: "Parent-Teacher Conference", date: "October 28, 2023", time: "10:00 AM - 4:00 PM", location: "School Hall" },
  { id: 3, title: "Mathematics Department Meeting", date: "November 2, 2023", time: "4:00 PM - 5:00 PM", location: "Room 105" }
];

export default function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState("Monday");
  
  return (
    <DashboardLayout 
      role="teacher" 
      title="Schedule"
      subtitle="View your teaching schedule and upcoming events"
    >
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 mb-6">
        {scheduleData.map((day) => (
          <Button
            key={day.id}
            variant={selectedDay === day.day ? "default" : "outline"}
            className="w-full h-auto py-2 flex flex-col shadow-sm"
            onClick={() => setSelectedDay(day.day)}
          >
            <span className="font-medium">{day.day}</span>
            <span className="text-xs mt-1">{day.classes.length} Classes</span>
          </Button>
        ))}
      </div>
      
      <Card className="border-none shadow-sm mb-6">
        <CardHeader className="pb-2">
          <CardTitle>Classes on {selectedDay}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scheduleData.find(day => day.day === selectedDay)?.classes.map((classItem) => (
              <div key={classItem.id} className="border rounded-lg overflow-hidden">
                <div className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">{classItem.name} - {classItem.class}</div>
                      <div className="flex text-sm text-muted-foreground gap-3 mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {classItem.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> Room {classItem.room}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" /> {classItem.students} students
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View Materials</Button>
                    <Button size="sm">Start Class</Button>
                  </div>
                </div>
              </div>
            ))}
            
            {scheduleData.find(day => day.day === selectedDay)?.classes.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-10 w-10 mx-auto mb-2 opacity-20" />
                <p>No classes scheduled for {selectedDay}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="border rounded-lg overflow-hidden p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-2 rounded-lg mt-1">
                      <Calendar className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-muted-foreground mt-1">{event.date}</div>
                      <div className="flex text-sm text-muted-foreground gap-3 mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {event.time}
                        </span>
                        <span>
                          {event.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline">Upcoming</Badge>
                </div>
              </div>
            ))}
            
            {upcomingEvents.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-10 w-10 mx-auto mb-2 opacity-20" />
                <p>No upcoming events</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
