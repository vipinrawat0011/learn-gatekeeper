
import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-semibold text-xl">
      <GraduationCap className="h-6 w-6 text-primary" />
      <span>ScholarWay</span>
    </Link>
  );
}
