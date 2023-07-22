import About from "@/components/landing-page/about-section/About";
import HeroSection from "@/components/landing-page/hero-section/HeroSection";
import HowItWorks from "@/components/landing-page/how-it-works/HowItWorks";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import BenefitsSection from "@/components/landing-page/benefits-section/BenefitsSection";
import { useAppDispatch } from "@/store/hooks";
import { setActiveRoute } from "@/store/navigation/navigation";
import withLayout from "@/components/common/withLayout";

export const Home = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let currentSection = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const scrollPosition = window.pageYOffset;

        if (
          scrollPosition >= sectionTop - 300 &&
          scrollPosition < sectionTop + sectionHeight + 50
        ) {
          currentSection = section.getAttribute("id") || "";
        }
      });

      dispatch(setActiveRoute("#" + currentSection));
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <Head>
        <title>RideShare</title>
      </Head>
      <div className="max-w-7xl mx-auto space-y-10">
        <HeroSection />
        <HowItWorks />
        <About />
        <BenefitsSection />
      </div>
    </>
  );
};

export default withLayout(Home);
