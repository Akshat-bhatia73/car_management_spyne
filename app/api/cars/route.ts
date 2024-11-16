import { NextResponse } from "next/server";
import { getCurrentUser, unauthorized } from "@/lib/auth";
import connectDB from "@/lib/db";
import Car from "@/models/car";
import { carSchema } from '@/lib/validations';
import { z } from 'zod';

export async function POST(req: Request) {
  try {
    const userId = await getCurrentUser();
    if (!userId) return unauthorized();

    await connectDB();
    
    const data = await req.json();
    
    // Validate with Zod schema
    const validatedData = carSchema.parse(data);

    const car = await Car.create({
      ...validatedData,
      userId: userId.toString(),
    });

    return NextResponse.json(car, { status: 201 });
  } catch (error) {
    console.error("Error creating car:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Error creating car" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const userId = getCurrentUser();
    if (!userId) return unauthorized();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';

    await connectDB();

    // Create search query
    const searchQuery = search ? {
      userId,
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { 'tags.car_type': { $regex: search, $options: 'i' } },
        { 'tags.company': { $regex: search, $options: 'i' } },
        { 'tags.dealer': { $regex: search, $options: 'i' } },
      ]
    } : { userId };

    const cars = await Car.find(searchQuery)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    return NextResponse.json(
      { error: "Error fetching cars" },
      { status: 500 }
    );
  }
} 