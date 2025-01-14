"use client";

import IServiceCategory from "@/models/service-category";
import ServiceSummary from "./service-summary";
import CheckoutProceed from "./checkout-proceed";
import { useImageContext } from "@/context/image-context";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

export default function CompleteRequest({
  service,
}: {
  service: IServiceCategory;
}) {
  const { selectedImages } = useImageContext();

  if (selectedImages.length === 0) {
    return (
      <div className="flex flex-col p-1 min-h-screen">
        <p>No images selected</p>
        <Link
          href={`/service-request/${service.id}`}
          className="flex my-3 px-2.5 py-1 bg-yaleBlue text-ghostWhite rounded-3xl hover:bg-cinereous"
        >
          <span>
            <MoveLeft />
          </span>
          <span>Go back</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-1 min-h-screen">
      <span className="flex space-x-2 text-yaleBlue font-semibold">
        <label>Summary</label>
        <span>-</span>
        <span>{service.name}</span>
      </span>
      <ServiceSummary serviceId={service.id} />
      <CheckoutProceed serviceId={service.id} />
    </div>
  );
}
