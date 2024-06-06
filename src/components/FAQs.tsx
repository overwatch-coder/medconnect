"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaPlusCircle } from "react-icons/fa";
import { MEDCONNECT_FAQS } from "@/constants";

const FAQs = () => {
  return (
    <Accordion type="single" collapsible className="w-full flex flex-col gap-5">
      {MEDCONNECT_FAQS.map(({ question, answer }, index) => (
        <AccordionItem value={`faq-item-${index + 1}`} key={index}>
          <AccordionTrigger className="bg-white group text-secondary-gray hover:bg-primary-green hover:text-white px-5 py-4 w-full flex items-center justify-between rounded [&[data-state=open]]:bg-white [&[data-state=open]]:text-secondary-gray">
            <span className="text-lg text-start">{question}</span>
            <FaPlusCircle
              size={25}
              className="text-primary-green group-hover:text-white group-[&[data-state=open]]:text-primary-green"
            />
          </AccordionTrigger>
          <AccordionContent className="bg-primary-green shadow text-start text-white px-5 py-10 rounded-b-xl text-lg">
            {answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FAQs;
