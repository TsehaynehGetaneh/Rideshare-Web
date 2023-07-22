import React from "react";
import Image from "next/image";

type Props = {};

const HeroSection = (props: Props) => {
  return (
    <section
      id="home"
      className="flex flex-wrap flex-col-reverse md:flex-row justify-around items-center gap-10"
    >
      <div className="space-y-10 p-2">
        <div className="text-center font-bold text-4xl">
          Ride<span className="text-primary">Share</span>
        </div>
        <div className="max-w-md text-xl p-2">
          A platform to make your life easier lorem. A platform to make your
          life easier, enjoy a safe and comfortable ride every time
        </div>
        <div className="flex gap-5 mx-auto p-2">
          <button className="flex gap-5 w-48 h-16 items-center justify-center bg-black rounded-xl">
            <Image
              src="/images/landing-page/playstore.svg"
              width={30}
              height={30}
              alt=""
            />
            <div className="text-white text-left">
              <div className="text-sm">Get It On</div>
              <div className="text-xl">Google Play</div>
            </div>
          </button>
          <button className="flex gap-5 w-48 h-16 items-center justify-center bg-black rounded-xl">
            <Image
              src="/images/landing-page/apple.svg"
              width={30}
              height={30}
              alt=""
            />
            <div className="text-white text-left">
              <div className="text-sm">Download On the</div>
              <div className="text-xl">Apple Store</div>
            </div>
          </button>
        </div>
      </div>
      <Image
        src="/images/landing-page/hero-section-image.svg"
        width={500}
        height={400}
        alt=""
      />
    </section>
  );
};

export default HeroSection;
