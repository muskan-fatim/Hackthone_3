import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/footer";
import { ClerkProvider } from "@clerk/nextjs";
import ClientProviders from "./components/clientprovider";

export const metadata: Metadata = {
  title: "Mornet",
  description: "Hackathon 3",
  icons: {
    icon: "/favicon.ico",  
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
 
      <body>
        <ClerkProvider
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || ""}
        >

<ClientProviders>{children}</ClientProviders>

              <Footer />
       </ClerkProvider>
      </body>
    </html>
  );
}