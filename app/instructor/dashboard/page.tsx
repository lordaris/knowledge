// app/instructor/dashboard/page.tsx
"use client";
import { CourseList } from "@/components/course/course-list";
import { NewCourse } from "@/components/course/create-course";
import { useCourse } from "@/app/providers/course-context-provider";

// TODO: The list should show only the courses created by the current user
// TODO: The list should be paginated
// TODO: Create a CourseContext using ReactContext to share the course-list
// state and keep the dashboard being server side rendered
//
export default function DashboardPage() {
  const { courses } = useCourse();

  return (
    <div className="">
      <NewCourse />
      <CourseList courses={courses} />
    </div>
  );
}
