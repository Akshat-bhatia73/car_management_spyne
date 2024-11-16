import { notFound } from "next/navigation";
import { getCar } from "@/lib/actions";
import CarDetail from "./car-detail";
import { Car } from "@/lib/types";

export default async function CarPage({ params }: { params: { id: string } }) {
  const car = await getCar(params.id) as Car | null;
  
  if (!car) {
    notFound();
  }

  return <CarDetail car={car} />;
} 