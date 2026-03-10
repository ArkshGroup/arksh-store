import "./globals.css";
import { Metadata } from "next";
import "/public/assets/css/custom.css";
import { Poppins } from "next/font/google";
import { Providers } from "@/redux/provider";

export const metadata: Metadata = {
  title: "Arksh Store Admin",
};

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="description" content="Arksh Store Admin" />
        <meta name="robots" content="noindex, follow" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="/adminfavicon.ico" />
      </head>
      <body className={poppins.className} suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
