const buildConfig = () => {
  const copyright = process.env.NEXT_PUBLIC_BLOG_COPYRIGHT || "Colorblind Filter";
  const defaultTitle =
    process.env.NEXT_DEFAULT_METADATA_DEFAULT_TITLE || "Colorblind Filter";
  const defaultDescription = process.env.NEXT_PUBLIC_BLOG_DESCRIPTION || "Colorblind Filter.";

  return {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    blog: {
      copyright,
      metadata: {
        title: {
          absolute: defaultTitle,
          default: defaultTitle,
          template: `%s - ${defaultTitle}`,
        },
        description: defaultDescription,
        icons: [
          {
            url: "/favicon.svg",
          },
        ],
      },
    },
    ogImageSecret:
      process.env.OG_IMAGE_SECRET ||
      "secret_used_for_signing_and_verifying_the_og_image_url",
  };
};

export const config = buildConfig();
