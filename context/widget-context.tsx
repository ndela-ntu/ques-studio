"use client";

// ImageContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface PrintSize {
  id: string;
  name: string;
  dimensions: string;
  price: number;
}

export interface ImageFile {
  file: File;
  preview: string;
  printSize?: PrintSize;
  isFramed?: boolean;
}

interface ImageContextType {
  selectedImages: ImageFile[];
  addImages: (newImages: ImageFile[]) => void;
  removeImage: (index: number) => void;
  updatePrintSize: (index: number, size: string) => void;
  updateIsFramed: (index: number, isFramed: boolean) => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const PRINT_SIZES: PrintSize[] = [
  { id: "a4", name: "A4", dimensions: "210 × 297 mm", price: 30 },
  { id: "a5", name: "A5", dimensions: "148 × 210 mm", price: 25 },
  { id: "a6", name: "A6", dimensions: "105 × 148 mm", price: 20 },
];

export const ImageProvider = ({ children }: { children: ReactNode }) => {
  const [selectedImages, setSelectedImages] = useState<ImageFile[]>([]);

  const addImages = (newImages: ImageFile[]) => {
    setSelectedImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const updatePrintSize = (index: number, size: string) => {
    setSelectedImages((prev) => {
      const newImages = [...prev];
      newImages[index] = { ...newImages[index], printSize: PRINT_SIZES.find((printSize) => printSize.id === size) };
      return newImages;
    });
  };

  const updateIsFramed = (index: number, isFramed: boolean) => {
    setSelectedImages((prev) => {
      const newImages = [...prev];
      newImages[index] = { ...newImages[index], isFramed: isFramed };
      return newImages;
    });
  };

  return (
    <ImageContext.Provider
      value={{
        selectedImages,
        addImages,
        removeImage,
        updatePrintSize,
        updateIsFramed,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => {
  const context = useContext(ImageContext);
  if (context === undefined) {
    throw new Error("useImageContext must be used within an ImageProvider");
  }
  return context;
};
