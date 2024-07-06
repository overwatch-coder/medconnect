import { TicketStatus } from "@/types/index";
import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Create A React Query Client
export const queryClient = new QueryClient();

// create axios instance
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  timeout: 5000,
});

// format time into moments in time
export const formatTimeAgo = (timestamp: Date, locale: string = "en") => {
  let value;
  const diff = (new Date().getTime() - timestamp.getTime()) / 1000;
  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

  if (years > 0) {
    value = rtf.format(0 - years, "year");
  } else if (months > 0) {
    value = rtf.format(0 - months, "month");
  } else if (days > 0) {
    value = rtf.format(0 - days, "day");
  } else if (hours > 0) {
    value = rtf.format(0 - hours, "hour");
  } else if (minutes > 0) {
    value = rtf.format(0 - minutes, "minute");
  } else {
    value = rtf.format(0 - diff, "second");
  }

  return value;
};

// get future time
export const getEndTime = (startTime: string) => {
  // Parse the start time
  let [time, modifier] = startTime.split(" ");
  let [hours, minutes]: number[] | string[] = time.split(":");
  hours = parseInt(hours, 10);
  minutes = parseInt(minutes, 10);

  // Convert to 24-hour format if necessary
  if (modifier === "PM" && hours < 12) {
    hours += 12;
  } else if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  // Add 30 minutes
  minutes += 30;
  if (minutes >= 60) {
    minutes -= 60;
    hours += 1;
  }

  // Handle hours overflow
  if (hours >= 24) {
    hours -= 24;
  }

  // Format end time in 12-hour format with AM/PM
  let endModifier = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // If hours is 0, set it to 12

  let formattedHours = hours < 10 ? `0${hours}` : hours;
  let formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes} ${endModifier}`;
};

// get all years from startYear to current year
export const getAllYears = (startYear: number = 2010) => {
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let i = startYear; i <= currentYear; i++) {
    years.push(i);
  }

  return years.reverse();
};

// get all months from startMonth to current month
export const getAllMonths = (startMonth: number = 1, all: boolean = false) => {
  const monthsInWords = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (all) {
    return monthsInWords;
  }

  const currentMonth = new Date().getMonth() + 1;
  const months = [];

  for (let i = startMonth; i <= currentMonth; i++) {
    months.push(i);
  }

  return months.map((month) => monthsInWords[month - 1]);
};

// get status color based on status value
export const getStatusColor = (status: TicketStatus) => {
  const statusColors = {
    open: "#002E6D",
    closed: "#D00D2D",
    pending: "#FFFF00", // Yellow
    resolved: "#0000FF", // Blue
    inProgress: "#FFA500", // Orange
    onHold: "#800080", // Purple
    cancelled: "#808080", // Gray
  };

  return statusColors[status] || "#002E6D";
};
