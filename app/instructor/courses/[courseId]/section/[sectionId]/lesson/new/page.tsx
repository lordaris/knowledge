"use client";
import { useEffect, useState } from "react";
import { NewLessonForm } from "@/components/course/section/lesson/new-lesson-form";

export default function NewLessonPage({
  params,
}: {
  params: { courseId: string; sectionId: string };
}) {
  const sectionId = params.sectionId;
  const courseId = params.courseId;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  return (
    <div className="flex min-h-screen flex-col items-center justify-start p-6">
      <h1 className="mb-8 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
        New Lesson
      </h1>

      <NewLessonForm sectionId={sectionId} courseId={courseId} />
    </div>
  );
}
