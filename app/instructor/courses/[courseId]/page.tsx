"use client";
import DeleteCourseConfirmationModal from "@/components/course/delete-confirmation-modal";
import { EditCourseForm } from "@/components/course/edit-course-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useCourseStore from "@/store/course-store";
import { useEffect, useState } from "react";
import { SectionItem } from "../../components/section-item";
import { NewSection } from "../../components/new-section";

export default function CoursePage({
  params,
}: {
  params: { courseId: string };
}) {
  const courseId = params.courseId;
  const { deleteCourse, loadSingleCourse, singleCourse } = useCourseStore();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (courseId) {
      loadSingleCourse(courseId);
    }
  }, [courseId, loadSingleCourse]);

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
      <SectionEditCard singleCourse={singleCourse} courseId={courseId} />
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

const SectionEditCard = ({ singleCourse, courseId }) => {
  return (
    <>
      <Card className="m-4 w-3/4 ">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Sections
          </CardTitle>
        </CardHeader>
        <CardContent>
          {singleCourse.sections?.map((section, index) => (
            <SectionItem
              key={section._id}
              section={section}
              courseId={courseId}
              sectionNumber={index + 1}
            />
          ))}
        </CardContent>
        <CardFooter>
          <NewSection courseId={courseId} />
        </CardFooter>{" "}
      </Card>
    </>
  );
};
