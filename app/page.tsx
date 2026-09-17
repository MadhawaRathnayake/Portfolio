import Hero from "@/components/sections/Hero";
import Capabilities from "@/components/sections/Capabilities";
import WorkIndex from "@/components/sections/WorkIndex";
import Experience from "@/components/sections/Experience";
import Quote from "@/components/sections/Quote";
import ClosingCTA from "@/components/sections/ClosingCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Capabilities />
      <WorkIndex />
      <Experience />
      <Quote />
      <ClosingCTA />
    </>
  );
}
