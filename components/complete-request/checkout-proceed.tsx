"use client";

import { TShirtPrintSize, useImageContext } from "@/context/image-context";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CheckoutProceed({ serviceId }: { serviceId: number }) {
  const { selectedImages, setContextTotal } = useImageContext();
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    let total: number;

    switch (serviceId) {
      case 1:
        {
          total = selectedImages.reduce((a, v) => {
            let price = v.printSize?.price ?? 30;
            let printSizeId = v.printSize?.id ?? "a4";
            if (v.isFramed) {
              if (printSizeId === "a4") price = 150;
              else if (printSizeId === "a5") price = 100;
              else price = 50;
            }

            return a + price;
          }, 0);
        }
        break;
      case 2:
        {
          total = selectedImages.reduce((a, v) => {
            let price = 130;
            console.log(v.file.name, v.changesColor);
            if (v.changesColor) {
              price = 150;
            }

            return a + price;
          }, 0);
        }
        break;
      case 3:
        {
          total = selectedImages.reduce((a, v) => {
            let price = 200;
            switch (v.tPrintSize) {
              case TShirtPrintSize.POCKET:
                price = 200;
                break;
              case TShirtPrintSize.SMALL:
                price = 210;
                break;
              case TShirtPrintSize.MEDIUM:
                price = 220;
                break;
              case TShirtPrintSize.LARGE:
                price = 230;
                break;
              case TShirtPrintSize.A4:
                price = 240;
                break;
              default:
                price = 200;
                break;
            }

            return a + price;
          }, 0);
        }
        break;
      case 4:
        {
          total = selectedImages.reduce((a, v) => {
            let price = 135;
            return a + price;
          }, 0);
        }
        break;
      case 5:
        {
          total = selectedImages.reduce((a, v) => {
            let price = 100;
            return a + price;
          }, 0);
        }
        break;
      default:
        {
          total = selectedImages.reduce((a, v) => {
            let price = v.printSize?.price ?? 30;
            if (v.isFramed) {
              if (v.printSize?.id === "a4") price = 150;
              else if (v.printSize?.id === "a5") price = 100;
              else price = 50;
            }

            return a + price;
          }, 0);
        }
        break;
    }

    setTotal(total);
    setContextTotal(total);
  }, [total]);

  return (
    <Link
      className="flex flex-col text-white bg-cornflowerBlue fixed bottom-0 left-0 w-full py-2.5 px-1.5 font-semibold"
      href={`/checkout/${serviceId}`}
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
