"use client";
import DeleteCourseConfirmationModal from "@/components/course/delete-confirmation-modal";
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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useCourseStore from "@/store/course-store";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";

import { Label } from "@/components/ui/label";

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
      <section className="m-4 w-3/4 bg-popover-foreground/5">
        <h2 className="p-4 text-2xl font-bold">Sections</h2>
        {singleCourse.sections?.map((section) => (
          <SectionItem
            key={section._id}
            section={section}
            courseId={courseId}
          />
        ))}
      </section>
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

/*
// TODO: modify the component to create a propper form and its modal and drawer.
const AddSectionTemporaryComponent = ({ courseId }) => {
  const [sectionTitle, setSectionTitle] = useState("");
  const [sectionDescription, setSectionDescription] = useState("");
  const { addSection } = useCourseStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addSection(courseId, {
        title: sectionTitle,
        description: sectionDescription,
      });
    } catch (error) {
      console.error("Error adding section:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          value={sectionTitle}
          onChange={(e) => setSectionTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={sectionDescription}
          onChange={(e) => setSectionDescription(e.target.value)}
        />
      </div>
      <button type="submit">Add Section</button>
    </form>
  );
};

// TODO: Modify this component to create a proper form and its modal and drawer.
const AddLessonTemporaryComponent = ({ courseId, sectionId }) => {
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonContent, setLessonContent] = useState("");
  const { addLesson } = useCourseStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addLesson(courseId, sectionId, {
        title: lessonTitle,
        content: lessonContent,
      });
      setLessonTitle("");
      setLessonContent("");
      // Add additional logic if needed, like a confirmation message
    } catch (error) {
      console.error("Error adding lesson:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="lesson-title">Title:</label>
        <input
          id="lesson-title"
          type="text"
          value={lessonTitle}
          onChange={(e) => setLessonTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="lesson-content">Content:</label>
        <textarea
          id="lesson-content"
          value={lessonContent}
          onChange={(e) => setLessonContent(e.target.value)}
        />
      </div>
      <button type="submit">Add Lesson</button>
    </form>
  );
}; */

const SectionItem = ({ section, courseId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(section.title);
  const [description, setDescription] = useState(section.description);
  const { updateSection } = useCourseStore();

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
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <div className="absolute right-4 top-4 flex opacity-0 transition-opacity group-hover:opacity-100">
              <Pencil2Icon
                className="mr-2 h-6 w-6 cursor-pointer"
                onClick={() => setIsEditing(true)}
              />
              <TrashIcon className="h-6 w-6 cursor-pointer" />
            </div>
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
        <section>
          <h4 className="px-4 font-bold">Lessons</h4>
          <Accordion type="single" collapsible className="w-full p-4">
            {section.lessons.map((lesson) => (
              <AccordionItem key={lesson._id} value={`${lesson._id}`}>
                <AccordionTrigger>{lesson.title}</AccordionTrigger>
                <AccordionContent>{lesson.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      )}
    </Card>
  );
};
