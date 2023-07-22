import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setActiveRoute } from "@/store/navigation/navigation";

type NavBarProps = {
  handleNavigation: (a: string) => void;
  routes: { name: string; to: string }[];
};

const NavBar = ({ handleNavigation, routes }: NavBarProps) => {
  const activeRoute = useAppSelector((state) => state.navigation.activeRoute);
  return (
    <div
      test-id="navbar"
      className="fixed hidden md:block w-full bg-white z-30"
    >
      <div className="flex max-w-7xl mx-auto p-2">
        <Image
          className="px-5 py-3"
          src="/images/logo.svg"
          width={200}
          height={200}
          alt=""
        />
        <div className="hidden md:flex gap-5 ml-auto">
          {routes.map((route, index) => (
            <div key={index} className="my-3">
              <Link
                className={`font-bold ${
                  activeRoute === route.to && "text-primary"
                }`}
                href={route.to}
                onClick={() => handleNavigation(route.to)}
              >
                {route.name}
              </Link>
              <div
                className={`mx-auto ${
                  activeRoute === route.to &&
                  "border-b-4 rounded-b-lg border-b-primary w-[80%]"
                }`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

type MobileNavBarProps = {
  handleNavigation: (a: string) => void;
  routes: { name: string; to: string }[];
};

const MobileNavBar = ({ handleNavigation, routes }: MobileNavBarProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const activeRoute = useAppSelector((state) => state.navigation.activeRoute);
  return (
    <div
      test-id="mobile-navbar"
      className="fixed block md:hidden bg-white w-full z-30"
    >
      <div className="flex">
        <button
          test-id="open-menu"
          className="p-5"
          onClick={() => setShowMenu(true)}
        >
          <GiHamburgerMenu size={50} />
        </button>
        <Image
          className="px-5 py-3"
          src="/images/logo.svg"
          width={200}
          height={200}
          alt=""
        />
        {showMenu && (
          <div className="fixed top-0 left-0 h-screen w-52 bg-white pt-10 space-y-3">
            <button
              className="absolute top-3 right-3 p-1"
              onClick={() => setShowMenu(false)}
            >
              <MdClose size={30} />
            </button>
            {routes.map((route, index) => (
              <Link
                key={index}
                className={`block font-bold p-2 ${
                  activeRoute === route.to && "bg-primary bg-opacity-20"
                }`}
                href={route.to}
                onClick={() => {
                  handleNavigation(route.to);
                  setShowMenu(false);
                }}
              >
                {route.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

type Props = {};

const Header = (props: Props) => {
  const dispatch = useAppDispatch();
  const routes: { name: string; to: string }[] = [
    {
      name: "Home",
      to: "#home",
    },
    {
      name: "How It Works",
      to: "#howitworks",
    },
    {
      name: "About",
      to: "#about",
    },
    {
      name: "Benefits",
      to: "#benefits",
    },
  ];

  const handleNavigation = (to: string) => {
    dispatch(setActiveRoute(to));
  };
  return (
    <>
      <NavBar routes={routes} handleNavigation={handleNavigation} />
      <MobileNavBar routes={routes} handleNavigation={handleNavigation} />
    </>
  );
};

export default Header;
