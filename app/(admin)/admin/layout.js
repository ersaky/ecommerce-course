import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";

import Provider from "@/providers/session";
import SideBar from "../components/sidebar";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Admin Dashboard | eTicaret ",
  description: "eTicaret - Online Alışveriş Platformu",
};

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <div className="min-h-screen bg-gray-50">
            <SideBar />
            <div className="pl-32">
              <main className="py-6">
                <div className="mx-auto max-w-7xl px-8">{children}</div>
              </main>
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
