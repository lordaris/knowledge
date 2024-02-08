import Lessons from "@/models/lessons";

import { NextRequest, NextResponse } from "next/server";

// Get a lesson from a section by lesson id
export async function GET(
  request: NextRequest,
  { params }: { params: { lessonId: string } },
) {
  try {
    const lessonId = params.lessonId;

    const lesson = await Lessons.findById(lessonId).lean();
    if (!lesson) {
      return NextResponse.json(
        {
          message: "Lesson not found",
        },
        { status: 404 },
      );
    }
    return NextResponse.json({ data: lesson, success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, success: false });
  }
}

// Update a lesson from a section by lesson id
export async function PUT(
  request: NextRequest,
  { params }: { params: { lessonId: string } },
) {
  try {
    const req = await request.json();
    const { title, content } = req;
    const lessonId = params.lessonId;
    const lesson = await Lessons.findByIdAndUpdate(
      lessonId,
      { title, content },
      { new: true },
    );
    if (!lesson) {
      return NextResponse.json(
        {
          message: "Lesson not found",
        },
        { status: 404 },
      );
    }
    return NextResponse.json({ data: lesson, success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, success: false });
  }
}

// Delete a lesson from a section by lesson id
export async function DELETE(
  request: NextRequest,
  { params }: { params: { lessonId: string } },
) {
  try {
    const lessonId = params.lessonId;
    const lesson = await Lessons.findByIdAndDelete(lessonId);
    if (!lesson) {
      return NextResponse.json(
        {
          message: "Lesson not found",
        },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { message: "Lesson deleted successfully ", data: lesson, success: true },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: error.message, success: false });
  }
}
