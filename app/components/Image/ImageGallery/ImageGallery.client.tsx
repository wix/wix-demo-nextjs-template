"use client";
import { Carousel, Flowbite, useTheme } from "flowbite-react";

export default function ImageGalleryClient({
  items,
}: {
  items: { src: string; alt?: string }[];
}) {
  const { theme } = useTheme();
  return (
    <div className="h-56 sm:h-96 max-h-96 max-w-xl mx-auto">
      <Flowbite
        theme={{
          theme: {
            carousel: {
              scrollContainer: {
                ...theme.carousel.scrollContainer,
                base: theme.carousel.scrollContainer.base + " rounded-none",
              },
            },
          },
        }}
      >
        <Carousel slide={false}>
          {items.map(({ src, alt }, index) => (
            <img key={index} src={src} alt={alt ?? ""} />
          ))}
        </Carousel>
      </Flowbite>
    </div>
  );
}
