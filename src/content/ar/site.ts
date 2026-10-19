import type { Gated } from "../types";
import type { SupportInfo } from "../site";

export const companyAr = {
  name: "ME Group",
  fullName: "مجموعة الهندسة البحرية",
  tagline: "استمرار إبحار السفن بكفاءة وموثوقية.",
  descriptor: "الهندسة البحرية، الصيانة، ودعم السفن المتكامل.",
  description:
    "دعم فني هندسي متكامل يغطي الأنظمة الميكانيكية، الطاقة الكهربائية والتوزيع، التحكم الآلي، والأنظمة الهوائية، مدعوماً بخدمات الصيانة، الاستجابة السريعة، وتوفير قطع الغيار البحرية.",
  address: "المندرة بحري، حي ثان المنتزه، الإسكندرية، مصر",
  operationsHub: "المنطقة البحرية بميناء الإسكندرية وجميع موانئ جمهورية مصر العربية",
  phone: "+20 3 5510000",
  mobile: "+20 1012116108",
  secondaryMobile: "+20 1223855644",
  email: "info@MEGroup-eg.com",
  website: "MEGroup-eg.com",
  status: "confirmed",
} as const satisfies Gated & Record<string, string>;

export const supportAr: SupportInfo = {
  status: "confirmed",
  hours: "24/7",
  phone: "+20 3 5510000",
  mobile: "+20 1012116108",
  secondaryMobile: "+20 1223855644",
  whatsapp: "https://wa.me/201012116108",
  email: "info@MEGroup-eg.com",
  website: "https://MEGroup-eg.com",
};

export const ctasAr = {
  technicalSupport: {
    label: "طلب دعم فني",
    href: "/ar/contact/technical-support",
  },
  technicalRequestShort: {
    label: "طلب دعم",
    href: "/ar/contact/technical-support",
  },
} as const;
