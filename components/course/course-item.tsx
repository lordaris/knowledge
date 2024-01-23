// app/components/course/course-item.tsx

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import { useCourse } from "@/app/providers/course-context-provider";
import DeleteConfirmationModal from "@/components/course/delete-confirmation-modal";

/*
 * The DeleteConfirmationModal component receives the courseId as a prop and passes it to the onDelete prop which receives the handleDelete function as a value.
 */

const CourseItem = ({ course }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { loadCourses } = useCourse();

  const handleDelete = async (courseId) => {
    try {
      const response = await fetch(`/api/courses/${courseId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        loadCourses(); // Reload the courses list after deletion
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex  items-center justify-between gap-2 p-2">
      <p className="leading-7 [&:not(:first-child)]:mt-6">{course.title}</p>
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
          onDelete={handleDelete}
          open={isDeleteModalOpen}
          setOpen={setIsDeleteModalOpen}
        />
      </div>
    </div>
  );
};

export default CourseItem;
