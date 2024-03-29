"use client";
import useCourseStore from "@/store/course-store";
import { useEffect } from "react";
import Markdown from "react-markdown";

export default function LessonEditPage({
  params,
}: {
  params: { lessonId: string };
}) {
  const lessonId = params.lessonId;
  const { loadSingleLesson, singleLesson } = useCourseStore();

  useEffect(() => {
    if (lessonId) {
      loadSingleLesson(lessonId);
    }
  }, [lessonId, loadSingleLesson]);

  return (
    <div className="prose items-center justify-start p-4">
      <h1 className="">{singleLesson.title}</h1>
      <Markdown>{singleLesson.content}</Markdown>
    </div>
  );
}
