"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { config } from "@/config";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FunctionComponent } from "react";
import { ColorblindnessFilter } from "./ColorblindnessFilter";
import { DarkModeToggle } from "./DarkModeToggle";
import { applyDaltonismCorrection } from '../lib/colorUtils';


interface MenuItem {
  name: string;
  href: string;
  openInNewTab?: boolean;
}

const menuItems: MenuItem[] = [
  { name: "Home", href: "/" },
  { name: "Componentes", href: "/componentsPage" },
  { name: "About", href: "/about" },
];

const handleColorblindnessChange = (type: "Protanopia" | "Deuteranopia" | "Tritanopia" | "Padrao") => {
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
          <ColorblindnessFilter onChange={handleColorblindnessChange} />
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
          <SheetContent>
            <SheetHeader>
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
                <div className="ml-6">
                  <ColorblindnessFilter onChange={handleColorblindnessChange} />
                </div>
                <div className="ml-6">
                  <DarkModeToggle />
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export const Header: FunctionComponent = () => {
  return (
    <section className="flex items-center justify-between py-5 px-5 bg-[#D53B30]">
      <Link href="/">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
          {config.blog.name}
        </h1>
      </Link>
      <Navigation />
    </section>
  );
};

