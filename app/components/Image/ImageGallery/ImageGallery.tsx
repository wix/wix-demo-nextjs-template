import ImageGalleryClient from "@/app/components/Image/ImageGallery/ImageGallery.client";

export default function ImageGallery({
  urls,
}: {
  urls: string[];
}) {
  return (
    <ImageGalleryClient
      items={urls.map((src) => ({
        src,
        alt: "",
      }))}
    />
  );
}
