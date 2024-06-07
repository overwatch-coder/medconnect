"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";
import { MEDCONNECT_TESTIMONIALS } from "@/constants";
import Image from "next/image";

const Testimonial = () => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="gap-5 px-10 ms-5">
        {MEDCONNECT_TESTIMONIALS.map(
          ({ testimony, jobTitle, author, avatar }, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3 shadow-md text-secondary-gray bg-white flex flex-col pl-1"
            >
              <div className="flex flex-col gap-4 p-4">
                <div className="relative py-10">
                  <ImQuotesLeft
                    size={30}
                    className="text-primary-green absolute top-2 left-2"
                  />

                  <p className="font-light">{testimony}</p>

                  <ImQuotesRight
                    size={30}
                    className="text-primary-green absolute bottom-5 right-2"
                  />
                </div>

                <div className="flex flex-col items-center gap-3">
                  <Image
                    src={avatar}
                    alt="avatar"
                    width={80}
                    height={80}
                    placeholder="blur"
                    className="object-contain rounded-full"
                  />

                  <h3 className="font-bold">{author}</h3>
                  <p className="font-semibold text-sm italic">{jobTitle}</p>
                </div>
              </div>
            </CarouselItem>
          )
        )}
      </CarouselContent>
      <CarouselPrevious className="hidden xl:flex" />
      <CarouselNext className="hidden xl:flex" />
    </Carousel>
  );
};
export default Testimonial;
