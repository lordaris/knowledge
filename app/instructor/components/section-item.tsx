"use client";
import DeleteSectionConfirmationModal from "@/components/course/section/delete-section-modal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useCourseStore from "@/store/course-store";
import { Pencil2Icon, TrashIcon, PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export const SectionItem = ({ section, courseId, sectionNumber }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(section.title);
  const [description, setDescription] = useState(section.description);
  const { updateSection } = useCourseStore();
  const [isDeleteSectionModalOpen, setIsDeleteSectionModalOpen] =
    useState(false);
  const lessons = [section.lessons];
  console.log({ lessons });

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
                  href={`/instructor/courses/${courseId}/section/${section._id}/lesson/new`}
                >
                  <PlusIcon className="h-6 w-6 cursor-pointer" />
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {section.lessons && section.lessons.length > 0 ? (
                section.lessons.map((lesson, index) => (
                  <Link
                    key={index}
                    href={`/instructor/courses/lesson/${lesson._id}`}
                    className="flex items-center justify-between p-4 hover:underline"
                  >
                    <p className="px-4">
                      {"Lesson " + (index + 1) + ": " + lesson.title}
                    </p>
                  </Link>
                ))
              ) : (
                <div>No lessons available.</div>
              )}{" "}
            </CardContent>
          </Card>
        </CardContent>
      )}
    </Card>
  );
};
