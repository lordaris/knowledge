import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await currentUser();
  const userId = user.id;
  return NextResponse.json({
    message: user.id,
  });
}
