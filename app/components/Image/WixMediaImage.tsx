import { media as wixMedia } from "@wix/sdk";
import Image, { ImageProps } from "next/image";
import { PLACEHOLDER_IMAGE } from "../../constants";

export function getImageUrlForMedia(
  media?: string,
  width: number = 640,
  height: number = 320
) {
  return media
    ? wixMedia.getScaledToFillImageUrl(media, width, height, {})
    : `https://fakeimg.pl/${width}x${height}/?text=%20`;
}

export function WixMediaImage({
  media,
  height = 320,
  width = 640,
  alt = "no info available for image",
  className,
  sizes = "10vw",
  objectFit,
  disableZoom = false,
  priority = false,
}: {
  media?: string;
  alt?: string;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  disableZoom?: boolean;
  objectFit?: "cover" | "contain";
  priority?: boolean;
}) {
  const imageUrl = media
    ? getImageUrlForMedia(media || "", width, height)
    : PLACEHOLDER_IMAGE;

  const styleProps: Partial<ImageProps> = {
    ...(objectFit
      ? { style: { objectFit }, fill: true, sizes }
      : { width, height }),
  };

  return (
    <div className={`flex items-center justify-center h-full`}>
      <div className="overflow-hidden relative group w-full h-full">
        <Image
          {...styleProps}
          src={imageUrl}
          quality={90}
          alt={alt}
          className={`object-cover w-full ${
            !disableZoom ? "group-hover:scale-110" : ""
          } transition duration-300 ease-in-out ${className}`}
          priority={priority}
        />
      </div>
    </div>
  );
}
