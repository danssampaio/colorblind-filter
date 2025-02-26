"use client";
import { FunctionComponent } from "react";
import { config } from "@/config";

export const Footer: FunctionComponent = () => {
  return (
    <section className="flex items-center justify-center py-6 px-5 bg-neutral-300">
      <div>
        © {config.blog.copyright} {new Date().getFullYear()}
      </div>
    </section>
  );
};
