export const dynamic = "force-dynamic";

import FAQ from "@/components/modules/home/FAQ";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Local Guide – FAQ",
};

const FAQPage = () => {
  return (
    <div>
      <FAQ />
    </div>
  );
};

export default FAQPage;
