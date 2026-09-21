import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { getEffectiveEventStatus, sortEvents } from "@/payload/utilities/eventStatus";

export default async function EventsSection() {
  try {
    const payload = await getPayload({ config: configPromise });
    
    const eventsReq = await payload.find({
      collection: "events",
      limit: 10,
      sort: '-date',
    });
    const cmsEvents = eventsReq.docs || [];

    const fallbackEvents = [
      {
        id: 'c_python_class',
        title: 'C & Python Programming Masterclass',
        date: '2026-04-05T10:00:00.000Z',
        location: 'Lab 3, Dept of CSE, CUH',
        shortDescription: 'Comprehensive hands-on coding session covering foundational concepts in C and problem solving with Python.',
        status: 'completed',
        coverPhoto: {
          url: 'https://res.cloudinary.com/azzisskq/image/upload/v1789927154/codingclub/events/coding-class/c_python_masterclass.jpg',
        },
      },
      {
        id: 'fullstack_web_dev',
        title: 'Full-Stack Web Development Workshop',
        date: '2026-04-18T14:00:00.000Z',
        location: 'Seminar Hall, Academic Block 1, CUH',
        shortDescription: 'Learn modern web engineering with Next.js, Tailwind CSS, and APIs from student mentors.',
        status: 'completed',
        coverPhoto: {
          url: 'https://res.cloudinary.com/azzisskq/image/upload/v1789927154/codingclub/events/workshops/fullstack_web_dev.jpg',
        },
      },
      {
        id: 'annual_hackathon',
        title: 'CUH Hackathon & Code Sprint',
        date: '2026-05-12T09:00:00.000Z',
        location: 'Central University of Haryana',
        shortDescription: 'Campus-wide hackathon where students build innovative software solutions and win awards.',
        status: 'completed',
        coverPhoto: {
          url: 'https://res.cloudinary.com/azzisskq/image/upload/v1789927159/codingclub/gallery/2026/hackathon_session_1.jpg',
        },
      },
    ];

    // Prioritize upcoming and ongoing events first, then pick the top 3
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawEvents: any[] = cmsEvents.length > 0 ? cmsEvents : fallbackEvents;
    const events = sortEvents(rawEvents).slice(0, 3);

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-6">
          <SectionHeading 
            title="Events & Workshops" 
            subtitle="Join our upcoming sessions and learn with peers." 
            badge="Events" 
            align="left" 
          />
          <Button asChild variant="outline" className="hidden sm:flex rounded-full">
            <Link href="/events">
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          {events.map((event) => {
            const date = new Date(event.date);
            const effectiveStatus = getEffectiveEventStatus(event);

            let coverUrl: string | null = null;
            if (event.coverPhoto && typeof event.coverPhoto === 'object' && event.coverPhoto.url) {
              coverUrl = event.coverPhoto.url;
            } else if (typeof event.coverPhoto === 'string') {
              coverUrl = event.coverPhoto;
            } else if (event.coverPhotoUrl) {
              coverUrl = event.coverPhotoUrl;
            }

            // Fallback for invalid local api URLs that don't exist on disk
            if (!coverUrl || (coverUrl.startsWith('/api/media/file/') && !coverUrl.includes('res.cloudinary.com'))) {
              coverUrl = 'https://res.cloudinary.com/azzisskq/image/upload/v1789927159/codingclub/gallery/2026/hackathon_session_1.jpg';
            }

            return (
              <div key={event.id} className="group relative bg-card border border-border rounded-2xl overflow-hidden glow-hover transition-all flex flex-col">
                <div className="aspect-video w-full overflow-hidden relative">
                  {coverUrl && (
                    <Image 
                      src={coverUrl} 
                      alt={event.title} 
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-80" />
                  
                  <div className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full border shadow-sm ${
                    effectiveStatus === 'upcoming' 
                      ? 'bg-gradient-to-r from-primary to-[#8b5cf6] text-white border-transparent' 
                      : effectiveStatus === 'ongoing'
                      ? 'bg-amber-500/10 text-amber-500 border-amber-500/20 animate-pulse'
                      : 'bg-muted text-muted-foreground border-border'
                  }`}>
                    {effectiveStatus === 'upcoming' ? 'Upcoming' : effectiveStatus === 'ongoing' ? 'Ongoing' : 'Completed'}
                  </div>
                </div>
                <div className="p-6 relative z-10 -mt-6 flex flex-col flex-1">
                  <h3 className="font-semibold text-xl mb-2 line-clamp-1 text-foreground">{event.title}</h3>
                  <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-6 flex-1">
                    {event.shortDescription}
                  </p>
                  <div className="pt-2 border-t border-border">
                    <Button asChild variant="ghost" size="sm" className="w-full text-xs text-primary hover:text-primary/80">
                      <Link href="/events">
                        Learn More →
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <Button asChild variant="outline" className="w-full mt-8 sm:hidden rounded-full">
          <Link href="/events">
            View All Events
          </Link>
        </Button>
      </div>
    </section>
  );
  } catch (e) {
    console.error("Error loading events section:", e);
    return null;
  }
}
