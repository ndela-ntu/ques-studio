import PhotoPrintsWidget from "@/components/widgets/photo-prints-widget";
import { ServiceCategoryConsts } from "@/utils/constants/consts";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const service = ServiceCategoryConsts.find(
    (service) => service.id === parseInt(id)
  );

  if (!service) {
    return notFound();
  }

  switch (service.name) {
    case "Photo Prints": {
      return <PhotoPrintsWidget />;
    }
    case "Mug Prints": {
      return <PhotoPrintsWidget />;
    }
    case "T-Shirt Prints": {
      return <PhotoPrintsWidget />;
    }
    case "Cap Prints": {
      return <PhotoPrintsWidget />;
    }
    case "Jigsaw Prints": {
      return <PhotoPrintsWidget />;
    }
    case "Case Prints": {
      return <PhotoPrintsWidget />;
    }
    default: {
      return <PhotoPrintsWidget />;
    }
  }
}
