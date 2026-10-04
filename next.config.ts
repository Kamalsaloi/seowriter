import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets other laptops on the same network open the dev server by its network address.
  // Without this, Next blocks its dev resources for them and the page never becomes interactive.
  allowedDevOrigins: ["10.103.98.64", "10.*.*.*", "192.168.*.*", "172.*.*.*"],
};

export default nextConfig;
