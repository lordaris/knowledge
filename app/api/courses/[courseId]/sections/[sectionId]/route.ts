import { NextResponse, NextRequest } from "next/server";
import Sections from "@/models/sections";
import Lessons from "@/models/lessons";

// Get a section from a course with its lessons by section id
export async function GET(
  request: NextRequest,
  { params }: { params: { sectionId: string } },
) {
  try {
    const sectionId = params.sectionId;

    // Find section by section id and populate its lessons
    const section = await Sections.findById(sectionId)
      .populate({
        path: "lessons",
        model: Lessons,
      })
      .lean();
    if (!section) {
      return NextResponse.json({
        message: "Section not found",
      });
    }
    return NextResponse.json({ data: section, success: true });
  } catch (error) {
    return NextResponse.json({ message: error.message, success: false });
  }
}

// Update a section from a course by section id

export async function PUT(
  request: NextRequest,
  { params }: { params: { sectionId: string } },
) {
  try {
    const req = await request.json();
    const { title, description } = req;
    const sectionId = params.sectionId;

    // Find section by section id and update it
    const section = await Sections.findByIdAndUpdate(
      sectionId,
      { title, description },
      { new: true },
    );
    if (!section) {
      return NextResponse.json({
        message: "Section not found",
      });
    }
    return NextResponse.json({ data: section, success: true });
  } catch (error) {
    return NextResponse.json({ message: error.message, success: false });
  }
}

// Delete a section from a course by section id
export async function DELETE(
  request: NextRequest,
  { params }: { params: { sectionId: string } },
) {
  try {
    const sectionId = params.sectionId;
    // Find section by section id and delete it
    const section = await Sections.findByIdAndDelete(sectionId);
    if (!section) {
      return NextResponse.json({
        message: "Section not found",
      });
    }
    return NextResponse.json({ data: section, success: true });
  } catch (error) {
    return NextResponse.json({ message: error.message, success: false });
  }
}
