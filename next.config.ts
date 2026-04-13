import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/plc-training-courses",
        destination: "/courses/plc",
        permanent: true,
      },
      {
        source: "/plc-training-courses/",
        destination: "/courses/plc",
        permanent: true,
      },
      {
        source: "/electrician-courses",
        destination: "/courses/electrical",
        permanent: true,
      },
      {
        source: "/electrician-courses/",
        destination: "/courses/electrical",
        permanent: true,
      },
      {
        source: "/online-training-courses",
        destination: "/courses",
        permanent: true,
      },
      {
        source: "/online-training-courses/",
        destination: "/courses",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;