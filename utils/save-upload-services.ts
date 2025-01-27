import { ImageFile } from "@/context/image-context";
import { createClient } from "./supabase/server";

export default async function saveAndUploadServices(
  selectedImages: Omit<ImageFile, 'preview'>[],
  orderId: number
) {
  const supabase = createClient();

  const promises = selectedImages.map(async (imageFile: Omit<ImageFile, 'preview'>) => {
    const { data: imageData, error: imageError } = await (
      await supabase
    ).storage
      .from("ques-bucket")
      .upload(`${Date.now()}-${imageFile.file.name}`, imageFile.file);

    if (imageError) {
      throw new Error(`Failed to upload image: ${imageError.message}`);
    }

    const {
      data: { publicUrl },
    } = (await supabase).storage
      .from("ques-bucket")
      .getPublicUrl(imageData.path);

    const { error: serviceError } = await (await supabase)
      .from("services")
      .insert({
        printSize: imageFile.printSize,
        isFramed: imageFile.isFramed,
        mugColor: imageFile.mugColor,
        changesColor: imageFile.changesColor,
        tColor: imageFile.tColor,
        tSize: imageFile.tSize,
        tPrintSize: imageFile.tPrintSize,
        capColor: imageFile.capColor,
        jigsawSize: imageFile.jigsawSize,
        imageUrl: publicUrl,
        orderId,
      });

    if (serviceError) {
      throw new Error(`Failed to upload image: ${serviceError.message}`);
    }
  });

  await Promise.all(promises);
}
