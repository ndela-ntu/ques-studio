import PrintsWidget from "@/components/widgets/prints-widget";
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
      return <PrintsWidget type="photos" />;
    }
    case "Mug Prints": {
      return <PrintsWidget type="mugs" />;
    }
    case "T-Shirt Prints": {
      return <PrintsWidget type="t-shirts" />;
    }
    case "Cap Prints": {
      return <PrintsWidget type="caps" />;
    }
    case "Jigsaw Prints": {
      return <PrintsWidget type="jigsaw"/>;
    }
    case "Case Prints": {
      return <PrintsWidget type="case" />;
    }
    default: {
      return <PrintsWidget type="photos" />;
    }
  }
}
