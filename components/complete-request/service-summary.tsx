"use client";

import { ImageFile, MugColor, useImageContext } from "@/context/image-context";
import Image from "next/image";
import { ReactNode } from "react";

export default function ServiceSummary({ serviceId }: { serviceId: number }) {
  const { selectedImages } = useImageContext();

  let serviceSummary: ReactNode;

  switch (serviceId) {
    case 1:
      {
        serviceSummary = <PhotoPrintsSummary selectedImages={selectedImages} />;
      }
      break;
    case 2:
      {
        serviceSummary = <MugPrintsSummary selectedImages={selectedImages} />;
      }
      break;
    default:
      {
        serviceSummary = <PhotoPrintsSummary selectedImages={selectedImages} />;
      }
      break;
  }
  return <div>{serviceSummary}</div>;
}

function PhotoPrintsSummary({
  selectedImages,
}: {
  selectedImages: ImageFile[];
}) {
  return (
    <div className="flex flex-col space-y-2.5 pb-10">
      {selectedImages.map((image, index) => (
        <div key={index}>
          <div className="flex space-x-2.5 items-center">
            <span className="text-lg">{index + 1}.</span>
            <div className="aspect-square w-16 h-16">
              <img
                src={image.preview}
                alt={image.file.name}
                className="w-16 h-16 object-cover rounded"
              />
            </div>
            <div className="flex flex-col">
              <strong>{image.file.name}</strong>
              <div>Size: {image.printSize?.name ?? "A4"}</div>
              <div>Frame: {image.isFramed ? "Yes" : "No"}</div>
            </div>
          </div>
          <div className="divider m-0" />
        </div>
      ))}
    </div>
  );
}

function MugPrintsSummary({ selectedImages }: { selectedImages: ImageFile[] }) {
  return (
    <div className="flex flex-col space-y-2.5 pb-10">
      {selectedImages.map((image, index) => (
        <div key={index}>
          <div className="flex space-x-2.5 items-center">
            <span className="text-lg">{index + 1}.</span>
            <div className="aspect-square w-16 h-16">
              <img
                src={image.preview}
                alt={image.file.name}
                className="w-16 h-16 object-cover rounded"
              />
            </div>
            <div className="flex flex-col">
              <strong>{image.file.name}</strong>
              <div>Color: {image.mugColor ?? MugColor.WHITE}</div>
              <div>Changes Color: {image.changesColor ? "Yes" : "No"}</div>
            </div>
          </div>
          <div className="divider m-0" />
        </div>
      ))}
    </div>
  );
}
