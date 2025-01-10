import ServiceCategories from "@/components/service-categories";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <ServiceCategories />
      <div className="border border-cinereous flex items-center justify-center w-full h-[200px]">Cover goes here</div>
    </div>
  );
}
