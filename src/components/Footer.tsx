import { PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-secondary-gray w-full px-5 md:px-16 xl:px-24 2xl:px-40 pt-10 pb-5">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Logo */}
        <div className="flex flex-col gap-5">
          <h2 className="flex items-center gap-3">
            <Image
              src="/assets/icons/logo-green.svg"
              alt="footer logo"
              width={80}
              height={80}
            />
            <p className="text-white font-extrabold text-4xl">
              Med<span className="text-primary-green">Connect</span>
            </p>
          </h2>

          <p className="font-light text-white leading-loose text-sm">
            MedConnect is a pioneering healthcare platform dedicated to bridging
            the gap between rural communities and quality medical care. Our
            mission is to make healthcare accessible, efficient, and
            personalized by leveraging technology. We connect patients with
            healthcare professionals, provide tailored care plans, and empower
            individuals with vital health information.
          </p>
        </div>

        {/* Services */}
        <div className="flex flex-col lg:items-center">
          <div className="flex flex-col gap-3">
            <h2 className="text-primary-green font-bold text-xl py-2 text-start">
              Our Services
            </h2>
            <ul className="flex flex-col gap-3 font-light text-start">
              <Link
                href={"#"}
                className="text-white/80 hover:text-primary-green w-fit"
              >
                Community Health Outreach
              </Link>
              <Link
                href={"#"}
                className="text-white/80 hover:text-primary-green w-fit"
              >
                On-Demand Medical Assistance
              </Link>
              <Link
                href={"#"}
                className="text-white/80 hover:text-primary-green w-fit"
              >
                Routine Health Monitoring
              </Link>
              <Link
                href={"#"}
                className="text-white/80 hover:text-primary-green w-fit"
              >
                {" "}
                Health Diagnosis
              </Link>
            </ul>
          </div>
        </div>

        {/* Quick Contact */}
        <div className="bg-white rounded-md shadow p-5 flex flex-col gap-5">
          <h3 className="text-secondary-gray text-2xl font-extrabold">
            Quick Contact
          </h3>
          <p className="font-normal">
            Together, we can make a difference. Let&apos;s bring healthcare to
            every doorstep.
          </p>

          <p className="flex items-center gap-2 text-secondary-gray font-semibold">
            <PhoneCall size={20} />
            <span>+234 813 555 5555</span>
          </p>

          <p className="flex items-center gap-2 text-secondary-gray font-semibold">
            123 Health Lane, Ruralville, Mauritia
          </p>

          <div className="flex items-center gap-4">
            <Link href={"https://facebook.com"} target="_blank">
              <FaFacebook
                size={25}
                className="text-secondary-gray hover:text-primary-green transition"
              />
            </Link>
            <Link href={"https://linkedin.com"} target="_blank">
              <FaLinkedin
                size={25}
                className="text-secondary-gray hover:text-primary-green transition"
              />
            </Link>
            <Link href={"https://instagram.com"} target="_blank">
              <FaInstagram
                size={25}
                className="text-secondary-gray hover:text-primary-green transition"
              />
            </Link>
            <Link href={"https://twitter.com"} target="_blank">
              <FaTwitter
                size={25}
                className="text-secondary-gray hover:text-primary-green transition"
              />
            </Link>
          </div>
        </div>
      </div>

      <hr className="my-10 border-primary-green border" />
      <p className="text-center text-white font-light text-sm">
        Copyright © {new Date().getFullYear()} MedConnect. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
