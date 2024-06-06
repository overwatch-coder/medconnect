import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <section className="px-5 md:px-16 xl:px-24 2xl:px-40 flex flex-col pt-5 md:pt-0 mt-20 xl:mt-32">
      <div className="flex flex-col justify-between md:flex-row gap-10 items-center">
        <div className="flex flex-col text-center md:text-start items-center md:items-start gap-3 text-secondary-gray">
          <h2 className="font-light">
            Optimizing Rural HealthCare through technology
          </h2>

          <h1 className="text-3xl md:text-4xl leading-relaxed">
            <span className="font-extrabold">
              Revolutionizing Rural Healthcare,
            </span>{" "}
            <br className="py-1" />
            <span className="font-normal">Right at Your Doorstep</span>
          </h1>

          <p className="font-light">
            Empowering rural communities with accessible, efficient, and
            personalized healthcare solutions.
          </p>

          <Button className="text-secondary-gray bg-white font-semibold hover:text-white w-full md:w-fit px-10">
            Get Started
          </Button>
        </div>

        <Image
          src="/assets/images/hero-image.svg"
          alt="hero"
          width={500}
          height={500}
          className="object-contain max-w-[300px] w-full"
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default Hero;
