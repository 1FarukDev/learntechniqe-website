"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";

const iconMap: Record<string, string> = {
  facebook: "mdi:facebook",
  instagram: "mdi:instagram",
  youtube: "mdi:youtube",
  linkedin: "mdi:linkedin",
  twitter: "mdi:twitter",
  tiktok: "ic:baseline-tiktok",
};

interface SocialLinkData {
  platform: string;
  href: string;
}

export function FooterSocialIcons({ links }: { links: SocialLinkData[] }) {
  if (!links.length) return null;
  return (
    <div className="flex items-center gap-3">
      {links.map((social) => (
        <Link
          key={social.platform}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E99E20] transition-colors"
        >
          <Icon
            icon={iconMap[social.platform] ?? "mdi:link"}
            width="18"
            height="18"
            className="text-white"
          />
        </Link>
      ))}
    </div>
  );
}
