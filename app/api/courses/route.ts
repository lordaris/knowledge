import Courses from "@/models/courses";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

// Create a course
export async function POST(request: NextRequest) {
  const { userId } = auth();

  try {
    // Only allow authenticated users to create courses
    // TODO: Check if the user is an instructor
    // TODO: Create a role for instructors in Clerk
    if (!userId) {
      return NextResponse.json(
        {
          message: "Unauthorized",
          success: false,
        },
        { status: 401 },
      );
    }
    const req = await request.json();
    const { title, description, category } = req;
    const newCourse = new Courses({
      title,
      description,
      createdBy: userId,
      category,
    });
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

// Get courses
export async function GET() {
  try {
    const courses = await Courses.find();
    return NextResponse.json({ data: courses, success: true });
  } catch (error) {
    return NextResponse.json({ message: error.message, success: false });
  }
}
