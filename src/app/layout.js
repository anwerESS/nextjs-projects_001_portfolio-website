import {Outfit} from "next/font/google";
import "./globals.css";

let outfit = Outfit({subsets:["latin"]});

export const metadata = {
  title: "Anouar CHELAYFA",
  description: "Portfolio Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${outfit.className}`}
      >
        {children}
      </body>
    </html>
  );
}
