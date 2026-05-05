import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Kashi Charms",
  description: "At Kashi Charms, jewellery is more than an accessory — it is a reflection of who you are. Designed with intention and inspired by timeless beauty, our collections help you shine in your own unique way.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          </div>
    </ClerkProvider>
  );
};

