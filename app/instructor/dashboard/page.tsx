"use client";
import { NewCourseDrawer } from "@/components/course/new-course-drawer";
import { NewCourseModal } from "@/components/course/new-course-modal";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMediaQuery } from "@/hooks/use-media-query";
import useCourseStore from "@/store/course-store";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil2Icon } from "@radix-ui/react-icons";

export default function NewCoursePage() {
  const { userId } = useAuth();
  const { courses, loadCourses } = useCourseStore();

  useEffect(() => {
    if (userId) {
      loadCourses(userId);
    }
  }, [userId, loadCourses]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-start p-6">
      <h1 className="mb-8 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
        My Courses
      </h1>
      <div className="mb-4 ">
        <NewCourse />
      </div>
      <div className="w-2/4">
        {courses.map((course) => (
          <div key={course._id} className="group relative m-4">
            <Card className="flex items-center  ">
              <div>
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>

                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
              </div>
              <Link
                href={`/instructor/dashboard/${course._id}`}
                className="absolute right-4 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Pencil2Icon className="h-6 w-6" />
              </Link>
            </Card>
          </div>
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
