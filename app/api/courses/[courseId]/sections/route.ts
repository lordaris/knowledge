import { NextRequest, NextResponse } from "next/server";
import Courses from "@/models/courses";
import Sections from "@/models/sections";
import { auth } from "@clerk/nextjs";

// Create sections for a course

export async function POST(
  request: NextRequest,
  { params }: { params: { courseId: string } },
) {
  const { userId } = auth();
  try {
    // Check if user is authenticated
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized", success: false },
        { status: 401 },
      );
    }

    // Retrieve the course
    const courseId = params.courseId;
    const course = await Courses.findById(courseId);
    if (!course) {
      return NextResponse.json(
        { message: "Course not found", success: false },
        { status: 404 },
      );
    }

    // Check if the user is authorized (course creator)
    if (userId !== course.createdBy.toString()) {
      return NextResponse.json(
        { message: "Unauthorized", success: false },
        { status: 401 },
      );
    }

    // Create the new section
    const req = await request.json();
    const { title, description } = req;
    const newSection = new Sections({ title, description });
    const savedSection = await newSection.save();

    // Update the course with the new section
    course.sections.push(savedSection._id);
    await course.save();

    // Return success response
    return NextResponse.json({
      message: "Section created successfully",
      data: savedSection,
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 500 },
    );
  }
}
