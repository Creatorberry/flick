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

export const CLAUDE_TOKEN_WASTE_HOOK_DURATION = 300;

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const sec = (value: number) => Math.round(value * 30);

const Asterisk: React.FC<{size?: number; color?: string}> = ({size = 18, color = "#cc785c"}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g stroke={color} strokeWidth="11" strokeLinecap="butt">
      <line x1="50" y1="50" x2="91.6" y2="44.2" />
      <line x1="50" y1="50" x2="78.6" y2="19.3" />
      <line x1="50" y1="50" x2="55.8" y2="8.4" />
      <line x1="50" y1="50" x2="30.9" y2="12.6" />
      <line x1="50" y1="50" x2="14.4" y2="27.7" />
      <line x1="50" y1="50" x2="8" y2="50" />
      <line x1="50" y1="50" x2="15.2" y2="73.5" />
      <line x1="50" y1="50" x2="26.5" y2="84.8" />
      <line x1="50" y1="50" x2="47.1" y2="91.9" />
      <line x1="50" y1="50" x2="70.4" y2="86.7" />
      <line x1="50" y1="50" x2="80.2" y2="79.2" />
      <line x1="50" y1="50" x2="90.4" y2="61.6" />
    </g>
    <circle cx="50" cy="50" r="11" fill={color} />
  </svg>
);

const Robot: React.FC = () => (
  <svg viewBox="0 0 242 152" width="84" height="52" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
    <rect x="30" y="0" width="182" height="32" fill="#cc785c" />
    <rect x="30" y="32" width="31" height="28" fill="#cc785c" />
    <rect x="72" y="32" width="98" height="28" fill="#cc785c" />
    <rect x="181" y="32" width="31" height="28" fill="#cc785c" />
    <rect x="0" y="60" width="242" height="32" fill="#cc785c" />
    <rect x="30" y="92" width="182" height="30" fill="#cc785c" />
    <rect x="42" y="122" width="19" height="30" fill="#cc785c" />
    <rect x="72" y="122" width="19" height="30" fill="#cc785c" />
    <rect x="151" y="122" width="19" height="30" fill="#cc785c" />
    <rect x="181" y="122" width="19" height="30" fill="#cc785c" />
  </svg>
);

const fluffLines = [
  "Explain why the sky is blue in one sentence.",
  "Great question. Let's walk through it carefully.",
  "There are a few useful pieces of context here.",
  "Before the direct answer, it helps to understand",
  "that sunlight is made of many wavelengths of light.",
  "The atmosphere interacts with those wavelengths in",
  "a way called Rayleigh scattering, which is a key idea.",
  "In simple terms, blue light scatters more than red light.",
  "So the sky looks blue because air scatters blue light",
  "toward your eyes more strongly than other colors.",
  "That is the short answer, but there are a few caveats",
  "about sunset colors and viewing angle worth mentioning...",
];

const tokenAt = (frame: number) =>
  Math.round(
    interpolate(
      frame,
      [0, sec(0.92), sec(1.52), sec(5.6), sec(8.8), CLAUDE_TOKEN_WASTE_HOOK_DURATION - 1],
      [83, 142, 207, 1284, 2731, 2731],
      clamp,
    ),
  );

const secondsAt = (frame: number) =>
  Math.round(interpolate(frame, [0, sec(0.92), sec(1.52), sec(5.6)], [13, 28, 46, 103], clamp));

const TerminalBody: React.FC<{zoomed: boolean}> = ({zoomed}) => {
  const frame = useCurrentFrame();
  const promptSubmitted = frame >= sec(4.12);
  const outputCount = Math.floor(interpolate(frame, [sec(4.35), sec(8.75)], [0, fluffLines.length - 1], clamp));
  const scrollY = interpolate(frame, [sec(4.9), sec(8.8)], [0, -168], clamp);
  const tokens = tokenAt(frame);
  const seconds = secondsAt(frame);

  return (
    <div style={{position: "relative", height: "100%", overflow: "hidden", background: "#32051f"}}>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 186,
          background: "#3a0624",
          zIndex: 6,
          boxShadow: zoomed ? "0 0 34px rgba(245,170,76,0.25)" : "none",
          fontFamily: "Consolas, 'Courier New', monospace",
        }}
      >
        <div style={{display: "flex", height: 94, borderBottom: "1px solid rgba(222,115,86,0.5)"}}>
          <div style={{width: 472, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5, borderRight: "1px solid rgba(222,115,86,0.5)"}}>
            <div style={{fontSize: 13, color: "#fff0e8", fontWeight: 700}}>Workspace ready</div>
            <Robot />
            <div style={{fontSize: 13, color: "#caa7b8"}}>Model session  •  Usage overview</div>
            <div style={{fontSize: 13, color: "#d9c8d0"}}>Personal workspace  ~/project</div>
          </div>
          <div style={{flex: 1, padding: "14px 18px", fontSize: 13, lineHeight: 1.45, color: "#d2b9c4"}}>
            <div style={{color: "#f0d8df"}}>Tips for getting started</div>
            <div>Run /init to create a CLAUDE.md file with instructions</div>
            <div style={{height: 14}} />
            <div style={{color: "#f0d8df"}}>Recent activity</div>
            <div>No recent activity</div>
          </div>
        </div>
        <div style={{padding: "14px 20px 11px", fontSize: 16, lineHeight: 1.3, color: "#f0be42", borderBottom: "2px solid rgba(222,115,86,0.72)"}}>
          <div>Auth conflict: Both a token (ANTHROPIC_AUTH_TOKEN) and an API key (/login managed key) are set.</div>
          <div style={{paddingLeft: 20}}>• Trying to use ANTHROPIC_AUTH_TOKEN? claude /logout</div>
          <div style={{paddingLeft: 20}}>• Trying to use /login managed key? Unset the ANTHROPIC_AUTH_TOKEN environment variable.</div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 198,
          transform: `translateY(${scrollY}px)`,
          fontFamily: "Consolas, 'Courier New', monospace",
          fontSize: 18,
          lineHeight: 1.5,
          color: "#d4d4d4",
        }}
      >
        <div style={{height: 28, background: "rgba(173,198,195,0.32)", color: "#fff", paddingLeft: 0, display: "flex", alignItems: "center", marginBottom: 8}}>
          understand this project
        </div>
        <div style={{color: "#b9a6b0", marginBottom: 8, paddingLeft: 20}}>└ Initializing...</div>
        <div style={{color: "#e36a80", marginBottom: 18, paddingLeft: 20}}>└ Invalid tool parameters</div>
        <div style={{marginBottom: 5}}>
          <span style={{color: "#fff", fontWeight: 700}}>Explore</span>
          <span style={{color: "#e8dce3"}}>(Explore project structure)</span>
        </div>
        <div style={{color: "#b9a6b0", marginBottom: 18, paddingLeft: 20}}>└ Initializing...</div>
        <div style={{color: "#d2a3b8", marginBottom: 12}}>
          Synthesizing... ({seconds}s ·{" "}
          <span style={{background: "#5b210b", color: "#ffd244", padding: "1px 8px", borderRadius: 3, fontWeight: 800, boxShadow: "0 0 12px rgba(255,170,0,0.35)"}}>
            {tokens} tokens
          </span>{" "}
          · thinking)
        </div>
        <div style={{color: "#b9a6b0", marginBottom: 22, paddingLeft: 20}}>└ Tip: Use /btw to ask a quick side question without interrupting Claude's current work</div>
        {promptSubmitted ? <div style={{color: "#8bd17c", marginBottom: 14}}>&gt; {fluffLines[0]}</div> : null}
        {fluffLines.slice(1, outputCount + 1).map((line, index) => (
          <div
            key={`${line}-${index}`}
            style={{
              marginBottom: index === 0 ? 12 : 8,
              color: index < 4 ? "#e7e7e7" : "#bdbdbd",
              opacity: index > outputCount - 2 ? 0.78 : 1,
            }}
          >
            <span style={{color: "#cc785c"}}>{index === 0 ? "Claude" : "      "}</span>
            <span style={{color: "#666"}}> | </span>
            {line}
          </div>
        ))}
      </div>
    </div>
  );
};

const ClaudeWindow: React.FC = () => {
  const frame = useCurrentFrame();
  const inputText = fluffLines[0];
  const inputChars = Math.floor(interpolate(frame, [sec(3.2), sec(4.05)], [0, inputText.length], clamp));
  const inputCleared = frame >= sec(4.12);
  const tokenZoom = frame > sec(7.4);

  return (
    <div
      style={{
        width: 960,
        height: 800,
        borderRadius: 14,
        overflow: "hidden",
        border: "1px solid #3a3a3a",
        boxShadow: "0 2px 4px rgba(0,0,0,0.22), 0 8px 24px rgba(0,0,0,0.38), 0 28px 64px rgba(0,0,0,0.45), 0 70px 140px rgba(0,0,0,0.35)",
        background: "#1e1e1e",
        fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
      }}
    >
      <div style={{height: 40, background: "#2a2a2a", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 12px", borderBottom: "1px solid #3a3a3a"}}>
        <div style={{display: "flex", alignItems: "center", gap: 7, background: "#1e1e1e", border: "1px solid #3a3a3a", borderBottom: "1px solid #1e1e1e", borderRadius: "7px 7px 0 0", padding: "7px 13px", color: "#d4d4d4", fontSize: 13}}>
          <Asterisk size={14} />
          <span>Claude Code</span>
          <span style={{color: "#888", marginLeft: 5}}>x</span>
        </div>
        <div style={{display: "flex", gap: 14, alignItems: "center", color: "#888"}}>
          <Asterisk size={14} color="#888" />
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span style={{fontSize: 18}}>...</span>
        </div>
      </div>
      <div style={{height: 36, background: "#1e1e1e", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", borderBottom: "1px solid #2e2e2e", color: "#c8c8c8", fontSize: 14}}>
        <span>Untitled</span>
        <span style={{color: "#777"}}>status  menu</span>
      </div>
      <div style={{height: 604}}>
        <TerminalBody zoomed={tokenZoom} />
      </div>
      <div style={{height: 120, background: "#1e1e1e", borderTop: "1px solid #2e2e2e", padding: "12px 14px 8px"}}>
        <div style={{height: 48, display: "flex", alignItems: "center", background: "#2a2a2a", border: "1px solid #3a3a3a", borderRadius: 9, padding: "0 14px", color: inputChars ? "#d4d4d4" : "#777", fontSize: 15}}>
          {!inputCleared && inputChars > 0 ? inputText.slice(0, inputChars) : "ctrl esc to focus or unfocus Claude"}
          {!inputCleared && inputChars > 0 && inputChars < inputText.length ? <span style={{color: "#cc785c"}}>|</span> : null}
        </div>
        <div style={{height: 42, display: "flex", alignItems: "center", gap: 8, color: "#888", fontSize: 13}}>
          <span style={{fontSize: 24, width: 30, textAlign: "center"}}>+</span>
          <span style={{border: "1px solid #3a3a3a", background: "#2a2a2a", borderRadius: 6, padding: "5px 10px", color: "#c0c0c0"}}>index.html</span>
          <span style={{marginLeft: "auto", border: "1px solid #3a3a3a", background: "#2a2a2a", borderRadius: 6, padding: "6px 12px", color: "#c0c0c0"}}>&lt;/&gt; Edit automatically</span>
        </div>
      </div>
    </div>
  );
};

export const ClaudeTokenWasteHook: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const intro = spring({frame, fps, config: {damping: 140, stiffness: 58}});
  const earlyZoom = spring({frame: frame - sec(0.9), fps, config: {damping: 95, stiffness: 68}});
  const earlyPan = spring({frame: frame - sec(2.18), fps, config: {damping: 120, stiffness: 44}});

  const baseScale = interpolate(intro, [0, 1], [1.02, 1.1], clamp);
  const terminalScale =
    baseScale +
    interpolate(earlyZoom, [0, 1], [0, 0.78], clamp) -
    interpolate(earlyPan, [0, 1], [0, 0.08], clamp);
  const terminalX =
    interpolate(earlyZoom, [0, 1], [0, -24], clamp) +
    interpolate(earlyPan, [0, 1], [0, 26], clamp);
  const terminalY =
    interpolate(earlyZoom, [0, 1], [0, -76], clamp) +
    interpolate(earlyPan, [0, 1], [0, -194], clamp);
  const blur = interpolate(frame, [0, sec(0.35), sec(0.92), sec(1.16)], [2.8, 2.8, 2.8, 0], clamp);
  const dim = interpolate(frame, [0, sec(0.35), sec(0.92), sec(1.2)], [0.28, 0.28, 0.28, 0], clamp);
  const logoOpacity = interpolate(frame, [0, sec(0.92), sec(1.1)], [1, 1, 0], clamp);
  const logoScale = interpolate(frame, [0, sec(0.92), sec(1.1)], [1, 1, 0.72], clamp);
  const logoRotate = interpolate(frame, [0, sec(0.92)], [0, 720], clamp);

  return (
    <AbsoluteFill style={{background: "#FAF3EA", overflow: "hidden"}}>
      <div style={{position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 42%, rgba(222,115,86,0.14), transparent 42%)"}} />
      <div
        style={{
          position: "absolute",
          left: 12,
          top: 60,
          transform: `translate(${terminalX}px, ${terminalY}px) scale(${terminalScale})`,
          transformOrigin: "0% 0%",
          filter: `blur(${blur}px)`,
          opacity: interpolate(intro, [0, 1], [0, 1], clamp),
        }}
      >
        <ClaudeWindow />
      </div>
      <div style={{position: "absolute", inset: 0, background: `rgba(0,0,0,${dim})`, pointerEvents: "none"}} />
      <div
        style={{
          position: "absolute",
          left: 340,
          top: 220,
          width: 400,
          height: 400,
          opacity: logoOpacity,
          transform: `scale(${logoScale}) rotateZ(${logoRotate}deg)`,
          transformOrigin: "50% 50%",
          filter: "drop-shadow(0 28px 50px rgba(0,0,0,0.42))",
        }}
      >
        <Img src={staticFile("claude.png")} style={{width: "100%", height: "100%", objectFit: "contain"}} />
      </div>
    </AbsoluteFill>
  );
};
