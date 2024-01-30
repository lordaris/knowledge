import { NextResponse } from "next/server";
import Courses from "@/models/courses";

export async function GET(
  request: Request,
  { params }: { params: { instructorId: string } },
) {
  try {
    // Check if instructorId is provided
    if (!params.instructorId) {
      return NextResponse.json({
        message: "Instructor ID is required",
        success: false,
      });
    }

    // Find courses by instructorId
    const courses = await Courses.find({ createdBy: params.instructorId });

    // Check if courses are found
    if (!courses) {
      return NextResponse.json({
        message: "Courses not found",
        success: false,
      });
    }

    return NextResponse.json({ data: courses, success: true });
  } catch (error) {
    return NextResponse.json({ message: error.message, success: false });
  }
}
