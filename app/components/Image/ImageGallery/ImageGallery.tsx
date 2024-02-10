import { ServiceImage } from "@/app/model/service/service.mapper";
import { getImageUrlForMedia } from "@/app/components/Image/WixMediaImage";
import ImageGalleryClient from "@/app/components/Image/ImageGallery/ImageGallery.client";

export default function ImageGallery({
  mediaItems,
}: {
  mediaItems: ServiceImage[];
}) {
  return (
    <ImageGalleryClient
      items={mediaItems.map((item) => ({
        src: getImageUrlForMedia(item.image, 600, 400),
        alt: "",
      }))}
    />
  );
}
