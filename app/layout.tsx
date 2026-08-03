import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};
import { LenisProvider } from "@/components/providers/LenisProvider";
import { CustomCursor } from "@/components/providers/CustomCursor";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.priyankasevent.com"),
  title: {
    default: "Top Event Management & Organization in Bangladesh | Priyanka's Event",
    template: "%s | Priyanka's Event",
  },
  description:
    "Leading event organization and management in Bangladesh. With 19+ years of excellence in Dhaka, Priyanka's Event specializes in premium exhibitions, corporate events, and trade shows.",
  keywords: [
    "event management bangladesh",
    "event organization bangladesh",
    "top event organizers in dhaka",
    "corporate event management bangladesh",
    "exhibition organizers dhaka",
    "exhibition management dhaka",
    "trade show dhaka",
    "expo management",
    "priyankas event",
    "business exhibition bangladesh",
    "stall booking dhaka",
    "mela",
    "mela in dhaka",
    "happening place in dhaka",
    "fair",
    "night market",
    "carnival",
    "eid fair",
    "eid mela",
    "mehendi event",
    "bigger mela in dhaka",
    "biggest fair in dhaka"
  ],
  openGraph: {
    title: "Top Event Management & Organization in Bangladesh | Priyanka's Event",
    description:
      "Leading event organization and management in Bangladesh. We create the hype and manage premium exhibitions across Dhaka.",
    type: "website",
    locale: "en_BD",
    url: "https://www.priyankasevent.com",
    siteName: "Priyanka's Event",
  },
  twitter: {
    card: "summary_large_image",
    title: "Top Event Management in Bangladesh | Priyanka's Event",
    description: "Leading event organization and management in Bangladesh. We manage premium exhibitions across Dhaka.",
  },
  alternates: {
    canonical: "/",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-body antialiased">
        <LenisProvider>
          <CustomCursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
