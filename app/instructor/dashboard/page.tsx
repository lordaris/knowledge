// app/instructor/dashboard/page.tsx
"use client";
import { NewCourse } from "@/components/course/create-course";
import { CourseList } from "@/components/course/course-list";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const [courses, setCourses] = useState([]);
  const loadCourses = async () => {
    try {
      const response = await fetch("/api/courses");
      if (response.ok) {
        const data = await response.json();
        setCourses(data.data); // Use data.data to get the actual array of courses
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <div className="">
      <NewCourse onCourseCreated={loadCourses} />
      <CourseList courses={courses} onCourseUpdated={loadCourses} />
    </div>
  );
}
