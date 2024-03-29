import { NextRequest, NextResponse } from "next/server";
import Lessons from "@/models/lessons";

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

export async function PUT(
  request: NextRequest,
  { params }: { params: { lessonId: string } },
) {
  try {
    const lessonId = params.lessonId;
    const lesson = await Lessons.findByIdAndUpdate(lessonId, request.body, {
      new: true,
      runValidators: true,
    });
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
    return NextResponse.json({ data: lesson, success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, success: false });
  }
}
