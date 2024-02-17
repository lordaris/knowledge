"use client";
import { useEffect } from "react";
import useCourseStore from "@/store/course-store";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";

export default function CoursesPage() {
  // Destructure the allCourses array and loadAllCourses function from the "useCourseStore" Zustand store
  const { allCourses, loadAllCourses } = useCourseStore();

  // Use the useEffect hook to load all courses when the component mounts
  // The dependency array includes loadAllCourses to ensure the effect reruns if this function changes
  useEffect(() => {
    loadAllCourses();
  }, [loadAllCourses]);

  // Organize courses by category using the Array.reduce method

  // This creates an object where each key is a category and its value
  // is an array of courses in that category
  const coursesByCategory = allCourses.reduce((acc, course) => {
    const { category } = course; // Destructure category from the course object
    if (!acc[category]) {
      // If the category doesn't exist in the accumulator, initialize it with an empty array
      acc[category] = [];
    }
    acc[category].push(course); // Add the current course to its category array
    return acc; // Return the accumulator for the next iteration
  }, {});

  return (
    <>
      <div className="">
        <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
          <h1 className="hidden text-center text-3xl font-bold leading-tight tracking-tighter md:block md:text-6xl lg:leading-[1.1]">
            Learn with text based courses
          </h1>
          <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:hidden md:text-6xl lg:leading-[1.1]">
            Courses
          </h1>
          <p className="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl">
            Explore our courses
          </p>
        </section>

        {/* Map over the entries of coursesByCategory, which returns an array of [category, courses] pairs */}
        {Object.entries(coursesByCategory).map(([category, courses]) => (
          <div key={category}>
            {" "}
            {/* Use category as the key for each category section */}
            <h2 className="pt-4 text-xl font-semibold">{category}</h2>
            <Separator />
            <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Map over the courses in the current category */}
              {courses.map((course) => {
                // TODO: Delete this line
                const imageUrl = `https://picsum.photos/seed/${course._id}/240/135`;
                return (
                  <Card key={course._id} className="overflow-hidden">
                    {" "}
                    <Image
                      // TODO : Replace this line with the actual image URL
                      src={imageUrl}
                      alt={course.title}
                      width={240}
                      height={135}
                      layout="responsive"
                    />
                    <CardHeader>
                      <CardTitle>{course.title}</CardTitle>{" "}
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
