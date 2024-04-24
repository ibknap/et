import "bootstrap/dist/css/bootstrap.css";
import { Inter } from "next/font/google";
import "@/app/_components/styles/globals.css";
import BootstrapClient from "@/app/_components/bootstrap_client";
import {
  getLBSchema,
  getWPSchema,
  getWSSchema,
  pageDesc,
  pageKeywords,
  pageTitle,
  pageURL,
} from "@/app/_components/seo";

const inter = Inter({ subsets: ["latin"] });

// metadata
export const metadata = {
  title: pageTitle,
  description: pageDesc,
  keywords: pageKeywords,
  openGraph: {
    title: pageTitle,
    description: pageDesc,
    type: "website",
    images: "/logos/logo_dark.png",
    url: pageURL,
  },
  twitterCard: {
    title: pageTitle,
    description: pageDesc,
    images: "/logos/logo_dark.png",
    url: pageURL,
  },
  metadataBase: new URL(pageURL),
  manifest: "/logos/site.webmanifest",
  icons: {
    icon: ["/logos/favicon.ico"],
    apple: ["/logos/favicon.png"],
    shortcut: ["/logos/favicon.png"],
  },
};

// web site schema
const wSSchema = getWSSchema(pageURL);

// web page schema
const wPSchema = getWPSchema(pageTitle, pageDesc, pageURL, [
  {
    "@type": "ListItem",
    position: 1,
    name: pageTitle,
    item: pageURL,
  },
]);

// local business schema
const lBSchema = getLBSchema(
  pageTitle,
  {
    streetAddress: "Dereboyu Street. Ozankoy No 11 Kyrenia, 9511",
    addressLocality: "KKTC",
    addressRegion: "Lefkoşa",
    postalCode: "99300",
    addressCountry: "Turkey",
  },
  "+2347069138882",
  "musamuazu592@gmail.com",
  pageURL,
  `${pageURL}logos/logo_dark.png`,
  "Cash, Credit Card, Transfer",
  "LIRA, USD, EURO",
  "Mo-Fr 09:00-17:00",
  {
    latitude: "35.322432",
    longitude: "33.306281",
  }
);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta property="og:image:width" content="1277" />
        <meta property="og:image:height" content="473" />
        <meta property="og:site_name" content={pageTitle} />
        <meta name="theme-color" content="#2873BA" />
        <meta name="author" content={pageTitle} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(wSSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(wPSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(lBSchema) }}
        />
      </head>

      <body className={inter.className}>
        {children}
        <BootstrapClient />
      </body>
    </html>
  );
}
