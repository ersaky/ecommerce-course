import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import Provider from "@/providers/session";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "eTicaret",
  description: "eTicaret - Online Alışveriş Platformu",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <div className="min-h-screen flex flex-col">
            <Header />
            {children}
            <Footer />
          </div>
        </Provider>
      </body>
    </html>
  );
}
