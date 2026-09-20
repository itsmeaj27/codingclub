import Image from "next/image";
import { Timeline } from "@/components/ui/timeline";
import PageHeader from "@/components/page-header";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import Link from "next/link";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function EventsPage() {
  const payload = await getPayload({ config: configPromise });

  const eventsReq = await payload.find({
    collection: "events",
    limit: 50,
    sort: "-date",
  });
  const events = eventsReq.docs || [];

  const timelineData = events.map((event) => {
    const date = new Date(event.date);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const coverUrl =
      event.coverPhoto && typeof event.coverPhoto === "object" && event.coverPhoto.url
        ? event.coverPhoto.url
        : null;

    return {
      title: event.title,
      content: (
        <div key={event.id} className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
              <Calendar className="w-4 h-4 text-primary" />
              {formattedDate}
            </span>
            {event.location && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-accent" />
                {event.location}
              </span>
            )}
            <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full uppercase tracking-wider border ${
              event.status === "upcoming" 
                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" 
                : "bg-muted text-muted-foreground border-border"
            }`}>
              {event.status}
            </span>
          </div>

          <p className="text-foreground text-sm md:text-base leading-relaxed">
            {event.shortDescription}
          </p>

          {coverUrl && (
            <div className="relative aspect-video w-full max-w-lg rounded-xl overflow-hidden shadow-sm border border-border">
              <Image
                src={coverUrl}
                alt={event.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {event.registrationLink && event.status === "upcoming" && (
            <div className="pt-2">
              <Button asChild size="sm" className="rounded-full bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 transition-opacity">
                <Link href={event.registrationLink} target="_blank">
                  Register Now <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      ),
    };
  });

  return (
    <div className="w-full min-h-screen pb-16 bg-background">
      <PageHeader
        pagetitle={`Coding Club Events`}
        image1={"/images/icons/calendar.png"}
        image2={"/images/icons/time.png"}
        pagedescription={`Bringing Coders Together to Learn, Build, and Grow.`}
      />
      {timelineData.length === 0 ? (
        <div className="mx-auto max-w-3xl px-6 py-20 text-center text-muted-foreground">
          <p className="text-xl font-medium text-foreground">No events published yet.</p>
          <p className="text-sm mt-2">
            Admins can add workshops, hackathons, and seminars directly from the Payload CMS admin panel.
          </p>
        </div>
      ) : (
        <Timeline data={timelineData} />
      )}
    </div>
  );
}
