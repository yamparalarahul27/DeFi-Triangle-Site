import { ImageResponse } from "next/og";

export const alt = "DeFi Triangle";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(180deg, #000003 0%, #000036 38%, #143f79 82%, #496d93 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 300,
            color: "#fff",
            letterSpacing: -1,
          }}
        >
          DeFi Triangle
        </div>
        <div
          style={{
            fontSize: 26,
            color: "rgba(255,255,255,0.65)",
            marginTop: 12,
          }}
        >
          Your DeFi execution and exposure app.
        </div>
        <div
          style={{
            width: 120,
            height: 1,
            background: "rgba(255,255,255,0.15)",
            marginTop: 40,
            marginBottom: 20,
          }}
        />
        <div
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: "rgba(255,255,255,0.35)",
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          Built on Solana
        </div>
      </div>
    ),
    { ...size }
  );
}
