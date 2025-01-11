import Image from "next/image"

interface CoverImageProps {
  src: string
  alt: string
  priority?: boolean
}

export function CoverImage({ src, alt, priority = true }: CoverImageProps) {
  return (
    <div className="relative w-full">
      <div className="aspect-[21/6] w-full overflow-hidden">
        <div className="relative h-full w-full">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </div>
    </div>
  )
}

