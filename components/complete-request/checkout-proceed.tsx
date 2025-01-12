"use client";

import { useImageContext } from "@/context/widget-context";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CheckoutProceed() {
  const { selectedImages } = useImageContext();
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const total = selectedImages.reduce((a, v) => {
      let price = v.printSize?.price ?? 30;
      if (v.isFramed) {
        if (v.printSize?.id === "a4") price = 150;
        else if (v.printSize?.id === "a5") price = 100;
        else price = 50;
      }

      return a + price;
    }, 0);
    setTotal(total);
  }, [total]);

  return (
    <Link
      className="flex flex-col text-white bg-cornflowerBlue fixed bottom-0 left-0 w-full py-2.5 px-1.5 font-semibold"
      href="/checkout"
    >
      <span className="flex justify-between">
        <label>Total:</label>
        <span>R{total}</span>
      </span>
      <div className="divider my-0"></div>
      <label className="flex items-center justify-center">
        Proceed to Checkout
      </label>
    </Link>
  );
}
