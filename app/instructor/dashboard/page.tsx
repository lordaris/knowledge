// app/instructor/dashboard/page.tsx
"use client";
import { CourseList } from "@/components/course/course-list";
import { NewCourse } from "@/components/course/create-course";
import { useAuth } from "@clerk/nextjs";
import React, { useCallback, useEffect, useState } from "react";

export default function DashboardPage() {
  // NOTE: The user Id is used to fetch courses by instructor Id,
  // right now there are not roles in clerk so I am using the user Id only,
  // but this will change in the future to use roles and permissions based on the user role
  // TODO: Modify the delete course function using the new load courses function

  const { userId } = useAuth();
  const [courses, setCourses] = useState([]); // Local state for courses

  // Fetch courses by instructor Id from the API
  const loadCourses = useCallback(async () => {
    if (!userId) return;

    try {
      const response = await fetch(`/api/courses/instructor/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setCourses(data.data); // Update the local state
      }
    } catch (error) {
      console.error(error);
    }
  }, [userId]);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

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
