import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export function CourseCard({ course }) {
  const imageUrl = `https://picsum.photos/seed/${course._id}/240/135`;
  return (
    <Card key={course._id} className="overflow-hidden">
      <Image
        src={imageUrl}
        alt={course.title}
        width={240}
        height={135}
        className="w-full"
      />
      <CardHeader>
        <CardTitle>{course.title}</CardTitle>{" "}
      </CardHeader>
    </Card>
  );
}
