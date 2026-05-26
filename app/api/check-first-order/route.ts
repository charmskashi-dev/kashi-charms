import { backendClient } from "@/sanity/lib/backendClient";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ isFirstOrder: false });
  }

  const count = await backendClient.fetch(
    `count(*[_type == "order" && clerkUserId == $userId])`,
    { userId }
  );

  return NextResponse.json({ isFirstOrder: count === 0 });
}