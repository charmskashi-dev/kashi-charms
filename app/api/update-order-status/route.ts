import { NextResponse } from "next/server";
import { backendClient } from "@/sanity/lib/backendClient";

export async function POST(req: Request) {
  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        { success: false },
        { status: 400 }
      );
    }

    await backendClient
      .patch(id)
      .set({ status })
      .commit();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("UPDATE STATUS ERROR:", error);

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}