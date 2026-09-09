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
      new URL('http://localhost:3000/api/media/file/**'),
      new URL('http://localhost:3001/api/media/file/**'),
      new URL('https://codingclubcuh.online/api/media/file/**'),
      new URL('https://www.codingclubcuh.online/api/media/file/**'),
      new URL('https://cuhcodingclub.netlify.app/api/media/file/**'),
      new URL('http://localhost:3000/og-image/**'),
      new URL('http://localhost:3001/og-image/**'),
      new URL('https://codingclubcuh.online/og-image/**'),
      new URL('https://www.codingclubcuh.online/og-image/**'),
      new URL('https://cuhcodingclub.netlify.app/og-image/**'),

    ],
  },
};

export default withPayload(nextConfig);
