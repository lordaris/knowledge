import { CourseByCategory } from "@/components/course/course-by-category";

async function getData() {
  const response = await fetch("http://127.0.0.1:3000/api/courses", {
    next: { revalidate: 0 },
  });
  const data = await response.json();
  return data.data || [];
}

export default async function CoursesPage() {
  const courses = await getData();

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
        <CourseByCategory courses={courses} />
      </div>
    </>
  );
}
