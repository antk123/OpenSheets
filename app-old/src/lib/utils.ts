import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const siteUrl = "https://opensheets.co.uk";
export const siteName = "Open Sheets";
export const siteTagline = "Free UK Bookkeeping Spreadsheet Templates & Guides";
export const siteDescription = "Download free UK bookkeeping spreadsheets and plain-English tax guides for sole traders, landlords, freelancers and small businesses. No signup required.";
