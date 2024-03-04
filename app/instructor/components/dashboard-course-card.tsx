"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Pencil2Icon } from "@radix-ui/react-icons";

export const DashboardCourseCard = ({ courses }) => {
  return (
    <>
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
              href={`/instructor/courses/${course._id}`}
              className="absolute right-4 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Pencil2Icon className="h-6 w-6" />
            </Link>
          </Card>
        </div>
      ))}
    </>
  );
};
