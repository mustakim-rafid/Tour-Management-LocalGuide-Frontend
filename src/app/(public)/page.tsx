export const dynamic = "force-dynamic"; 

import Contact from "@/components/modules/home/Contact";
import CTA from "@/components/modules/home/CTA";
import Hero from "@/components/modules/home/Hero";
import HowItWorks from "@/components/modules/home/HowItWorks";
import Tours from "@/components/modules/home/Tours";
import WhyChooseUs from "@/components/modules/home/WhyChooseUs";
import { getAllTours } from "@/services/tour/tour.service";

export default async function Home() {
  const toursResponse = await getAllTours();

  const tours = toursResponse?.data || [];

  return (
    <>
      <Hero />
      <HowItWorks />
      <Tours toursData={tours} />
      <CTA />
      <WhyChooseUs />
      <Contact />
    </>
  );
}
