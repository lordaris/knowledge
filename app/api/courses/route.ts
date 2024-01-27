import Courses from "@/models/courses";
import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@clerk/nextjs/api";

// Create a course using Clerk authentication.
export default withAuth(async function POST(request) {
  try {
    const { userId, sessionId, getToken } = request.session.userId;
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized", success: false },
        { status: 401 },
      );
    }

    const req = await request.json();
    const { title, description } = req;
    const newCourse = new Courses({ title, description, createdBy: userId });
    const savedCourse = await newCourse.save();

    return NextResponse.json({
      message: "Course created successfully",
      data: savedCourse,
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 500 },
    );
  }
});

// Create a course. It may include sections and lessons
/* 
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
*/

export async function GET() {
  try {
    const courses = await Courses.find();
    return NextResponse.json({ data: courses, success: true });
  } catch (error) {
    return NextResponse.json({ message: error.message, success: false });
  }
}
