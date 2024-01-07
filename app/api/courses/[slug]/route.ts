import Courses from "@/models/courses";
import Sections from "@/models/sections";
import Lessons from "@/models/lessons";

import { NextRequest, NextResponse } from "next/server";

import { type NextRequest } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const courseId = params.slug;
    console.log(courseId);
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

// Create sections for a course
export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    const req = await request.json();
    const { title, description } = req;
    const courseId = params.slug;
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
