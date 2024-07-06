"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import { cn } from "@/lib/utils";

type FilterOption = {
  value: string;
  label: string;
};

// Filter Component
type CustomFilterDropdownProps = {
  filterBy: string;
  handleFilter: (value: string, index?: number) => void;
  filterOptions: FilterOption[];
  index?: number;
  filterName?: string;
  className?: string;
  iconClassName?: string;
};

const CustomFilterDropdown = ({
  filterBy,
  handleFilter,
  filterOptions,
  index,
  filterName,
  className,
  iconClassName,
}: CustomFilterDropdownProps) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          onClick={() => setOpenDropdown(!openDropdown)}
          className={cn(
            "flex items-center gap-2 bg-white rounded-2xl sm:px-5 border border-secondary-gray py-2 text-secondary-gray hover:bg-white hover:text-secondary-gray outline-none focus:outline-none ring-0 focus:ring-0 w-full sm:w-fit",
            className
          )}
        >
          <span>
            {filterName ? filterName : "Filter by"} {filterBy}
          </span>
          {openDropdown ? (
            <BiUpArrow
              size={15}
              className={cn("text-secondary-gray", iconClassName)}
            />
          ) : (
            <BiDownArrow
              size={15}
              className={cn("text-secondary-gray", iconClassName)}
            />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-full">
        <DropdownMenuRadioGroup
          value={filterBy}
          onValueChange={(value) => handleFilter(value, index)}
        >
          {filterOptions.map((option) => (
            <DropdownMenuRadioItem
              value={`${option.value}|${option.label}`}
              key={option.value}
            >
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CustomFilterDropdown;
