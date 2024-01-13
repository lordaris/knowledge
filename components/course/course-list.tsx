// app/components/course/course-list.tsx

import CourseItem from "@/components/course/course-item";

export const CourseList = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => (
        <CourseItem key={course._id} course={course} />
      ))}
    </div>
  );
};
