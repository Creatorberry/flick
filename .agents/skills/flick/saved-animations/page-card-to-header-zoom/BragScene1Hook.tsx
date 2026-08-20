import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const BRAG_SCENE_1_DURATION = 170;

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const sec = (value: number) => Math.round(value * 30);

const SRC_W = 1280;
const SRC_H = 3832;
const BASE_W = 1080;
const BASE_SCALE = BASE_W / SRC_W;
const BASE_H = SRC_H * BASE_SCALE;

const POPUP_OUT_START = sec(1.58);
const HERO_ZOOM_START = sec(2.08);
const HERO_HOLD_START = BRAG_SCENE_1_DURATION - 34;

export const BragScene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const cardIn = spring({frame: frame - sec(0.13), fps, config: {damping: 90, stiffness: 120}});
  const cardOut = interpolate(
    frame,
    [POPUP_OUT_START, sec(2.14)],
    [0, 1],
    {...clamp, easing: Easing.inOut(Easing.cubic)},
  );

  const cardOpacity =
    interpolate(cardIn, [0, 0.2, 1], [0, 1, 1], clamp) -
    interpolate(cardOut, [0, 1], [0, 1], clamp);
  const cardScale =
    interpolate(cardIn, [0, 1], [0.64, 1], clamp) -
    interpolate(cardOut, [0, 1], [0, 0.22], clamp);
  const cardX = interpolate(cardOut, [0, 1], [0, 920], clamp);
  const cardRotate = interpolate(frame, [0, sec(3.25), sec(3.8)], [-4, 2, 14], clamp);
  const cardFloat = Math.sin(frame / 13) * 8;

  const preHeroY = interpolate(
    frame,
    [0, HERO_ZOOM_START],
    [-64, -120],
    {...clamp, easing: Easing.inOut(Easing.cubic)},
  );
  const zoomProgress = interpolate(
    frame,
    [HERO_ZOOM_START, HERO_HOLD_START],
    [0, 1],
    {...clamp, easing: Easing.inOut(Easing.cubic)},
  );

  const layerScale = interpolate(zoomProgress, [0, 1], [1.06, 4.25], clamp);
  // Target: the real GitHub repo header "latent-spaces / brag", not the README hero.
  const targetX = -6;
  const targetY = 64;
  const layerX = interpolate(zoomProgress, [0, 1], [0, targetX], clamp);
  const layerY = interpolate(zoomProgress, [0, 1], [preHeroY, targetY], clamp);
  const blurAmount = interpolate(frame, [POPUP_OUT_START, HERO_ZOOM_START + 8], [18, 0], clamp);
  const dim = interpolate(frame, [POPUP_OUT_START, HERO_ZOOM_START], [0.12, 0], clamp);

  return (
    <AbsoluteFill style={{background: "#ffffff", overflow: "hidden"}}>
      <Img
        src={staticFile("brag-github-top-section-ecc.png")}
        style={{
          position: "absolute",
          left: layerX,
          top: layerY,
          width: BASE_W * layerScale,
          height: BASE_H * layerScale,
          objectFit: "fill",
          filter: `blur(${blurAmount}px)`,
          transformOrigin: "left top",
        }}
      />
      <div style={{position: "absolute", inset: 0, background: `rgba(0,0,0,${dim})`}} />

      <div
        style={{
          position: "absolute",
          left: 86 + cardX,
          top: 520 + cardFloat,
          width: 910,
          height: 660,
          opacity: cardOpacity,
          transform: `perspective(1200px) rotateY(${interpolate(cardIn, [0, 1], [-18, 0], clamp)}deg) rotateZ(${cardRotate}deg) scale(${cardScale})`,
          transformOrigin: "50% 50%",
          borderRadius: 34,
          overflow: "hidden",
          boxShadow: "0 34px 90px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.14)",
          background: "#ff3b10",
        }}
      >
        <Img
          src={staticFile("bragcard.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          left: 54,
          right: 54,
          bottom: 118,
          height: 8,
          borderRadius: 999,
          background: "rgba(0,0,0,.08)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${interpolate(frame, [0, BRAG_SCENE_1_DURATION - 1], [0, 100], clamp)}%`,
            background: "#111",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
