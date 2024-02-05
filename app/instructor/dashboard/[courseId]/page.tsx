"use client";
import DeleteCourseConfirmationModal from "@/components/course/delete-confirmation-modal";
import DeleteSectionConfirmationModal from "@/components/course/section/delete-section-modal";
import { EditCourseForm } from "@/components/course/edit-course-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useCourseStore from "@/store/course-store";
import { Pencil2Icon, TrashIcon, PlusIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { NewSectionModal } from "@/components/course/section/new-section-modal";
import { NewSectionDrawer } from "@/components/course/section/new-section-drawer";
import { useMediaQuery } from "@/hooks/use-media-query";

import { Label } from "@/components/ui/label";
import Link from "next/link";

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

  const sections = singleCourse?.sections ?? [];
  console.log(sections);

  return (
    <div className="flex min-h-screen flex-col items-center justify-start p-6">
      <h1 className="mb-8 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
        Edit Course Information
      </h1>

      <EditCourseForm courseId={courseId} />
      <Button variant="destructive" onClick={() => setIsDeleteModalOpen(true)}>
        Delete Course
      </Button>
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
        {/* TODO: Add a proper form, modal and drawer for adding a new section. */}
        <CardFooter>
          <NewSection courseId={courseId} />
        </CardFooter>{" "}
      </Card>
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

const SectionItem = ({ section, courseId, sectionNumber }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(section.title);
  const [description, setDescription] = useState(section.description);
  const { updateSection } = useCourseStore();
  const [isDeleteSectionModalOpen, setIsDeleteSectionModalOpen] =
    useState(false);

  const handleSave = async () => {
    try {
      await updateSection(courseId, section._id, {
        title,
        description,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating section:", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTitle(section.title);
    setDescription(section.description);
  };

  return (
    <Card key={section._id} className="group relative m-4">
      <div className="">
        {isEditing ? (
          <div className="flex flex-col items-center p-4 ">
            <Label htmlFor="section-title">Section title</Label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              id="section-title"
            />

            <Label htmlFor="section-description">Section description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="section-description"
            />
          </div>
        ) : (
          <>
            <CardHeader>
              <CardTitle>{"Section " + sectionNumber + ": " + title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <div className="absolute right-4 top-4 flex opacity-0 transition-opacity group-hover:opacity-100">
              <Pencil2Icon
                className="mr-2 h-6 w-6 cursor-pointer"
                onClick={() => setIsEditing(true)}
              />
              <TrashIcon
                className="h-6 w-6 cursor-pointer"
                onClick={() => setIsDeleteSectionModalOpen(true)}
              />
            </div>
            {isDeleteSectionModalOpen && (
              <DeleteSectionConfirmationModal
                sectionId={section._id}
                onDelete={async (sectionId) => {
                  await useCourseStore
                    .getState()
                    .deleteSection(courseId, sectionId);
                  setIsDeleteSectionModalOpen(false); // Close the modal after deletion
                }}
                open={isDeleteSectionModalOpen}
                setOpen={setIsDeleteSectionModalOpen}
              />
            )}
          </>
        )}
      </div>
      {isEditing ? (
        <div className="flex justify-center p-4">
          <button
            className="mr-2 rounded-md bg-blue-500 px-4 py-2 text-white"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="rounded-md bg-gray-200 px-4 py-2 text-gray-700"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      ) : (
        <CardContent>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Lessons</CardTitle>
                <Link
                  href={`/instructor/dashboard/${courseId}/section/${section._id}/lesson/new`}
                >
                  <PlusIcon className="h-6 w-6 cursor-pointer" />
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full p-4">
                {section.lessons && section.lessons.length > 0 ? (
                  section.lessons.map((lesson, index) => (
                    <AccordionItem key={lesson._id} value={`${lesson._id}`}>
                      <AccordionTrigger>
                        {"Lesson " + (index + 1) + ": " + lesson.title}
                      </AccordionTrigger>
                      <AccordionContent className="flex items-center justify-between">
                        {lesson.content}{" "}
                      </AccordionContent>
                    </AccordionItem>
                  ))
                ) : (
                  <div>No lessons available.</div>
                )}{" "}
              </Accordion>
            </CardContent>
          </Card>
        </CardContent>
      )}
    </Card>
  );
};

const NewSection = ({ courseId }) => {
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
