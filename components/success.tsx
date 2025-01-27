"use client";

import { useImageContext } from "@/context/image-context";
import Link from "next/link";
import { useEffect } from "react";

export default function Success() {
  const { selectedImages, clearSelectedImages } = useImageContext();

  
//   useEffect(() => {
//     clearSelectedImages();
//   }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <span>Success, your order has been placed</span>
      <Link className="bg-cinereous text-white px-2.5 py-1.5" href="/">
        Continue Shopping
      </Link>
    </div>
  );
}
