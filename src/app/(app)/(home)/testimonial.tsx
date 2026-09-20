import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { SectionHeading } from '@/components/ui/section-heading'
import { Quote } from 'lucide-react'

type Testimonial = {
    name: string
    role: string
    image: string
    quote: string
}

const testimonials: Testimonial[] = [
  // TODO: Add real student testimonials or fetch from Payload CMS
]

const chunkArray = (array: Testimonial[], chunkSize: number): Testimonial[][] => {
    if (array.length === 0) return [];
    const result: Testimonial[][] = []
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize))
    }
    return result
}

const testimonialChunks = chunkArray(testimonials, Math.max(1, Math.ceil(testimonials.length / 3)))

export default function WallOfLoveSection() {
    if (testimonials.length === 0) return null; // Hide section until real testimonials are added

    return (
        <section className="py-16 md:py-24">
            <div className="mx-auto max-w-6xl px-6">
                <SectionHeading
                    title="Loved by the Community"
                    subtitle="Hear what our students and alumni have to say about the Coding Club CUH."
                    badge="Testimonials"
                />
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {testimonialChunks.map((chunk, chunkIndex) => (
                        <div key={chunkIndex} className="space-y-4">
                            {chunk.map(({ name, role, quote, image }, index) => (
                                <Card key={index} className="bg-card border-border glow-hover transition-all">
                                    <CardContent className="p-6">
                                        <Quote className="w-8 h-8 text-primary/20 mb-4" />
                                        <blockquote className="mb-6">
                                            <p className="text-foreground leading-relaxed">{quote}</p>
                                        </blockquote>
                                        <div className="flex items-center gap-3 pt-4 border-t border-border">
                                            <Avatar className="size-10 ring-2 ring-primary/10">
                                                <AvatarImage alt={name} src={image} loading="lazy" width="120" height="120" />
                                                <AvatarFallback className="bg-primary/10 text-primary">CUH</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="font-semibold text-sm">{name}</h3>
                                                <span className="text-muted-foreground text-xs">{role}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
