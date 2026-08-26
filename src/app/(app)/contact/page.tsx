import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import PageHeader from "@/components/page-header";

export default function ContactSection() {
  return (
    <section className="">
      <PageHeader
        pagetitle={`Get in touch with us`}
        image1={"/images/icons/mail.png"}
        image2={"/images/icons/contact.png"}
        pagedescription={`We'd love to hear from you. Fill out the form below or drop us an email.`}
      />
      <div className="mx-auto max-w-4xl px-4 lg:px-0 pb-12">
        <div className="grid divide-y border md:grid-cols-2 md:gap-4 md:divide-x md:divide-y-0">
          <div className="flex flex-col justify-between space-y-8 p-6 sm:p-12">
            <div>
              <h2 className="mb-3 text-lg font-semibold">General Inquiry</h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-2">For any questions about the club, events, or membership.</p>
              <a
                href="mailto:contact@codingclubcuh.in"
                className="text-blue-600 hover:underline block"
              >
                contact@codingclubcuh.in
              </a>
            </div>
          </div>
          <div className="flex flex-col justify-between space-y-8 p-6 sm:p-12 bg-zinc-50 dark:bg-zinc-900/50">
            <div>
              <h2 className="mb-3 text-lg font-semibold">Admin / Tech Support</h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-2">For website issues or CMS administration.</p>
              <a
                href="mailto:admin@codingclubcuh.in"
                className="text-blue-600 hover:underline block"
              >
                admin@codingclubcuh.in
              </a>
            </div>
          </div>
        </div>

        <div className="h-3 border-x bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_6px)]"></div>
        <form action="" className="border px-4 py-12 lg:px-0 lg:py-24">
          <Card className="mx-auto max-w-lg p-8 sm:p-16">
            <h3 className="text-xl font-semibold">Send us a message</h3>
            
            <div className="mt-8 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input type="text" id="name" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="john@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input type="text" id="subject" placeholder="How can we help?" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="msg">Message</Label>
                <Textarea id="msg" rows={4} placeholder="Your message here..." required />
              </div>
              <Button className="w-full">Send Message</Button>
            </div>
          </Card>
        </form>
      </div>
    </section>
  );
}
