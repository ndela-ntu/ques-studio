import sendConfirmationEmail from "@/lib/send-confirmation";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = createClient();

  try {
    const body = await req.json();

    if (body.payload.status === "succeeded") {
      const metadata = body.payload.metadata;
      const { data } = await (await supabase)
        .from("checkout_details")
        .select("*")
        .eq("uuid", metadata.uuid);

      //   const metaWithDeserial: ImageFile[] = metadata.selectedImages.map(
      //     (image: MetadataModel) => ({
      //       ...image,
      //       file: deserializeFile(image.file),
      //     })
      //   );

      if (data === null || data.length === 0) {
        const { data: orderData, error: orderError } = await (
          await supabase
        )
          .from("orders")
          .update({
            orderStatus: "PAID",
          })
          .eq("id", metadata.orderId)
          .select("*")
          .single();

        if (orderError) {
          throw new Error(`Error encounted: ${orderError.message}`);
        }

        //await saveAndUploadServices(metaWithDeserial, orderData.id);

        const { data: checkoutData, error: checkoutError } = await (
          await supabase
        )
          .from("checkout_details")
          .insert({
            uuid: metadata.uuid,
            fullname: metadata.fullname,
            email: metadata.email,
            phone: metadata.phone,
            streetAddress: metadata.streetAddress,
            suburb: metadata.suburb,
            city: metadata.city,
            postalCode: metadata.postalCode,
            total: metadata.total,
            orderId: orderData.id,
          })
          .select("*")
          .single();

        if (checkoutError) {
          throw new Error(`Error encounted: ${checkoutError.message}`);
        }

        await sendConfirmationEmail(
          metadata.email,
          checkoutData.id,
          metadata.total
        );
      }

      return NextResponse.json({
        status: "success",
        message: "Payment processed and checkout details submitted",
      });
    }

    return NextResponse.json(
      { status: "ignored", message: "Event ignored" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error handling webhook event:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to process event" },
      { status: 500 }
    );
  }
}
