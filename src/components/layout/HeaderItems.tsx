"use client";

import type React from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";

interface MenuItem {
  text: string;
  href: string;
}

interface GSAPVars {
  y?: string;
  duration?: number;
}

interface GSAPInstance {
  to: (targets: HTMLElement[], vars: GSAPVars) => void;
}

const gsap: GSAPInstance = {
  to: (targets: HTMLElement[], vars: GSAPVars): void => {
    targets.forEach((el: HTMLElement, index: number) => {
      if (el && el.style) {
        setTimeout(() => {
          el.style.transition = `transform ${vars.duration || 0.3}s ease`;
          el.style.transform = `translateY(${vars.y || "0"})`;
        }, index * 10);
      }
    });
  },
};

interface HeaderItemsProps {
  menuItems: MenuItem[];
  className?: string;
  onItemClick: (href: string, e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const HeaderItems: React.FC<HeaderItemsProps> = ({
  menuItems,
  className = "",
  onItemClick,
}) => {
  const menuRef = useRef<HTMLUListElement>(null);

  const initializeMenuItem = (menuItem: HTMLElement): void => {
    const menuItemsTexts = menuItem.querySelector(
      ".menu-item__text"
    ) as HTMLElement;
    if (!menuItemsTexts) return;

    const menuItemsTextsArray: string[] = [
      ...(menuItemsTexts.textContent || ""),
    ];
    menuItemsTexts.textContent = "";

    const textsArray: string[] = [];
    menuItemsTextsArray.forEach((char: string) => {
      textsArray.push(
        `<span class="inline-block">${char === " " ? "&nbsp;" : char}</span>`
      );
    });

    menuItemsTexts.innerHTML = textsArray.join("");

    const parentElm = menuItemsTexts.parentElement as HTMLElement;
    if (!parentElm) return;

    const parentElmHeight: number = parentElm.clientHeight;
    parentElm.style.height = `${parentElmHeight}px`;
    parentElm.classList.add("overflow-hidden", "relative");

    const cloneItem = menuItemsTexts.cloneNode(true) as HTMLElement;
    cloneItem.classList.add("absolute", "top-full", "left-0", "w-full");
    parentElm.appendChild(cloneItem);
  };

  const setupAnimation = (menuItem: HTMLElement): void => {
    const handleMouseOver = (): void => {
      const anchorElement = menuItem.querySelector("a") as HTMLAnchorElement;
      if (!anchorElement) return;

      const firstTextSpans = anchorElement.children[0]?.querySelectorAll(
        "span"
      ) as NodeListOf<HTMLElement>;
      const secondTextSpans = anchorElement.children[1]?.querySelectorAll(
        "span"
      ) as NodeListOf<HTMLElement>;

      if (firstTextSpans) {
        gsap.to(Array.from(firstTextSpans), { y: "-100%", duration: 0.3 });
      }
      if (secondTextSpans) {
        gsap.to(Array.from(secondTextSpans), { y: "-100%", duration: 0.3 });
      }
    };

    const handleMouseLeave = (): void => {
      const anchorElement = menuItem.querySelector("a") as HTMLAnchorElement;
      if (!anchorElement) return;

      const firstTextSpans = anchorElement.children[0]?.querySelectorAll(
        "span"
      ) as NodeListOf<HTMLElement>;
      const secondTextSpans = anchorElement.children[1]?.querySelectorAll(
        "span"
      ) as NodeListOf<HTMLElement>;

      if (firstTextSpans) {
        gsap.to(Array.from(firstTextSpans), { y: "0%", duration: 0.3 });
      }
      if (secondTextSpans) {
        gsap.to(Array.from(secondTextSpans), { y: "0%", duration: 0.3 });
      }
    };

    menuItem.addEventListener("mouseover", handleMouseOver);
    menuItem.addEventListener("mouseleave", handleMouseLeave);
  };

  useEffect(() => {
    if (!menuRef.current) return;
    const items = menuRef.current.querySelectorAll(".js-menu-item");
    items.forEach((menuItem) => {
      initializeMenuItem(menuItem as HTMLElement);
      setupAnimation(menuItem as HTMLElement);
    });
  }, []);

  return (
    <div className="flex items-center justify-center p-4">
      <ul
        className={`flex flex-wrap justify-between w-full max-w-6xl mx-auto list-none p-0 m-0 gap-2 sm:gap-4 md:gap-6 ${className}`}
        ref={menuRef}
      >
        {menuItems.map((item: MenuItem, index: number) => (
          <li key={index} className="js-menu-item flex-shrink-0 h-fit">
            <Link
              href={item.href}
              onClick={(e) => onItemClick(item.href, e)}
              className="cursor-pointer overflow-hidden block no-underline leading-6 text-[16px] text-white opacity-80 relative uppercase hover:text-gray-200 transition-colors duration-200"
            >
              <div className="menu-item__text whitespace-nowrap">
                {item.text}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HeaderItems;
