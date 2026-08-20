import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const KARPATHY_GITHUB_REPO_HIGHLIGHT_DURATION = 120;

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const COLORS = {
  bg: "#0d1117",
  text: "#f0f6fc",
  muted: "#c9d1d9",
  dim: "#8b949e",
  blue: "#58a6ff",
  note: "#1f6feb",
  warning: "#d29922",
  claude: "#DE7356",
};

const font = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

const GitHubLogo: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const markIn = spring({
    frame,
    fps,
    config: {damping: 180, stiffness: 240},
  });

  return (
  <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: 12}}>
    <svg
      width="58"
      height="58"
      viewBox="0 0 98 96"
      fill="none"
      style={{
        opacity: interpolate(frame, [0, 8], [0, 1], clamp),
        transform: `scale(${interpolate(markIn, [0, 1], [0.72, 1], clamp)})`,
        transformOrigin: "center",
      }}
    >
      <path
        fill="#ffffff"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M48.9 0C21.9 0 0 22 0 49.2c0 21.7 14 40.1 33.4 46.6 2.4.5 3.3-1.1 3.3-2.4 0-1.2-.1-5.2-.1-9.4-13.6 3-16.5-5.9-16.5-5.9-2.2-5.7-5.4-7.2-5.4-7.2-4.4-3 .3-3 .3-3 4.9.4 7.5 5.1 7.5 5.1 4.3 7.5 11.4 5.3 14.2 4.1.4-3.2 1.7-5.3 3.1-6.5-10.8-1.2-22.2-5.5-22.2-24.3 0-5.4 1.9-9.8 5-13.2-.5-1.2-2.2-6.2.5-13 0 0 4.1-1.3 13.4 5 3.9-1.1 8.1-1.6 12.3-1.6s8.4.6 12.3 1.6c9.3-6.3 13.4-5 13.4-5 2.7 6.8 1 11.8.5 13 3.1 3.4 5 7.8 5 13.2 0 18.9-11.4 23-22.3 24.3 1.7 1.5 3.3 4.5 3.3 9.1 0 6.5-.1 11.8-.1 13.4 0 1.3.9 2.9 3.4 2.4C84 89.2 98 70.9 98 49.2 98 22 76 0 48.9 0Z"
      />
    </svg>
    <span style={{display: "inline-flex", fontFamily: font, color: COLORS.text, fontSize: 62, fontWeight: 800, letterSpacing: -2}}>
      {"GitHub".split("").map((letter, index) => {
        const start = 8 + index * 3;
        const flag = spring({
          frame: frame - start,
          fps,
          config: {damping: 82, stiffness: 340},
        });
        const opacity = interpolate(frame, [start, start + 8], [0, 1], clamp);
        const y = interpolate(flag, [0, 1], [-18, 0], clamp);
        const rotate = interpolate(flag, [0, 0.55, 1], [-20, 9, 0], clamp);
        const skew = interpolate(flag, [0, 0.45, 1], [-18, 7, 0], clamp);

        return (
          <span
            key={`${letter}-${index}`}
            style={{
              display: "inline-block",
              opacity,
              transform: `translateY(${y}px) rotate(${rotate}deg) skewY(${skew}deg)`,
              transformOrigin: "50% 0%",
            }}
          >
            {letter}
          </span>
        );
      })}
    </span>
  </div>
  );
};

const enterStyle = (
  frame: number,
  fps: number,
  startFrame: number,
  travel = 18,
): React.CSSProperties => {
  const entered = spring({
    frame: frame - startFrame,
    fps,
    config: {damping: 150, stiffness: 160},
  });
  const opacity = interpolate(frame, [startFrame, startFrame + 10], [0, 1], clamp);

  return {
    opacity,
    transform: `translateY(${interpolate(entered, [0, 1], [travel, 0], clamp)}px)`,
  };
};

const RoughHighlight: React.FC<{
  width: number;
  height: number;
  startFrame: number;
}> = ({width, height, startFrame}) => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame, [startFrame, startFrame + 24], [0, 1], clamp);
  const visible = width * reveal;

  return (
    <div
      style={{
        position: "absolute",
        left: -10,
        top: 0,
        width: visible,
        height,
        overflow: "hidden",
      }}
    >
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <filter id="marker-edge-noise" x="-4%" y="-20%" width="108%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.035 0.42"
              numOctaves="2"
              seed="11"
              result="noise"
            />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.6" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>

        <g filter="url(#marker-edge-noise)">
          <path
            d={`M4 13 L${width - 5} 12 L${width - 4} ${height - 11} L5 ${height - 10} Z`}
            fill={COLORS.claude}
            opacity={0.97}
          />
          <path
            d={`M8 11 L42 10 L76 11 L112 10 L151 11 L190 10 L229 11 L270 10 L310 11 L351 10 L392 11 L435 10 L477 11 L519 10 L${width - 8} 11 L${width - 7} 17 L518 16 L476 17 L435 16 L392 17 L350 16 L309 17 L269 16 L229 17 L189 16 L151 17 L112 16 L75 17 L42 16 L8 17 Z`}
            fill="#e78368"
            opacity={0.75}
          />
          <path
            d={`M7 ${height - 18} L42 ${height - 17} L77 ${height - 18} L113 ${height - 17} L151 ${height - 18} L190 ${height - 17} L229 ${height - 18} L270 ${height - 17} L310 ${height - 18} L351 ${height - 17} L392 ${height - 18} L435 ${height - 17} L477 ${height - 18} L519 ${height - 17} L${width - 7} ${height - 18} L${width - 6} ${height - 11} L520 ${height - 10} L477 ${height - 11} L436 ${height - 10} L392 ${height - 11} L351 ${height - 10} L310 ${height - 11} L269 ${height - 10} L229 ${height - 11} L190 ${height - 10} L151 ${height - 11} L112 ${height - 10} L77 ${height - 11} L42 ${height - 10} L7 ${height - 11} Z`}
            fill="#c85f46"
            opacity={0.38}
          />
        </g>

        {[
          [16, 9, 16, 5], [53, 10, 11, 4], [92, 9, 19, 5], [139, 10, 13, 4],
          [181, 9, 22, 5], [234, 10, 14, 4], [281, 9, 18, 5], [329, 10, 11, 4],
          [372, 9, 20, 5], [424, 10, 15, 4], [469, 9, 22, 5], [528, 10, 16, 4],
          [31, height - 13, 18, 5], [74, height - 14, 13, 4], [121, height - 13, 24, 5],
          [177, height - 14, 16, 4], [226, height - 13, 21, 5], [278, height - 14, 12, 4],
          [316, height - 13, 20, 5], [363, height - 14, 15, 4], [412, height - 13, 23, 5],
          [468, height - 14, 13, 4], [519, height - 13, 19, 5],
        ].map(([x, y, w, h], index) => (
          <rect key={index} x={x} y={y} width={w} height={h} rx="1.5" fill={COLORS.bg} opacity={0.16} />
        ))}

        {[
          [5, 19, 6, 10], [7, 36, 5, 12], [width - 12, 18, 6, 11], [width - 11, 39, 5, 10],
        ].map(([x, y, w, h], index) => (
          <rect key={`side-${index}`} x={x} y={y} width={w} height={h} rx="1.5" fill={COLORS.bg} opacity={0.14} />
        ))}

        <path
          d={`M19 24 L121 22 M148 23 L255 22 M286 24 L402 23 M431 22 L548 23`}
          stroke="#f1a086"
          strokeWidth="2"
          strokeLinecap="round"
          opacity={0.32}
        />
        <path
          d={`M24 ${height - 22} L93 ${height - 21} M132 ${height - 22} L224 ${height - 21} M267 ${height - 22} L342 ${height - 21} M392 ${height - 22} L514 ${height - 21}`}
          stroke="#a84532"
          strokeWidth="2"
          strokeLinecap="round"
          opacity={0.2}
        />
      </svg>
    </div>
  );
};

const Callout: React.FC<{
  type: "note" | "warning";
  title: string;
  body: string;
}> = ({type, title, body}) => {
  const color = type === "note" ? COLORS.note : COLORS.warning;
  const icon = type === "note" ? "i" : "!";

  return (
    <div style={{display: "flex", gap: 20, marginTop: 28}}>
      <div style={{width: 5, background: color, borderRadius: 4}} />
      <div>
        <div style={{display: "flex", alignItems: "center", gap: 10, color, fontSize: 24, fontWeight: 700}}>
          <span
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              border: `2px solid ${color}`,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              fontWeight: 900,
            }}
          >
            {icon}
          </span>
          {title}
        </div>
        <div style={{color: COLORS.text, fontSize: 22, lineHeight: 1.48, marginTop: 14}}>
          {body}
        </div>
      </div>
    </div>
  );
};

const LinkLine: React.FC<{label: string; indent?: boolean}> = ({label, indent = true}) => (
  <div
    style={{
      color: COLORS.blue,
      fontSize: 23,
      lineHeight: 1.62,
      paddingLeft: indent ? 42 : 14,
      position: "relative",
      textDecoration: "underline",
      textUnderlineOffset: 3,
    }}
  >
    <span style={{position: "absolute", left: indent ? 18 : 0, color: COLORS.muted, textDecoration: "none"}}>
      {indent ? "◦" : "•"}
    </span>
    {label}
  </div>
);

export const SceneKarpathyGithubRepoHighlight: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const cameraScale = interpolate(frame, [0, 44, 86, 120], [1.14, 0.86, 1, 1], clamp);
  const cameraY = interpolate(frame, [0, 44, 86, 120], [42, -6, 0, 0], clamp);
  const cameraBlur = interpolate(frame, [0, 12, 44, 60], [2.2, 0, 0.4, 0], clamp);
  const pageOpacity = interpolate(frame, [0, 10], [0, 1], clamp);

  return (
    <AbsoluteFill style={{background: COLORS.bg, overflow: "hidden"}}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 0%, rgba(88,166,255,0.08), transparent 32%), radial-gradient(circle at 18% 22%, rgba(222,115,86,0.07), transparent 20%)",
          opacity: 0.55,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 246,
          display: "flex",
          justifyContent: "center",
          opacity: pageOpacity,
          transform: `translateY(${cameraY}px) scale(${cameraScale})`,
          transformOrigin: "50% 7%",
          filter: `blur(${cameraBlur}px)`,
        }}
      >
        <div style={{width: 930}}>
          <div style={{fontFamily: font}}>
          <GitHubLogo />

          <div
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              marginTop: 58,
              height: 70,
              padding: "0 18px",
              ...enterStyle(frame, fps, 10, 20),
            }}
          >
            <RoughHighlight width={590} height={70} startFrame={52} />
            <span
              style={{
                position: "relative",
                color: COLORS.text,
                fontFamily: font,
                fontSize: 50,
                lineHeight: 1,
                fontWeight: 800,
                letterSpacing: -0.8,
                textShadow: "0 1px 0 rgba(255,255,255,0.18)",
              }}
            >
              andrej-karpathy-skills
            </span>
          </div>

          <div style={{height: 1, background: "#30363d", marginTop: 22, ...enterStyle(frame, fps, 16, 8)}} />

          <p style={{color: COLORS.text, fontSize: 22, lineHeight: 1.55, margin: "26px 0 0", ...enterStyle(frame, fps, 18, 18)}}>
            A single CLAUDE.md file to improve Claude Code behavior, derived from Andrej Karpathy's
            observations on LLM coding pitfalls.
          </p>

          <div style={enterStyle(frame, fps, 28, 20)}>
            <Callout
              type="note"
              title="Note"
              body="Use this repo when you want Claude Code to think before editing and avoid silent assumptions."
            />
          </div>

          <div style={enterStyle(frame, fps, 38, 20)}>
            <Callout
              type="warning"
              title="Warning"
              body="These rules are designed to fight overengineering, hidden confusion, and edits that touch code they shouldn't."
            />
          </div>

          <div style={{marginTop: 30, ...enterStyle(frame, fps, 50, 24)}}>
            <LinkLine label="Karpathy-Inspired Claude Code Guidelines" indent={false} />
            <LinkLine label="Think Before Coding" />
            <LinkLine label="Simplicity First" />
            <LinkLine label="Surgical Changes" />
            <LinkLine label="Goal-Driven Execution" />
            <LinkLine label="CLAUDE.md" />
            <LinkLine label="README.md" />
          </div>
          </div>
        </div>
      </div>

      <Sequence from={2}>
        <Audio src={staticFile("sounds/woosh.mp3")} volume={0.3} />
      </Sequence>
      <Sequence from={52}>
        <Audio src={staticFile("sounds/Pop.mp3")} volume={0.38} />
      </Sequence>
    </AbsoluteFill>
  );
};
