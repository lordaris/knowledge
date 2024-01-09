import { NextResponse } from "next/server";
import Sections from "@/models/sections";
import Lessons from "@/models/lessons";

// Get a section from a course with its lessons by section id
export async function GET(
  request: Request,
  { params }: { params: { sectionId: string } },
) {
  try {
    const sectionId = params.sectionId;
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
