import React from "react";
import HeroSection from "@/app/components/HomePage/Hero/Hero";
import AboutSection from "@/app/components/HomePage/About/About";
import MenuSection from "@/app/components/HomePage/Menu/Menu";
import Testimonies from "@/app/components/HomePage/Testimonies/Testimonies";
import ServiceForm from "@/app/components/HomePage/Form/ServiceForm";
import HomeGallery from "@/app/components/HomePage/HomeGallery/HomeGallery";
import { BlogSection } from "@/app/components/HomePage/BlogSection/BlogSection";
import FeaturedMenuCard from "@/app/components/MenuCard/FeaturedMenuCard";
import { StoreSection } from "@/app/components/HomePage/StoreSection/StoreSection";

const galleryImages = [
  {
    id: 1,
    src: "/images/gallery-image1.jpeg",
    title: "Im an image title",
    description:
      "Describe your image here. Use catchy text to tell people the story behind the photo. Go to “Manage Media” to add your content.",
  },
  {
    id: 2,
    src: "/images/gallery-image2.jpeg",
    title: "Im an image title",
    description:
      "Describe your image here. Use catchy text to tell people the story behind the photo. Go to “Manage Media” to add your content.",
  },
  {
    id: 3,
    src: "/images/gallery-image3.jpeg",
    title: "Im an image title",
    description:
      "Describe your image here. Use catchy text to tell people the story behind the photo. Go to “Manage Media” to add your content.",
  },
  {
    id: 4,
    src: "/images/gallery-image4.jpeg",
    title: "Im an image title",
    description:
      "Describe your image here. Use catchy text to tell people the story behind the photo. Go to “Manage Media” to add your content.",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <HeroSection />
      <AboutSection />
      <MenuSection />
      <StoreSection />
      <div className="flex flex-col lg:w-screen h-full md:p-32 md:my-0 my-10 md:bg-[url('/images/plates-with-food.jpeg')] md:bg-cover md:bg-no-repeat md:bg-fixed md:bg-center">
        <FeaturedMenuCard />
      </div>
      <div className="md:hidden block bg-[url('/images/plates-with-food.jpeg')] bg-cover bg-no-repeat bg-bottom h-80 w-full" />
      <Testimonies />
      <section
        className="flex flex-col w-full h-full justify-items-center items-center md:pt-[660px] pt-[500px]
                bg-[url('/images/resturant-table.jpeg')]
                bg-cover bg-no-repeat md:bg-fixed bg-top"
      />
      <BlogSection />
      <ServiceForm />
      <HomeGallery images={galleryImages} />
    </main>
  );
}
