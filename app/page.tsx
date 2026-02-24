import EmployeesSection from "@/app/landingpage/EmployeesSection";
import HeroSection from "@/app/landingpage/HeroSection";
import Navbar from "@/app/components/Navbar/Navbar";
import WorkFlowsSection from "@/app/landingpage/WorkFlows";
import StatsSection from "@/app/landingpage/StatsSection";
import Footer from "@/app/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <HeroSection />
      <WorkFlowsSection />
      <EmployeesSection />
      <StatsSection />
      <Footer />
    </>
  );
}
