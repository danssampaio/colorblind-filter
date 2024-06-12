"use client";
import { FunctionComponent } from "react";
import { DarkModeToggle } from "./DarkModeToggle";
import { config } from "@/config";

export const Footer: FunctionComponent = () => {
  return (
    <section className="flex items-center justify-center py-12 px-5 bg-[#D53B30]">
      <div>
        © {config.blog.copyright} {new Date().getFullYear()}
      </div>
    </section>
  );
};
