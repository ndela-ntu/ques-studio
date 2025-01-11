"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MoveRight, Trash } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Checkbox } from "../ui/checkbox";
import { PRINT_SIZES, useImageContext } from "@/context/image-context";
import Link from "next/link";
import Image from "next/image";

export default function PhotoPrintsWidget() {
  const {
    selectedImages,
    addImages,
    removeImage,
    updateIsFramed,
    updatePrintSize,
  } = useImageContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newImages = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      printSize: "a4",
      isFramed: false,
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
      printSize: "a4",
      isFramed: false,
    }));

    addImages(newImages);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 min-h-screen">
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

      {selectedImages.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Selected Images</h3>
          <div className="space-y-2">
            {selectedImages.map((image, index) => (
              <div
                key={`${image.file.name}-${index}`}
                className="flex items-center p-3 bg-gray-50 rounded-lg"
              >
                <div className="aspect-square w-16 h-16">
                  <img
                    src={image.preview}
                    alt={image.file.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </div>
                <div className="ml-4 flex-grow">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {image.file.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {(image.file.size / 1024).toFixed(1)} KB
                  </p>
                  <div className="mt-2 w-48">
                    <Select
                      defaultValue={image.printSize}
                      onValueChange={(value) => updatePrintSize(index, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select print size" />
                      </SelectTrigger>
                      <SelectContent>
                        {PRINT_SIZES.map((size) => (
                          <SelectItem key={size.id} value={size.id}>
                            {size.name} ({size.dimensions})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="mt-2 w-32 flex space-x-2.5 items-center">
                    <span className="">Add Frame?</span>
                    <Checkbox
                      className="text-cinereous"
                      checked={image.isFramed}
                      onCheckedChange={(checked) => {
                        if (typeof checked === "boolean") {
                          updateIsFramed(index, checked);
                        }
                      }}
                    />
                  </div>
                </div>
                <button
                  onClick={() => removeImage(index)}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  <Trash className="text-red-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {selectedImages.length > 0 && (
        <Link
          href={`/complete-request/1`}
          className="flex my-3 mx-1.5 max-w-min px-2.5 py-1 bg-yaleBlue text-ghostWhite rounded-3xl hover:bg-cinereous"
        >
          <span>Continue</span>
          <span>
            <MoveRight />
          </span>
        </Link>
      )}
    </div>
  );
}
