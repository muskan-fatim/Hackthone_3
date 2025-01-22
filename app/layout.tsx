import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { NotificationProvider } from "./context/NotificationContext";
import { SpeedInsights } from "@vercel/speed-insights/next"
export const metadata: Metadata = {
  title: "Hackthone",
  description: "hackthone 3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
          <NotificationProvider>
            {children}
          </NotificationProvider>
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  );
}
