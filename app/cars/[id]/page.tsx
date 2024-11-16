import { notFound } from "next/navigation";
import { getCar } from "@/lib/actions";
import CarDetail from "./car-detail";

export default async function CarPage({ params }: { params: { id: string } }) {
  const car = await getCar(params.id);
  
  if (!car) {
    notFound();
  }

  return <CarDetail car={car} />;
} 