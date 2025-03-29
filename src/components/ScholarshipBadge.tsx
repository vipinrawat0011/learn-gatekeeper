
import { cn } from "@/lib/utils";

type ScholarLevel = "Junior Scholar" | "Rising Intellect" | "Mastermind Elite";

interface ScholarshipBadgeProps {
  level: ScholarLevel;
  className?: string;
}

export function ScholarshipBadge({ level, className }: ScholarshipBadgeProps) {
  return (
    <span
      className={cn(
        "scholar-badge",
        level === "Junior Scholar" && "junior-scholar",
        level === "Rising Intellect" && "rising-intellect",
        level === "Mastermind Elite" && "mastermind-elite",
        className
      )}
    >
      {level}
    </span>
  );
}
