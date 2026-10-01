import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const dynamic = "force-static";
export const alt = `${site.legalName}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0b0d",
          color: "#eceae4",
          padding: "72px 80px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 300,
            top: 330,
            width: 600,
            height: 600,
            borderRadius: 9999,
            border: "2px solid rgba(242,166,90,0.9)",
            backgroundImage: "radial-gradient(closest-side, rgba(242,166,90,0.28), rgba(242,166,90,0))",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 470,
            height: 160,
            background: "#0a0b0d",
            borderTop: "2px solid rgba(236,234,228,0.6)",
          }}
        />
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, color: "#8b8f96", textTransform: "uppercase" }}>
          {site.legalName}
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginBottom: 150 }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 600, letterSpacing: -3, lineHeight: 1.02, maxWidth: 900 }}>
            {site.tagline}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
