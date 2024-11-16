"use server";

import { auth } from "@clerk/nextjs/server";
import connectDB from "./db";
import Car from "@/models/car";

export async function getCars(search?: string) {
  const { userId } = await auth();
  
  if (!userId) {
    return [];
  }

  await connectDB();

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

  return cars;
}

export async function getCar(id: string) {
  const { userId, redirectToSignIn } = await auth();
  
  if (!userId) {
    return redirectToSignIn();
  }

  await connectDB();

  const car = await Car.findOne({ _id: id, userId }).lean();
  
  if (!car) {
    return null;
  }

  return car;
} 