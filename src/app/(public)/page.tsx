export const dynamic = "force-dynamic"; 

import CTA from "@/components/modules/home/CTA";
import FAQ from "@/components/modules/home/FAQ";
import Hero from "@/components/modules/home/Hero";
import HowItWorks from "@/components/modules/home/HowItWorks";
import Tours from "@/components/modules/home/Tours";
import WhyChooseUs from "@/components/modules/home/WhyChooseUs";
import { Separator } from "@/components/ui/separator";
import { getAllTours } from "@/services/tour/tour.service";

export default async function Home() {
  const toursResponse = await getAllTours();

  const tours = toursResponse?.data || [];

  return (
    <>
      <Hero />
      <Separator />
      <HowItWorks />
      <Separator />
      <Tours toursData={tours} />
      <CTA />
      <WhyChooseUs />
      <Separator />
      <FAQ />
    </>
  );
}
