export interface NavLink {
  label: string;
  href: string;
}

export interface CourseItem {
  label: string;
  href: string;
  slug?: { current: string };
}

export interface Subcategory {
  label: string;
  items: CourseItem[];
}

export interface MegaMenuColumn {
  title: string;
  description: string;
  cardColor: string;
  subcategories: Subcategory[];
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform:
    | "facebook"
    | "instagram"
    | "youtube"
    | "linkedin"
    | "twitter"
    | "tiktok";
  href: string;
}

export interface MegaMenuFooter {
  links: FooterLink[];
  socialLinks: SocialLink[];
}

export interface HeaderData {
  navLinks: NavLink[];
  megaMenuColumns: MegaMenuColumn[];
  megaMenuFooter: MegaMenuFooter;
}
