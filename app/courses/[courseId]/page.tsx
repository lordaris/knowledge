async function getData({ courseId }) {
  const res = await fetch(`http://127.0.0.1:3000/api/courses/${courseId}`);
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}

export default async function CourseDetailPage({
  params,
}: {
  params: { courseId: string };
}) {
  const courseId = params.courseId;
  const { data } = await getData({ courseId: courseId });
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </div>
  );
}
