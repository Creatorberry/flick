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

export const MARKITDOWN_SCENE_1_DURATION = 220;

const UI = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, Arial, sans-serif";
const CODE = "Consolas, 'Courier New', monospace";
const CLAUDE = "#cc785c";
const CREAM = "#FAF3EA";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const sec = (value: number) => Math.round(value * 30);

const Asterisk: React.FC<{size?: number}> = ({size = 18}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <g stroke={CLAUDE} strokeWidth="11" strokeLinecap="butt">
      {[352, 313, 278, 245, 212, 180, 146, 132, 94, 61, 46, 16].map((angle) => (
        <line key={angle} x1="50" y1="50" x2="92" y2="50" transform={`rotate(${angle} 50 50)`} />
      ))}
    </g>
    <circle cx="50" cy="50" r="11" fill={CLAUDE} />
  </svg>
);

const PdfIcon: React.FC<{size?: number}> = ({size = 54}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: 8,
      background: "linear-gradient(135deg, #f35848 0%, #d83a32 72%)",
      color: "#fff",
      display: "grid",
      placeItems: "center",
      fontFamily: UI,
      fontWeight: 950,
      fontSize: size * 0.28,
      boxShadow: "inset 0 1px 0 rgba(255,255,255,.35)",
    }}
  >
    PDF
  </div>
);

const Cursor: React.FC<{x: number; y: number; opacity: number; down?: boolean}> = ({x, y, opacity, down}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      opacity,
      transform: `translate(-4px, -2px) scale(${down ? 0.92 : 1})`,
      zIndex: 80,
      filter: "drop-shadow(0 6px 10px rgba(0,0,0,.36))",
    }}
  >
    <svg width="42" height="42" viewBox="0 0 42 42">
      <path d="M7 4 L32 25 L20 27 L15 38 L7 4 Z" fill="#f8fafc" stroke="#101010" strokeWidth="2.4" />
    </svg>
  </div>
);

const FilePicker: React.FC<{progress: number; openDown: boolean}> = ({progress, openDown}) => (
  <div
    style={{
      position: "absolute",
      left: 235,
      top: 250,
      width: 500,
      height: 248,
      borderRadius: 20,
      background: "#26211f",
      border: "1px solid rgba(255,255,255,.13)",
      boxShadow: "0 36px 90px rgba(0,0,0,.55)",
      overflow: "hidden",
      opacity: progress,
      transform: `translateY(${interpolate(progress, [0, 1], [20, 0], clamp)}px) scale(${interpolate(progress, [0, 1], [0.96, 1], clamp)})`,
      zIndex: 42,
      fontFamily: UI,
    }}
  >
    <div
      style={{
        height: 52,
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        color: CREAM,
        fontSize: 18,
        fontWeight: 850,
        background: "rgba(255,255,255,.035)",
      }}
    >
      Choose file
    </div>
    <div
      style={{
        margin: 22,
        height: 74,
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,.16)",
        background: "rgba(255,255,255,.04)",
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "0 16px",
      }}
    >
      <PdfIcon size={42} />
      <div>
        <div style={{color: "#f4ece6", fontSize: 18, fontWeight: 900}}>report.pdf</div>
        <div style={{color: "rgba(250,243,234,.62)", fontSize: 14, marginTop: 4}}>PDF document</div>
      </div>
    </div>
    <div
      style={{
        position: "absolute",
        right: 20,
        bottom: 20,
        width: 92,
        height: 42,
        borderRadius: 10,
        display: "grid",
        placeItems: "center",
        color: "#fff7f0",
        fontSize: 17,
        fontWeight: 900,
        background: CLAUDE,
        transform: `scale(${openDown ? 0.94 : 1})`,
      }}
    >
      Open
    </div>
  </div>
);

const ClaudeTerminal: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const terminalIn = spring({frame: frame - 4, fps, config: {damping: 120, stiffness: 58}});
  const focus = interpolate(frame, [12, 38], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const blurIn = interpolate(frame, [124, 140], [0, 1], clamp);
  const limitPulse = Math.sin(frame / 3) > 0 ? 1 : 0.62;

  const typeText = "summarize this PDF";
  const typedChars = Math.floor(interpolate(frame, [88, 106], [0, typeText.length], clamp));
  const typed = typeText.slice(0, typedChars);

  const cursorX = frame < 52
    ? interpolate(frame, [16, 34], [365, 42], {...clamp, easing: Easing.out(Easing.cubic)})
    : interpolate(frame, [52, 66], [42, 666], {...clamp, easing: Easing.out(Easing.cubic)});
  const cursorY = frame < 52
    ? interpolate(frame, [16, 34], [660, 742], {...clamp, easing: Easing.out(Easing.cubic)})
    : interpolate(frame, [52, 66], [742, 557], {...clamp, easing: Easing.out(Easing.cubic)});
  const cursorOpacity = frame >= 14 && frame < 76 ? interpolate(frame, [14, 20, 72, 76], [0, 1, 1, 0], clamp) : 0;
  const filePickerProgress = frame >= 40 && frame < 78 ? interpolate(frame, [40, 46, 72, 78], [0, 1, 1, 0], clamp) : 0;
  const attached = frame >= 78;
  const submitted = frame >= 109;
  const outputLines = [
    {text: "Reading report.pdf...", at: 112, color: "#cfc8c3", weight: 600},
    {text: "Processing tables, images, formatting...", at: 118, color: "#f0be42", weight: 650},
    {text: "Token usage: 70,000", at: 124, color: "#ff8f78", weight: 900},
  ];

  return (
    <div
      style={{
        position: "absolute",
        left: 62,
        top: 325,
        width: 956,
        height: 820,
        borderRadius: 20,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,.13)",
        background: "#1e1e1e",
        boxShadow: "0 36px 100px rgba(77,31,19,.42), 0 18px 52px rgba(0,0,0,.45)",
        fontFamily: UI,
        opacity: interpolate(terminalIn, [0, 1], [0, 1], clamp),
        transform: `translateY(${interpolate(terminalIn, [0, 1], [42, 0], clamp)}px) translateX(${interpolate(focus, [0, 1], [0, -42], clamp)}px) scale(${interpolate(focus, [0, 1], [0.98, 1.08], clamp)})`,
        transformOrigin: "left bottom",
      }}
    >
      <div style={{filter: `blur(${interpolate(blurIn, [0, 1], [0, 6], clamp)}px) brightness(${interpolate(blurIn, [0, 1], [1, .62], clamp)})`}}>
        <div
          style={{
            height: 54,
            background: "#2a2a2a",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px",
            borderBottom: "1px solid #3a3a3a",
          }}
        >
          <div
            style={{
              height: 39,
              display: "flex",
              alignItems: "center",
              gap: 9,
              background: "#1e1e1e",
              border: "1px solid #3a3a3a",
              borderBottomColor: "#1e1e1e",
              borderRadius: "10px 10px 0 0",
              padding: "0 14px",
              color: "#d4d4d4",
              fontSize: 18,
              fontWeight: 650,
            }}
          >
            <Asterisk size={18} />
            <span>Claude Code</span>
            <span style={{color: "#888", marginLeft: 5}}>x</span>
          </div>
          <span style={{color: "#8b8b8b", fontSize: 18}}>bell&nbsp;&nbsp;lock&nbsp;&nbsp;...</span>
        </div>
        <div
          style={{
            height: 48,
            background: "#1e1e1e",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 22px",
            borderBottom: "1px solid #2e2e2e",
            color: "#c8c8c8",
            fontSize: 17,
            fontWeight: 750,
          }}
        >
          <span>Untitled</span>
          <span style={{color: "#777", fontWeight: 650}}>status&nbsp;&nbsp;menu</span>
        </div>
        <div style={{height: 538, position: "relative", overflow: "hidden", background: "#1a1a1a", fontFamily: CODE}}>
          {!submitted ? (
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 160,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 20,
                color: "#d4d4d4",
                opacity: 0.18,
                fontFamily: UI,
              }}
            >
              <Asterisk size={48} />
              <div style={{fontSize: 26, fontWeight: 700}}>Claude Code</div>
            </div>
          ) : (
            <div style={{padding: "36px 40px", fontSize: 25, lineHeight: 1.55}}>
              <div style={{color: "#f2f2f2", marginBottom: 22}}>
                <span style={{color: CLAUDE}}>&gt;</span> {typeText}
              </div>
              {outputLines.map((line) => {
                const p = spring({frame: frame - line.at, fps, config: {damping: 180, stiffness: 70}});
                return (
                  <div
                    key={line.text}
                    style={{
                      opacity: interpolate(p, [0, 1], [0, 1], clamp),
                      transform: `translateY(${interpolate(p, [0, 1], [14, 0], clamp)}px)`,
                      color: line.color,
                      fontWeight: line.weight,
                    }}
                  >
                    {line.text}
                  </div>
                );
              })}
            </div>
          )}
          <FilePicker progress={filePickerProgress} openDown={frame >= 66 && frame < 69} />
        </div>
        <div style={{height: 180, background: "#1e1e1e", borderTop: "1px solid #2e2e2e", padding: "16px 18px 10px"}}>
          <div
            style={{
              height: 64,
              display: "flex",
              alignItems: "center",
              gap: 14,
              background: "#2a2a2a",
              border: "1px solid #3a3a3a",
              borderRadius: 13,
              padding: "0 18px",
              color: typed ? "#f2f2f2" : "#858585",
              fontSize: 22,
              fontFamily: typed ? CODE : UI,
            }}
          >
            {attached ? (
              <div
                style={{
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "0 12px",
                  borderRadius: 9,
                  background: "#242424",
                  border: "1px solid #444",
                  color: "#eee",
                  fontFamily: UI,
                  fontSize: 16,
                  fontWeight: 850,
                }}
              >
                <PdfIcon size={30} />
                report.pdf
              </div>
            ) : null}
            <span>{submitted ? "ctrl esc to focus or unfocus Claude" : typed || "Describe a task or ask a question"}</span>
            {!submitted && typed ? <span style={{opacity: Math.floor(frame / 7) % 2 ? .18 : 1}}>|</span> : null}
          </div>
          <div style={{height: 68, display: "flex", alignItems: "center", gap: 12, color: "#888"}}>
            <span style={{fontSize: 34, width: 34, textAlign: "center"}}>+</span>
            <span style={{border: "1px solid #3a3a3a", background: "#2a2a2a", borderRadius: 8, padding: "7px 12px", color: "#c0c0c0", fontWeight: 750}}>
              index.html
            </span>
            <span style={{marginLeft: "auto", border: "1px solid #3a3a3a", background: "#2a2a2a", borderRadius: 8, padding: "9px 14px", color: "#c0c0c0", fontWeight: 750}}>
              &lt;/&gt; Edit automatically
            </span>
          </div>
        </div>
      </div>
      <Cursor x={cursorX} y={cursorY} opacity={cursorOpacity} down={(frame >= 36 && frame < 40) || (frame >= 66 && frame < 69)} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
          opacity: interpolate(blurIn, [0, .25, 1], [0, 0, 1], clamp) * limitPulse,
          zIndex: 60,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            padding: "24px 34px",
            borderRadius: 18,
            border: "2px solid rgba(255,70,65,.78)",
            background: "rgba(65,8,8,.86)",
            color: "#ff4b45",
            fontSize: 54,
            lineHeight: .94,
            fontWeight: 950,
            letterSpacing: -1.5,
            textAlign: "center",
            boxShadow: "0 0 32px rgba(255,50,42,.72), 0 24px 70px rgba(0,0,0,.56)",
            textShadow: "0 0 18px rgba(255,50,42,.9)",
          }}
        >
          USAGE LIMIT<br />REACHED
        </div>
      </div>
    </div>
  );
};

const GithubSatyaPopup: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const local = frame - 178;
  const scrollY = interpolate(local, [0, 42], [-80, -620], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const cardIn = spring({frame: local - 8, fps, config: {damping: 90, stiffness: 120}});
  const cardScale = interpolate(cardIn, [0, 1], [0.64, 1], clamp);
  const cardOpacity = interpolate(cardIn, [0, .2, 1], [0, 1, 1], clamp);
  const cardRotateY = interpolate(cardIn, [0, 1], [-18, 0], clamp);
  const cardRotateZ = interpolate(cardIn, [0, 1], [-4, -2], clamp);
  const cardFloat = Math.sin(frame / 13) * 8;

  return (
    <AbsoluteFill
      style={{
        background: "#ffffff",
        overflow: "hidden",
        opacity: interpolate(frame, [174, 182], [0, 1], clamp),
      }}
    >
      <Img
        src={staticFile("markitdown-github-top-section-ecc.png")}
        style={{
          position: "absolute",
          left: 0,
          top: scrollY,
          width: 1080 * 1.06,
          height: (5200 * 1080 * 1.06) / 1280,
          objectFit: "fill",
          filter: "blur(18px)",
          transformOrigin: "left top",
        }}
      />
      <div style={{position: "absolute", inset: 0, background: "rgba(0,0,0,.12)"}} />
      <div
        style={{
          position: "absolute",
          left: 160,
          top: 560 + cardFloat,
          width: 760,
          height: 700,
          opacity: cardOpacity,
          transform: `perspective(1200px) rotateY(${cardRotateY}deg) rotateZ(${cardRotateZ}deg) scale(${cardScale})`,
          transformOrigin: "50% 50%",
          borderRadius: 34,
          overflow: "hidden",
          boxShadow: "0 34px 90px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.14)",
          background: "#f8fafc",
          display: "grid",
          placeItems: "center",
          padding: 18,
        }}
      >
        <Img
          src={staticFile("Satya-Nadella.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

export const MarkitdownScene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const titleIn = spring({frame: frame - 2, fps: 30, config: {damping: 120, stiffness: 70}});

  return (
    <AbsoluteFill style={{background: "linear-gradient(180deg, #df8065 0%, #c26248 100%)", overflow: "hidden"}}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle at 50% 18%, rgba(255,238,217,.18), transparent 36%), radial-gradient(rgba(255,255,255,.16) 1px, transparent 1px)",
          backgroundSize: "auto, 32px 32px",
          opacity: .9,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 130,
          left: 54,
          right: 54,
          textAlign: "center",
          fontFamily: UI,
          fontSize: 100,
          lineHeight: 1,
          fontWeight: 950,
          letterSpacing: -2.4,
          color: "#fff4e8",
          whiteSpace: "nowrap",
          textShadow: "0 8px 26px rgba(84,28,14,.36), 0 2px 0 rgba(84,28,14,.18)",
          opacity:
              interpolate(titleIn, [0, 1], [0, 1], clamp) *
              interpolate(frame, [130, 146], [1, 0], clamp),
          transform: `translateY(${interpolate(titleIn, [0, 1], [-18, 0], clamp)}px) scale(${interpolate(titleIn, [0, 1], [.96, 1], clamp)})`,
          zIndex: 5,
        }}
      >
        70% Token Wastage
      </div>
      <ClaudeTerminal />
      <GithubSatyaPopup />
    </AbsoluteFill>
  );
};
