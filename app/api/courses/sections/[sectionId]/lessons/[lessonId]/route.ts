import Sections from "@/models/sections";
import Lessons from "@/models/lessons";
import mongoose from "mongoose";

import { NextRequest, NextResponse } from "next/server";

// Add a lesson to a section
// TODO: End this endpoint

export async function GET(
  request: NextRequest,
  { params }: { params: { sectionId: string; lessonId: string } },
) {
  const { lessonId, sectionId } = params;
  return NextResponse.json({ data: { lessonId, sectionId } });
}
