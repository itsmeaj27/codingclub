import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import PageHeader from "@/components/page-header";

export default function ContactSection() {
  return (
    <section className="bg-background min-h-screen">
      <PageHeader
        pagetitle={`Get in touch with us`}
        image1={"/images/icons/mail.png"}
        image2={"/images/icons/contact.png"}
        pagedescription={`We'd love to hear from you. Fill out the form below or drop us an email.`}
      />
      <div className="mx-auto max-w-4xl px-4 lg:px-0 pb-16 mt-8">
        <div className="grid border border-border rounded-2xl overflow-hidden md:grid-cols-2 md:gap-px bg-border glass-card">
          <div className="flex flex-col justify-between space-y-8 p-8 sm:p-12 bg-card">
            <div>
              <h2 className="mb-3 text-xl font-semibold text-foreground font-handjet tracking-wider">General Inquiry</h2>
              <p className="text-muted-foreground text-sm mb-4">For any questions about the club, events, or membership.</p>
              <a
                href="mailto:contact@codingclubcuh.in"
                className="text-primary hover:text-accent transition-colors font-medium hover:underline block"
              >
                contact@codingclubcuh.in
              </a>
            </div>
          </div>
          <div className="flex flex-col justify-between space-y-8 p-8 sm:p-12 bg-muted/30">
            <div>
              <h2 className="mb-3 text-xl font-semibold text-foreground font-handjet tracking-wider">Admin / Tech Support</h2>
              <p className="text-muted-foreground text-sm mb-4">For website issues or CMS administration.</p>
              <a
                href="mailto:admin@codingclubcuh.in"
                className="text-primary hover:text-accent transition-colors font-medium hover:underline block"
              >
                admin@codingclubcuh.in
              </a>
            </div>
          </div>
        </div>

        <div className="h-8 mx-auto w-px bg-gradient-to-b from-border to-transparent"></div>
        <form action="" className="mt-8">
          <Card className="mx-auto max-w-2xl p-8 sm:p-12 bg-card glass-card border-border shadow-xl rounded-2xl overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent" />
            <h3 className="text-2xl font-semibold text-foreground font-handjet tracking-wider mb-2">Send us a message</h3>
            <p className="text-muted-foreground text-sm mb-8">Fill out the form below and we&apos;ll get back to you soon.</p>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">Full name</Label>
                  <Input type="text" id="name" placeholder="John Doe" required className="focus:ring-primary/50 focus:border-primary bg-background border-border" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Email</Label>
                  <Input type="email" id="email" placeholder="john@example.com" required className="focus:ring-primary/50 focus:border-primary bg-background border-border" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-foreground">Subject</Label>
                <Input type="text" id="subject" placeholder="How can we help?" required className="focus:ring-primary/50 focus:border-primary bg-background border-border" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="msg" className="text-foreground">Message</Label>
                <Textarea id="msg" rows={5} placeholder="Your message here..." required className="focus:ring-primary/50 focus:border-primary bg-background border-border resize-none" />
              </div>
              <Button className="w-full bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 transition-opacity border-0">
                Send Message
              </Button>
            </div>
          </Card>
        </form>
      </div>
    </section>
  );
}
