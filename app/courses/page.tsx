import { courses } from "@/app/courses/mock-data";
import CourseCard from "@/components/ui/course-card";

export default function CoursesPage() {
  return (
    <main>
      <header className="flex min-h-60 flex-col items-center justify-center bg-background/45 text-center">
        <div className="w-3/4 ">
          {" "}
          <h1 className="mb-4 text-5xl text-foreground">
            Learn with text based courses.
          </h1>
        </div>
        <p className="text-center">
          Start a new course or explore our courses list
        </p>
      </header>
      <section className="flex w-screen flex-col items-center justify-center bg-background py-10">
        <div className="grid w-3/4 grid-flow-row grid-cols-2 items-center justify-center gap-4 ">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>
    </main>
  );
}
