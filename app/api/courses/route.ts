import Courses from "@/models/courses";
import { NextRequest, NextResponse } from "next/server";

// Create a course. It may include sections and lessons
export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const { title, description } = req;
    const newCourse = new Courses({ title, description });
    const savedCourse = await newCourse.save();

    return NextResponse.json({
      message: "Course created successfully",
      data: savedCourse,
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
        success: false,
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const courses = await Courses.find();
    return NextResponse.json({ data: courses, success: true });
  } catch (error) {
    return NextResponse.json({ message: error.message, success: false });
  }
}
