import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://malikakarsh.com"),
  title: {
    default: "Akarsh Malik - Software Engineer | GPU Kernels & LLM Inference",
    template: "%s | Akarsh Malik",
  },
  description:
    "Software engineer exploring GPU kernels, LLM inference, and systems performance. Two years at AB InBev, MS Computer Science at NYU, and LeetCode Knight with a peak rating of 1963.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Akarsh Malik - Software Engineer",
    description:
      "GPU kernels, LLM inference, and systems. Projects, experience, and technical notes.",
    url: "/",
    siteName: "Akarsh Malik",
    type: "website",
    images: [
      {
        url: "/social-card.png",
        width: 1200,
        height: 630,
        alt: "Akarsh Malik - GPU Kernels, LLM Inference, Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Akarsh Malik - Software Engineer",
    description: "GPU kernels, LLM inference, and systems engineering.",
    images: ["/social-card.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
