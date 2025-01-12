import { CoverImage } from "@/components/cover-image";
import { ServiceCategoryConsts } from "@/utils/constants/consts";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className=" min-h-screen flex flex-col">
      <CoverImage src="/newCoverImage.jpeg" alt="cover image" />
      <div className="w-full text-center flex flex-col items-center justify-center p-1 md:p-2 lg:p-3">
        <h1 className="text-2xl md:text-3xl font-bold text-cinereous">
          Welcome to Ques
        </h1>
        <p className="md:w-1/2 lg:w-1/2 mt-2 text-muted-foreground">
          At Ques Studio, we bring your creative ideas to life with
          high-quality, custom prints on a wide range of products. Whether
          you're looking to personalize a phone case, mug, t-shirt, cap, jigsaw
          puzzle, or even print your favorite photo, we’re here to help you turn
          your vision into reality.
        </p>
        <div className="divider m-0" />
        <h1 className="mt-5 text-2xl md:text-3xl font-bold text-yaleBlue">
          Browser our services
        </h1>
      </div>
      <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 px-8">
        {ServiceCategoryConsts.map((service) => (
          <Link key={service.id} href={`/services/${service.id}`}>
            <div className="flex flex-col items-center justify-center bg-cornflowerBlue w-full">
              <h2 className="text-ghostWhite text-lg font-semibold">
                {service.name}
              </h2>
              <div className="aspect-square relative w-full h-full border-8 border-ghostWhite">
                <Image
                  src={service.categoryImageUrl}
                  alt="Image of service"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
