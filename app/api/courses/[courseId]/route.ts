import Courses from "@/models/courses";
import Sections from "@/models/sections";
import Lessons from "@/models/lessons";

import { auth } from "@clerk/nextjs";

import { NextRequest, NextResponse } from "next/server";

// Get a course with its sections and lessons
export async function GET(
  request: Request,
  { params }: { params: { courseId: string } },
) {
  try {
    const courseId = params.courseId;
    const course = await Courses.findById(courseId)
      .populate({
        path: "sections",
        model: Sections,
        populate: {
          path: "lessons",
          model: Lessons,
        },
      })
      .lean();

    if (!course) {
      return NextResponse.json({
        message: "Course not found",
      });
    }

    return NextResponse.json({ data: course, success: true });
  } catch (error) {
    return NextResponse.json({ message: error.message, success: false });
  }
}

// Update a course
export async function PUT(
  request: NextRequest,
  { params }: { params: { courseId: string } },
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({
        message: "Unauthorized",
        success: false,
      });
    }

    const req = await request.json();
    const { title, description } = req;
    const courseId = params.courseId;
    const course = await Courses.findByIdAndUpdate(
      courseId,
      { title, description },
      { new: true },
    );
    if (!course) {
      return NextResponse.json({
        message: "Course not found",
      });
    }
    if (userId !== course.createdBy) {
      return NextResponse.json({
        message: "You are not authorized to update this course",
        success: false,
      });
    }
    return NextResponse.json({
      message: "Course updated successfully",
      data: course,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}

// Delete a course

export async function DELETE(
  request: NextRequest,
  { params }: { params: { courseId: string } },
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({
        message: "Unauthorized",
        success: false,
      });
    }
    const courseId = params.courseId;
    const course = await Courses.findById(courseId);
    const courseDelete = await Courses.findByIdAndDelete(courseId);
    if (!courseDelete) {
      return NextResponse.json({
        message: "Course not found",
      });
    }
    if (userId !== course.createdBy) {
      return NextResponse.json({
        message: "You are not authorized to delete this course",
        success: false,
      });
    }

    return NextResponse.json({
      message: "Course deleted successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
