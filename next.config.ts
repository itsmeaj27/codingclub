import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL("https://randomuser.me/api/portraits/**"),
      new URL("https://alt.tailus.io/images/team/**"),
      new URL("https://res.cloudinary.com/**"),
      new URL("https://assets.aceternity.com/templates/**"),
      new URL("https://assets.aceternity.com/**"),
      new URL('http://localhost:3001/api/media/file/**'),
      new URL('https://cuhcodingclub.vercel.app/api/media/file/**'),
      new URL('http://localhost:3001/og-image/**'),
      new URL('https://cuhcodingclub.vercel.app/og-image/**'),

    ],
  },
};

export default withPayload(nextConfig);
