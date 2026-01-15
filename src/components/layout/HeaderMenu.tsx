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
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 100) setIsVisible(true);
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsMobileMenuOpen(false);
      } else if (currentScrollY < lastScrollY) setIsVisible(true);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

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
      ref={headerRef}
      className={`fixed top-0 z-50 w-full transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div
        className="container mx-auto px-4 py-2 flex justify-between rounded-full transition-all duration-300 mt-6 backdrop-blur-[57.85px]"
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
            width={130}
            height={135}
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
              <Menu className="w-6 h-6 transition-colors duration-300 text-white cursor-pointer" />
            </button>
          </DrawerTrigger>
          <DrawerContent className="bg-gradient-to-r from-white/7 to-white/8 backdrop-blur-[57.85px] border-none">
            <DrawerHeader className="flex flex-row items-center justify-between p-6">
              <DrawerTitle className="text-white text-lg font-semibold">
                Menu
              </DrawerTitle>
              <DrawerClose asChild>
                <button className="focus:outline-none">
                  <X className="w-6 h-6 text-white" />
                </button>
              </DrawerClose>
            </DrawerHeader>
            <div className="px-6 pb-6 space-y-4">
              {menuItems.map((item) => (
                <DrawerClose key={item.href} asChild>
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavigation(item.href, e)}
                    className="block text-[16px] hover:text-yellow-400 transition-colors text-white"
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
