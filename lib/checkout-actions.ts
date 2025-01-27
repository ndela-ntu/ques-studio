"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import {
  CapColor,
  ImageFile,
  JigsawSize,
  MugColor,
  PrintSize,
  TShirtColor,
  TShirtPrintSize,
  TShirtSize,
} from "@/context/image-context";
import { createClient } from "@/utils/supabase/server";
import saveAndUploadServices from "@/utils/save-upload-services";
import { ISerializedImage } from "@/models/serialized-image";
import { deserializeFile } from "@/utils/functions/deserialize-file";

const SelectedImageSchema = z.object({
  file: z.object({
    name: z.string(),
    type: z.string(),
    size: z.number(),
    content: z.string(),
    lastModified: z.number(),
  }),
  printSize: z
    .object({
      id: z.string(),
      name: z.string(),
      dimensions: z.string(),
      price: z.number(),
    })
    .optional(),
  isFramed: z.boolean().optional(),
  mugColor: z.nativeEnum(MugColor).optional(),
  changesColor: z.boolean().optional(),
  tColor: z.nativeEnum(TShirtColor).optional(),
  tSize: z.nativeEnum(TShirtSize).optional(),
  tPrintSize: z.nativeEnum(TShirtPrintSize).optional(),
  capColor: z.nativeEnum(CapColor).optional(),
  jigsawSize: z.nativeEnum(JigsawSize).optional(),
});

const CheckoutSchema = z.object({
  fullname: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().refine(
    (val) => {
      const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
      return phoneRegex.test(val);
    },
    { message: "Invalid phone number" }
  ),
  streetAddress: z.string().min(5, "Address must be at least 5 characters"),
  suburb: z.string().min(2, "City must be at least 2 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  postalCode: z.string().min(2, "Zip code must be at least 2 characters"),
  selectedImages: z
    .array(SelectedImageSchema)
    .nonempty("At least one item is required"),
  total: z.number().positive("Total must be a positive number"),
});

export type CheckoutFormState = {
  errors: {
    fullname?: string[];
    email?: string[];
    phone?: string[];
    streetAddress?: string[];
    suburb?: string[];
    city?: string[];
    postalCode?: string[];
  };
  message?: string | null;
  isSuccess?: boolean;
};

export async function saveServiceRequest(
  prevState: CheckoutFormState,
  formData: FormData
) {
  const supabase = createClient();

  const validatedFields = CheckoutSchema.safeParse({
    fullname: formData.get("fullname"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    streetAddress: formData.get("streetAddress"),
    suburb: formData.get("suburb"),
    city: formData.get("city"),
    postalCode: formData.get("postalCode"),
    selectedImages: JSON.parse(formData.get("selectedImages") as string),
    total: parseFloat(formData.get("total") as string),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return <CheckoutFormState>{
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missed fields, failed to create checkout.",
      isSuccess: false,
    };
  }

  const serviceId = parseInt(formData.get("serviceId") as string);
  let redirectURL = `/failure/${serviceId}`;

  try {
    const {
      fullname,
      email,
      phone,
      streetAddress,
      suburb,
      city,
      postalCode,
      selectedImages,
      total,
    } = validatedFields.data;

    const { data: orderData, error: orderError } = await (await supabase)
      .from("orders")
      .insert({ serviceId, orderStatus: "PENDING" })
      .select("*")
      .single();

    const imageFiles: Omit<ImageFile, "preview">[] = selectedImages.map(
      (image: ISerializedImage) => ({
        ...image,
        file: deserializeFile(image.file),
      })
    );

    await saveAndUploadServices(imageFiles, orderData.id);

    if (orderError) {
      throw new Error(`Failed to insert order: ${orderError.message}`);
    }

    const metadata = {
      fullname,
      email,
      phone,
      streetAddress,
      suburb,
      city,
      postalCode,
      //selectedImages,
      total,
      serviceId,
      orderId: orderData.id,
    };

    const result = await checkWHExists();
    if (!result.hookExists) {
      const mode = await registerWebhook();

      if (mode === "test" || mode === "live") {
        const response = await handleCheckout(metadata);
        redirectURL = response.redirectUrl;
      } else {
        throw new Error("Unable to register hook");
      }
    } else {
      const response = await handleCheckout(metadata);
      redirectURL = response.redirectUrl;
    }
  } catch (e) {
    return <CheckoutFormState>{
      message: "Error from server",
      isSuccess: false,
      errors: [],
    };
  }

  redirect(redirectURL);
}

const BASE_URL = "https://ques-studio.vercel.app";
const LOCAL_URL = "http://localhost:3000";

const checkWHExists = async () => {
  try {
    console.log("List webhooks");
    const response = await fetch(`${LOCAL_URL}/api/ListWebhooks`, {
      method: "GET",
    });

    const data = await response.json();

    //return data.hookExists;
    return data;
  } catch (error) {
    console.log(error);
  }
};

const registerWebhook = async () => {
  try {
    console.log("Register webhook");
    const response = await fetch(`${LOCAL_URL}/api/RegisterWebhook`, {
      method: "POST",
    });

    const data = await response.json();

    return data.mode;
  } catch (error) {
    console.error(error);
  }
};

const handleCheckout = async (metadata: {
  fullname: string;
  email: string;
  phone: string;
  streetAddress: string;
  suburb: string;
  city: string;
  postalCode: string;
  // selectedImages: {
  //   file: {
  //     name: string;
  //     type: string;
  //     size: number;
  //     content: string;
  //   };
  //   printSize?: PrintSize;
  //   isFramed?: boolean;
  //   mugColor?: MugColor;
  //   changesColor?: boolean;
  //   tColor?: TShirtColor;
  //   tSize?: TShirtSize;
  //   tPrintSize?: TShirtPrintSize;
  //   capColor?: CapColor;
  //   jigsawSize?: JigsawSize;
  // }[];
  total: number;
  serviceId: number;
  orderId: number;
}) => {
  try {
    const response = await fetch(`${LOCAL_URL}/api/CreateCheckout`, {
      method: "POST",
      body: JSON.stringify({
        amount: metadata.total * 100,
        currency: "ZAR",
        metadata: { uuid: uuidv4(), ...metadata },
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
