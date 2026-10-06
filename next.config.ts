import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/request-support",
        destination: "/contact/technical-support",
        permanent: true,
      },
      {
        source: "/rapid-support",
        destination: "/contact/technical-support",
        permanent: true,
      },
      {
        source: "/contact/rapid-support",
        destination: "/contact/technical-support",
        permanent: true,
      },
      {
        source: "/request-spare-parts",
        destination: "/contact/technical-support",
        permanent: true,
      },
      {
        source: "/contact/spare-parts",
        destination: "/contact/technical-support",
        permanent: true,
      },
      // Legacy Phase 1 service group redirects to clean Phase 5 routes
      {
        source: "/services/marine-engineering/mechanical",
        destination: "/services/mechanical",
        permanent: true,
      },
      {
        source: "/services/marine-engineering/electrical",
        destination: "/services/electrical",
        permanent: true,
      },
      {
        source: "/services/marine-engineering/automation",
        destination: "/services/automation",
        permanent: true,
      },
      {
        source: "/services/marine-engineering/pneumatic",
        destination: "/services/pneumatic",
        permanent: true,
      },
      {
        source: "/services/repair-maintenance/preventive",
        destination: "/services/repair-maintenance",
        permanent: true,
      },
      {
        source: "/services/repair-maintenance/corrective",
        destination: "/services/repair-maintenance",
        permanent: true,
      },
      {
        source: "/services/repair-maintenance/inspection-diagnostics",
        destination: "/services/repair-maintenance",
        permanent: true,
      },
      {
        source: "/services/repair-maintenance/rapid-response",
        destination: "/contact/technical-support",
        permanent: true,
      },
      {
        source: "/services/vessel-support/spare-parts",
        destination: "/services/spare-parts",
        permanent: true,
      },
      {
        source: "/services/vessel-support/technical-supplies",
        destination: "/services/vessel-support",
        permanent: true,
      },
      {
        source: "/services/vessel-support/provisioning",
        destination: "/services/vessel-support",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
