import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <section className="py-20 bg-linear-to-r from-primary/5 via-secondary/5 to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <div className="inline-block bg-highlight/30 text-accent px-4 py-1.5 rounded-full text-sm font-medium">
            FAQ
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Everything you need to know about tours, bookings, payments, and
            roles on our platform.
          </p>
        </div>

        {/* FAQ Accordion — aligned with other sections */}
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem
            value="item-1"
            className="border border-border rounded-xl px-6 bg-background"
          >
            <AccordionTrigger className="text-lg">
              What is the Local Guide Platform?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base leading-relaxed">
              It’s a travel platform where tourists explore authentic tours,
              guides host experiences, and admins manage operations.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-2"
            className="border border-border rounded-xl px-6 bg-background"
          >
            <AccordionTrigger className="text-lg">
              How do bookings work?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base leading-relaxed">
              Tourists book tours, pay securely, and track status while guides
              manage confirmations.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-3"
            className="border border-border rounded-xl px-6 bg-background"
          >
            <AccordionTrigger className="text-lg">
              Is payment secure?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base leading-relaxed">
              Yes. Payments are processed via trusted providers like Stripe.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-4"
            className="border border-border rounded-xl px-6 bg-background"
          >
            <AccordionTrigger className="text-lg">
              Can I leave reviews?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base leading-relaxed">
              Reviews can be left only after tour completion.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-5"
            className="border border-border rounded-xl px-6 bg-background"
          >
            <AccordionTrigger className="text-lg">
              What roles exist on the platform?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base leading-relaxed">
              Admin, Guide, and Tourist — each with dedicated dashboards.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
