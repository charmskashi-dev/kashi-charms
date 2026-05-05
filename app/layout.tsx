import { ClerkProvider } from "@clerk/nextjs";

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
        </body>
      </html>
    </ClerkProvider>
  );
}