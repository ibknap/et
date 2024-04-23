const domain = "https://www.exclusivetravel.com/";
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
