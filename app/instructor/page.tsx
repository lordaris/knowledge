"use client";
import { NewCourseDrawer } from "@/components/course/new-course-drawer";
import { NewCourseModal } from "@/components/course/new-course-modal";
import { useMediaQuery } from "@/hooks/use-media-query";
import useCourseStore from "@/store/course-store";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { DashboardCourseCard } from "./components/dashboard-course-card";

export default function NewCoursePage() {
  const { userId } = useAuth();
  const { courses, loadCoursesByInstructor } = useCourseStore();

  useEffect(() => {
    if (userId) {
      loadCoursesByInstructor(userId);
    }
  }, [userId, loadCoursesByInstructor]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-start p-6">
      <h1 className="mb-8 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
        My Courses
      </h1>
      <div className="mb-4 ">
        <NewCourseTrigger />
      </div>
      <div className="sm:w-3/4">
        <DashboardCourseCard courses={courses} />
      </div>
    </div>
  );
}

const NewCourseTrigger = () => {
  const [open, setOpen] = useState(false);
  const desktop = "(min-width: 768px)";
  const isDesktop = useMediaQuery(desktop);

  const CourseCreationUI = isDesktop ? (
    <NewCourseModal open={open} setOpen={setOpen} />
  ) : (
    <NewCourseDrawer setOpen={setOpen} />
  );

  return CourseCreationUI;
};
