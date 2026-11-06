import { ImageResponse } from "next/og";
import { SITE } from "@/data/site";

export const alt = `${SITE.name} — ${SITE.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/*
  Social card, rendered at the edge so it can never drift from the site copy.
  Satori only understands a flexbox subset, hence the explicit styles on every
  node and the absolutely positioned light blobs.
*/
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#05080A",
          padding: "68px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -180,
            left: -120,
            width: 720,
            height: 720,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(255,210,63,0.28), rgba(255,210,63,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -260,
            right: -140,
            width: 760,
            height: 760,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(125,211,252,0.22), rgba(125,211,252,0) 70%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 68,
                height: 68,
                borderRadius: 20,
                background: "#FFD23F",
                color: "#0B1215",
                fontSize: 26,
                fontWeight: 800,
              }}
            >
              {SITE.initials}
            </div>
            <div style={{ display: "flex", flexDirection: "column", marginLeft: 20 }}>
              <span style={{ color: "#F6F6F6", fontSize: 26, fontWeight: 700 }}>{SITE.shortName}</span>
              <span style={{ color: "#98A3A9", fontSize: 15, letterSpacing: 4, textTransform: "uppercase" }}>
                Portfolio
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: 999,
              padding: "10px 22px",
              background: "rgba(255,255,255,0.05)",
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: 999, background: "#34D399", marginRight: 12 }} />
            <span style={{ color: "#F6F6F6", fontSize: 18 }}>{SITE.availability}</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ color: "#F6F6F6", fontSize: 92, fontWeight: 800, letterSpacing: -4, lineHeight: 1 }}>
            {SITE.name}
          </span>
          <span style={{ color: "#98A3A9", fontSize: 34, marginTop: 22 }}>
            Full-stack web developer — {SITE.company}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: 26,
          }}
        >
          {["Next.js", "React", ".NET", "AngularJS", "Node.js"].map((tag) => (
            <span key={tag} style={{ color: "rgba(246,246,246,0.7)", fontSize: 20 }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
    size
  );
}
