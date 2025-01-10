'use client';

import { ServiceCategoryConsts } from "@/utils/constants/consts";
import Link from "next/link";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "./ui/carousel";
import { useCallback, useEffect, useState } from "react";

export default function ServiceCategories() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const onInit = useCallback(() => {
    setCount(0);
    setCurrent(0);
  }, []);

  const onScroll = useCallback(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) {
      return;
    }

    onScroll();
    api.on("init", onInit);
    api.on("scroll", onScroll);
    api.on("reInit", onScroll);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

    return () => {
      api.off("init", onInit);
      api.off("scroll", onScroll);
      api.off("reInit", onScroll);
    };
  }, [api, onInit, onScroll]);

  return (
    <>
      <Carousel
        setApi={setApi}
        opts={{ align: "start" }}
        className="w-full"
      >
      <CarouselContent className="-ml-1">
      {ServiceCategoryConsts.map((service) => (
        <CarouselItem key={service.id}
        className="my-2.5 pl-1 basis-1/3 md:basis-1/4 lg:basis-1/6">
          <Link
            key={service.id}
            href={`services/${service.id}`}
            className="my-2.5 px-2.5 py-1 bg-cinereous text-ghostWhite rounded-3xl hover:bg-cornflowerBlue"
          >
            {service.name}
          </Link>
        </CarouselItem>
      ))}
      </CarouselContent>
      </Carousel>
      {count > 1 && <div className="mb-2.5 flex items-center justify-center space-x-2.5">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              index === current ? "bg-cornflowerBlue w-4" : "bg-yaleBlue"
            }`}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>}
    </>
  );
}
