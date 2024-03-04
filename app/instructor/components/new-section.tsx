"use client";
import { useState } from "react";
import { NewSectionModal } from "@/components/course/section/new-section-modal";
import { NewSectionDrawer } from "@/components/course/section/new-section-drawer";
import { useMediaQuery } from "@/hooks/use-media-query";

export const NewSection = ({ courseId }) => {
  const [open, setOpen] = useState(false);
  const desktop = "(min-width: 768px)";
  const isDesktop = useMediaQuery(desktop);

  const CourseCreationUI = isDesktop ? (
    <NewSectionModal courseId={courseId} open={open} setOpen={setOpen} />
  ) : (
    <NewSectionDrawer courseId={courseId} setOpen={setOpen} />
  );

  return CourseCreationUI;
};
