"use client";

import { cn } from "@/app/utils/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FunctionComponent } from "react";
import { ColorblindFilter } from "../colorblind-filter";
import { DarkModeToggle } from "../dark-mode-toggle";
import { applyDaltonismCorrection } from "../../utils/colorUtils";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

interface MenuItem {
  name: string;
  href: string;
  openInNewTab?: boolean;
}

const menuItems: MenuItem[] = [
  { name: "Home", href: "/" },
  { name: "Componentes", href: "/components-page" },
  { name: "Imagens", href: "/images-page" },
  { name: "About", href: "/about" },
];

const handleColorblindnessChange = (
  type: "Protanopia" | "Deuteranopia" | "Tritanopia" | "Padrao"
) => {
  applyDaltonismCorrection(type);
};

export const Navigation: FunctionComponent = () => {
  const pathname = usePathname();

  return (
    <nav>
      <div className="hidden md:flex items-center">
        {menuItems.map((item) => (
          <div key={item.href} className="ml-4 md:ml-8">
            <a
              href={item.href}
              target={item.openInNewTab ? "_blank" : "_self"}
              className={cn(
                "p-2 rounded-md hover:text-gray-900",
                pathname === item.href && "font-semibold"
              )}
            >
              {item.name}
            </a>
          </div>
        ))}
        <div className="ml-6">
          <ColorblindFilter onChange={handleColorblindnessChange} />
        </div>
        <div className="ml-6">
          <DarkModeToggle />
        </div>
      </div>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <Menu size="24" />
          </SheetTrigger>
          <SheetContent className="text-white bg-gray-500 flex flex-col items-end">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>
                {menuItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    target={item.openInNewTab ? "_blank" : "_self"}
                    className={cn(
                      "block py-2",
                      pathname === item.href && "font-semibold"
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </SheetDescription>
            </SheetHeader>
            <div className="ml-6">
              <ColorblindFilter onChange={handleColorblindnessChange} />
            </div>
            <div className="ml-6">
              <DarkModeToggle />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export const Header: FunctionComponent = () => {
  return (
    <section className="flex items-center justify-between px-5 text-white shadow shadow-neutral-500 bg-gray-500">
      <Link href="/">
        <div className="flex items-center justify-center w-[100px] h-[80px]">
          <Image
            src={"/colorblind-filter.svg"}
            alt={"logo colorblind Filter"}
            width={0}
            height={0}
            priority
            className="w-auto h-auto"
          />
        </div>
      </Link>
      <Navigation />
    </section>
  );
};
