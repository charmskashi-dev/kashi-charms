import { ClerkProvider } from "@clerk/nextjs";
import Script from "next/script";

import { SanityLive } from "@/sanity/lib/live";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-MNQZ59GNFS"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-MNQZ59GNFS');
            `}
          </Script>
        </head>
        <body className="font-poppins antialiased">
          {children}

          <SanityLive />
        </body>
      </html>
    </ClerkProvider>
  );
}