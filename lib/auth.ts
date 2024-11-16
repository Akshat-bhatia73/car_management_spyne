import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function getCurrentUser() {
  const { userId, redirectToSignIn } = await auth();
  
  if (!userId) {
    return redirectToSignIn();
  }
  
  return userId;
}

export function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
} 