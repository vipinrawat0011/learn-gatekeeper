
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Calendar, Clock, CheckCircle, BookOpen, Timer, ArrowRight } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ExaminationPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [examStarted, setExamStarted] = useState(false);
  
  const questions = [
    {
      id: 1,
      question: "What is Newton's first law of motion?",
      options: [
        "Objects at rest stay at rest unless acted upon by a force",
        "Force equals mass times acceleration",
        "For every action, there is an equal and opposite reaction",
        "The acceleration of an object is directly proportional to the force"
      ],
      correctAnswer: 0
    },
    {
      id: 2,
      question: "Which of the following is NOT a state of matter?",
      options: [
        "Solid",
        "Liquid",
        "Gas",
        "Energy"
      ],
      correctAnswer: 3
    },
    {
      id: 3,
      question: "What is the SI unit of electric current?",
      options: [
        "Volt",
        "Watt",
        "Ampere",
        "Ohm"
      ],
      correctAnswer: 2
    },
    {
      id: 4,
      question: "Which planet is known as the Red Planet?",
      options: [
        "Venus",
        "Mars",
        "Jupiter",
        "Saturn"
      ],
      correctAnswer: 1
    },
    {
      id: 5,
      question: "What is the primary function of the mitochondria in a cell?",
      options: [
        "Protein synthesis",
        "Energy production",
        "Cell division",
        "Waste removal"
      ],
      correctAnswer: 1
    }
  ];

  const selectAnswer = (questionId: number, optionIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: optionIndex
    });
  };

  const handleStartExam = () => {
    setExamStarted(true);
  };

  const handleSubmitExam = () => {
    // Calculate score
    let score = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    
    alert(`You scored ${score} out of ${questions.length}!`);
    setExamStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswers({});
  };
  
  return (
    <DashboardLayout
      role="student"
      title="Examination"
      subtitle="Take exams, quizzes, and view your assessments"
    >
      <Tabs defaultValue="upcoming">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="live">Live Tests</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { id: 1, title: "Physics Mid-Term", subject: "Physics", type: "Mid-Term", date: "2023-11-20", time: "10:00 AM", duration: "90 min" },
              { id: 2, title: "Chemistry Quiz - Periodic Table", subject: "Chemistry", type: "Quiz", date: "2023-11-15", time: "02:00 PM", duration: "45 min" },
              { id: 3, title: "Mathematics - Algebra", subject: "Mathematics", type: "Weekly Test", date: "2023-11-18", time: "09:30 AM", duration: "60 min" },
              { id: 4, title: "English Essay Writing", subject: "English", type: "Assessment", date: "2023-11-22", time: "11:00 AM", duration: "120 min" },
            ].map((exam) => (
              <Card key={exam.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge className="mb-2" variant={
                      exam.type === "Mid-Term" ? "default" : 
                      exam.type === "Quiz" ? "secondary" : 
                      "outline"
                    }>
                      {exam.type}
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {exam.subject}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{exam.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{new Date(exam.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{exam.time} ({exam.duration})</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline">View Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="live">
          {!examStarted ? (
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <Badge className="mb-2">LIVE NOW</Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      Physics
                    </Badge>
                  </div>
                  <CardTitle>Physics Quiz - Force and Motion</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">5 Questions (Multiple Choice)</span>
                      </div>
                      <div className="flex items-center">
                        <Timer className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">Duration: 15 minutes</span>
                      </div>
                    </div>
                    
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Important Instructions</AlertTitle>
                      <AlertDescription>
                        <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                          <li>Once started, you must complete the test in one sitting</li>
                          <li>Do not refresh the page during the test</li>
                          <li>Each question carries equal marks</li>
                          <li>There is no negative marking</li>
                        </ul>
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={handleStartExam}>
                    Start Test
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Physics Quiz - Force and Motion</CardTitle>
                  <div className="flex items-center">
                    <Timer className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span>Time Remaining: 14:30</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <Badge variant="outline">
                      Question {currentQuestion + 1} of {questions.length}
                    </Badge>
                    <div className="flex gap-1">
                      {questions.map((_, index) => (
                        <button
                          key={index}
                          className={`h-8 w-8 rounded-full text-xs flex items-center justify-center ${
                            currentQuestion === index 
                              ? 'bg-primary text-primary-foreground' 
                              : selectedAnswers[index + 1] !== undefined 
                                ? 'bg-green-100 text-green-800 border border-green-300' 
                                : 'bg-muted text-muted-foreground'
                          }`}
                          onClick={() => setCurrentQuestion(index)}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="py-4">
                    <h3 className="text-lg font-medium mb-4">{questions[currentQuestion].question}</h3>
                    <div className="space-y-3">
                      {questions[currentQuestion].options.map((option, index) => (
                        <div
                          key={index}
                          className={`border rounded-lg p-3 cursor-pointer ${
                            selectedAnswers[questions[currentQuestion].id] === index 
                              ? 'border-primary bg-primary/5' 
                              : 'hover:bg-muted/50'
                          }`}
                          onClick={() => selectAnswer(questions[currentQuestion].id, index)}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`h-6 w-6 rounded-full border flex items-center justify-center ${
                              selectedAnswers[questions[currentQuestion].id] === index 
                                ? 'border-primary bg-primary text-primary-foreground' 
                                : 'border-muted-foreground'
                            }`}>
                              {String.fromCharCode(65 + index)}
                            </div>
                            <span>{option}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </Button>
                
                {currentQuestion < questions.length - 1 ? (
                  <Button 
                    onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmitExam}
                    disabled={Object.keys(selectedAnswers).length < questions.length}
                  >
                    Submit Test
                  </Button>
                )}
              </CardFooter>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="completed">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { id: 1, title: "Physics Quiz - Light", subject: "Physics", date: "2023-10-25", score: 85, grade: "A", status: "Excellent" },
              { id: 2, title: "Chemistry Mid-Term", subject: "Chemistry", date: "2023-10-18", score: 72, grade: "B", status: "Good" },
              { id: 3, title: "Mathematics Test - Calculus", subject: "Mathematics", date: "2023-10-10", score: 90, grade: "A+", status: "Excellent" },
              { id: 4, title: "Biology Practical Assessment", subject: "Biology", date: "2023-10-05", score: 78, grade: "B+", status: "Good" },
            ].map((exam) => (
              <Card key={exam.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="mb-2">
                      Completed
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {exam.subject}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{exam.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Completed on: {new Date(exam.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                      <span className="text-sm">Score: {exam.score}% | Grade: {exam.grade}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">View Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
