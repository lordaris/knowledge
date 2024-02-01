"use client";
import { useState, useEffect } from "react";
import { EditCourseForm } from "@/components/course/edit-course-form";
import useCourseStore from "@/store/course-store";
import { Button } from "@/components/ui/button";
import DeleteCourseConfirmationModal from "@/components/course/delete-confirmation-modal";

export default function CoursePage({
  params,
}: {
  params: { courseId: string };
}) {
  const courseId = params.courseId;
  const { deleteCourse } = useCourseStore();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteCourse(courseId);
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-start p-6">
      <h1 className="mb-8 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
        Edit Course Information
      </h1>

      <EditCourseForm courseId={courseId} />
      <Button variant="destructive" onClick={() => setIsDeleteModalOpen(true)}>
        Delete Course
      </Button>
      {isDeleteModalOpen && (
        <DeleteCourseConfirmationModal
          courseId={courseId}
          onDelete={handleDelete}
          open={isDeleteModalOpen}
          setOpen={setIsDeleteModalOpen}
        />
      )}
    </div>
  );
}
