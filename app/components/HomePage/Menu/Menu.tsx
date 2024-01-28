import React from "react";
import MenuCard from "@/app/components/MenuCard/MenuCard";
import Link from "next/link";

const BookLink = ({ href }: { href: string }) => {
  return (
    <Link
      href={href}
      className="capitalize font-roboto leading-[23.44px] font-light text-xl"
    >
      book now &gt;
    </Link>
  );
};

export default function MenuSection() {
  return (
    <section className="w-screen">
      <div className="md:py-[150px] md:bg-[url('/images/herbs.jpeg')] md:bg-cover md:bg-no-repeat md:bg-fixed md:bg-center">
        <div className="grid sm:grid-cols-3 grid-cols-1 mx-auto justify-center items-center gap-6 max-w-[1040px]">
          <MenuCard
            title="Culinary Cooking"
            image="/images/food-menu-item1.jpeg"
            description="A variety of exotic wines paired with 7 fresh tapas"
          >
            <BookLink href="/calendar/professional-culinary-cooking-class" />
          </MenuCard>
          <MenuCard
            title="Mastering Hospitality"
            image="/images/food-menu-item2.jpeg"
            description="Master the art of hospitality with Chef Bolano"
          >
            <BookLink href="/calendar/mastering-hospitality-basics" />
          </MenuCard>
          <MenuCard
            title="Wine Testing"
            image="/images/food-menu-item3.jpeg"
            description="A variety of exotic wines paired with 7 fresh tapas"
          >
            <BookLink href="/service/wine-testing" />
          </MenuCard>
        </div>
      </div>
    </section>
  );
}
