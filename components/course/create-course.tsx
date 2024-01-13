// app/components/course/create-course.tsx
"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { useState } from "react";
import { NewCourseDrawer } from "./new-course-drawer";
import { NewCourseModal } from "./new-course-modal";

export const NewCourse = () => {
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
