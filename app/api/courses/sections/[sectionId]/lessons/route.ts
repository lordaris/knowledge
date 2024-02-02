import Sections from "@/models/sections";
import Lessons from "@/models/lessons";
import mongoose from "mongoose";

import { NextRequest, NextResponse } from "next/server";

// Add a lesson to a section

export async function POST(
  request: NextRequest,
  { params }: { params: { sectionId: string } },
) {
  try {
    const req = await request.json();
    const { title, content } = req;

    if (!title || !content) {
      return NextResponse.json({
        message: "Missing title or content",
        success: false,
      });
    }

    const sectionId = params.sectionId;
    // Validate sectionId
    if (!mongoose.Types.ObjectId.isValid(sectionId)) {
      return NextResponse.json({
        message: "Invalid Section ID",
        success: false,
      });
    }

    // Find the section and add the lesson
    const section = await Sections.findById(sectionId);
    if (!section) {
      return NextResponse.json({
        message: "Section not found",
        success: false,
      });
    }

    const newLesson = new Lessons({ title, content });
    const savedLesson = await newLesson.save();

    section.lessons.push(savedLesson._id);
    await section.save();

    return NextResponse.json({
      message: "Lesson added",
      data: savedLesson,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}

// Get lessons by sectionId
export async function GET({ params }: { params: { sectionId: string } }) {
  try {
    const sectionId = params.sectionId;
    // Validate sectionId
    if (!mongoose.Types.ObjectId.isValid(sectionId)) {
      return NextResponse.json({
        message: "Invalid Section ID",
        success: false,
      });
    }
    const section = await Sections.findById(sectionId).populate("lessons");
    if (!section) {
      return NextResponse.json({
        message: "Section not found",
        success: false,
      });
    }
    return NextResponse.json({
      data: section.lessons,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
