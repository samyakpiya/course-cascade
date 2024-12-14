import { useUserRole } from "@/hooks/useUserRole";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { BookOpen, Briefcase } from "lucide-react";
import React from "react";

const UserButtonComponent = () => {
  const { userRole } = useUserRole();
  console.log("userRole", userRole);

  return (
    <UserButton
      appearance={{
        baseTheme: dark,
        elements: {
          userButtonOuterIdentifier: "text-customgreys-dirtyGrey",
          userButtonBox: "scale-90 sm:scale-100",
        },
      }}
      userProfileMode="navigation"
      userProfileUrl={
        userRole === "teacher" ? "/teacher/profile" : "/user/profile"
      }
    >
      {/* Clerk: <UserButton.MenuItems /> component can only accept <UserButton.Action /> and <UserButton.Link /> as its children. Any other provided component will be ignored. */}
      <UserButton.MenuItems>
        {userRole === null && (
          <UserButton.Link
            href="/user/courses"
            label="My Learning"
            labelIcon={<BookOpen className="size-4" />}
          />
        )}
        {userRole === null && (
          <UserButton.Link
            href="/teacher/courses"
            label="Instructor"
            labelIcon={<Briefcase className="size-4" />}
          />
        )}
        {userRole === "teacher" && (
          <UserButton.Link
            href="/user/courses"
            label="My Learning"
            labelIcon={<BookOpen className="size-4" />}
          />
        )}
        {userRole === "student" && (
          <UserButton.Link
            href="/teacher/courses"
            label="Instructor"
            labelIcon={<Briefcase className="size-4" />}
          />
        )}
      </UserButton.MenuItems>
    </UserButton>
  );
};

export default UserButtonComponent;
