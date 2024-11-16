import { notFound } from "next/navigation";
import { getCar } from "@/lib/actions";
import CarEditForm from "@/app/cars/[id]/edit/car-edit-form";

export default async function EditCarPage({ params }: { params: { id: string } }) {
  const car = await getCar(params.id);
  if (!car) {
    notFound();
  }

  return <CarEditForm car={car} />;
} 