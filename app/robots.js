const domain = "https://exclusivetravel.vercel.app/";
const allowCraw = { allow: "/" };

const robots = () => {
  return {
    rules: {
      userAgent: "*",
      ...allowCraw,
    },
    sitemap: `${domain}sitemap.xml`,
  };
};

export default robots;
