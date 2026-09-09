import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-handjet tracking-wider">Events & Workshops</h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">Join our upcoming sessions and learn with peers.</p>
          </div>
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
              <div key={event.id} className="group relative bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:shadow-lg transition-all">
                <div className="aspect-video w-full bg-zinc-100 overflow-hidden relative">
                  {event.coverPhoto && typeof event.coverPhoto === 'object' && event.coverPhoto.url && (
                    <Image 
                      src={event.coverPhoto.url} 
                      alt={event.title} 
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold rounded-full border border-zinc-200 dark:border-zinc-800">
                    {event.status === 'upcoming' ? 'Upcoming' : 'Past'}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-2 line-clamp-1">{event.title}</h3>
                  <div className="flex flex-col gap-2 text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-300 text-sm line-clamp-2 mb-6">
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
