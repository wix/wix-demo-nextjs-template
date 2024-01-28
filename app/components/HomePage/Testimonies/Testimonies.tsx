import React from "react";
import Image from "next/image";

export default function Testimonies() {
  return (
    <section className="flex flex-col w-screen h-full justify-items-center items-center md:p-32 p-10 md:bg-[url('/images/vegtables-drawing.jpeg')] bg-cover bg-top bg-fixed bg-no-repeat">
      <figure className="max-w-screen-md mx-auto flex flex-col gap-8 items-center justify-items-center my-14">
        <Image src="/images/quotes.png" alt="quotes" width={64} height={64} />
        <blockquote className="text-center">
          <h4 className="text-center">
            Absolutely loved it.
            <br />
            Amazing food and charismatic chef.
          </h4>
        </blockquote>
        <figcaption className="flex gap-5 flex-col items-center justify-center">
          <Image
            className="p-1 rounded-full ring-2 ring-gray-300 ring-offset-4"
            src="/images/testimonail-person.jpeg"
            alt="profile picture"
            width={128}
            height={128}
          />
          <div className="items-center">
            <div className="">Emma Brown, NYC</div>
          </div>
        </figcaption>
      </figure>
    </section>
  );
}
