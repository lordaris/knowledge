// app/instructor/dashboard/page.tsx
"use client";
import { CourseList } from "@/components/course/course-list";
import { NewCourse } from "@/components/course/create-course";
import { useCourse } from "@/app/providers/course-context-provider";

// TODO: The list should show only the courses created by the current user
// TODO: The list should be paginated

export default function DashboardPage() {
  const { courses } = useCourse();

  return (
    <div className="flex min-h-screen flex-col items-center justify-start p-6">
      <h1 className="mb-8 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
        My Courses
      </h1>
      <div className="mb-4 self-center">
        <NewCourse />
      </div>
      <div className="justify-self-between w-full max-w-4xl">
        <CourseList courses={courses} />
      </div>
    </div>
  );
}
