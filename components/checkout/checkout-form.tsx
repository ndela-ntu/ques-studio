"use client";

import { ImageFile, useImageContext } from "@/context/image-context";
import { CheckoutFormState, saveServiceRequest } from "@/lib/checkout-actions";
import { serializeFile } from "@/utils/functions/serialize-file";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useActionState, startTransition } from "react";

export default function CheckoutForm({ id }: { id: number }) {
  const { selectedImages, contextTotal } = useImageContext();

  const initialState: CheckoutFormState = { message: null, errors: {} };
  const [state, dispatch, isPending] = useActionState(
    saveServiceRequest,
    initialState
  );

  if (selectedImages.length === 0) {
    return (
      <div className="flex flex-col">
        <p>No images loaded</p>
        <Link
          href={`/service-request/${id}`}
          className="text-white flex space-x-2 bg-yaleBlue p-2 rounded-2xl"
        >
          <ArrowLeft />
          <span>Go back</span>
        </Link>
      </div>
    );
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    try {
      const selectedImagesFormData = await Promise.all(
        selectedImages.map(async (selectedImage) => ({
          ...selectedImage,
          file: await serializeFile(selectedImage.file),
        }))
      );

      formData.append("serviceId", id.toString());
      formData.append(
        "selectedImages",
        JSON.stringify(selectedImagesFormData)
      );
      formData.append("total", contextTotal.toString());
      
      console.log(selectedImagesFormData);
      console.log(selectedImages);
      // startTransition(() => {
      //   dispatch(formData);
      // });
    } catch (error) {
      console.error("Error processing form:", error);
    }
  };

  return (
    <form className="p-2.5" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-5 w-full">
        <h1 className="text-2xl">Personal Details</h1>
        <div className="sm:flex sm:flex-col lg:grid lg:grid-cols-2 space-y-2.5 lg:space-y-0 lg:gap-5">
          <div className="flex flex-col">
            <label htmlFor="fullname">Full name</label>
            <input
              type="text"
              name="fullname"
              className="border border-black p-1.5 bg-transparent placeholder:text-gray rounded-lg"
              placeholder="Full name"
            />
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.fullname &&
                state.errors.fullname.map((error: string, i) => (
                  <p key={i} className="text-sm text-red-500">
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              className="border border-black p-1.5 bg-transparent placeholder:text-gray rounded-lg"
              placeholder="Email"
            />
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.email &&
                state.errors.email.map((error: string, i) => (
                  <p key={i} className="text-sm text-red-500">
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              name="phone"
              className="border border-black p-1.5 bg-transparent placeholder:text-gray rounded-lg"
              placeholder="Phone Number"
            />
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.phone &&
                state.errors.phone.map((error: string, i) => (
                  <p key={i} className="text-sm text-red-500">
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <h1 className="text-2xl">Shipping Details</h1>
        <div className="sm:flex sm:flex-col lg:grid lg:grid-cols-2 space-y-2.5 lg:space-y-0 lg:gap-5 pb-16">
          <div className="flex flex-col">
            <label htmlFor="streetAddress">Street Address</label>
            <input
              type="text"
              name="streetAddress"
              className="border border-black p-1.5 bg-transparent placeholder:text-gray rounded-lg"
              placeholder="Street Address"
            />
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.streetAddress &&
                state.errors.streetAddress.map((error: string, i) => (
                  <p key={i} className="text-sm text-red-500">
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="suburb">Suburb</label>
            <input
              type="text"
              name="suburb"
              className="border border-black p-1.5 bg-transparent placeholder:text-gray rounded-lg"
              placeholder="Suburb"
            />
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.suburb &&
                state.errors.suburb.map((error: string, i) => (
                  <p key={i} className="text-sm text-red-500">
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              className="border border-black p-1.5 bg-transparent placeholder:text-gray rounded-lg"
              placeholder="City"
            />
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.city &&
                state.errors.city.map((error: string, i) => (
                  <p key={i} className="text-sm text-red-500">
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="postalCode">Postal Code</label>
            <input
              type="text"
              name="postalCode"
              className="border border-black p-1.5 bg-transparent placeholder:text-gray rounded-lg"
              placeholder="Postal Code"
            />
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.postalCode &&
                state.errors.postalCode.map((error: string, i) => (
                  <p key={i} className="text-sm text-red-500">
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full flex items-center justify-center font-bold fixed bottom-0 left-0 bg-white text-black py-2.5"
        >
          {isPending ? (
            <Loader2 className="h-7 w-7 animate-spin" />
          ) : (
            <span>Complete Checkout</span>
          )}
        </button>
      </div>
    </form>
  );
}