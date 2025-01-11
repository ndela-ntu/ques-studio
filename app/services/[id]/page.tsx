import { ServiceCategoryConsts } from "@/utils/constants/consts";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
    <div className="min-h-screen flex flex-col items-center space-y-2.5 p-2">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl text-cinereous font-bold underline">{service.name}</h1>
        <Link
          href={`/service-request/${service.id}`}
          className="flex my-3 mx-1.5 px-2.5 py-1 bg-yaleBlue text-ghostWhite rounded-3xl hover:bg-cinereous"
        >
          <span>Continue</span>
          <span>
            <MoveRight />
          </span>
        </Link>
      </div>
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
