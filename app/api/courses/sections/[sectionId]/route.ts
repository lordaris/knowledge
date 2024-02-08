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
      return new NextResponse(
        JSON.stringify({
          message: "Section not found",
          success: false,
        }),
        { status: 404 },
      );
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

    // Update the section
    await Sections.findByIdAndUpdate(
      sectionId,
      { title, description },
      { new: true },
    );

    // After updating, find the section again to populate its lessons
    const updatedSectionWithLessons = await Sections.findById(sectionId)
      .populate({
        path: "lessons",
        model: Lessons,
      })
      .lean();

    if (!updatedSectionWithLessons) {
      return NextResponse.json({
        message: "Section not found",
      });
    }
    return NextResponse.json({
      data: updatedSectionWithLessons,
      success: true,
    });
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
    // Find the lessons by section id and delete them
    const sectionId = params.sectionId;
    await Lessons.deleteMany({ section: sectionId });

    // Find section by section id and delete it
    await Sections.findByIdAndDelete(sectionId);

    return NextResponse.json({ data: section, success: true });
  } catch (error) {
    return NextResponse.json({ message: error.message, success: false });
  }
}
