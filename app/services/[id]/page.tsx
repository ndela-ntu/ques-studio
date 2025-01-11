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
      <h1 className="text-3xl text-cinereous font-bold">{service.name}</h1>
      <div className="aspect-square relative w-[75%] md:w-[50%] lg:w-[25%] border-8 border-ghostWhite">
        <Image
          src={service.categoryImageUrl}
          alt="Image of service"
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="text-center md:w-[50%]">{service.description}</div>
    </div>
  );
}
