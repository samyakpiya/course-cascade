"use client";

import Loading from "@/components/Loading";
import {
  useGetCoursesQuery,
  useGetUserEnrolledCoursesQuery,
} from "@/state/api";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import CourseCardSearch from "@/components/CourseCardSearch";
import SelectedCourse from "./SelectedCourse";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getCoursePath } from "@/lib/utils";

function Search() {
  const { isSignedIn, user, isLoaded } = useUser();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data: courses, isLoading, isError } = useGetCoursesQuery({});
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const router = useRouter();

  const {
    data: enrolledCourses,
    isLoading: enrolledCoursesLoading,
    isError: enrolledCoursesError,
  } = useGetUserEnrolledCoursesQuery(user?.id ?? "", {
    skip: !isLoaded || !user,
  });

  useEffect(() => {
    if (courses) {
      if (id) {
        const course = courses.find((c) => c.courseId === id);
        setSelectedCourse(course || courses[0]);
      } else {
        setSelectedCourse(courses[0]);
      }
    }
  }, [courses, id]);

  if (!isLoaded || isLoading || enrolledCoursesLoading) return <Loading />;

  if (isError || !courses) return <div>Failed to fetch courses</div>;

  if (enrolledCoursesError || !enrolledCourses)
    return <div>Failed to fetch enrolled courses</div>;

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    router.push(`/search?id=${course.courseId}`);
  };

  const handleEnrollNow = (course: Course) => {
    const { courseId } = course;

    if (!isSignedIn) {
      router.push(`/checkout?step=1&id=${courseId}&showSignUp=false`, {
        scroll: false,
      });
    } else {
      const isCourseAlreadyPurchased = enrolledCourses.some(
        (c) => c.courseId === courseId
      );

      if (isCourseAlreadyPurchased) {
        toast.warning("You are already enrolled in this course!", {
          action: (
            <Button
              className="text-white-100"
              onClick={() => router.push(getCoursePath(course))}
            >
              Go to course
            </Button>
          ),
        });
        return;
      }

      router.push(`/checkout?step=2&id=${courseId}&showSignUp=false`, {
        scroll: false,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="search"
    >
      <h1 className="search__title">List of available courses</h1>
      <h2 className="search__subtitle">{courses.length} courses avaiable</h2>
      <div className="search__content">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="search__courses-grid"
        >
          {courses.map((course) => (
            <CourseCardSearch
              key={course.courseId}
              course={course}
              isSelected={selectedCourse?.courseId === course.courseId}
              onClick={() => handleCourseSelect(course)}
            />
          ))}
        </motion.div>

        {selectedCourse && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="search__selected-course"
          >
            <SelectedCourse
              course={selectedCourse}
              handleEnrollNow={handleEnrollNow}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default Search;
