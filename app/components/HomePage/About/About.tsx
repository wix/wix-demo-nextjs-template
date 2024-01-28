import React from "react";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="relative mx-auto w-full">
      <div className="lg:h-[682px] grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="relative max-md:h-[267px] md:h-[524px] lg:h-[682px] lg:order-1 order-2">
          <Image
            src="/images/chef.jpeg"
            alt="Chef"
            objectFit="cover"
            objectPosition="right"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1440px) 50vw"
            priority
          />
        </div>
        <div className="flex md:justify-cente md:p-6 py-6 lg:order-2 order-1 font-roboto">
          <div className="h-full flex flex-col justify-center items-start md:px-10 px-5">
            <div className="flex flex-col h-3/4 py-5 justify-between items-start">
              <div className="md:text-center">
                <h2 className="font-thin text-4xl md:text-5xl">
                  Meet The Chef
                </h2>
              </div>
              <p className="font-light text-3xl h-3 border-b-2 border-t-2 border-black w-16" />
              <p className="lg:w-1/2 text-sm font-light text-gray-600 mb-5 leading-6 tracking-widest">
                I&apos;m a paragraph. Click here to add your own text and edit
                me. It&rsquo;s easy. Just click &ldquo;Edit Text&rdquo; or
                double click me to add your own content and make changes to the
                font. Feel free to drag and drop me anywhere you like on your
                page. I&rsquo;m a great place for you to tell a story and let
                your users know a little more about you.
              </p>
              <p className="text-gray-600 mt-4 my-10 justify-self-end font-light tracking-wide">
                Tel: 123-456-7890 | Email: info@mysite.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
