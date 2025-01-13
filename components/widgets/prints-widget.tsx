"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MoveRight, Trash } from "lucide-react";
import React, { useRef, useEffect, ReactNode } from "react";
import {
  ImageFile,
  PRINT_SIZES,
  useImageContext,
} from "@/context/image-context";
import Link from "next/link";
import PhotoPrintsWidget from "./photo-prints-widget";
import MugPrintsWidget from "./mug-prints-widget";
import TShirtPrintsWidget from "./tshirt-prints-widget";

interface Props {
  type: "photos" | "mugs" | "t-shirts" | "caps" | "jigsaw" | "case";
}

export default function PrintsWidget({ type }: Props) {
  const { selectedImages, addImages } = useImageContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newImages = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    addImages(newImages);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    addImages(newImages);
  };

  let widgetToDisplay: ReactNode;
  let serviceId: number;

  switch (type) {
    case "photos":
      {
        widgetToDisplay = <PhotoPrintsWidget />;
        serviceId = 1;
      }
      break;
    case "mugs":
      {
        widgetToDisplay = <MugPrintsWidget />;
        serviceId = 2;
      }
      break;
    case "t-shirts":
      {
        widgetToDisplay = <TShirtPrintsWidget />;
        serviceId = 3;
      }
      break;
    default:
      {
        widgetToDisplay = <PhotoPrintsWidget />;
        serviceId = 1;
      }
      break;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 min-h-screen">
      <p>Drag and drop or select your images for printing</p>
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4 text-center cursor-pointer hover:border-blue-500 transition-colors"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleImageSelect}
        />
        <p className="text-gray-600">Click or drag images here to upload</p>
      </div>
      {widgetToDisplay}
      {selectedImages.length > 0 && (
        <Link
          href={`/complete-request/${serviceId}`}
          className="fixed bottom-0 left-0 w-full flex items-center justify-center px-2.5 py-1 bg-yaleBlue text-ghostWhite hover:bg-cinereous"
        >
          <span>Continue</span>
        </Link>
      )}
    </div>
  );
}
