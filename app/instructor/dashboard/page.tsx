"use client";
import DeleteConfirmationModal from "@/components/course/delete-confirmation-modal";
import { NewCourseDrawer } from "@/components/course/new-course-drawer";
import { NewCourseModal } from "@/components/course/new-course-modal";
import { NewSectionDrawer } from "@/components/course/section/new-section-drawer";
import { NewSectionModal } from "@/components/course/section/new-section-modal";
import DeleteSectionConfirmationModal from "@/components/course/section/delete-section-modal";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { TrashIcon } from "@radix-ui/react-icons";
import { useCallback, useEffect, useState } from "react";
import useCourseStore from "@/store/course-store";
import useSectionStore from "@/store/section-store";
import { UpdateSectionForm } from "@/components/course/section/update-section-form";

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
  const [isSectionDeleteModalOpen, setIsSectionDeleteModalOpen] =
    useState(false);
  const { loadSections, sectionsByCourse } = useSectionStore();
  const { deleteSection } = useSectionStore();
  const [selectedSectionId, setSelectedSectionId] = useState(null);

  const handleDeleteSection = async (sectionId) => {
    await deleteSection(course._id, sectionId);
    await loadSections(course._id); // Reload sections for the course
  };

  const [editingSection, setEditingSection] = useState(null);

  useEffect(() => {
    loadSections(course._id);
  }, [course._id, loadSections]);

  const sections = sectionsByCourse[course._id] || [];

  const NewSection = ({ courseId }) => {
    const [open, setOpen] = useState(false);
    const desktop = "(min-width: 768px)";
    const isDesktop = useMediaQuery(desktop);

    const SectionCreationUI = isDesktop ? (
      <NewSectionModal courseId={courseId} open={open} setOpen={setOpen} />
    ) : (
      <NewSectionDrawer courseId={courseId} setOpen={setOpen} />
    );

    return SectionCreationUI;
  };

  return (
    <div className="flex items-center justify-between gap-2 p-2">
      <p className="leading-7 [&:not(:first-child)]:mt-6">{course.title}</p>
      <div className="flex gap-2">
        <Button
          size={"icon"}
          variant={"destructive"}
          onClick={() => setIsDeleteModalOpen(true)}
        >
          <TrashIcon />
        </Button>
        <DeleteConfirmationModal
          courseId={course._id}
          onDelete={onDelete}
          open={isDeleteModalOpen}
          setOpen={setIsDeleteModalOpen}
        />
        <NewSection courseId={course._id} />
      </div>
      <div>
        {sections.map((section) => (
          <div key={section._id}>
            <p>{section.title}</p>

            <Button onClick={() => setEditingSection(section)}>
              Edit Section
            </Button>
            <Button
              size={"icon"}
              variant={"destructive"}
              onClick={() => {
                setSelectedSectionId(section._id);
                setIsSectionDeleteModalOpen(true);
              }}
            >
              <TrashIcon />
            </Button>
          </div>
        ))}
        {isSectionDeleteModalOpen && (
          <DeleteSectionConfirmationModal
            sectionId={selectedSectionId}
            onDelete={handleDeleteSection}
            open={isSectionDeleteModalOpen}
            setOpen={setIsSectionDeleteModalOpen}
          />
        )}
        {editingSection && (
          <UpdateSectionForm
            section={editingSection}
            onClose={() => setEditingSection(null)}
          />
        )}
      </div>{" "}
    </div>
  );
};
