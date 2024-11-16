import { NextResponse } from "next/server";
import { getCurrentUser, unauthorized } from "@/lib/auth";
import connectDB from "@/lib/db";
import Car from "@/models/car";

// Get single car
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getCurrentUser();
    if (!userId) return unauthorized();

    await connectDB();
    
    const car = await Car.findOne({ _id: params.id, userId }).lean();
    
    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    return NextResponse.json(car);
  } catch (error) {
    return NextResponse.json(
      { error: `Error fetching car: ${error}` },
      { status: 500 }
    );
  }
}

// Update car
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getCurrentUser();
    if (!userId) return unauthorized();

    await connectDB();
    
    const data = await req.json();
    
    const car = await Car.findOneAndUpdate(
      { _id: params.id, userId },
      { $set: data },
      { new: true }
    ).lean();
    
    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    return NextResponse.json(car);
  } catch (error) {
    return NextResponse.json(
      { error: `Error updating car: ${error}` },
      { status: 500 }
    );
  }
}

// Delete car
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getCurrentUser();
    if (!userId) return unauthorized();

    await connectDB();
    
    const car = await Car.findOneAndDelete({ _id: params.id, userId });
    
    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: `Error updating car: ${error}` },
      { status: 500 }
    );
  }
} 