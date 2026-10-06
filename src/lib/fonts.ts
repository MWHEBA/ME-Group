import {
  Barlow,
  Barlow_Condensed,
  IBM_Plex_Mono,
  Chakra_Petch,
  Space_Grotesk,
} from "next/font/google";

/**
 * Typography hypothesis (DESIGN_SYSTEM §3) — NOT frozen until Phase 2 approval.
 * All font loading lives here; swapping a family is a one-file change.
 */
const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal", "italic"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const body = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-barlow",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

/** Alternative Hypothesis B for comparison in Visual Lab */
const altDisplay = Chakra_Petch({
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal", "italic"],
  variable: "--font-chakra-petch",
  display: "swap",
});

const altBody = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const fontVariables = [
  display.variable,
  body.variable,
  mono.variable,
  altDisplay.variable,
  altBody.variable,
].join(" ");

