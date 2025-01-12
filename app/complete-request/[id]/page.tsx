import CheckoutProceed from "@/components/complete-request/checkout-proceed";
import CompleteRequest from "@/components/complete-request/complete-request";
import ServiceSummary from "@/components/complete-request/service-summary";
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
    <CompleteRequest service={service} />
  );
}
