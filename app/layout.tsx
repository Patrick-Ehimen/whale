import type { Metadata } from "next";
import { inter, poppins } from "@/fonts/font";
import "./globals.css";

import { ThemeProvider } from "@/providers/theme-provider";

export const metadata: Metadata = {
  title: "Whale - A web3 data aggregator dapp.",
  description:
    "Whale is a Decentralized Application (DApp) that enables users to aggregate web3 data in a user friendly & modern UI",
  keywords: "web3, dapp, portfolio, radar, aggregator, data, decentralized",
  openGraph: {
    url: "/",
    title: "Whale - A web3 data aggregator dapp.",
    description:
      "Whale is a Decentralized Application (DApp) that enables users to aggregate web3 data in a user friendly & modern UI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image", // TODO image to be added later
    title: "Whale - A web3 data aggregator dapp.",
    description:
      "A stunning and functional retractable sidebar for Next.js built on top of shadcn/ui complete with desktop and mobile responsiveness.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${poppins.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
