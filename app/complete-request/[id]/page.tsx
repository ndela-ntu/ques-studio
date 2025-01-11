import ServiceSummary from "@/components/service-summary";
import { ServiceCategoryConsts } from "@/utils/constants/consts";
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
    <div className="flex flex-col p-1 min-h-screen">
      <h1 className="text-2xl text-cinereous">Summary</h1>
      <span className="text-yaleBlue">Your {service.name}</span>
      <ServiceSummary />
      <Link
        className="text-white bg-cornflowerBlue fixed bottom-0 left-0 w-full py-2.5 flex items-center justify-center font-semibold"
        href="/checkout"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
}
