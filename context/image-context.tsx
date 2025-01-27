"use client";

// ImageContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

export enum PhotoPrintSize {
  A4 = "A4",
  A5 = "A5",
  A6 = "A6",
}

export enum MugColor {
  WHITE = "White",
  BLACK = "Black",
  PURPLE = "Purple",
  RED = "Red",
}

export enum TShirtColor {
  WHITE = "White",
  BLACK = "Black",
  RED = "Red",
  BLUE = "Blue",
  GREEN = "Green",
  YELLOW = "Yellow",
  ORANGE = "Orange",
  PINK = "Pink",
  PURPLE = "Purple",
}

export enum CapColor {
  WHITE = "White",
  BLACK = "Black",
  RED = "Red",
  BLUE = "Blue",
  GREEN = "Green",
  YELLOW = "Yellow",
  ORANGE = "Orange",
  PINK = "Pink",
  PURPLE = "Purple",
}

export enum TShirtSize {
  XS = "Extra Small",
  S = "Small",
  M = "Medium",
  L = "Large",
  XL = "Extra Large",
  XXL = "Double Extra Large",
}

export enum TShirtPrintSize {
  POCKET = "Pocket Size",
  SMALL = "Small",
  MEDIUM = "Medium",
  LARGE = "Large",
  A4 = "A4 Size",
}

export enum JigsawSize {
  SMALL = "Small",
  MEDIUM = "Medium",
  LARGE = "Large",
}

export interface ImageFile {
  file: File;
  preview: string;
  photoPrintSize?: PhotoPrintSize;
  isFramed?: boolean;
  mugColor?: MugColor;
  changesColor?: boolean;
  tColor?: TShirtColor;
  tSize?: TShirtSize;
  tPrintSize?: TShirtPrintSize;
  capColor?: CapColor;
  jigsawSize?: JigsawSize;
}

interface ImageContextType {
  selectedImages: ImageFile[];
  contextTotal: number;
  addImages: (newImages: ImageFile[]) => void;
  removeImage: (index: number) => void;
  updatePrintSize: (index: number, size: PhotoPrintSize) => void;
  updateIsFramed: (index: number, isFramed: boolean) => void;
  updateMugColor: (index: number, color: MugColor) => void;
  updateColorChanges: (index: number, changes: boolean) => void;
  updateTColor: (index: number, color: TShirtColor) => void;
  updateTSize: (index: number, size: TShirtSize) => void;
  updateTPrintSize: (index: number, photoPrintSize: TShirtPrintSize) => void;
  updateCapColor: (index: number, color: CapColor) => void;
  updateJigsawSize: (index: number, size: JigsawSize) => void;
  setContextTotal: (total: number) => void;
  clearSelectedImages: () => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider = ({ children }: { children: ReactNode }) => {
  const [selectedImages, setSelectedImages] = useState<ImageFile[]>([]);
  const [contextTotal, setTotal] = useState<number>(0);

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

  const updatePrintSize = (index: number, size: PhotoPrintSize) => {
    setSelectedImages((prev) => {
      const newImages = [...prev];
      newImages[index] = {
        ...newImages[index],
        photoPrintSize: size,
      };
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
    });
  };

  const updateColorChanges = (index: number, changes: boolean) => {
    setSelectedImages((prev) => {
      const newImages = [...prev];
      newImages[index] = { ...newImages[index], changesColor: changes };
      return newImages;
    });
  };

  const updateTColor = (index: number, color: TShirtColor) => {
    setSelectedImages((prev) => {
      const newImages = [...prev];
      newImages[index] = { ...newImages[index], tColor: color };
      return newImages;
    });
  };

  const updateTSize = (index: number, size: TShirtSize) => {
    setSelectedImages((prev) => {
      const newImages = [...prev];
      newImages[index] = { ...newImages[index], tSize: size };
      return newImages;
    });
  };

  const updateTPrintSize = (index: number, photoPrintSize: TShirtPrintSize) => {
    setSelectedImages((prev) => {
      const newImages = [...prev];
      newImages[index] = { ...newImages[index], tPrintSize: photoPrintSize };
      return newImages;
    });
  };

  const updateCapColor = (index: number, color: CapColor) => {
    setSelectedImages((prev) => {
      const newImages = [...prev];
      newImages[index] = { ...newImages[index], capColor: color };
      return newImages;
    });
  };

  const updateJigsawSize = (index: number, size: JigsawSize) => {
    setSelectedImages((prev) => {
      const newImages = [...prev];
      newImages[index] = { ...newImages[index], jigsawSize: size };
      return newImages;
    });
  };

  const setContextTotal = (total: number) => {
    setTotal(total);
  };

  const clearSelectedImages = () => {
    setSelectedImages([]);
  };

  return (
    <ImageContext.Provider
      value={{
        selectedImages,
        contextTotal,
        addImages,
        removeImage,
        updatePrintSize,
        updateIsFramed,
        updateColorChanges,
        updateMugColor,
        updateTColor,
        updateTSize,
        updateTPrintSize,
        updateCapColor,
        updateJigsawSize,
        setContextTotal,
        clearSelectedImages,
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
