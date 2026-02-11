"use client"
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import AboutUs from "../components/AboutUs.jsx";
import WhatWeDo from "../components/WhatWeDo.jsx";
import Footer from "../components/Footer.jsx";
import VideoPreloader from "../components/VideoPreloader.jsx";

export default function Home() {
  return (
    <>
      <VideoPreloader />
      <Navbar />
      <Hero />
      <AboutUs />
      <WhatWeDo />
      <Footer />
    </>
  );
}
