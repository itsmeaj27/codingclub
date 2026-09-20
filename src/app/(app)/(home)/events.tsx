import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

export default async function EventsSection() {
  try {
    const payload = await getPayload({ config: configPromise });
    
    const eventsReq = await payload.find({
      collection: "events",
      limit: 3,
      sort: '-date',
    });
    const events = eventsReq.docs || [];

    if (events.length === 0) return null;

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
            return (
              <div key={event.id} className="group relative bg-card border border-border rounded-2xl overflow-hidden glow-hover transition-all">
                <div className="aspect-video w-full overflow-hidden relative">
                  {event.coverPhoto && typeof event.coverPhoto === 'object' && event.coverPhoto.url && (
                    <Image 
                      src={event.coverPhoto.url} 
                      alt={event.title} 
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-80" />
                  
                  <div className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full border shadow-sm ${
                    event.status === 'upcoming' 
                      ? 'bg-gradient-to-r from-primary to-[#8b5cf6] text-white border-transparent' 
                      : 'bg-muted text-muted-foreground border-border'
                  }`}>
                    {event.status === 'upcoming' ? 'Upcoming' : 'Past'}
                  </div>
                </div>
                <div className="p-6 relative z-10 -mt-6">
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
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-6">
                    {event.shortDescription}
                  </p>
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
