import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
} from "@/components/ui/card";

import Link from "next/link";
import React from "react";

export default function CourseCard({ course }) {
  return (
    <Link href={"/course/" + course.id}>
      <Card className="hover:bg-foreground/5">
        <CardHeader>
          <CardTitle>{course.title}</CardTitle>
          <CardDescription>{course.description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
