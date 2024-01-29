"use client";
import DeleteConfirmationModal from "@/components/course/delete-confirmation-modal";
import { NewCourseDrawer } from "@/components/course/new-course-drawer";
import { NewCourseModal } from "@/components/course/new-course-modal";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { TrashIcon } from "@radix-ui/react-icons";
import { useCallback, useEffect, useState } from "react";
import useCourseStore from "@/store/course-store";

import { useMediaQuery } from "@/hooks/use-media-query";

export default function NewCoursePage() {
  const { userId } = useAuth();
  const courses = useCourseStore((state) => state.courses);
  const loadCourses = useCourseStore((state) => state.loadCourses);
  const deleteCourse = useCourseStore((state) => state.deleteCourse);

  useEffect(() => {
    if (userId) {
      loadCourses(userId);
    }
  }, [userId, loadCourses]);
  const handleDelete = async (courseId) => {
    try {
      const response = await fetch(`/api/courses/${courseId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        loadCourses(userId); // Reload the courses list after deletion
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch courses by instructor Id from the API and update the local state
  // using the loadCourses action
  useEffect(() => {
    if (userId) loadCourses(userId);
  }, [userId, loadCourses]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-start p-6">
      <h1 className="mb-8 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
        My Courses
      </h1>
      <div className="mb-4 self-center">
        <NewCourse />
      </div>
      <div className="justify-self-between w-full max-w-4xl">
        {courses.map((course) => (
          <CourseItem
            key={course._id}
            course={course}
            onDelete={() => deleteCourse(course._id)}
          />
        ))}
      </div>
    </div>
  );
}

const NewCourse = () => {
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

const CourseItem = ({ course, onDelete }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <div className="flex items-center justify-between gap-2 p-2">
      <p className="leading-7 [&:not(:first-child)]:mt-6">{course.title} </p>
      {course.sections}
      <div className="flex gap-2">
        <Button
          size={"icon"}
          variant={"destructive"}
          onClick={() => setIsDeleteModalOpen(true)}
          className="text-foreground"
        >
          <TrashIcon />
        </Button>
        <DeleteConfirmationModal
          courseId={course._id}
          onDelete={onDelete}
          open={isDeleteModalOpen}
          setOpen={setIsDeleteModalOpen}
        />
      </div>
    </div>
  );
};
