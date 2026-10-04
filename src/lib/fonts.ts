import { DM_Sans, Raleway } from "next/font/google";

export const dmSans = DM_Sans({
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const raleway = Raleway({
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: "--font-raleway",
});
