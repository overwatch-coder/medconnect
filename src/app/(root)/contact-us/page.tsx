"use client";

import { Button } from "@/components/ui/button";
import { Mail, MapPin, PhoneCall } from "lucide-react";
import React, { useState } from "react";
import { contactFormSchema } from "@/schema/contact.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import ClipLoader from "react-spinners/ClipLoader";
import { useMutation } from "@tanstack/react-query";
import CustomErrorElement from "@/components/CustomErrorElement";
import { contactFormSubmit } from "@/actions/contact.action";
import { ContactFormType } from "@/types/index";

const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitFormErrors, setSubmitFormErrors] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormType>({
    resolver: zodResolver(contactFormSchema),
  });

  // submit login form
  const mutation = useMutation({
    mutationFn: contactFormSubmit,
    onSettled: (result) => {
      if (!result?.success) {
        setSubmitFormErrors(result?.errors!);
        return;
      }

      setFormSubmitted(true);

      reset();

      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
    },
  });

  const contactFormSubmission = async (data: ContactFormType) => {
    setSubmitFormErrors([]);
    mutation.mutate(data);
  };

  return (
    <section
      id="Contact"
      className="mt-20 xl:mt-32 px-5 md:px-16 xl:px-24 2xl:px-40"
    >
      <div className="pb-20">
        <div className="w-full rounded-3xl bg-white transition-all duration-300">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 w-full">
            {/* Contact form */}
            <div className="flex rounded-s-3xl flex-col gap-5 col-span-1 bg-secondary-gray text-primary-green px-5 py-10 md:py-14 md:px-14">
              <h2 className="text-2xl md:text-3xl font-semibold capitalize text-primary-green mb-5">
                How can we help you?
              </h2>

              {formSubmitted ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <SuccessMessage setFormSubmitted={setFormSubmitted} />
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(contactFormSubmission)}
                  className="flex flex-col gap-10"
                  method="POST"
                >
                  <CustomErrorElement errors={submitFormErrors} />

                  {/* Name */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="name"
                      className="text-sm text-primary-green/80 my-1"
                    >
                      Name
                    </label>

                    <input
                      type="text"
                      id="name"
                      {...register("name")}
                      className="w-full rounded bg-transparent border-b-2 border-b-white/80 focus:border-b-white text-white py-2 focus:outline-none"
                    />

                    {errors.name && (
                      <p className="text-red-500 text-xs py-2">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="email"
                      className="text-sm text-primary-green/80 my-1"
                    >
                      Email
                    </label>

                    <input
                      type="email"
                      id="email"
                      {...register("email")}
                      className="w-full rounded bg-transparent border-b-2 border-b-white/80 focus:border-b-white text-white py-2 focus:outline-none"
                    />

                    {errors.email && (
                      <p className="text-red-500 text-xs py-2">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Company */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="company"
                      className="text-sm text-primary-green/80 my-1"
                    >
                      Company
                    </label>

                    <input
                      type="text"
                      id="company"
                      {...register("company")}
                      className="w-full rounded bg-transparent border-b-2 border-b-white/80 focus:border-b-white text-white py-2 focus:outline-none"
                    />

                    {errors.company && (
                      <p className="text-red-500 text-xs py-2">
                        {errors.company.message}
                      </p>
                    )}
                  </div>

                  {/* Service */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="service"
                      className="text-sm text-primary-green/80 my-1"
                    >
                      What are you looking for?
                    </label>

                    <select
                      id="service"
                      {...register("inquiryType")}
                      className="w-full rounded bg-transparent border-b-2 border-b-white/80 focus:border-b-white text-white py-2 focus:outline-none"
                    >
                      <option className="text-black">Select one</option>
                      <option className="text-black" value="Medical Assistance">
                        Medical Assistance
                      </option>
                      <option
                        className="text-black"
                        value="Partner with MedConnect"
                      >
                        Partner with MedConnect
                      </option>
                      <option className="text-black" value="Contact Us">
                        Contact Us
                      </option>
                      <option className="text-black" value="Fund MedConnect">
                        Fund MedConnect
                      </option>
                      <option className="text-black" value="Other">
                        Other (Please specify in message below)
                      </option>
                    </select>

                    {errors.inquiryType && (
                      <p className="text-red-500 text-xs py-2">
                        {errors.inquiryType.message}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="message"
                      className="text-sm text-primary-green/80 my-1"
                    >
                      Message
                    </label>

                    <textarea
                      id="message"
                      {...register("message")}
                      rows={4}
                      className="w-full rounded bg-transparent border-b-2 border-b-white/80 focus:border-b-white text-white py-2 focus:outline-none"
                    ></textarea>

                    {errors.message && (
                      <p className="text-red-500 text-xs py-2">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <SubmitButton pending={mutation.isPending} />
                </form>
              )}
            </div>

            {/* Contact Us Content */}
            <div className="col-span-1 px-5 py-10 md:py-14 md:px-14">
              <h2 className="text-2xl uppercase md:text-3xl font-semibold text-secondary-gray mb-3 space-y-1">
                Visit MedConnect
              </h2>

              <p className="text-sm text-secondary-gray mb-7 space-y-1 flex flex-col">
                <span>Call us to schedule a tour of our Head Office.</span>
                <span>
                  We are open Monday through Friday from 8:30 am to 5:00 pm
                  GMT+1.
                </span>
              </p>

              <div className="h-[1px] w-full homeFooter"></div>

              <div className="flex flex-col gap-6 mt-5">
                <div className="flex items-center justify-start gap-5">
                  <span className="flex items-center justify-center bg-white shadow-md flex-col rounded-full p-3">
                    <PhoneCall
                      size={25}
                      strokeWidth={2}
                      className="text-secondary-gray text-center"
                    />
                  </span>
                  <div className="flex flex-col gap-2">
                    <p className="flex items-center gap-2">
                      <span>Tel:</span>
                      <span className="leading-relaxed text-sm md:text-base">
                        +233 530 456 789
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span>GSM:</span>
                      <span className="leading-relaxed text-sm md:text-base">
                        +233 777 456 789
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-start gap-5">
                  <span className="flex items-center justify-center bg-white shadow-md flex-col rounded-full p-3">
                    <Mail
                      size={25}
                      strokeWidth={2}
                      className="text-secondary-gray text-center"
                    />
                  </span>

                  <div className="flex flex-col gap-2">
                    <p>Email:</p>
                    <Link
                      href={"mailto:info@medconnect.com"}
                      className="leading-relaxed text-sm md:text-base"
                    >
                      info@medconnect.com
                    </Link>
                  </div>
                </div>

                <div className="flex items-center justify-start gap-5">
                  <span className="flex items-center justify-center bg-white shadow-md flex-col rounded-full p-3">
                    <MapPin
                      size={25}
                      strokeWidth={2}
                      className="text-secondary-gray text-center"
                    />
                  </span>

                  <div className="flex flex-col gap-2">
                    <p>Address:</p>
                    <p className="leading-relaxed text-sm md:text-base">
                      123 Adabraka Junction, <br className="hidden md:block" />{" "}
                      Building A,
                      <br className="hidden md:block" /> Dadease, Ghana
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SubmitButton = ({ pending }: { pending: boolean }) => {
  return (
    <div className="flex flex-col items-center w-full gap-5">
      <Button
        disabled={pending}
        className="bg-primary-green hover:bg-primary-green/70 w-full px-10 py-3 text-center text-white"
      >
        {pending ? (
          <ClipLoader size={28} loading={pending} color="white" />
        ) : (
          "Send"
        )}
      </Button>
    </div>
  );
};

const SuccessMessage = ({
  setFormSubmitted,
}: {
  setFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      className="bg-green-100 border flex flex-col items-center justify-center border-green-400 text-green-700 px-4 py-5 gap-4 rounded relative w-full"
      role="alert"
    >
      <strong className="font-semibold text-2xl">Thank You!</strong>
      <span className="block sm:inline">We will get back to you shortly.</span>
      <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg
          className="fill-current h-6 w-6 text-green-500"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          onClick={() => setFormSubmitted(false)}
        >
          <title>Close</title>
          <path
            fillRule="evenodd"
            d="M2.293 2.293a1 1 0 011.414 0L10 8.586l6.293-6.293a1 1 0 111.414 1.414L11.414 10l6.293 6.293a1 1 0 01-1.414 1.414L10 11.414l-6.293 6.293a1 1 0 01-1.414-1.414L8.586 10 2.293 3.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </div>
  );
};

export default Contact;
