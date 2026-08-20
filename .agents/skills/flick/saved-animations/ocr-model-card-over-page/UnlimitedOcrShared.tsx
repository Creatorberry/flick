import React from "react";
import {
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const UO_ORANGE =
  "radial-gradient(ellipse at 45% 35%, #E8896E 0%, #DE7356 55%, #C45A3E 100%)";
export const UO_CREAM = "#FAF3EA";
export const UO_DARK = "#101010";
export const UO_UI =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, Arial, sans-serif";
export const UO_LABEL = "'Times New Roman', Times, serif";
export const UO_CODE = "Consolas, 'Courier New', Courier, monospace";
export const UO_CLAUDE = "#DE7356";
export const UO_CLAMP = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};
export const UO_SHADOW =
  "0 2px 4px rgba(0,0,0,.22), 0 8px 24px rgba(0,0,0,.34), 0 28px 64px rgba(0,0,0,.34), 0 70px 140px rgba(0,0,0,.26)";

export const uoSec = (value: number) => Math.round(value * 30);

export const PopHeading: React.FC<{
  text: string;
  color: string;
  top?: number;
  size?: number;
  delay?: number;
  zIndex?: number;
}> = ({text, color, top = 150, size = 116, delay = 0, zIndex = 20}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - delay, fps, config: {damping: 200}});
  return (
    <div
      style={{
        position: "absolute",
        left: 54,
        right: 54,
        top,
        zIndex,
        textAlign: "center",
        fontFamily: UO_LABEL,
        fontStyle: "italic",
        fontWeight: 700,
        fontSize: size,
        lineHeight: 0.92,
        color,
        opacity: interpolate(p, [0, 1], [0, 1], UO_CLAMP),
        transform: `translateY(${interpolate(p, [0, 1], [34, 0], UO_CLAMP)}px) scale(${interpolate(
          p,
          [0, 1],
          [0.92, 1],
          UO_CLAMP,
        )})`,
        textShadow:
          color === UO_CREAM
            ? "0 4px 0 rgba(111,43,27,.28), 0 16px 42px rgba(80,32,22,.26)"
            : "0 2px 0 rgba(255,255,255,.65), 0 14px 34px rgba(111,43,27,.18)",
      }}
    >
      {text}
    </div>
  );
};

export const ProgressBar: React.FC<{duration: number; color?: string}> = ({
  duration,
  color = UO_CREAM,
}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        left: 54,
        right: 54,
        bottom: 78,
        height: 7,
        borderRadius: 999,
        background: "rgba(255,255,255,.18)",
        overflow: "hidden",
        zIndex: 60,
      }}
    >
      <div
        style={{
          width: `${interpolate(frame, [0, duration - 1], [0, 100], UO_CLAMP)}%`,
          height: "100%",
          borderRadius: 999,
          background: color,
        }}
      />
    </div>
  );
};

export const VerticalWebsiteScroll: React.FC<{
  src: string;
  sourceWidth: number;
  sourceHeight: number;
  durationInFrames: number;
  startFrame?: number;
  sideGap?: number;
  topGap?: number;
  zoom?: number;
  startOffset?: number;
  endOffset?: number;
  holdAfter?: number;
  dim?: number;
}> = ({
  src,
  sourceWidth,
  sourceHeight,
  durationInFrames,
  startFrame = 0,
  sideGap = 54,
  topGap = 96,
  zoom = 1.5,
  startOffset = 0,
  endOffset = 0,
  holdAfter = 0,
  dim = 0,
}) => {
  const frame = useCurrentFrame();
  const local = Math.max(0, frame - startFrame);
  const frameW = 1080 - sideGap * 2;
  const frameH = 1920 - topGap * 2;
  const imgW = sourceWidth * (frameW / sourceWidth) * zoom;
  const imgH = sourceHeight * (frameW / sourceWidth) * zoom;
  const maxTravel = Math.max(0, imgH - frameH);
  const p = interpolate(
    local,
    [0, Math.max(1, durationInFrames - holdAfter)],
    [0, 1],
    {...UO_CLAMP, easing: Easing.inOut(Easing.cubic)},
  );
  const y = -startOffset - (maxTravel - endOffset) * p;

  return (
    <>
      <Img
        src={staticFile(src)}
        style={{
          position: "absolute",
          inset: -80,
          width: 1240,
          height: 2080,
          objectFit: "cover",
          filter: "blur(22px) saturate(.8) brightness(1.1)",
          opacity: 0.54,
          transform: "scale(1.03)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: sideGap,
          top: topGap,
          width: frameW,
          height: frameH,
          borderRadius: 24,
          overflow: "hidden",
          background: "#fff",
          boxShadow: "0 26px 70px rgba(0,0,0,.22)",
        }}
      >
        <Img
          src={staticFile(src)}
          style={{
            position: "absolute",
            left: 0,
            top: y,
            width: imgW,
            height: imgH,
            objectFit: "fill",
            transformOrigin: "left top",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `rgba(0,0,0,${dim})`,
          }}
        />
      </div>
    </>
  );
};

export const PdfBadge: React.FC<{label?: string; size?: number}> = ({
  label = "PDF",
  size = 58,
}) => (
  <div
    style={{
      width: size,
      height: Math.round(size * 1.22),
      borderRadius: 10,
      background: "linear-gradient(145deg, #ffffff 0%, #f7f0eb 100%)",
      border: "2px solid #E74D42",
      display: "grid",
      placeItems: "center",
      color: "#E74D42",
      fontFamily: UO_UI,
      fontWeight: 950,
      fontSize: Math.round(size * 0.28),
      boxShadow: "0 12px 26px rgba(0,0,0,.18)",
    }}
  >
    {label}
  </div>
);

export const ContractPage: React.FC<{scale?: number; title?: string}> = ({
  scale = 1,
  title = "Master Services Agreement",
}) => (
  <div
    style={{
      width: 620 * scale,
      height: 820 * scale,
      borderRadius: 12 * scale,
      background: "#fffdf9",
      border: "1px solid #E6DDD4",
      boxShadow: "0 20px 50px rgba(0,0,0,.18)",
      padding: 42 * scale,
      fontFamily: UO_UI,
      color: "#1f1b18",
      overflow: "hidden",
    }}
  >
    <div style={{fontSize: 25 * scale, fontWeight: 950, letterSpacing: -.4}}>{title}</div>
    <div style={{width: 210 * scale, height: 7 * scale, borderRadius: 999, background: UO_CLAUDE, marginTop: 14 * scale}} />
    <div style={{marginTop: 25 * scale, display: "grid", gap: 12 * scale}}>
      {[
        "This Agreement is entered into by and between Northstar Holdings LLC and Cedar Ridge Analytics Inc.",
        "Section 1. Scope of Services. Contractor shall provide document intelligence, audit support, and reporting services.",
        "Section 2. Confidentiality. Each party shall protect non-public materials with commercially reasonable safeguards.",
        "Section 3. Payment Terms. Invoices are due within thirty days of receipt unless otherwise specified.",
      ].map((line) => (
        <div key={line} style={{fontSize: 15 * scale, lineHeight: 1.35, fontWeight: 600, color: "#4c4540"}}>
          {line}
        </div>
      ))}
    </div>
    <div style={{marginTop: 24 * scale, border: "1px solid #E6DDD4", borderRadius: 8 * scale, overflow: "hidden"}}>
      {[
        ["Clause", "Owner", "Status"],
        ["2.1", "Legal", "Approved"],
        ["4.3", "Finance", "Review"],
        ["7.2", "Security", "Approved"],
      ].map((row, i) => (
        <div
          key={row.join("-")}
          style={{
            height: 36 * scale,
            display: "grid",
            gridTemplateColumns: "1fr 1.25fr 1fr",
            background: i === 0 ? "#f0e6dc" : i % 2 ? "#fff" : "#fbf7f2",
            borderTop: i ? "1px solid #E6DDD4" : undefined,
            fontSize: 13 * scale,
            fontWeight: i === 0 ? 900 : 700,
          }}
        >
          {row.map((cell, idx) => (
            <div key={cell} style={{padding: `${9 * scale}px ${11 * scale}px`, borderRight: idx < 2 ? "1px solid #E6DDD4" : undefined}}>
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

