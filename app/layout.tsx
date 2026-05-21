import { ClerkProvider } from "@clerk/nextjs";

import { SanityLive } from "@/sanity/lib/live";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="font-poppins antialiased">
          {children}

          <SanityLive />
        </body>
      </html>
    </ClerkProvider>
  );
}