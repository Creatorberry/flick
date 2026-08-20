import React from "react";
import {
  AbsoluteFill,
  Audio,
  Freeze,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const GRAPHIFY_SCENE_1_DURATION = 157;
export const GRAPHIFY_SCENE_2_DURATION = 175;
export const GRAPHIFY_SCENE_3_DURATION = 172;
export const GRAPHIFY_SCENE_4_DURATION = 180;
export const GRAPHIFY_SCENE_5_DURATION = 68;
export const GRAPHIFY_SCENE_6_DURATION = 241;
export const GRAPHIFY_SCENE_7_DURATION = 104;
export const GRAPHIFY_FULL_DURATION = 1209;

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};
const ORANGE =
  "radial-gradient(ellipse at 45% 35%, #E8896E 0%, #DE7356 55%, #C45A3E 100%)";
const CREAM = "#FAF3EA";
const LABEL = "'Times New Roman', Times, serif";
const UI = "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
const CODE = "Consolas, 'Courier New', Courier, monospace";
const SHADOW =
  "0 2px 4px rgba(0,0,0,.22), 0 8px 24px rgba(0,0,0,.38), 0 28px 64px rgba(0,0,0,.45), 0 70px 140px rgba(0,0,0,.35)";

const headingIn = (frame: number, fps: number, delay = 0) => {
  const p = spring({frame: frame - delay, fps, config: {damping: 200}});
  return {
    opacity: interpolate(p, [0, 1], [0, 1], clamp),
    transform: `translateY(${interpolate(p, [0, 1], [36, 0], clamp)}px) scale(${interpolate(p, [0, 1], [.92, 1], clamp)})`,
  };
};

const Asterisk: React.FC<{size?: number; color?: string}> = ({
  size = 18,
  color = "#cc785c",
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <g stroke={color} strokeWidth="11" strokeLinecap="butt">
      {[352, 313, 278, 245, 212, 180, 146, 132, 94, 61, 46, 16].map(
        (angle) => (
          <line
            key={angle}
            x1="50"
            y1="50"
            x2="92"
            y2="50"
            transform={`rotate(${angle} 50 50)`}
          />
        ),
      )}
    </g>
    <circle cx="50" cy="50" r="11" fill={color} />
  </svg>
);

const Robot: React.FC<{width?: number}> = ({width = 104}) => (
  <svg
    viewBox="0 0 242 152"
    width={width}
    height={(width / 242) * 152}
    shapeRendering="crispEdges"
  >
    <rect x="30" y="0" width="182" height="32" fill="#cc785c" />
    <rect x="30" y="32" width="31" height="28" fill="#cc785c" />
    <rect x="72" y="32" width="98" height="28" fill="#cc785c" />
    <rect x="181" y="32" width="31" height="28" fill="#cc785c" />
    <rect x="0" y="60" width="242" height="32" fill="#cc785c" />
    <rect x="30" y="92" width="182" height="30" fill="#cc785c" />
    {[42, 72, 151, 181].map((x) => (
      <rect key={x} x={x} y="122" width="19" height="30" fill="#cc785c" />
    ))}
  </svg>
);

const WindowChrome: React.FC<{
  children: React.ReactNode;
  burgundy?: boolean;
  inputText?: string;
  inputActive?: boolean;
}> = ({children, burgundy = false, inputText, inputActive = false}) => (
  <div
    style={{
      width: 960,
      height: 800,
      overflow: "hidden",
      borderRadius: 14,
      border: "1px solid #3a3a3a",
      background: "#1e1e1e",
      boxShadow: SHADOW,
      fontFamily: UI,
    }}
  >
    <div
      style={{
        height: 40,
        background: "#2a2a2a",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 12px",
        borderBottom: "1px solid #3a3a3a",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          background: "#1e1e1e",
          border: "1px solid #3a3a3a",
          borderBottomColor: "#1e1e1e",
          borderRadius: "7px 7px 0 0",
          padding: "7px 13px",
          color: "#d4d4d4",
          fontSize: 13,
        }}
      >
        <Asterisk size={14} />
        <span>Claude Code</span>
        <span style={{color: "#888", marginLeft: 5}}>x</span>
      </div>
      <span style={{color: "#888", fontSize: 18}}>...</span>
    </div>
    <div
      style={{
        height: 36,
        background: "#1e1e1e",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        borderBottom: "1px solid #2e2e2e",
        color: "#c8c8c8",
        fontSize: 14,
      }}
    >
      <span>Untitled</span>
      <span style={{color: "#777"}}>status&nbsp;&nbsp;menu</span>
    </div>
    <div
      style={{
        height: 604,
        position: "relative",
        overflow: "hidden",
        background: burgundy ? "#32051f" : "#1a1a1a",
      }}
    >
      {children}
    </div>
    <div
      style={{
        height: 120,
        background: "#1e1e1e",
        borderTop: "1px solid #2e2e2e",
        padding: "12px 14px 8px",
      }}
    >
      <div
        style={{
          height: 48,
          display: "flex",
          alignItems: "center",
          background: "#2a2a2a",
          border: "1px solid #3a3a3a",
          borderRadius: 9,
          padding: "0 14px",
          color: inputText ? "#f2f2f2" : "#777",
          fontSize: 15,
          fontFamily: inputText ? CODE : UI,
        }}
      >
        {inputText ?? "ctrl esc to focus or unfocus Claude"}
        {inputActive ? <span style={{marginLeft: 2}}>|</span> : null}
      </div>
      <div
        style={{
          height: 42,
          display: "flex",
          alignItems: "center",
          gap: 8,
          color: "#888",
          fontSize: 13,
        }}
      >
        <span style={{fontSize: 24, width: 30, textAlign: "center"}}>+</span>
        <span
          style={{
            border: "1px solid #3a3a3a",
            background: "#2a2a2a",
            borderRadius: 6,
            padding: "5px 10px",
            color: "#c0c0c0",
          }}
        >
          index.html
        </span>
        <span
          style={{
            marginLeft: "auto",
            border: "1px solid #3a3a3a",
            background: "#2a2a2a",
            borderRadius: 6,
            padding: "6px 12px",
            color: "#c0c0c0",
          }}
        >
          &lt;/&gt; Edit automatically
        </span>
      </div>
    </div>
  </div>
);

const SceneShell: React.FC<{
  children: React.ReactNode;
  background: string;
  heading?: string;
  headingColor?: string;
  headingSize?: number;
}> = ({
  children,
  background,
  heading,
  headingColor = "#FAF3EA",
  headingSize = 112,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill style={{background, overflow: "hidden"}}>
      {heading ? (
        <div
          style={{
            position: "absolute",
            top: 170,
            left: 40,
            right: 40,
            textAlign: "center",
            fontFamily: LABEL,
            fontStyle: "italic",
            fontWeight: 700,
            fontSize: headingSize,
            lineHeight: .92,
            color: headingColor,
            textShadow:
              headingColor === "#FAF3EA"
                ? "0 4px 0 rgba(120,45,28,.32), 0 14px 36px rgba(95,37,24,.22)"
                : "0 2px 0 rgba(255,255,255,.55), 0 12px 28px rgba(112,57,38,.16)",
            ...headingIn(frame, fps, 3),
          }}
        >
          {heading}
        </div>
      ) : null}
      {children}
    </AbsoluteFill>
  );
};

export const GraphifyScene1: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const logoIn = spring({frame: frame - 34, fps, config: {damping: 170}});
  const logoOut = spring({frame: frame - 83, fps, config: {damping: 160}});
  const scrollDown = Math.round(
    interpolate(frame, [0, 78], [0, 26], clamp),
  );
  const scrollBack = Math.round(
    interpolate(frame, [78, 114], [26, 0], clamp),
  );
  const scrollFrame = frame < 78 ? scrollDown : scrollBack;
  const pageScale = interpolate(frame, [114, 136], [1, 1.72], clamp);
  const pageX = interpolate(frame, [114, 136], [0, 610], clamp);
  const pageY = interpolate(frame, [114, 136], [0, 200], clamp);
  const blur = interpolate(frame, [0, 24, 42], [12, 7, 0], clamp);
  const logoOpacity = interpolate(logoOut, [0, 1], [1, 0], clamp);
  const logoX = interpolate(logoOut, [0, 1], [0, 670], clamp);
  const logoY = interpolate(logoOut, [0, 1], [0, -760], clamp);
  const logoScale = interpolate(logoIn, [0, 1], [.2, 1.14], clamp);
  const logoTilt = interpolate(logoIn, [0, 1], [28, 9], clamp);
  const topWobble = Math.sin(frame * .42) * interpolate(logoIn, [0, 1], [12, 3], clamp);
  const highlight = spring({
    frame: frame - 143,
    fps,
    config: {damping: 20, stiffness: 190, mass: .7},
  });

  return (
    <AbsoluteFill style={{background: "#101419", overflow: "hidden"}}>
      <Img
        src={staticFile("graphify-github-frames/frame000.png")}
        style={{
          position: "absolute",
          inset: -120,
          width: 1320,
          height: 2160,
          objectFit: "cover",
          filter: "blur(28px) saturate(.75)",
          opacity: .48,
          transform: "scale(1.08)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 54,
          top: 96,
          width: 972,
          height: 1728,
          borderRadius: 28,
          overflow: "hidden",
          boxShadow: "0 24px 80px rgba(0,0,0,.32)",
          background: "#fff",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            transformOrigin: "50% 7%",
            transform: `translate(${pageX}px, ${pageY}px) scale(${pageScale})`,
          }}
        >
          <Img
            src={staticFile(
              `graphify-github-frames/frame${String(scrollFrame).padStart(3, "0")}.png`,
            )}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: `blur(${blur}px)`,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 146,
              top: 82,
              width: 82,
              height: 24,
              opacity: interpolate(highlight, [0, 1], [0, 1], clamp),
              transform: `scaleX(${interpolate(highlight, [0, 1], [.02, 1], clamp)})`,
              transformOrigin: "left center",
              background: "rgba(167, 146, 255, .34)",
              borderLeft: "2px solid #3F4FF5",
              borderRight: "2px solid #3F4FF5",
              boxShadow: "inset 0 -2px 0 rgba(63,79,245,.22)",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: -6,
                top: -6,
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#3F4FF5",
                boxShadow: "0 2px 8px rgba(63,79,245,.35)",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: -6,
                bottom: -6,
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#3F4FF5",
                boxShadow: "0 2px 8px rgba(63,79,245,.35)",
              }}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 340 + logoX,
          top: 600 + logoY,
          width: 400,
          height: 400,
          borderRadius: "50%",
          overflow: "hidden",
          opacity: logoOpacity,
          transform: `perspective(900px) rotateX(${logoTilt}deg) rotateY(${frame * 24}deg) rotateZ(${topWobble}deg) scale(${logoScale})`,
          boxShadow:
            "0 25px 45px rgba(0,0,0,.4), 0 65px 110px rgba(0,0,0,.45), 0 0 0 12px rgba(255,255,255,.08)",
        }}
      >
        <Img
          src={staticFile("github.png")}
          style={{width: "100%", height: "100%", objectFit: "cover"}}
        />
      </div>
      <Sequence from={22}>
        <Audio src={staticFile("sounds/riser.mp3")} volume={.45} />
      </Sequence>
      <Sequence from={42}>
        <Audio src={staticFile("sounds/Pop.mp3")} volume={.7} />
      </Sequence>
      <Sequence from={83}>
        <Audio src={staticFile("sounds/Deepwoosh.mp3")} volume={.6} />
      </Sequence>
    </AbsoluteFill>
  );
};

const projectLines = [
  "src/auth/session.ts",
  "src/auth/permissions.ts",
  "src/api/routes.ts",
  "src/db/client.ts",
  "src/db/schema.ts",
  "src/services/users.ts",
  "src/services/billing.ts",
  "src/components/App.tsx",
  "src/lib/config.ts",
];

export const GraphifyScene2: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const command = "new Claude Code session";
  const typingStart = 10;
  const typingEnd = 46;
  const submitted = frame >= typingEnd;
  const typed = command.slice(
    0,
    Math.max(
      0,
      Math.floor(
        interpolate(frame, [typingStart, typingEnd], [0, command.length], clamp),
      ),
    ),
  );
  const enter = spring({frame, fps, config: {damping: 200}});
  const settle = spring({frame: frame - 3, fps, config: {damping: 200}});
  const responseFocus = spring({
    frame: frame - typingEnd,
    fps,
    config: {damping: 200},
  });
  const scale = interpolate(responseFocus, [0, 1], [1.46, 1.16], clamp);
  const tx = interpolate(responseFocus, [0, 1], [155, 0], clamp);
  const ty =
    interpolate(settle, [0, 1], [120, -105], clamp) +
    interpolate(responseFocus, [0, 1], [0, 105], clamp);
  return (
    <SceneShell background={ORANGE} heading="FRESH SESSION">
      <div
        style={{
          position: "absolute",
          left: 114,
          top: 500,
          width: 960,
          height: 800,
          transformOrigin: "center center",
          transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
          opacity: interpolate(enter, [0, 1], [0, 1], clamp),
        }}
      >
        <WindowChrome
          inputText={submitted ? undefined : typed}
          inputActive={!submitted && Math.floor(frame / 8) % 2 === 0}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              padding: "34px 34px",
              fontFamily: CODE,
              color: "#D4D4D4",
              fontSize: 20,
              lineHeight: 1.55,
            }}
          >
            <div style={{display: "flex", alignItems: "center", gap: 12, marginBottom: 26}}>
              <Asterisk size={24} />
              <span style={{fontFamily: UI, fontSize: 22, fontWeight: 600}}>
                Claude Code
              </span>
              <Robot width={88} />
            </div>
            <div style={{color: "#8f8f8f", marginBottom: 18}}>
              Starting new session in ~/projects/app
            </div>
            {submitted
              ? projectLines.map((line, i) => {
              const p = spring({
                frame: frame - 54 - i * 9,
                fps,
                config: {damping: 200},
              });
              return (
                <div
                  key={line}
                  style={{
                    opacity: interpolate(p, [0, 1], [0, 1], clamp),
                    transform: `translateX(${interpolate(p, [0, 1], [-28, 0], clamp)}px)`,
                    color: i < 3 ? "#e8c7bc" : "#bfc5c7",
                  }}
                >
                  <span style={{color: "#cc785c"}}>Read</span>&nbsp; {line}
                </div>
              );
              })
              : null}
            <div
              style={{
                marginTop: 18,
                color: "#f0be42",
                opacity: interpolate(frame, [125, 139], [0, 1], clamp),
              }}
            >
              Reading project files...
            </div>
          </div>
        </WindowChrome>
      </div>
      <Sequence from={typingStart} durationInFrames={typingEnd - typingStart}>
        <Audio src={staticFile("sounds/Typing.mp3")} volume={.42} />
      </Sequence>
      <Sequence from={typingEnd}>
        <Audio src={staticFile("sounds/Click.mp3")} volume={.5} />
      </Sequence>
    </SceneShell>
  );
};

export const GraphifyScene3: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const nativeTokens = Math.round(interpolate(frame, [0, 128], [203, 9487], clamp));
  const bigIn = spring({frame: frame - 100, fps, config: {damping: 150}});
  const warningIn = spring({frame: frame - 135, fps, config: {damping: 200}});
  const bigScale = interpolate(bigIn, [0, 1], [.4, 1], clamp);
  return (
    <SceneShell background={ORANGE}>
      <div
        style={{
          position: "absolute",
          left: 114,
          top: 500,
          transform: "translate(0px, 0px) scale(1.18)",
          transformOrigin: "center",
        }}
      >
        <WindowChrome burgundy>
          <div
            style={{
              height: 186,
              background: "#3a0624",
              fontFamily: CODE,
              borderBottom: "2px solid rgba(222,115,86,.72)",
            }}
          >
            <div style={{height: 94, display: "flex", borderBottom: "1px solid rgba(222,115,86,.5)"}}>
              <div
                style={{
                  width: 472,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                  borderRight: "1px solid rgba(222,115,86,.5)",
                }}
              >
                <strong style={{color: "#fff0e8", fontSize: 13}}>
                  Workspace ready
                </strong>
                <Robot width={84} />
                <span style={{fontSize: 13, color: "#caa7b8"}}>
                  Usage overview · Personal workspace
                </span>
              </div>
              <div style={{padding: "14px 18px", color: "#d2b9c4", fontSize: 13}}>
                <strong style={{color: "#f0d8df"}}>Recent activity</strong>
                <div>Exploring project structure</div>
              </div>
            </div>
            <div style={{padding: "13px 20px", color: "#f0be42", fontSize: 16}}>
              Usage is increasing before the first prompt.
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 198,
              fontFamily: CODE,
              fontSize: 18,
              lineHeight: 1.5,
            }}
          >
            <div style={{height: 28, background: "rgba(173,198,195,.32)", color: "#fff"}}>
              understand this project
            </div>
            {["Every file", "Every function", "Every connection"].map((line, i) => (
              <div
                key={line}
                style={{
                  paddingLeft: 20,
                  marginTop: 13,
                  color: i === 2 ? "#f0be42" : "#d4d4d4",
                  opacity: interpolate(frame, [i * 25, i * 25 + 12], [0, 1], clamp),
                }}
              >
                └ {line}
              </div>
            ))}
            <div style={{color: "#d2a3b8", marginTop: 24}}>
              Synthesizing... (45s ·{" "}
              <span
                style={{
                  background: "#5b210b",
                  color: "#ffd244",
                  padding: "1px 8px",
                  borderRadius: 3,
                  fontWeight: 800,
                  boxShadow: "0 0 12px rgba(255,170,0,.35)",
                }}
              >
                {nativeTokens.toLocaleString()} tokens
              </span>{" "}
              · thinking)
            </div>
          </div>
        </WindowChrome>
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `rgba(51,5,31,${interpolate(bigIn, [0, 1], [0, .65], clamp)})`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 60,
          right: 60,
          top: 660,
          textAlign: "center",
          fontFamily: LABEL,
          fontStyle: "italic",
          fontWeight: 700,
          fontSize: 190,
          color: "#ffd244",
          opacity: interpolate(bigIn, [0, 1], [0, 1], clamp),
          transform: `perspective(700px) translateZ(${interpolate(bigIn, [0, 1], [-200, 120], clamp)}px) scale(${bigScale})`,
          textShadow:
            "0 0 18px rgba(255,210,68,.85), 0 0 52px rgba(255,167,32,.72), 0 25px 60px rgba(0,0,0,.5)",
        }}
      >
        {nativeTokens.toLocaleString()}
        <div style={{fontFamily: UI, fontSize: 42, fontStyle: "normal"}}>TOKENS</div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 160,
          right: 160,
          top: 1050,
          padding: "24px 30px",
          borderRadius: 20,
          textAlign: "center",
          fontFamily: UI,
          fontWeight: 800,
          fontSize: 36,
          color: "#fff5de",
          background: "rgba(125,27,30,.92)",
          border: "2px solid rgba(255,210,68,.7)",
          opacity: interpolate(warningIn, [0, 1], [0, 1], clamp),
          transform: `scale(${interpolate(warningIn, [0, 1], [.8, 1], clamp)})`,
        }}
      >
        PLAN USAGE BURNING FAST
      </div>
      <Sequence from={93}>
        <Audio src={staticFile("sounds/riser.mp3")} volume={.5} />
      </Sequence>
      <Sequence from={135}>
        <Audio src={staticFile("sounds/Notification.mp3")} volume={.65} />
      </Sequence>
    </SceneShell>
  );
};

const graphifyOutput = [
  "Graphify v8",
  "Scanning project...",
  "✓ Discovered 247 files",
  "✓ Parsed 1,864 symbols",
  "✓ Extracted functions, classes and imports",
  "✓ Connected dependencies and call relationships",
  "✓ Built graphify-out/graph.json",
  "✓ Generated graphify-out/GRAPH_REPORT.md",
  "✓ Generated graphify-out/graph.html",
  "Knowledge graph ready",
];

export const GraphifyScene4: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const command = "/graphify .";
  const typingStart = 10;
  const typingEnd = 30;
  const typed = command.slice(0, Math.max(0, Math.floor((frame - 10) / 2)));
  const submitted = frame >= 34;
  const responseFocus = spring({frame: frame - 34, fps, config: {damping: 200}});
  const finalFocus = spring({frame: frame - 148, fps, config: {damping: 200}});
  const camScale =
    interpolate(responseFocus, [0, 1], [1.46, 1.16], clamp) +
    interpolate(finalFocus, [0, 1], [0, .1], clamp);
  const camX =
    interpolate(responseFocus, [0, 1], [155, 0], clamp) +
    interpolate(finalFocus, [0, 1], [0, 55], clamp);
  const camY =
    interpolate(responseFocus, [0, 1], [-105, 0], clamp) +
    interpolate(finalFocus, [0, 1], [0, -95], clamp);
  return (
    <SceneShell background={ORANGE}>
      <div
        style={{
          position: "absolute",
          left: 114,
          top: 500,
          transform: `translate(${camX}px, ${camY}px) scale(${camScale})`,
          transformOrigin: "center",
        }}
      >
        <WindowChrome
          inputText={submitted ? undefined : typed}
          inputActive={!submitted && Math.floor(frame / 8) % 2 === 0}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              padding: 28,
              fontFamily: CODE,
              fontSize: 17,
              lineHeight: 1.55,
              color: "#D4D4D4",
            }}
          >
            {submitted ? (
              <>
                <div style={{color: "#fff", marginBottom: 12}}>
                  <span style={{color: "#cc785c"}}>&gt;</span> /graphify .
                </div>
                {graphifyOutput.map((line, i) => {
                  const p = spring({
                    frame: frame - 43 - i * 11,
                    fps,
                    config: {damping: 200},
                  });
                  const success = line.startsWith("✓") || line === "Knowledge graph ready";
                  return (
                    <div
                      key={line}
                      style={{
                        opacity: interpolate(p, [0, 1], [0, 1], clamp),
                        transform: `translateY(${interpolate(p, [0, 1], [12, 0], clamp)}px)`,
                        color: success ? "#78d49a" : line.includes("graph.html") ? "#ffd244" : "#c7c7c7",
                        fontWeight: line === "Knowledge graph ready" ? 800 : 400,
                      }}
                    >
                      {line}
                    </div>
                  );
                })}
              </>
            ) : (
              <div
                style={{
                  position: "absolute",
                  left: 180,
                  top: 230,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 15,
                }}
              >
                <div style={{display: "flex", alignItems: "center", gap: 10}}>
                  <Asterisk size={28} />
                  <span style={{fontFamily: UI, fontSize: 25, fontWeight: 600}}>Claude Code</span>
                </div>
                <Robot width={130} />
              </div>
            )}
          </div>
        </WindowChrome>
      </div>
      <Sequence from={typingStart} durationInFrames={typingEnd - typingStart}>
        <Audio src={staticFile("sounds/Typing.mp3")} volume={.45} />
      </Sequence>
      <Sequence from={34}>
        <Audio src={staticFile("sounds/Click.mp3")} volume={.6} />
      </Sequence>
      <Sequence from={148}>
        <Audio src={staticFile("sounds/Correct.mp3")} volume={.58} />
      </Sequence>
    </SceneShell>
  );
};

const GraphViewport: React.FC<{
  scale: number;
  x: number;
  y: number;
  opacity?: number;
  animatedFrame?: number;
}> = ({scale, x, y, opacity = 1, animatedFrame}) => (
  <div
    style={{
      position: "absolute",
      left: 24,
      top: 430,
      width: 1032,
      height: 1070,
      borderRadius: 26,
      overflow: "hidden",
      background: "#0d0d19",
      border: "1px solid rgba(255,255,255,.08)",
      boxShadow: "0 28px 70px rgba(86,54,39,.22)",
      opacity,
    }}
  >
    <Img
      src={staticFile(
        typeof animatedFrame === "number"
          ? `graphify-node-pulse-frames/frame${String(animatedFrame % 24).padStart(3, "0")}.png`
          : "graphify-graph-focus.png",
      )}
      style={{
        width: 1080,
        height: 1920,
        objectFit: "cover",
        transformOrigin: "top left",
        transform: `translate(${x}px, ${y}px) scale(${scale})`,
      }}
    />
  </div>
);

export const GraphifyScene5: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const reveal = spring({frame, fps, config: {damping: 200}});
  const scale = interpolate(
    frame,
    [0, 18, 42, 67],
    [1.1, 1.22, 1.15, 1.2],
    clamp,
  );
  const x = interpolate(frame, [0, 18, 42, 67], [-35, -115, -45, -82], clamp);
  const y = interpolate(frame, [0, 18, 42, 67], [-265, -350, -292, -330], clamp);
  return (
    <SceneShell
      background={CREAM}
      heading="EVERYTHING MAPPED"
      headingColor="#C45A3E"
      headingSize={104}
    >
      <div
        style={{
          opacity: interpolate(reveal, [0, 1], [0, 1], clamp),
          transform: `scale(${interpolate(reveal, [0, 1], [.92, 1], clamp)})`,
        }}
      >
        <GraphViewport scale={scale} x={x} y={y} animatedFrame={frame} />
      </div>
      <Sequence from={0}>
        <Audio src={staticFile("sounds/woosh.mp3")} volume={.5} />
      </Sequence>
      <Sequence from={33}>
        <Audio src={staticFile("sounds/Pop.mp3")} volume={.55} />
      </Sequence>
    </SceneShell>
  );
};

export const GraphifyScene6: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const graphScale = interpolate(
    frame,
    [0, 55, 105, 150, 185, 240],
    [1.08, 1.2, 1.13, 1.24, 1.1, 1.15],
    clamp,
  );
  const graphX = interpolate(
    frame,
    [0, 55, 105, 150, 185, 240],
    [-12, -96, -38, -122, -18, -48],
    clamp,
  );
  const graphY = interpolate(
    frame,
    [0, 55, 105, 150, 185, 240],
    [-350, -438, -382, -470, -392, -420],
    clamp,
  );
  const queryIn = spring({frame: frame - 22, fps, config: {damping: 200}});
  const filesIn = spring({frame: frame - 112, fps, config: {damping: 200}});
  const filesOut = spring({frame: frame - 146, fps, config: {damping: 200}});
  const statIn = spring({frame: frame - 160, fps, config: {damping: 145}});
  const count = Math.max(1, Math.round(interpolate(frame, [160, 210], [1, 70], clamp)));
  const statScale = interpolate(statIn, [0, 1], [.12, 1.08], clamp);
  return (
    <SceneShell background={CREAM}>
      <GraphViewport
        scale={graphScale}
        x={graphX}
        y={graphY}
        opacity={interpolate(statIn, [0, 1], [1, .35], clamp)}
        animatedFrame={frame}
      />
      <div
        style={{
          position: "absolute",
          top: 165,
          left: 90,
          right: 90,
          padding: "22px 28px",
          borderRadius: 20,
          background: "#171727",
          color: "#f4f4f7",
          border: "1px solid rgba(255,255,255,.12)",
          boxShadow: "0 18px 42px rgba(40,25,20,.22)",
          fontFamily: CODE,
          fontSize: 30,
          opacity: interpolate(queryIn, [0, 1], [0, 1], clamp),
          transform: `translateY(${interpolate(queryIn, [0, 1], [-45, 0], clamp)}px) scale(${interpolate(queryIn, [0, 1], [.9, 1], clamp)})`,
        }}
      >
        <span style={{color: "#cc785c"}}>&gt;</span> How does authentication reach
        the database?
      </div>
      {[0, 1, 2].map((i) => {
        const opacity =
          interpolate(filesIn, [0, 1], [0, 1], clamp) *
          interpolate(filesOut, [0, 1], [1, 0], clamp);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 100 + i * 290,
              top: 1110 + (i % 2) * 75,
              width: 250,
              height: 160,
              borderRadius: 16,
              padding: 18,
              background: "rgba(24,24,38,.92)",
              border: "1px solid rgba(255,255,255,.12)",
              color: "#c7c7d0",
              fontFamily: CODE,
              fontSize: 18,
              opacity,
              transform: `translateY(${interpolate(filesOut, [0, 1], [0, 210], clamp)}px) scale(${interpolate(filesOut, [0, 1], [1, .2], clamp)})`,
            }}
          >
            {["auth/session.ts", "api/routes.ts", "db/client.ts"][i]}
            <div style={{marginTop: 18, color: "#777"}}>re-reading source...</div>
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          opacity: interpolate(statIn, [0, 1], [0, 1], clamp),
          transform: `perspective(700px) translateZ(${interpolate(statIn, [0, 1], [-400, 170], clamp)}px) scale(${statScale})`,
        }}
      >
        <div
          style={{
            fontFamily: LABEL,
            fontStyle: "italic",
            fontWeight: 700,
            fontSize: 300,
            lineHeight: .8,
            color: "#C45A3E",
            textShadow:
              "0 0 18px rgba(222,115,86,.55), 0 0 62px rgba(196,90,62,.5), 0 30px 70px rgba(70,35,25,.32)",
          }}
        >
          {count}×
        </div>
        <div
          style={{
            fontFamily: LABEL,
            fontStyle: "italic",
            fontWeight: 700,
            fontSize: 108,
            color: "#C45A3E",
            marginTop: 38,
          }}
        >
          FEWER
        </div>
      </div>
      <Sequence from={150}>
        <Audio src={staticFile("sounds/riser.mp3")} volume={.58} />
      </Sequence>
      <Sequence from={210}>
        <Audio src={staticFile("sounds/Deepwoosh.mp3")} volume={.55} />
      </Sequence>
      <Sequence from={219}>
        <Audio src={staticFile("sounds/Pop.mp3")} volume={.6} />
      </Sequence>
    </SceneShell>
  );
};

export const GraphifyScene7: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const leftIn = spring({frame, fps, config: {damping: 180}});
  const rightIn = spring({frame: frame - 28, fps, config: {damping: 180}});
  const match = spring({frame: frame - 60, fps, config: {damping: 160}});
  const camera = interpolate(frame, [0, 28, 52, 80, 103], [1, 1.16, 1.05, 1.13, 1.08], clamp);
  const leftX = interpolate(leftIn, [0, 1], [-520, 0], clamp);
  const rightX = interpolate(rightIn, [0, 1], [520, 0], clamp);
  return (
    <SceneShell background={ORANGE} heading="SAME REACH" headingSize={118}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${camera})`,
          transformOrigin: frame < 44 ? "28% 58%" : "72% 58%",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 95 + leftX,
            top: 565,
            width: 410,
            height: 700,
            borderRadius: 28,
            overflow: "hidden",
            transform: `perspective(900px) rotateY(${interpolate(leftIn, [0, 1], [-38, -4], clamp)}deg) rotateZ(${interpolate(leftIn, [0, 1], [-9, -2], clamp)}deg) scale(${interpolate(match, [0, 1], [.92, 1.05], clamp)})`,
            boxShadow: SHADOW,
          }}
        >
          <Img src={staticFile("$17-claude.png")} style={{width: "100%", height: "100%", objectFit: "cover"}} />
        </div>
        <div
          style={{
            position: "absolute",
            right: 95 - rightX,
            top: 565,
            width: 410,
            height: 700,
            borderRadius: 28,
            overflow: "hidden",
            transform: `perspective(900px) rotateY(${interpolate(rightIn, [0, 1], [38, 4], clamp)}deg) rotateZ(${interpolate(rightIn, [0, 1], [9, 2], clamp)}deg)`,
            boxShadow: SHADOW,
          }}
        >
          <Img src={staticFile("$100-claude.png")} style={{width: "100%", height: "100%", objectFit: "cover"}} />
        </div>
      </div>
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        style={{position: "absolute", inset: 0, pointerEvents: "none"}}
      >
        <path
          d="M445 1360 C500 1305, 580 1305, 635 1360"
          fill="none"
          stroke="#FAF3EA"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray="340"
          strokeDashoffset={interpolate(match, [0, 1], [340, 0], clamp)}
          style={{filter: "drop-shadow(0 0 16px rgba(250,243,234,.75))"}}
        />
        <path
          d="M614 1338 L641 1360 L614 1382"
          fill="none"
          stroke="#FAF3EA"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={interpolate(match, [0, 1], [0, 1], clamp)}
        />
      </svg>
      <Sequence from={0}>
        <Audio src={staticFile("sounds/woosh.mp3")} volume={.5} />
      </Sequence>
      <Sequence from={28}>
        <Audio src={staticFile("sounds/Deepwoosh.mp3")} volume={.5} />
      </Sequence>
      <Sequence from={66}>
        <Audio src={staticFile("sounds/Correct.mp3")} volume={.55} />
      </Sequence>
    </SceneShell>
  );
};

export const GraphifyApprovedFull: React.FC = () => (
  <AbsoluteFill style={{background: "#000"}}>
    <Sequence from={0} durationInFrames={GRAPHIFY_SCENE_1_DURATION}>
      <GraphifyScene1 />
    </Sequence>
    <Sequence from={157} durationInFrames={21}>
      <Freeze frame={156}>
        <GraphifyScene1 />
      </Freeze>
    </Sequence>
    <Sequence from={178} durationInFrames={GRAPHIFY_SCENE_2_DURATION}>
      <GraphifyScene2 />
    </Sequence>
    <Sequence from={353} durationInFrames={21}>
      <Freeze frame={174}>
        <GraphifyScene2 />
      </Freeze>
    </Sequence>
    <Sequence from={374} durationInFrames={GRAPHIFY_SCENE_3_DURATION}>
      <GraphifyScene3 />
    </Sequence>
    <Sequence from={546} durationInFrames={17}>
      <Freeze frame={171}>
        <GraphifyScene3 />
      </Freeze>
    </Sequence>
    <Sequence from={563} durationInFrames={GRAPHIFY_SCENE_4_DURATION}>
      <GraphifyScene4 />
    </Sequence>
    <Sequence from={743} durationInFrames={18}>
      <Freeze frame={179}>
        <GraphifyScene4 />
      </Freeze>
    </Sequence>
    <Sequence from={761} durationInFrames={GRAPHIFY_SCENE_5_DURATION}>
      <GraphifyScene5 />
    </Sequence>
    <Sequence from={829} durationInFrames={13}>
      <Freeze frame={67}>
        <GraphifyScene5 />
      </Freeze>
    </Sequence>
    <Sequence from={842} durationInFrames={GRAPHIFY_SCENE_6_DURATION}>
      <GraphifyScene6 />
    </Sequence>
    <Sequence from={1083} durationInFrames={22}>
      <Freeze frame={240}>
        <GraphifyScene6 />
      </Freeze>
    </Sequence>
    <Sequence from={1105} durationInFrames={GRAPHIFY_SCENE_7_DURATION}>
      <GraphifyScene7 />
    </Sequence>
  </AbsoluteFill>
);
