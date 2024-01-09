import { NextRequest, NextResponse } from "next/server";
import Courses from "@/models/courses";
import Sections from "@/models/sections";

// Create sections for a course
export async function POST(
  request: NextRequest,
  { params }: { params: { courseId: string } },
) {
  try {
    const req = await request.json();
    const { title, description } = req;
    const courseId = params.courseId;
    const newSection = new Sections({ title, description });
    const savedSection = await newSection.save();
    const course = await Courses.findById(courseId);
    if (!course) {
      return NextResponse.json({
        message: "Course not found",
      });
    }
    course.sections.push(savedSection._id);
    await course.save();
    return NextResponse.json({
      message: "Section created successfully",
      data: savedSection,
      success: true,
      savedSection,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
