import Navbar from "@/sections/Navbar";
import Hero from "@/sections/Hero";
import Experience from "@/sections/Experience";
import MenuSection from "@/sections/MenuSection";
import HappyHour from "@/sections/HappyHour";
import About from "@/sections/About";
import Gallery from "@/sections/Gallery";
import Reserve from "@/sections/Reserve";
import Footer from "@/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <MenuSection />
        <HappyHour />
        <About />
        <Gallery />
        <Reserve />
      </main>
      <Footer />
    </>
  );
}
