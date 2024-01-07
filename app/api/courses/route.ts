// List all courses and post a course without lessons nor sections

import Courses from "@/models/courses";
import { NextRequest, NextResponse } from "next/server";

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
      savedCourse,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
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
