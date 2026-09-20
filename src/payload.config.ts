import path from "path";
import { fileURLToPath } from "url";

import sharp from "sharp";

import { buildConfig, PayloadRequest } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";

import { Media } from "./payload/collections/Media";
import { Pages } from "./payload/collections/Pages";
import { Posts } from "./payload/collections/Posts";
import { Users } from "./payload/collections/Users";
import { Categories } from "./payload/collections/Categories";
import { Events } from "./payload/collections/Events";
import { Teams } from "./payload/collections/Teams";
import { Projects } from "./payload/collections/Projects";
import { Gallery } from "./payload/collections/Gallery";
import { Achievements } from "./payload/collections/Achievements";

import { defaultLexical } from "./payload/fields/defaultLexical";
import { getServerSideURL } from "./payload/utilities/getURL";
import { plugins } from "./payload/plugins";
import { Header } from "./payload/Header/config";
import { Footer } from "./payload/Footer/config";
import { Courses } from "./payload/collections/Courses";
import { Certificates } from "./payload/collections/Certificates";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const getDatabaseURI = (): string => {
  let uri =
    process.env.DATABASE_URI ||
    "postgresql://postgres.awtneocokxlaunyxajzr:Codingclubcuh%4022@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres";

  // If using Supabase connection pooler on session port 5432, automatically switch to transaction pooler port 6543
  if (uri.includes(".pooler.supabase.com:5432")) {
    uri = uri.replace(".pooler.supabase.com:5432", ".pooler.supabase.com:6543");
  }
  return uri;
};

export default buildConfig({
  admin: {
    theme: "dark",
    meta: {
      title: "Coding Club CUH - Admin Portal",
      description:
        "coding club is evolving to be more than just the a coding club. It supports an entire ecosystem — from practical learning to innovate.",
      icons: [
        {
          rel: "icon",
          type: "image/png",
          url: "/favicon.ico",
        },
        {
          rel: "apple-touch-icon",
          type: "image/png",
          url: "/apple-touch-icon.png",
        },
      ],
      openGraph: {
        description:
          "coding club is evolving to be more than just the a coding club. It supports an entire ecosystem — from practical learning to innovate.",
        title: "Coding Club Cuh - for students by students",
      },
      titleSuffix: "- for students by students",
    },
    components: {
      actions: ["@/components/payload-admin/Actions/Action"],
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeLogin: ["@/components/payload-admin/BeforeLogin"],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeDashboard: ["@/components/payload-admin/BeforeDashboard"],

      graphics: {
        Icon: "@/components/payload-admin/GraphicsIcon",
        Logo: "@/components/payload-admin/GraphicsLogo",
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: "Mobile",
          name: "mobile",
          width: 375,
          height: 667,
        },
        {
          label: "Tablet",
          name: "tablet",
          width: 768,
          height: 1024,
        },
        {
          label: "Desktop",
          name: "desktop",
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: getDatabaseURI(),
      max: process.env.NODE_ENV === "production" ? 4 : 10,
      idleTimeoutMillis: 10000,
      connectionTimeoutMillis: 10000,
    },
    push: false,
  }),
  collections: [
    Courses,
    Pages,
    Posts,
    Media,
    Categories,
    Users,
    Events,
    Teams,
    Projects,
    Gallery,
    Achievements,
    Certificates,
  ],
  cors: [
    getServerSideURL(),
    "https://codingclubcuh.online",
    "https://www.codingclubcuh.online",
    "https://cuhcodingclub.netlify.app",
    "http://localhost:3000",
    "http://localhost:3001",
    process.env.NEXT_PUBLIC_SERVER_URL || "",
  ].filter(Boolean),
  csrf: [
    getServerSideURL(),
    "https://codingclubcuh.online",
    "https://www.codingclubcuh.online",
    "https://cuhcodingclub.netlify.app",
    "http://localhost:3000",
    "http://localhost:3001",
    process.env.NEXT_PUBLIC_SERVER_URL || "",
  ].filter(Boolean),
  globals: [Header, Footer],
  plugins: [...plugins],
  secret:
    process.env.PAYLOAD_SECRET || "development-secret-key-for-local-testing",
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true;

        // If there is no logged in user, then check
        // for the Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get("authorization");
        return authHeader === `Bearer ${process.env.CRON_SECRET}`;
      },
    },
    tasks: [],
  },
  onInit: async (payload) => {
    try {
      const existingTeams = await payload.find({
        collection: "teams",
        limit: 1,
      });

      if (existingTeams.totalDocs === 0) {
        payload.logger.info(
          "Seeding default Core Committee & Technical Team members into CMS...",
        );
        const initialMembers = [
          {
            name: "Prof. Tankeshwar Kumar",
            position: "Chief Patron & Vice Chancellor",
            category: "faculty" as const,
            courseYear: "Central University of Haryana",
            order: 1,
            photoUrl:
              "https://res.cloudinary.com/azzisskq/image/upload/v1789927151/codingclub/teams/coordinators/vice_chancellor.jpg",
            linkedin:
              "https://www.linkedin.com/in/vice-chancellor-tankeshwar-kumar-74a788298",
          },
          {
            name: "Dr. Sunil Kumar",
            position: "Faculty Coordinator",
            category: "faculty" as const,
            courseYear: "Department of Computer Science & Engineering",
            order: 2,
            photoUrl:
              "https://res.cloudinary.com/azzisskq/image/upload/v1789927151/codingclub/teams/coordinators/dr_sunil_kumar.jpg",
            linkedin: "https://www.linkedin.com/in/coding-club-cuh-0a6668326/",
          },
          {
            name: "Coding Club Core Committee",
            position: "Core Lead & Organizing Committee",
            category: "core" as const,
            courseYear:
              "Department of Computer Science & Information Technology",
            order: 1,
            photoUrl:
              "https://res.cloudinary.com/azzisskq/image/upload/v1789927153/codingclub/teams/members/cuh_team_2026.jpg",
            github: "https://github.com/itsmeaj27/codingclub",
            linkedin:
              "https://www.linkedin.com/school/central-university-of-haryana/",
          },
          {
            name: "Technical & Event Coordinators",
            position: "Workshop & Hackathon Leads",
            category: "technical" as const,
            courseYear: "Department of CS & IT, CUH",
            order: 2,
            photoUrl:
              "https://res.cloudinary.com/azzisskq/image/upload/v1789927155/codingclub/gallery/2026/club_group_photo.jpg",
            github: "https://github.com/itsmeaj27/codingclub",
          },
        ];

        for (const member of initialMembers) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await (payload as any).create({
            collection: "teams",
            data: member,
          });
        }
        payload.logger.info(
          "Core Committee and Technical Team members seeded successfully.",
        );
      }
    } catch (err) {
      payload.logger.error(`Error initializing default team members: ${err}`);
    }
  },
});
