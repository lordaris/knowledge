// app/providers/course-context-provider.tsx
"use client";
import React, {
  useEffect,
  createContext,
  useState,
  useContext,
  useCallback,
} from "react";

const CourseContext = createContext();

export const useCourse = () => useContext(CourseContext);

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);

  const loadCourses = useCallback(async () => {
    try {
      const response = await fetch("/api/courses");
      if (response.ok) {
        const data = await response.json();
        setCourses(data.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  const value = {
    courses,
    loadCourses,
  };

  return (
    <CourseContext.Provider value={value}>{children}</CourseContext.Provider>
  );
};
