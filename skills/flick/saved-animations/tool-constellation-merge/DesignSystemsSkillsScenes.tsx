import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const DESIGN_SYSTEMS_SCENE_1_DURATION = 120;
export const DESIGN_SYSTEMS_SCENE_2_DURATION = 138;
export const DESIGN_SYSTEMS_FULL_DURATION =
  DESIGN_SYSTEMS_SCENE_1_DURATION + DESIGN_SYSTEMS_SCENE_2_DURATION;

const THEME = {
  bgOrange:
    "radial-gradient(ellipse at 45% 35%, #E8896E 0%, #DE7356 55%, #C45A3E 100%)",
  claudePeach: "#DE7356",
  cream: "#FAF3EA",
};

const COLORS = {
  claude: "#DE7356",
  claudeDeep: "#B9563D",
  cream: "#F2E9D8",
  ink: "#1B2226",
  playwright: "#10A37F",
  playwrightDeep: "#0C6F58",
  dark: "#10161A",
  dark2: "#172025",
  chalk: "#F3F0E8",
};

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const tileShadow = `
  0 2px 4px rgba(0,0,0,0.22),
  0 8px 24px rgba(0,0,0,0.34),
  0 28px 64px rgba(0,0,0,0.38),
  0 70px 140px rgba(0,0,0,0.28)
`;

const fade = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], clamp);

const tilePop = (frame: number, fps: number, startFrame: number) =>
  spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 200, stiffness: 260 },
  });

const absorbProgress = (frame: number, startFrame: number, endFrame: number) =>
  interpolate(frame, [startFrame, endFrame], [0, 1], clamp);

const ClaudeLogoAsset: React.FC<{
  size: number;
  opacity?: number;
  filter?: string;
}> = ({ size, opacity = 1, filter }) => (
  <Img
    src={staticFile("claude.png")}
    style={{
      width: size,
      height: size,
      objectFit: "contain",
      opacity,
      filter,
    }}
  />
);

const GithubRepoLogo: React.FC<{src: string}> = ({src}) => (
  <Img
    src={staticFile(src)}
    style={{
      width: "100%",
      height: "100%",
      objectFit: "contain",
      objectPosition: "center",
      display: "block",
    }}
  />
);

const RepoLogoTile: React.FC<{
  src: string;
  x: number;
  y: number;
  startFrame: number;
  absorbStart: number;
  absorbEnd: number;
  delay: number;
  rotateTo: number;
}> = ({ src, x, y, startFrame, absorbStart, absorbEnd, delay, rotateTo }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = tilePop(frame, fps, startFrame);
  const absorb = absorbProgress(frame, absorbStart + delay, absorbEnd + delay);
  const settle = Math.sin(frame * 0.08 + delay * 0.1) * 7;

  const currentX = interpolate(absorb, [0, 1], [x, 0], clamp);
  const currentY = interpolate(absorb, [0, 1], [y + settle, 0], clamp);
  const scale = pop * interpolate(absorb, [0, 0.72, 1], [1, 0.74, 0.1], clamp);
  const opacity =
    fade(frame, startFrame, startFrame + 8) *
    interpolate(absorb, [0, 0.72, 1], [1, 1, 0], clamp);
  const rotate = interpolate(absorb, [0, 1], [0, rotateTo], clamp);

  return (
    <div
      style={{
        position: "absolute",
        left: 540 - 118,
        top: 620 - 118,
        width: 236,
        height: 236,
        borderRadius: 44,
        background: "linear-gradient(180deg, #ffffff 0%, #f5f5f5 100%)",
        border: "4px solid rgba(255,255,255,0.88)",
        boxShadow: tileShadow,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity,
        transform: `translate(${currentX}px, ${currentY}px) scale(${scale}) rotate(${rotate}deg)`,
        transformOrigin: "center",
        zIndex: 24,
        overflow: "hidden",
        padding: 8,
      }}
    >
      <GithubRepoLogo src={src} />
    </div>
  );
};

const CenterClaudeTile: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = tilePop(frame, fps, 26);
  const pulse = 1 + Math.sin(frame * 0.12) * 0.012;
  const glow = interpolate(frame, [82, 102], [0, 1], clamp);

  return (
    <div
      style={{
        position: "absolute",
        left: 540 - 145,
        top: 620 - 145,
        width: 290,
        height: 290,
        borderRadius: 34,
        background: "linear-gradient(180deg, #E8896E 0%, #D96F52 100%)",
        border: "5px solid rgba(255,255,255,0.88)",
        boxShadow: `
          0 0 ${interpolate(glow, [0, 1], [0, 55], clamp)}px rgba(255,255,255,0.72),
          ${tileShadow}
        `,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: fade(frame, 22, 32),
        transform: `scale(${pop * pulse})`,
        zIndex: 30,
      }}
    >
      <ClaudeLogoAsset
        size={188}
        filter="brightness(0) invert(1) sepia(13%) saturate(635%) hue-rotate(318deg) brightness(112%) contrast(104%)"
      />
    </div>
  );
};

const GridBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, DESIGN_SYSTEMS_SCENE_1_DURATION], [0, -36], clamp);

  return (
    <>
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.13) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.13) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          transform: `translate(${drift}px, ${drift}px)`,
          opacity: 0.34,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 32%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.05) 23%, rgba(0,0,0,0.12) 58%, rgba(0,0,0,0.28) 100%)",
        }}
      />
    </>
  );
};

const RotatingClaudeShadow: React.FC = () => {
  const frame = useCurrentFrame();
  const appear = fade(frame, 20, 38);
  const scale = interpolate(appear, [0, 1], [0.76, 1], clamp);

  return (
    <div
      style={{
        position: "absolute",
        left: 540 - 335,
        top: 620 - 335,
        width: 670,
        height: 670,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: appear * 0.28,
        filter: "blur(2px)",
        transform: `scale(${scale}) rotate(${frame * 2.8}deg)`,
        zIndex: 18,
      }}
    >
      <ClaudeLogoAsset size={640} filter="brightness(0) blur(2px)" />
    </div>
  );
};

export const DesignSystemsScene1Constellation: React.FC = () => {
  const frame = useCurrentFrame();
  const finalPulse = interpolate(frame, [92, 104, 119], [0, 1, 0.35], clamp);

  return (
    <AbsoluteFill
      style={{
        background: THEME.bgOrange,
        overflow: "hidden",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <GridBackground />
      <RotatingClaudeShadow />

      <div
        style={{
          position: "absolute",
          left: 540 - 210,
          top: 620 - 210,
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(255,248,242,${0.22 * finalPulse}) 0%, rgba(255,248,242,0) 68%)`,
          filter: "blur(2px)",
          zIndex: 22,
        }}
      />

      <RepoLogoTile src="EmilKowalski.png" x={-375} y={105} startFrame={40} absorbStart={74} absorbEnd={100} delay={0} rotateTo={-30} />
      <RepoLogoTile src="impeccable.png" x={-45} y={-340} startFrame={46} absorbStart={74} absorbEnd={100} delay={4} rotateTo={34} />
      <RepoLogoTile src="playwright-github.png" x={380} y={-25} startFrame={52} absorbStart={74} absorbEnd={100} delay={8} rotateTo={-30} />

      <CenterClaudeTile />

      <Sequence from={38}>
        <Audio src={staticFile("sounds/Pop.mp3")} volume={0.42} />
      </Sequence>
      <Sequence from={45}>
        <Audio src={staticFile("sounds/Pop.mp3")} volume={0.36} />
      </Sequence>
      <Sequence from={52}>
        <Audio src={staticFile("sounds/Pop.mp3")} volume={0.34} />
      </Sequence>
      <Sequence from={75}>
        <Audio src={staticFile("sounds/Deepwoosh.mp3")} volume={0.55} />
      </Sequence>
    </AbsoluteFill>
  );
};

const leftText = `# Figma MCP

- Reads real frames
- Pulls design tokens
- Maps components
- Sends layout to Claude`;

const rightText = `# Playwright Tests

- Opens the website
- Clicks real flows
- Checks responsive UI
- Catches broken states`;

const clamp01 = (value: number, min = 0, max = 1) =>
  Math.max(min, Math.min(max, value));

const typedText = (text: string, frame: number, start: number, charsPerFrame: number) =>
  text.slice(0, Math.floor(clamp01((frame - start) * charsPerFrame, 0, text.length)));

const TypingBlock: React.FC<{
  text: string;
  start: number;
  charsPerFrame: number;
  color: string;
  accent: string;
  style: React.CSSProperties;
  cursorColor: string;
}> = ({text, start, charsPerFrame, color, accent, style, cursorColor}) => {
  const frame = useCurrentFrame();
  const visible = typedText(text, frame, start, charsPerFrame);
  const lines = visible.split("\n");
  const showCursor = frame > start && frame < start + text.length / charsPerFrame + 20;
  const cursorOn = Math.floor(frame / 6) % 2 === 0;

  return (
    <div
      style={{
        position: "absolute",
        fontFamily: "'JetBrains Mono', 'SFMono-Regular', Consolas, monospace",
        color,
        whiteSpace: "pre-wrap",
        lineHeight: 1.24,
        letterSpacing: 0,
        ...style,
      }}
    >
      {lines.map((line, index) => {
        const isHeading = line.startsWith("#");
        return (
          <div
            key={`${line}-${index}`}
            style={{
              minHeight: isHeading ? 58 : 36,
              fontSize: isHeading ? 34 : 25,
              fontWeight: isHeading ? 760 : 590,
              color: isHeading ? accent : color,
              textShadow: isHeading
                ? "0 2px 14px rgba(0,0,0,0.12)"
                : "0 1px 8px rgba(0,0,0,0.08)",
            }}
          >
            {line}
            {index === lines.length - 1 && showCursor && cursorOn ? (
              <span style={{color: cursorColor}}>_</span>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

const PaperGrain: React.FC<{dark?: boolean}> = ({dark = false}) => (
  <AbsoluteFill
    style={{
      opacity: dark ? 0.2 : 0.42,
      backgroundImage:
        "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.45) 0 1px, transparent 1px), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.18) 0 1px, transparent 1px)",
      backgroundSize: "22px 22px, 31px 31px",
      mixBlendMode: dark ? "screen" : "multiply",
    }}
  />
);

const BADGE_LEFT_CLIP = "polygon(0 0, 75% 0, 28% 100%, 0 100%)";
const BADGE_RIGHT_CLIP = "polygon(75% 0, 100% 0, 100% 100%, 28% 100%)";

const MaskedRotatingLogo: React.FC<{
  src: string;
  clipPath: string;
  spin: number;
  size: number;
  opacity?: number;
  filter?: string;
}> = ({src, clipPath, spin, size, opacity = 1, filter}) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      borderRadius: "50%",
      clipPath,
      overflow: "hidden",
    }}
  >
    <div
      style={{
        position: "absolute",
        left: 162 - size / 2,
        top: 162 - size / 2,
        width: size,
        height: size,
        transform: `rotate(${spin}deg)`,
        transformOrigin: "50% 50%",
        opacity,
        filter,
      }}
    >
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </div>
  </div>
);

const CenterBadge: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({
    frame: frame - 18,
    fps,
    config: {damping: 12, stiffness: 150, mass: 0.65},
  });
  const spin = frame * 2.4;
  const pulse = Math.sin(frame / 7) * 0.018;

  return (
    <div
      style={{
        position: "absolute",
        left: 540 - 162,
        top: 960 - 162,
        width: 324,
        height: 324,
        borderRadius: "50%",
        transform: `scale(${0.72 + pop * 0.28 + pulse})`,
        opacity: interpolate(frame, [10, 24], [0, 1], clamp),
        boxShadow:
          "0 0 0 2px rgba(222,115,86,0.8), 0 0 0 5px rgba(16,163,127,0.4), 0 34px 80px rgba(0,0,0,0.38)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          overflow: "hidden",
          background: COLORS.dark,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            clipPath: BADGE_LEFT_CLIP,
            background: COLORS.cream,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            clipPath: BADGE_RIGHT_CLIP,
            background: `linear-gradient(145deg, ${COLORS.dark2}, #092B24)`,
          }}
        />
        <PaperGrain />
        <div
          style={{
            position: "absolute",
            inset: 0,
            clipPath: BADGE_LEFT_CLIP,
            background: "rgba(222,115,86,0.15)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            clipPath: BADGE_RIGHT_CLIP,
            background: "rgba(16,163,127,0.12)",
          }}
        />
      </div>

      <MaskedRotatingLogo
        src="Figma.png"
        clipPath={BADGE_LEFT_CLIP}
        spin={spin}
        size={218}
        opacity={1}
        filter="drop-shadow(0 12px 18px rgba(185,86,61,0.32))"
      />
      <MaskedRotatingLogo
        src="playwright.png"
        clipPath={BADGE_RIGHT_CLIP}
        spin={spin}
        size={224}
        opacity={1}
        filter="drop-shadow(0 12px 18px rgba(16,163,127,0.34))"
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: "2px solid rgba(242,233,216,0.7)",
          boxShadow: "inset 0 0 40px rgba(255,255,255,0.16)",
        }}
      />
    </div>
  );
};

export const DesignSystemsScene2FigmaPlaywright: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const leftWipe = spring({
    frame: frame - 2,
    fps,
    config: {damping: 16, stiffness: 90, mass: 0.95},
  });
  const rightWipe = spring({
    frame: frame - 7,
    fps,
    config: {damping: 16, stiffness: 88, mass: 0.95},
  });
  const camera = interpolate(frame, [0, 24, 96, 137], [1.08, 1.02, 1, 1.015], clamp);

  return (
    <AbsoluteFill
      style={{
        background: COLORS.dark,
        overflow: "hidden",
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <Audio src={staticFile("sounds/woosh.mp3")} volume={(f) => (f < 28 ? 0.35 : 0)} />
      <Audio src={staticFile("sounds/Typing.mp3")} volume={(f) => (f > 14 && f < 108 ? 0.17 : 0)} />
      <Audio src={staticFile("sounds/Pop.mp3")} volume={(f) => (f > 17 && f < 30 ? 0.22 : 0)} />

      <AbsoluteFill
        style={{
          transform: `scale(${camera})`,
          transformOrigin: "50% 50%",
        }}
      >
        <AbsoluteFill
          style={{
            background: `linear-gradient(130deg, ${COLORS.dark2}, ${COLORS.dark} 58%, #07120F)`,
            opacity: rightWipe,
          }}
        >
          <PaperGrain dark />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(112deg, transparent 0 45%, rgba(16,163,127,0.24) 60%, rgba(16,163,127,0.08) 100%)",
            }}
          />
          <TypingBlock
            text={rightText}
            start={23}
            charsPerFrame={1.55}
            color={COLORS.chalk}
            accent={COLORS.playwright}
            cursorColor={COLORS.playwright}
            style={{
              left: 735,
              top: 493,
              width: 600,
              opacity: interpolate(frame, [15, 26], [0, 1], clamp),
            }}
          />
        </AbsoluteFill>

        <AbsoluteFill
          style={{
            clipPath: "polygon(0 0, 92% 0, 9% 100%, 0 100%)",
            transform: `translateX(${interpolate(leftWipe, [0, 1], [-280, 0])}px)`,
            background: `linear-gradient(132deg, #fff8ea 0%, ${COLORS.cream} 48%, #E7D2B8 100%)`,
            boxShadow: "22px 0 0 rgba(222,115,86,0.55)",
          }}
        >
          <PaperGrain />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(112deg, rgba(222,115,86,0.28) 0%, rgba(222,115,86,0.06) 44%, transparent 55%)",
            }}
          />
          <TypingBlock
            text={leftText}
            start={17}
            charsPerFrame={1.12}
            color={COLORS.ink}
            accent={COLORS.claudeDeep}
            cursorColor={COLORS.claude}
            style={{
              left: 56,
              top: 493,
              width: 650,
              opacity: interpolate(frame, [10, 22], [0, 1], clamp),
            }}
          />
        </AbsoluteFill>

        <CenterBadge />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const DesignSystemsSkillsFull: React.FC = () => (
  <AbsoluteFill style={{ background: THEME.cream }}>
    <Sequence durationInFrames={DESIGN_SYSTEMS_SCENE_1_DURATION}>
      <DesignSystemsScene1Constellation />
    </Sequence>
    <Sequence from={DESIGN_SYSTEMS_SCENE_1_DURATION} durationInFrames={DESIGN_SYSTEMS_SCENE_2_DURATION}>
      <DesignSystemsScene2FigmaPlaywright />
    </Sequence>
  </AbsoluteFill>
);
