import type { NavItem } from "../navigation";

export const primaryNavAr: NavItem[] = [
  {
    id: "services",
    label: "الخدمات الهندسية",
    href: "/ar/services",
    mega: true,
    status: "confirmed",
  },
  {
    id: "capabilities",
    label: "القدرات الفنية",
    href: "/ar/capabilities",
    status: "confirmed",
  },
  {
    id: "projects",
    label: "المشاريع",
    href: "/ar/projects",
    feature: "projects",
    status: "needs-confirmation",
  },
  { id: "company", label: "عن المجموعة", href: "/ar/company", status: "confirmed" },
  {
    id: "insights",
    label: "الرؤى التقنية",
    href: "/ar/insights",
    feature: "insights",
    status: "needs-confirmation",
  },
  { id: "contact", label: "تواصل معنا", href: "/ar/contact", status: "confirmed" },
];

export const footerLinksAr = {
  company: [
    { label: "نظرة عامة على الشركة", href: "/ar/company" },
    { label: "من نحن وقيم العمل", href: "/ar/company/about" },
    { label: "المنهجية الهندسية", href: "/ar/company/approach" },
    { label: "الجودة والسلامة البحرية", href: "/ar/company/quality-safety" },
    { label: "مصفوفة القدرات والإمكانيات", href: "/ar/capabilities" },
  ],
  contact: [
    { label: "طلب دعم فني بحري", href: "/ar/contact/technical-support" },
    { label: "استفسارات عامة", href: "/ar/contact" },
  ],
} as const;
