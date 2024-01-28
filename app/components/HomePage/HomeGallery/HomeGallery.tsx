"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Carousel } from "flowbite-react";

interface ImagesProps {
  id: number;
  src: string;
  title: string;
  description: string;
}

export default function HomeGallery({ images }: { images: ImagesProps[] }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImagesProps | undefined>(
    undefined
  );
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const openModal = (image: ImagesProps, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(undefined);
    setModalIsOpen(false);
  };

  const leftControl = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="2em"
      viewBox="0 0 320 512"
      className="md:block hidden"
    >
      <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
    </svg>
  );

  const rightControl = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="2em"
      viewBox="0 0 320 512"
      className="md:block hidden"
    >
      <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
    </svg>
  );

  return (
    <section className="relative w-screen flex flex-wrap">
      {images.map((image, index) => (
        <div
          key={image.id}
          className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 hover:cursor-pointer"
        >
          <div
            className="relative group overflow-hidden md:h-44 h-64"
            onClick={() => openModal(image, index)}
          >
            <Image
              src={image.src}
              alt={image.title}
              className="object-cover w-full h-full cursor-pointer transition-transform transform"
              fill
              quality={100}
              sizes={"(min-width: 768px) 33vw, (min-width: 1024px) 25vw, 50vw"}
            />
            <div className="opacity-0 bg-gray-900 bg-opacity-50 absolute inset-0 flex items-center justify-center transition-opacity group-hover:opacity-100">
              <div className="flex flex-col text-center gap-6">
                <h3 className="text-white text-xl font-bold">{image.title}</h3>
                <p className="text-white text-sm">{image.description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {modalIsOpen && selectedImage && (
        <div className="w-screen h-screen fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 inset-0 md:p-8 bg-white transition-opacity z-50">
          <div className="absolute top-0 right-0 p-8 z-40">
            <button
              className="text-3xl cursor-pointer text-black"
              onClick={closeModal}
            >
              &times;
            </button>
          </div>
          <Carousel
            slide={false}
            leftControl={leftControl}
            rightControl={rightControl}
          >
            {images.map((image, index) => (
              <div
                key={image.id}
                className="md:px-36 flex md:flex-row flex-col w-screen h-screen lg:gap-10 items-center justify-center align-middle"
              >
                <div className={"relative w-screen h-[80vh]"}>
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    sizes={
                      "(min-width: 768px) 33vw, (min-width: 1024px) 25vw, 50vw"
                    }
                    quality={100}
                    objectFit="cover"
                  />
                </div>
                <div>
                  <div className="flex items-center md:justify-end justify-start gap-6 md:px-5">
                    <div className="flex flex-col gap-6 lg:w-1/2">
                      <h3 className="text-xl font-bold ">{image.title}</h3>
                      <p className="text-gray-700 text-sm">
                        {image.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      )}
    </section>
  );
}
