
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { GraduationCap, Shield, BookOpen } from "lucide-react";
import { Logo } from "@/components/Logo";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="container mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Logo />
        <div className="space-x-4">
          <Button asChild variant="ghost">
            <Link to="/about">About</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/contact">Contact</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to ScholarWay <span className="text-primary">Learning Management System</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A complete educational platform for students, teachers, administrators, and superadministrators.
            Manage courses, track progress, and improve learning outcomes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>Super Admin</CardTitle>
              <CardDescription>System administration portal</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Manage the entire platform, create admins, and control feature permissions.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button asChild>
                <Link to="/login/superadmin">Sign In</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>Admin</CardTitle>
              <CardDescription>Institution management portal</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Manage your institution, create teachers and students, and oversee course content.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button asChild>
                <Link to="/login/admin">Sign In</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>Teacher</CardTitle>
              <CardDescription>Teaching portal</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Manage courses, create assessments, upload study materials, and track student progress.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button asChild>
                <Link to="/login/teacher">Sign In</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>Student</CardTitle>
              <CardDescription>Learning portal</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Access courses, view study materials, take assessments, and track your academic progress.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button asChild>
                <Link to="/login/student">Sign In</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>

      <footer className="border-t mt-16 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>© 2023 ScholarWay. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
