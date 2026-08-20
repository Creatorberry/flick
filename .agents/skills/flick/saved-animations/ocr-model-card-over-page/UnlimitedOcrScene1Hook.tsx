import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  ProgressBar,
  UO_CLAMP,
  UO_CREAM,
  UO_LABEL,
  VerticalWebsiteScroll,
} from "./UnlimitedOcrShared";

export const UNLIMITED_OCR_SCENE_1_DURATION = 171;

export const UnlimitedOcrScene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const chinaIn = spring({frame: frame - 10, fps, config: {damping: 120, stiffness: 95}});
  const chinaOut = interpolate(frame, [88, 118], [0, 1], {...UO_CLAMP, easing: Easing.inOut(Easing.cubic)});
  const chinaScale =
    interpolate(chinaIn, [0, 1], [0.68, 1], UO_CLAMP) -
    interpolate(chinaOut, [0, 1], [0, 0.18], UO_CLAMP);
  const chinaX = interpolate(chinaOut, [0, 1], [0, 910], UO_CLAMP);
  const cardBlur = interpolate(frame, [12, 118], [18, 0], UO_CLAMP);
  const textIn = spring({frame: frame - 30, fps, config: {damping: 160, stiffness: 90}});

  return (
    <AbsoluteFill style={{background: "#eef1f4", overflow: "hidden"}}>
      <VerticalWebsiteScroll
        src="unlimited-ocr-github-fullpage.png"
        sourceWidth={1080}
        sourceHeight={7525}
        durationInFrames={132}
        zoom={1.5}
        startOffset={0}
        endOffset={450}
        dim={interpolate(frame, [0, 20, 106, 126], [0.12, 0.34, 0.34, 0.04], UO_CLAMP)}
      />

      <div
        style={{
          position: "absolute",
          left: 134 + chinaX,
          top: 320,
          width: 812,
          height: 800,
          borderRadius: 42,
          overflow: "hidden",
          opacity: interpolate(chinaIn, [0, 0.2, 1], [0, 1, 1], UO_CLAMP) - chinaOut,
          transform: `perspective(1200px) rotateY(${interpolate(chinaIn, [0, 1], [-18, 0], UO_CLAMP)}deg) rotateZ(${interpolate(
            frame,
            [10, 80],
            [-3,
            2],
            UO_CLAMP,
          )}deg) scale(${chinaScale})`,
          boxShadow: "0 44px 120px rgba(0,0,0,.55)",
          filter: `blur(${Math.max(0, cardBlur - 8)}px)`,
          zIndex: 22,
        }}
      >
        <Img src={staticFile("China.png")} style={{width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top"}} />
      </div>

      <div
        style={{
          position: "absolute",
          left: 56,
          right: 56,
          top: 146,
          zIndex: 28,
          textAlign: "center",
          fontFamily: UO_LABEL,
          fontStyle: "italic",
          fontWeight: 700,
          fontSize: 104,
          color: UO_CREAM,
          lineHeight: 0.92,
          opacity: interpolate(textIn, [0, 1], [0, 1], UO_CLAMP) * (1 - interpolate(frame, [100, 126], [0, 1], UO_CLAMP)),
          transform: `translateY(${interpolate(textIn, [0, 1], [36, 0], UO_CLAMP)}px)`,
          textShadow: "0 4px 0 rgba(96,32,20,.35), 0 18px 44px rgba(0,0,0,.34)",
        }}
      >
        #1 OCR MODEL
      </div>

      <ProgressBar duration={UNLIMITED_OCR_SCENE_1_DURATION} color={UO_CREAM} />
      <Audio src={staticFile("sounds/riser.mp3")} startFrom={0} volume={0.34} />
      <Audio src={staticFile("sounds/Pop.mp3")} startFrom={0} volume={0.48} />
    </AbsoluteFill>
  );
};

