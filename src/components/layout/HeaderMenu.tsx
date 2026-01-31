"use client";

import type React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import HeaderItems from "./HeaderItems";

export default function HeaderMenu() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 80) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollYRef.current) {
        setIsVisible(false);
        setIsMobileMenuOpen(false);
      } else {
        setIsVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", controlNavbar, { passive: true });
    return () => window.removeEventListener("scroll", controlNavbar);
  }, []);

  const handleNavigation = async (
    path: string,
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    window.location.href = path;
  };

  const menuItems = [
    { text: "Home", href: "/" },
    { text: "About", href: "/about" },
    { text: "Services", href: "/services" },
    { text: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 z-50 w-full px-4 sm:px-6 lg:px-12 transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-[150%]"
      }`}
    >
      <div
        className="mx-auto mt-6 flex w-full max-w-7xl items-center justify-between rounded-full px-6 py-1 backdrop-blur-[57.85px] transition-all duration-300"
        style={{
          background:
            "linear-gradient(90deg, rgba(95, 95, 95, 0.5) 10.28%, rgba(150, 150, 150, 0.5) 100%)",
        }}
      >
        <Link href="/" onClick={(e) => handleNavigation("/", e)}>
          <Image
            src="/logo.png"
            alt="Logo"
            title="Logo"
            width={124}
            height={129}
            className="h-12 w-auto transition-all duration-300"
          />
        </Link>

        <nav className="hidden md:flex space-x-6">
          <HeaderItems onItemClick={handleNavigation} menuItems={menuItems} />
        </nav>

        <Drawer
          direction="right"
          open={isMobileMenuOpen}
          onOpenChange={setIsMobileMenuOpen}
        >
          <DrawerTrigger asChild>
            <button className="md:hidden focus:outline-none">
              <Menu className="h-6 w-6 cursor-pointer text-white transition-colors duration-300" />
            </button>
          </DrawerTrigger>

          <DrawerContent className="border-none bg-gradient-to-r from-white/7 to-white/8 backdrop-blur-[57.85px]">
            <DrawerHeader className="flex flex-row items-center justify-between p-6">
              <DrawerTitle className="text-lg font-semibold text-white">
                Menu
              </DrawerTitle>

              <DrawerClose asChild>
                <button className="focus:outline-none">
                  <X className="h-6 w-6 text-white" />
                </button>
              </DrawerClose>
            </DrawerHeader>

            <div className="space-y-4 px-6 pb-6">
              {menuItems.map((item) => (
                <DrawerClose key={item.href} asChild>
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavigation(item.href, e)}
                    className="block text-[16px] text-white transition-colors hover:text-yellow-400"
                  >
                    {item.text}
                  </Link>
                </DrawerClose>
              ))}
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </header>
  );
}
