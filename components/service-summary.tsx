"use client";

import { useImageContext } from "@/context/image-context";
import Image from "next/image";

export default function ServiceSummary() {
  const { selectedImages } = useImageContext();
  return (
    <div className="flex flex-col space-y-2.5">
      {selectedImages.map((image, index) => (
        <div>
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
              <div>Size: {image.printSize}</div>
              <div>Frame: {image.isFramed ? "Yes" : "No"}</div>
            </div>
          </div>
          <div className="divider m-0" />
        </div>
      ))}
    </div>
  );
}
