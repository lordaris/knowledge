// app/components/course/course-list.tsx

import { Button } from "@/components/ui/button";
import Trash from "@/public/icons/trash.svg";
import Image from "next/image";
import CourseItem from "@/components/course/course-item";

export const CourseList = ({ courses, onCourseUpdated }) => {
  return (
    <div>
      {courses.map((course) => (
        <CourseItem
          key={course._id}
          course={course}
          onCourseUpdated={onCourseUpdated}
        />
      ))}
    </div>
  );
};
