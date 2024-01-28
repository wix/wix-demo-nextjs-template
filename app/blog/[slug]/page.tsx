import React, { Suspense } from "react";
import {
  ImageSkeleton,
  TextSkeleton,
} from "@/app/components/Skeletons/Skeletons";

export async function generateMetadata({ params }: any) {
  const post = {
    id: "1",
    data: {
      ingredients: {
        id: "1",
        name: "placeholder",
        width: 600,
        height: 800,
        url: "/images/placeholder.png",
      },
      dishName: "placeholder",
      preparationInstructions: "placeholder",
      slug: "placeholder",
    },
  };
  return {
    title: post ? post.data!.dishName : params.slug,
  };
}

async function Blog({ slug }: { slug: string }) {
  const post = {
    id: "1",
    data: {
      ingredients: {
        id: "1",
        name: "placeholder",
        width: 600,
        height: 800,
        url: "/images/placeholder.png",
      },
      dishName: "placeholder",
      preparationInstructions: "placeholder",
      slug: "placeholder",
    },
  };
  return (
    <div className="mx-auto px-4 sm:px-14">
      {post ? (
        <div className="full-w overflow-hidden max-w-6xl mx-auto">
          <h1 className="text-[50px] text-[#2F2E2E] font-serif sm:text-5xl my-2 text-center px-5 pb-4">
            {post.data!.dishName}
          </h1>
          this is the full description of the post
        </div>
      ) : (
        <div className="text-3xl w-full text-center p-9 box-border">
          The Blog was not found
        </div>
      )}
    </div>
  );
}

export default function Page({ params }: any) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center flex-col gap-8">
          <div className="h-full w-96 mt-8">
            <TextSkeleton />
          </div>
          <div className="w-fit">
            <ImageSkeleton width="full" height="60" />
          </div>
        </div>
      }
    >
      <Blog slug={params.slug} /> :
    </Suspense>
  );
}
