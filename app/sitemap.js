const domain = "https://www.exclusivetravel.com/";

const sitemap = () => [
  {
    url: `${domain}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "yearly",
    priority: 1,
  },
  {
    url: `${domain}auth/signin`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${domain}auth/signup`,

    lastModified: new Date().toISOString(),
    changeFrequency: "yearly",
    priority: 1,
  },
  {
    url: `${domain}about`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${domain}policy`,
    lastModified: new Date().toISOString(),
    changeFrequency: "yearly",
    priority: 1,
  },
  {
    url: `${domain}terms`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
];

export default sitemap;
