import { Separator } from "@/components/ui/separator";
import { CourseCard } from "@/components/course/course-card";
import Link from "next/link";

export function CourseByCategory({ courses }) {
  const coursesByCategory = courses.reduce((acc, course) => {
    const { category } = course;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(course);
    return acc;
  }, {});

  return (
    <section>
      {Object.entries(coursesByCategory).map(([category, courses]) => (
        <div key={category}>
          {" "}
          <h2 className="pt-4 text-xl font-semibold">{category}</h2>
          <Separator />
          <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => {
              return (
                <Link href={`/courses/${course._id}`} key={course._id}>
                  <CourseCard course={course} />
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
