import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const SCENE_CANVA_CONTENT_CAROUSEL_DURATION = 90;

const CLAUDE_CREAM = "#FAF3EA";
const CLAUDE_ORANGE = "#DE7356";
const INK = "#251D18";

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

const images = [
  "Watched someone spend 4 hours designing a carousel in Canva yesterday.Custom graphics. Perfect c.jpg",
  "Watched someone spend 4 hours designing a carousel in Canva yesterday.Custom graphics. Perfect c (1).jpg",
  "Watched someone spend 4 hours designing a carousel in Canva yesterday.Custom graphics. Perfect c (2).jpg",
  "Watched someone spend 4 hours designing a carousel in Canva yesterday.Custom graphics. Perfect c (3).jpg",
  "Watched someone spend 4 hours designing a carousel in Canva yesterday.Custom graphics. Perfect c (4).jpg",
];

const Slide: React.FC<{
  src: string;
  index: number;
  cameraX: number;
}> = ({ src, index, cameraX }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relative = index - cameraX;
  const distance = Math.abs(relative);
  const entry = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 74, mass: 0.9 },
  });
  const activeZoom = interpolate(distance, [0, 0.6, 1.4], [1.08, 1.01, 0.9], clamp);
  const cameraPush = interpolate(frame, [0, 18, 72, 90], [0.92, 1, 1.06, 1.06], clamp);
  const yLift = interpolate(entry, [0, 1], [70, 0]);
  const x = 540 + relative * 530;
  const rotateY = interpolate(relative, [-1.3, 0, 1.3], [18, 0, -18], clamp);
  const opacity = interpolate(distance, [0, 1.3, 1.9], [1, 0.78, 0], clamp);
  const blur = interpolate(distance, [0, 1.35], [0, 4], clamp);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: 390 + yLift,
        width: 760,
        height: 1013,
        transform: `translateX(-50%) perspective(1200px) rotateY(${rotateY}deg) scale(${activeZoom * cameraPush})`,
        transformStyle: "preserve-3d",
        opacity,
        filter: `blur(${blur}px)`,
        zIndex: 10 - Math.round(distance * 4),
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -18,
          borderRadius: 42,
          background: "rgba(37,29,24,0.18)",
          filter: "blur(28px)",
          transform: "translateY(38px) translateZ(-80px)",
        }}
      />
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: 34,
          border: "5px solid rgba(255,255,255,0.78)",
          boxShadow:
            "0 36px 92px rgba(37,29,24,0.24), 0 0 0 1px rgba(222,115,86,0.14)",
          transform: "translateZ(70px)",
        }}
      />
    </div>
  );
};

export const SceneCanvaContentCarousel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const travel = spring({
    frame: frame - 15,
    fps,
    config: { damping: 24, stiffness: 42, mass: 1 },
  });
  const cameraX = interpolate(travel, [0, 1], [0, 4], clamp);
  const activeIndex = Math.min(4, Math.max(0, Math.round(cameraX)));
  const bgZoom = interpolate(frame, [0, 90], [1.16, 1.28], clamp);
  const headlineIn = spring({
    frame: frame - 4,
    fps,
    config: { damping: 18, stiffness: 86, mass: 0.82 },
  });

  return (
    <AbsoluteFill style={{ background: CLAUDE_CREAM, overflow: "hidden" }}>
      <Img
        src={staticFile(images[activeIndex])}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${bgZoom})`,
          filter: "blur(34px) saturate(1.18) brightness(0.93)",
          opacity: 0.58,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(250,243,234,0.88) 0%, rgba(250,243,234,0.22) 24%, rgba(250,243,234,0.08) 62%, rgba(250,243,234,0.82) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -180,
          top: 406,
          width: 1440,
          height: 820,
          background:
            "radial-gradient(circle at 50% 50%, rgba(222,115,86,0.23), transparent 62%)",
          filter: "blur(26px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 56,
          right: 56,
          top: 196,
          textAlign: "center",
          fontFamily: '"Times New Roman", Times, serif',
          fontSize: 78,
          lineHeight: 0.94,
          fontStyle: "italic",
          fontWeight: 700,
          color: INK,
          opacity: interpolate(headlineIn, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(headlineIn, [0, 1], [42, 0])}px) scale(${interpolate(headlineIn, [0, 1], [0.9, 1])})`,
          textShadow:
            "0 5px 0 rgba(222,115,86,0.18), 0 18px 36px rgba(37,29,24,0.20)",
        }}
      >
        Changes how you make
        <br />
        content
      </div>

      {images.map((src, index) => (
        <Slide key={src} src={src} index={index} cameraX={cameraX} />
      ))}

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 220,
          display: "flex",
          justifyContent: "center",
          gap: 15,
        }}
      >
        {images.map((_, index) => {
          const active = 1 - Math.min(1, Math.abs(cameraX - index));
          return (
            <div
              key={index}
              style={{
                width: interpolate(active, [0, 1], [12, 46], clamp),
                height: 12,
                borderRadius: 999,
                background: active > 0.5 ? CLAUDE_ORANGE : "rgba(37,29,24,0.28)",
                boxShadow: active > 0.5 ? "0 0 22px rgba(222,115,86,0.48)" : "none",
              }}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
