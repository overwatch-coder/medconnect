import { QueryClient } from "@tanstack/react-query"
import axios from 'axios';
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Create A React Query Client
export const queryClient = new QueryClient();

// create axios instance
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  timeout: 5000,
})