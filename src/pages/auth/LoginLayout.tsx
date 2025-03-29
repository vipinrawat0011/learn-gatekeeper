
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { Logo } from "@/components/Logo";

interface LoginLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  image: string;
  altText: string;
}

export function LoginLayout({ children, title, description, image, altText }: LoginLayoutProps) {
  return (
    <div className="flex h-screen">
      <div className="hidden md:block w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src={image} 
            alt={altText} 
            className="object-cover w-full h-full opacity-40"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 to-primary/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12">
          <GraduationCap className="h-20 w-20 mb-4" />
          <h1 className="text-4xl font-bold mb-2">ScholarWay</h1>
          <p className="text-xl max-w-md text-center">
            Empowering education through technology and innovation
          </p>
        </div>
      </div>
      
      <div className="w-full md:w-1/2 flex flex-col">
        <div className="p-4 flex items-center md:hidden">
          <Logo />
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold">{title}</h1>
              <p className="text-muted-foreground">{description}</p>
            </div>
            
            {children}
            
            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                Not the right portal? <Link to="/" className="text-primary hover:underline">Go back to all portals</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
