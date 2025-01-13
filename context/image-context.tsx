"use client";

// ImageContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface PrintSize {
  id: string;
  name: string;
  dimensions: string;
  price: number;
}

export const PRINT_SIZES: PrintSize[] = [
  { id: "a4", name: "A4", dimensions: "210 × 297 mm", price: 30 },
  { id: "a5", name: "A5", dimensions: "148 × 210 mm", price: 25 },
  { id: "a6", name: "A6", dimensions: "105 × 148 mm", price: 20 },
];

export enum MugColor {
  WHITE = 'White',
  BLACK = 'Black',
  PURPLE = 'Purple',
  RED = 'Red',
}

export enum TShirtColor {
  WHITE = 'White',
  BLACK = 'Black',
  RED = 'Red',
  BLUE = 'Blue',
  GREEN = 'Green',
  YELLOW = 'Yellow',
  ORANGE = 'Orange',
  PINK = 'Pink',
  PURPLE = 'Purple',
}

export enum TShirtSize {
  XS = 'Extra Small',
  S = 'Small',
  M = 'Medium',
  L = 'Large',
  XL = 'Extra Large',
  XXL = 'Double Extra Large',
}

export enum TShirtPrintSize {
  POCKET = 'Pocket Size',        
  SMALL = 'Small',               
  MEDIUM = 'Medium',            
  LARGE = 'Large',          
  A4 = 'A4 Size',
}

export interface ImageFile {
  file: File;
  preview: string;
  printSize?: PrintSize;
  isFramed?: boolean;
  mugColor?: MugColor;
  changesColor?: boolean;
  tColor?: TShirtColor;
  tSize?: TShirtSize;
  tPrintSize?: TShirtPrintSize;
}

interface ImageContextType {
  selectedImages: ImageFile[];
  addImages: (newImages: ImageFile[]) => void;
  removeImage: (index: number) => void;
  updatePrintSize: (index: number, size: string) => void;
  updateIsFramed: (index: number, isFramed: boolean) => void;
  updateMugColor: (index: number, color: MugColor) => void;
  updateColorChanges: (index: number, changes: boolean) => void;
  updateTColor: (index: number, color: TShirtColor) => void;
  updateTSize: (index: number, size: TShirtSize) => void;
  updateTPrintSize: (index: number, printSize: TShirtPrintSize) => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);


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

  const updateMugColor = (index: number, color: MugColor) => {
    setSelectedImages((prev) => {
      const newImages = [...prev];
      newImages[index] = { ...newImages[index], mugColor: color };
      return newImages;
    })
  };

  const updateColorChanges = (index: number, changes: boolean) => {
    setSelectedImages((prev) => {
      const newImages = [...prev];
      newImages[index] = { ...newImages[index], changesColor: changes };
      return newImages;
    })
  };

  const updateTColor = (index: number, color: TShirtColor) => {
    setSelectedImages((prev) => {
      const newImages = [...prev];
      newImages[index] = {...newImages[index], tColor: color};
      return newImages;
    })
  }
  const updateTSize = (index: number, size: TShirtSize) => {
    setSelectedImages((prev) => {
      const newImages = [...prev];
      newImages[index] = {...newImages[index], tSize: size};
      return newImages;
    })
  };

  const updateTPrintSize = (index: number, printSize: TShirtPrintSize) => {
    setSelectedImages((prev) => {
      const newImages = [...prev];
      newImages[index] = {...newImages[index], tPrintSize: printSize};
      return newImages;
    })
  };

  return (
    <ImageContext.Provider
      value={{
        selectedImages,
        addImages,
        removeImage,
        updatePrintSize,
        updateIsFramed,
        updateColorChanges,
        updateMugColor,
        updateTColor,
        updateTSize,
        updateTPrintSize,
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
