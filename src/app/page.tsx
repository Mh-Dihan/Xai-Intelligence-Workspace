import Nav from "@/components/layout/Nav";
import Hero from "@/components/hero/Hero";
import InsightFlow from "@/components/insight-flow/InsightFlow";
import DashboardPreview from "@/components/dashboard/DashboardPreview";
import Signature from "@/components/signature/Signature";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <InsightFlow />
      <DashboardPreview />
      <Signature />
      <Footer />
    </main>
  );
}
