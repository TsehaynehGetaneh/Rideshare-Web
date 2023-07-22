import React from "react";
import Image from "next/image";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div test-id="footer" className="w-full">
      <div className="max-w-7xl mx-auto py-5 space-y-5">
        <div className="flex flex-wrap justify-between space-y-10">
          <Image
            className="p-3"
            src="/images/logo.svg"
            width={200}
            height={200}
            alt="Rideshare Logo"
          />
          <div className="flex flex-col gap-5">
            <div className="mx-auto text-4xl font-semibold">
              <span className="text-primary">Share</span> Your Journey
            </div>
            <div className="flex gap-5 p-2">
              <button className="flex gap-5 w-52 h-20 items-center justify-center bg-primary rounded-xl">
                <Image
                  src="/images/landing-page/playstore.svg"
                  width={50}
                  height={50}
                  alt="PlayStore"
                />
                <div className="text-white text-left">
                  <div className="text-sm">Get It On</div>
                  <div className="text-xl">Google Play</div>
                </div>
              </button>
              <button className="flex gap-5 w-52 h-20 items-center justify-center bg-primary rounded-xl">
                <Image
                  src="/images/landing-page/apple.svg"
                  width={50}
                  height={50}
                  alt="App Store"
                />
                <div className="text-white text-left">
                  <div className="text-sm">Download On the</div>
                  <div className="text-xl">Apple Store</div>
                </div>
              </button>
            </div>
          </div>
          <div className="space-y-5 p-5">
            <div className="text-center text-xl">Be Our Friend</div>
            <div className="flex gap-2">
              <Image
                src="/images/landing-page/footer/location.svg"
                width={20}
                height={20}
                alt="address"
              />
              <div className="text-gray-400">3, Season Park, Jakarta</div>
            </div>
            <div className="flex gap-2">
              <Image
                src="/images/landing-page/footer/email.svg"
                width={20}
                height={20}
                alt="email address"
              />
              <div className="text-gray-400">support@foodyar.co,id</div>
            </div>
            <div className="flex gap-2">
              <Image
                src="/images/landing-page/footer/phone.svg"
                width={20}
                height={20}
                alt="phone number"
              />
              <div className="text-gray-400">021 - 1111 - 2222</div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap w-full justify-between p-2 gap-5 flex-col-reverse lg:flex-row">
          <div className="text-gray-400">
            Copyright © 2023 RideShare - All Rights Reserved
          </div>
          <div className="flex gap-10">
            <Image
              src="/images/landing-page/footer/facebook.svg"
              width={10}
              height={10}
              alt="facebook logo"
            />
            <Image
              src="/images/landing-page/footer/twitter.svg"
              width={20}
              height={20}
              alt="twitter logo"
            />
            <Image
              src="/images/landing-page/footer/linkedin.svg"
              width={20}
              height={20}
              alt="linkedin logo"
            />
            <Image
              src="/images/landing-page/footer/instagram.svg"
              width={20}
              height={20}
              alt="instagram logo"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
