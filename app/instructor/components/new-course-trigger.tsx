"use client";
import { NewCourseDrawer } from "@/components/course/new-course-drawer";
import { NewCourseModal } from "@/components/course/new-course-modal";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useState } from "react";

export const NewCourseTrigger = () => {
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
