import { usePathname } from "next/navigation";

interface UserRoleReturn {
  isTeacher: boolean;
  isStudent: boolean;
  userRole: "teacher" | "student" | null;
}

export function useUserRole(): UserRoleReturn {
  const pathname = usePathname();
  const isTeacher = pathname.startsWith("/teacher");
  const isStudent = pathname.startsWith("/user");

  const userRole = isTeacher ? "teacher" : isStudent ? "student" : null;

  return { isTeacher, isStudent, userRole };
}
