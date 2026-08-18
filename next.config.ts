import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't advertise the framework in response headers.
  poweredByHeader: false,
  images: {
    // AVIF first: the hero is a large photograph and the extra encode cost is
    // paid once, at build. Order matters — the first match against the
    // request's Accept header wins.
    formats: ["image/avif", "image/webp"],
    // Next 16 defaults this to [75] and silently snaps anything else to the
    // nearest allowed value. The hero asks for 90, so 90 has to be listed.
    qualities: [75, 90],
  },
};

export default nextConfig;
