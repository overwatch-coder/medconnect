"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { CalendarMinus2, ChevronDown } from "lucide-react";

const analysisPeriodOptions = [
  "January, 2024 - March, 2024",
  "April, 2024 - June, 2024",
  "July, 2024 - September, 2024",
  "October, 2024 - December, 2024",
];

const AnalysisPeriodDropdown = () => {
  const [analysisPeriod, setAnalysisPeriod] = useState(
    analysisPeriodOptions[0]
  );

  const handlePeriodChange = (value: string) => {
    setAnalysisPeriod(value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-between gap-2 bg-secondary-gray text-white rounded-none px-2 py-1">
        <span className="flex items-center gap-2 text-sm">
          <CalendarMinus2 size={20} className="text-white" />
          <span className="flex flex-col text-start">
            <span className="font-medium">Analysis Period</span>
            <span className="text-white/50 text-xs">{analysisPeriod}</span>
          </span>
        </span>
        <ChevronDown size={20} className="text-white" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-full">
        <DropdownMenuRadioGroup
          value={analysisPeriod}
          onValueChange={handlePeriodChange}
        >
          {analysisPeriodOptions.map((option) => (
            <DropdownMenuRadioItem value={option} key={option}>
              {option}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AnalysisPeriodDropdown;
