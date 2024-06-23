import { Button } from "@/components/ui/button";
import {
  MEDCONNECT_OBJECTIVES_CHECKS,
  MEDCONNECT_OBJECTIVES,
  MEDCONNECT_SERVICES,
  MEDCONNECT_RECENT_ARTICLES,
} from "@/constants";
import { ArrowRight } from "lucide-react";
import { FaCircle } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import FAQs from "@/components/FAQs";
import Testimonial from "@/components/Testimonial";

const Home = () => {
  return (
    <div className="bg-primary-green/10 w-full pt-16">
      <div className="flex flex-col gap-12 px-5 md:px-16 xl:px-24 2xl:px-40 pb-8 xl:pb-16">
        {/* Who We Are */}
        <section id="about-us">
          <div className="flex lg:flex-row flex-col justify-between gap-10">
            <div className="flex flex-col gap-4 w-full">
              <h2 className="font-bold text-3xl text-secondary-gray">
                Who Are We?
              </h2>
              <p className="font-light text-primary-gray xl:leading-loose 2xl:leading-[3]">
                We are a dedicated team committed to transforming rural
                healthcare through innovative technology and compassionate care.
                Our mission is to bridge the healthcare gap in underserved
                communities by providing accessible, efficient, and high-quality
                medical services. With a focus on improving health outcomes, we
                work tirelessly to bring essential healthcare services directly
                to the doorsteps of those in need. Our approach combines
                state-of-the-art technology with community-based initiatives to
                ensure that everyone, regardless of their location, has access
                to the care they deserve.
              </p>

              <Link href={"/contact-us"}>
                <Button className="group flex items-center gap-1 bg-secondary-gray px-8 w-fit text-white">
                  <span>Contact Us</span>
                  {/* Arrow */}
                  <ArrowRight
                    size={15}
                    className="text-white group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </Link>
            </div>

            <Image
              src="/assets/images/who-are-we.svg"
              alt="hero"
              width={500}
              height={500}
              className="rounded w-full lg:w-1/2 2xl:w-full object-cover"
              loading="lazy"
            />
          </div>
        </section>

        {/* Our Goals */}
        <section className="pt-5">
          <div className="flex md:flex-row flex-col gap-10">
            <div className="flex flex-col gap-2 w-full">
              <p className="font-semibold text-primary-green">
                Bringing quality healthcare to every doorstep in rural
                communities
              </p>
              <h3 className="font-bold text-3xl">
                Improving the Quality of Your Health Through Better Health
              </h3>
            </div>

            <div className="flex flex-col gap-3 w-full">
              <p className="font-light">
                The goal is to revolutionize rural healthcare by providing
                accessible, efficient, and quality medical services to
                underserved communities, ensuring better health outcomes for
                all. By leveraging advanced technology and community-based
                approaches, we aim to bridge the healthcare gap, promote
                preventive care, and enhance the overall well-being of rural
                populations.
              </p>

              <Link href={"#core_values"} className="flex items-center gap-2">
                <Button className="px-2 py-0.5 rounded w-fit">
                  <ArrowRight
                    size={20}
                    className="text-white"
                    strokeWidth={4}
                  />
                </Button>
                <span className="font-semibold text-black text-xl">
                  Our Core Values
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Our Services */}
        <section id="services" className="pt-5">
          <div className="flex flex-col gap-8 lg:flex-row justify-between">
            {MEDCONNECT_SERVICES.map((service, index) => (
              <div
                key={index}
                className="group shadow rounded-b-md overflow-hidden text-secondary-gray bg-white flex flex-col"
              >
                <Image
                  src={service.image}
                  alt={service.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />

                <div className="flex flex-col gap-4 p-4">
                  <h3 className="font-bold text-lg">{service.name}</h3>
                  <p className="font-light">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Our Objectives */}+
      <section className="pt-10">+
        <div className="flex lg:flex-row flex-col justify-between relative">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex gap-3 px-5 md:px-16 xl:px-24 2xl:px-40">
              <FaCircle size={30} className="text-primary-green" />

              <div className="flex flex-col gap-1 text-secondary-gray">
                <p className="font-light">
                  Our innovative solutions ensure that quality healthcare is
                  just a step away, empowering individuals and communities to
                  lead healthier lives.
                </p>
                <Link href={"/contact-us"} className="font-bold text-lg">
                  Contact us for more information
                </Link>
              </div>
            </div>

            <div
              id="core_values"
              className="bg-primary-green flex flex-col justify-center py-20 h-full"
            >
              <div className="flex flex-col gap-4 px-5 md:px-16 xl:px-24 2xl:px-40">
                <h2 className="text-white font-bold text-3xl">
                  Committed To Building A Positive, Safe, Patient Focused Care
                </h2>
                <p className="text-white font-light">
                  At MedConnect, our mission is to make quality healthcare
                  accessible to everyone, especially in rural areas. Join us in
                  our journey to transform healthcare delivery and improve
                  lives, one community at a time
                </p>

                {/* Checks */}
                <ul className="grid grid-cols-2 gap-10">
                  {MEDCONNECT_OBJECTIVES_CHECKS.map((check, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <check.icon className="text-white" size={30} />
                      <span className="text-white font-semibold">
                        {check.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Objectives */}
            <div className="px-5 md:px-16 xl:absolute xl:bottom-20 xl:-translate-x-1/2 xl:left-1/2 xl:px-10 pt-2 pb-8 xl:pt-0 xl:pb-0">
              <div className="flex flex-col gap-5 xl:gap-5">
                {MEDCONNECT_OBJECTIVES.map(({ icon, name }, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-md rounded w-full p-3 flex items-center gap-3"
                  >
                    <Image src={icon} alt={name} width={20} height={20} />
                    <p className="font-semibold text-secondary-gray">{name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Image
            src="/assets/images/nurses-smiling.jpg"
            alt="objectives"
            width={500}
            height={500}
            className="w-full object-cover rounded-tl-3xl"
          />
        </div>
      </section>

      {/* FAQs */}
      <section className="py-10 bg-primary-gray/10">
        <div className="px-5 md:px-16 xl:px-24 2xl:px-40">
          <div className="flex flex-col gap-5">
            <h2 className="text-secondary-gray font-bold text-xl xl:text-3xl">
              Frequently Asked Questions (F.A.Q.)
            </h2>

            <FAQs />
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      <section className="py-16 bg-secondary-gray">
        <div className="px-5 md:px-16 xl:px-24 2xl:px-40">
          <div className="flex flex-col gap-5">
            <h2 className="space-y-1 text-white">
              <p className="font-light text-sm">Health Essentials</p>
              <p className="font-bold text-xl">Recent Articles</p>
            </h2>

            <div className="flex flex-col gap-8 lg:flex-row justify-between">
              {MEDCONNECT_RECENT_ARTICLES.map(
                (
                  {
                    image,
                    title,
                    description,
                    author,
                    publishedDate,
                    avatar,
                    url,
                  },
                  index
                ) => (
                  <Link
                    href={url}
                    target="_blank"
                    key={index}
                    className="group shadow rounded-md overflow-hidden text-secondary-gray bg-white flex flex-col"
                  >
                    <Image
                      src={image}
                      alt={title}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />

                    <div className="flex flex-col gap-4 p-4">
                      <h3 className="font-bold text-lg">{title}</h3>
                      <p className="font-light">{description}</p>

                      <div className="flex items-center gap-3">
                        <Image
                          src={avatar}
                          alt="avatar"
                          width={80}
                          height={80}
                          className="object-contain rounded-full"
                        />

                        <div className="flex flex-col gap-1">
                          <h3 className="font-bold">{author}</h3>
                          <p className="font-font-semibold italic text-sm">
                            {publishedDate}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-primary-gray/10">
        <div className="px-5 md:px-16 xl:px-24 2xl:px-40">
          <div className="flex flex-col gap-5">
            <h2 className="text-primary-green font-bold text-xl xl:text-2xl">
              Testimonials!!
            </h2>

            <Testimonial />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
