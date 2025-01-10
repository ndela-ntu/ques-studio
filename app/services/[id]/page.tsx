import { ServiceCategoryConsts } from "@/utils/constants/consts";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const service = ServiceCategoryConsts.find(
    (service) => service.id === parseInt(id)
  );

  if (!service) {
    return notFound();
  }

  return (
    <div className="min-h-screen flex flex-col items-center space-y-2.5">
      <h1 className="text-4xl text-cinereous font-bold">{service.name}</h1>
      <div>
        <Image src={service.categoryImageUrl} alt="Image of service" />
      </div>
      <div className="text-center">{service.description}</div>
    </div>
  );
}
