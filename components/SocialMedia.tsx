"use client";

import { Facebook, Instagram, Youtube } from "lucide-react";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/ui/tooltip"; // ✅ fix path also
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  iconClassName?: string;
  tooltipClassName?: string;
}

const SocialLink = [
  {
    title: "Instagram",
    url: "https://www.instagram.com/kashi_charms",
    icon: <Instagram className="w-5 h-5" />,
  },
  {
    title: "Youtube",
    url: "https://youtube.com/@kashicharms",
    icon: <Youtube className="w-5 h-5" />,
  },
  {
    title: "Facebook",
    url: "https://www.facebook.com",
    icon: <Facebook className="w-5 h-5" />,
  },
];

const SocialMedia = ({
  className,
  iconClassName,
  tooltipClassName,
}: Props) => {
  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-3.5", className)}>
        {SocialLink.map((item) => (
          <Tooltip key={item.title}>
            <TooltipTrigger asChild>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "p-2 border rounded-full hover:text-white hover:border-darkColor hoverEffect",
                  iconClassName
                )}
              >
                {item.icon}
              </a>
            </TooltipTrigger>

            <TooltipContent className={tooltipClassName}>
              <p>{item.title}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default SocialMedia;