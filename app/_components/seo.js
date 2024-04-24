export const pageURL = "https://exclusivetravel.vercel.app/";

export const pageTitle =
  "Exclusive Travel - Lives your dream vacation with exclusive travel";

export const pageDesc =
  "Exclusive Travel - Live your dream vacation with exclusive travel. Discover luxury destinations and personalized experiences in North Cyprus (KKTC). Book now!";

export const pageKeywords = [
  "exclusive travel",
  "dream vacation",
  "luxury destinations",
  "personalized experiences",
  "book now",
  "cyprus",
  "kktc",
  "north ",
];

// page default data
export const getWSSchema = (url) => {
  return {
    "@context": "http://schema.org",
    "@type": "WebSite",
    url: url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${url}search/result/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
};

// web page schema
export const getWPSchema = (name, description, url, breadcrumb = []) => {
  return {
    "@context": "http://schema.org",
    "@type": "WebPage",
    name: name,
    description: description,
    url: url,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumb,
    },
  };
};

// local business schema
export const getLBSchema = (
  name,
  address,
  telephone,
  email,
  url,
  image,
  paymentAccepted,
  currenciesAccepted,
  openingHours,
  geo
) => {
  return {
    "@context": "http://schema.org",
    "@type": "LocalBusiness",
    name: name,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      addressRegion: address.addressRegion,
      postalCode: address.postalCode,
      addressCountry: address.addressCountry,
    },
    telephone: telephone,
    email: email,
    url: url,
    image: image,
    paymentAccepted: paymentAccepted,
    currenciesAccepted: currenciesAccepted,
    openingHours: openingHours,
    geo: {
      "@type": "GeoCoordinates",
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
  };
};
