import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  Video,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {drawSVGStyle, eases} from "../animation/gsapEquivalent";
import {
  Asterisk,
  ClaudeTerminalFrame,
  FA_CLAUDE,
  FA_CODE,
  FA_CREAM,
  FA_INK,
  FA_ORANGE,
  FA_UI,
  SoundOnce,
  fade,
  typeText,
} from "./FreeApiShared";
import {VantaRealBackground} from "../components/VantaRealBackground";

export const CLAUDE_VIDEO_SCENE_1_DURATION = 125;
export const CLAUDE_VIDEO_SCENE_2_DURATION = 147;
export const CLAUDE_VIDEO_SCENE_3_DURATION = 127;
export const CLAUDE_VIDEO_SCENE_4_DURATION = 134;
export const CLAUDE_VIDEO_SCENE_5_DURATION = 176;
export const CLAUDE_VIDEO_SCENE_6_DURATION = 112;
export const CLAUDE_VIDEO_SCENE_7_DURATION = 112;
export const CLAUDE_VIDEO_SCENE_8_DURATION = 120;
export const CLAUDE_VIDEO_FULL_DURATION =
  CLAUDE_VIDEO_SCENE_1_DURATION +
  CLAUDE_VIDEO_SCENE_2_DURATION +
  CLAUDE_VIDEO_SCENE_3_DURATION +
  CLAUDE_VIDEO_SCENE_4_DURATION +
  CLAUDE_VIDEO_SCENE_5_DURATION +
  CLAUDE_VIDEO_SCENE_6_DURATION +
  CLAUDE_VIDEO_SCENE_7_DURATION +
  CLAUDE_VIDEO_SCENE_8_DURATION;

const clamp = {extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const};
const reel = "Google-15 tools.mp4";
const shorts = "$1B+ AI Prompts Leaked (36).mp4";
const youtube = "2026-05-21 23-27-51.mp4";

const SimpleClaudeLogo: React.FC<{x: number; y: number; size: number; speed?: number; opacity?: number}> = ({
  x,
  y,
  size,
  speed = 2,
  opacity = 1,
}) => {
  const frame = useCurrentFrame();
  return (
    <Img
      src={staticFile("claude.png")}
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        objectFit: "contain",
        opacity,
        transform: `rotate(${frame * speed}deg)`,
        transformOrigin: "50% 50%",
        zIndex: 40,
        filter: "drop-shadow(0 18px 34px rgba(111,43,27,.22))",
      }}
    />
  );
};

const BigSerif: React.FC<{
  text: string;
  top: number;
  color?: string;
  size?: number;
  delay?: number;
  z?: number;
}> = ({text, top, color = FA_CREAM, size = 116, delay = 0, z = 30}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - delay, fps, config: {damping: 190, stiffness: 95}});
  return (
    <div
      style={{
        position: "absolute",
        left: 54,
        right: 54,
        top,
        zIndex: z,
        textAlign: "center",
        fontFamily: "'Times New Roman', Times, serif",
        fontStyle: "italic",
        fontWeight: 700,
        fontSize: size,
        lineHeight: 0.88,
        color,
        opacity: interpolate(p, [0, 1], [0, 1], clamp),
        transform: `translateY(${interpolate(p, [0, 1], [38, 0], clamp)}px) scale(${interpolate(p, [0, 1], [0.9, 1], clamp)})`,
        textShadow:
          color === FA_CREAM
            ? "0 5px 0 rgba(90,37,26,.3), 0 22px 54px rgba(76,31,22,.22)"
            : "0 2px 0 rgba(255,255,255,.76), 0 18px 44px rgba(120,53,38,.16)",
      }}
    >
      {text}
    </div>
  );
};

const Shell: React.FC<{children: React.ReactNode; bg?: string; cream?: boolean}> = ({
  children,
  bg = FA_ORANGE,
  cream = false,
}) => (
  <AbsoluteFill style={{background: bg, overflow: "hidden"}}>
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: cream
          ? "radial-gradient(rgba(196,90,62,.16) 1.2px, transparent 1.2px)"
          : "radial-gradient(rgba(250,243,234,.18) 1.2px, transparent 1.2px)",
        backgroundSize: "38px 38px",
        opacity: 0.22,
      }}
    />
    <div
      style={{
        position: "absolute",
        inset: -80,
        background:
          "radial-gradient(circle at 18% 16%, rgba(255,255,255,.28), transparent 28%), radial-gradient(circle at 86% 75%, rgba(0,0,0,.12), transparent 31%)",
      }}
    />
    {children}
  </AbsoluteFill>
);

const ScanLine: React.FC<{top?: number; start?: number; height?: number; color?: string}> = ({
  top = 620,
  start = 20,
  height = 640,
  color = "#ffb092",
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [start, start + 56], [0, 1], clamp);
  const y = top + height * eases.power2.inOut(p);
  return (
    <div
      style={{
        position: "absolute",
        left: 104,
        right: 104,
        top: y,
        height: 8,
        borderRadius: 999,
        background: color,
        boxShadow: `0 0 30px ${color}, 0 0 70px ${color}`,
        opacity: interpolate(frame, [start, start + 8, start + 50, start + 64], [0, 1, 1, 0], clamp),
        zIndex: 70,
      }}
    />
  );
};

const TranscriptCard: React.FC<{x?: number; y?: number; blur?: number; scale?: number}> = ({
  x = 92,
  y = 360,
  blur = 0,
  scale = 1,
}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: 896,
      height: 1015,
      borderRadius: 34,
      background: "rgba(26,26,26,.94)",
      border: "1px solid rgba(255,255,255,.1)",
      boxShadow: "0 28px 88px rgba(0,0,0,.38)",
      padding: 38,
      filter: `blur(${blur}px)`,
      transform: `scale(${scale})`,
      transformOrigin: "center",
      fontFamily: FA_CODE,
      color: "#f2eae4",
      overflow: "hidden",
    }}
  >
    <div style={{display: "flex", alignItems: "center", gap: 12, marginBottom: 26, fontFamily: FA_UI}}>
      <Asterisk size={28} />
      <b style={{fontSize: 28}}>transcript.txt</b>
      <span style={{marginLeft: "auto", color: "#9e928b", fontSize: 18}}>read-only</span>
    </div>
    {[
      "[00:00] Claude still can't watch a video.",
      "[00:02] It reads the transcript.",
      "[00:04] It misses what's happening on screen.",
      "[00:06] Someone fixed it with two skills.",
      "[00:11] First one grabs the video.",
      "[00:13] Second rips it into frames.",
      "[00:18] Claude reads every frame.",
      "[00:25] Runs locally. Zero API cost.",
    ].map((line, i) => (
      <div
        key={line}
        style={{
          fontSize: 28,
          lineHeight: 1.55,
          color: i === 2 ? "#ffd0bf" : "#ece2dc",
          background: i === 2 ? "rgba(222,115,86,.18)" : "transparent",
          borderRadius: 10,
          padding: "4px 10px",
          marginBottom: 11,
        }}
      >
        {line}
      </div>
    ))}
  </div>
);

const VideoFileCard: React.FC<{
  label: string;
  file: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  start?: number;
  active?: boolean;
}> = ({label, file, x, y, width = 310, height = 520, start = 0, active = false}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - start, fps, config: {damping: 175, stiffness: 95}});
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        borderRadius: 32,
        overflow: "hidden",
        background: "#111",
        border: active ? "3px solid #DE7356" : "1px solid rgba(255,255,255,.22)",
        boxShadow: active
          ? "0 22px 72px rgba(222,115,86,.46), 0 0 0 10px rgba(222,115,86,.14)"
          : "0 20px 56px rgba(0,0,0,.25)",
        opacity: interpolate(p, [0, 1], [0, 1], clamp),
        transform: `translateY(${interpolate(p, [0, 1], [56, 0], clamp)}px) scale(${interpolate(p, [0, 1], [.86, 1], clamp)})`,
      }}
    >
      <Video
        src={staticFile(file)}
        startFrom={Math.max(0, (start % 60) + 12)}
        muted
        loop
        style={{width: "100%", height: "100%", objectFit: "cover"}}
      />
      <div
        style={{
          position: "absolute",
          left: 16,
          right: 16,
          bottom: 16,
          borderRadius: 999,
          background: "rgba(0,0,0,.68)",
          color: "#fff",
          fontFamily: FA_UI,
          fontSize: 20,
          fontWeight: 900,
          textAlign: "center",
          padding: "10px 12px",
          backdropFilter: "blur(10px)",
        }}
      >
        {label}
      </div>
    </div>
  );
};

const FileIcon: React.FC<{name: string; x: number; y: number; p?: number}> = ({name, x, y, p = 1}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: 172,
      height: 208,
      borderRadius: 18,
      background: "linear-gradient(180deg, #fff 0%, #f2eee9 100%)",
      border: "1px solid rgba(0,0,0,.1)",
      boxShadow: "0 18px 46px rgba(0,0,0,.25)",
      opacity: p,
      transform: `scale(${0.82 + 0.18 * p})`,
      fontFamily: FA_UI,
      color: FA_INK,
      overflow: "hidden",
    }}
  >
    <div
      style={{
        position: "absolute",
        right: 0,
        top: 0,
        borderLeft: "42px solid transparent",
        borderTop: "42px solid #e0d7ce",
      }}
    />
    <div style={{position: "absolute", left: 18, top: 26, fontSize: 17, color: "#8e8178", fontWeight: 850}}>
      FRAME
    </div>
    <div style={{position: "absolute", left: 18, right: 18, bottom: 24, fontFamily: FA_CODE, fontSize: 22, fontWeight: 900}}>
      {name}
    </div>
  </div>
);

const RealFrameThumb: React.FC<{
  file?: string;
  x: number;
  y: number;
  w: number;
  h: number;
  startFrom?: number;
  delay?: number;
  label?: string;
}> = ({file = reel, x, y, w, h, startFrom = 24, delay = 0, label}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - delay, fps, config: {damping: 180, stiffness: 100}});
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        borderRadius: 20,
        overflow: "hidden",
        background: "#111",
        border: "2px solid rgba(250,243,234,.72)",
        boxShadow: "0 18px 52px rgba(0,0,0,.28)",
        opacity: interpolate(p, [0, 1], [0, 1], clamp),
        transform: `translateY(${interpolate(p, [0, 1], [38, 0], clamp)}px) scale(${interpolate(p, [0, 1], [.88, 1], clamp)})`,
      }}
    >
      <Video src={staticFile(file)} startFrom={startFrom} muted style={{width: "100%", height: "100%", objectFit: "cover"}} />
      {label ? (
        <div style={{position: "absolute", left: 10, bottom: 10, borderRadius: 999, background: "rgba(0,0,0,.64)", color: "#fff", fontFamily: FA_CODE, fontSize: 14, fontWeight: 900, padding: "6px 10px"}}>
          {label}
        </div>
      ) : null}
    </div>
  );
};

const PathLine: React.FC<{
  d: string;
  progress: number;
  color?: string;
  width?: number;
  length?: number;
  dashed?: boolean;
}> = ({d, progress, color = "#DE7356", width = 8, length = 900, dashed = false}) => {
  const style = drawSVGStyle(`0 ${Math.round(progress * 100)}%`, length);
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={dashed ? "16 18" : style.strokeDasharray}
      strokeDashoffset={dashed ? 0 : style.strokeDashoffset}
      opacity={0.95}
      filter="drop-shadow(0 0 12px rgba(222,115,86,.52))"
    />
  );
};

const WorkflowPolyline: React.FC<{
  points: string;
  progress: number;
  length: number;
  color?: string;
  dot?: {x: number; y: number};
  arrow?: string;
}> = ({points, progress, length, color = "#DE7356", dot, arrow}) => (
  <>
    <polyline
      points={points}
      stroke={color}
      strokeWidth="13"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="3 30"
      strokeDashoffset={(1 - progress) * length}
      opacity={progress}
      fill="none"
      filter="url(#claude-video-workflow-glow)"
    />
    {arrow ? (
      <path
        d={arrow}
        stroke={color}
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity={progress}
        filter="url(#claude-video-workflow-glow)"
      />
    ) : null}
    {dot ? (
      <>
        <circle cx={dot.x} cy={dot.y} r="17" fill="#E8896E" opacity={progress} />
        <circle cx={dot.x} cy={dot.y} r="35" fill="#E8896E" opacity={progress * 0.22} />
      </>
    ) : null}
  </>
);

const SkillCard: React.FC<{name: string; subtitle: string; x: number; y: number; delay: number; blurred?: boolean}> = ({
  name,
  subtitle,
  x,
  y,
  delay,
  blurred = true,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - delay, fps, config: {damping: 170, stiffness: 105}});
  const float = Math.sin((frame + delay) * 0.045) * 8;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + float,
        width: 382,
        height: 228,
        borderRadius: 34,
        background: "rgba(255,255,255,.78)",
        border: "1px solid rgba(196,90,62,.18)",
        boxShadow: "0 25px 72px rgba(111,43,27,.16)",
        opacity: interpolate(p, [0, 1], [0, 1], clamp),
        transform: `translateY(${interpolate(p, [0, 1], [54, 0], clamp)}px) scale(${interpolate(p, [0, 1], [.82, 1], clamp)})`,
        filter: blurred ? "blur(10px)" : undefined,
        fontFamily: FA_UI,
        color: FA_INK,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <div style={{fontFamily: "'Times New Roman', Times, serif", fontStyle: "italic", fontWeight: 700, fontSize: 74, color: "#C45A3E"}}>
        {name}
      </div>
      <div style={{fontSize: 23, fontWeight: 800, color: "#5b514b"}}>{subtitle}</div>
    </div>
  );
};

export const ClaudeVideoScene1TranscriptMiss: React.FC = () => {
  const frame = useCurrentFrame();
  const miss = fade(frame, 74, 88);
  return (
    <Shell>
      <BigSerif text="Transcript Only" top={134} />
      <TranscriptCard />
      <VideoFileCard
        label="video.mp4"
        file={reel}
        x={706}
        y={1000}
        width={268}
        height={476}
        start={18}
        active={false}
      />
      <ScanLine top={432} start={20} height={736} />
      <div
        style={{
          position: "absolute",
          left: 102,
          right: 102,
          top: 1168,
          height: 172,
          borderRadius: 28,
          background: "rgba(128,24,18,.84)",
          border: "1px solid rgba(255,255,255,.14)",
          display: "grid",
          placeItems: "center",
          fontFamily: "'Times New Roman', Times, serif",
          fontStyle: "italic",
          fontWeight: 700,
          fontSize: 92,
          color: "#FAF3EA",
          opacity: miss,
          transform: `scale(${interpolate(miss, [0, 1], [.86, 1], clamp)})`,
          boxShadow: "0 22px 72px rgba(91,21,17,.34)",
          zIndex: 90,
        }}
      >
        HALF MISSED
      </div>
      <SoundOnce file="woosh.mp3" from={18} duration={38} volume={0.26} />
      <SoundOnce file="Notification.mp3" from={76} duration={28} volume={0.34} />
    </Shell>
  );
};

export const ClaudeVideoScene2TwoSkills: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const gather = spring({frame: frame - 54, fps, config: {damping: 120, stiffness: 50}});
  const endpoint = spring({frame: frame - 62, fps, config: {damping: 190, stiffness: 82}});
  const frameReveal = spring({frame: frame - 96, fps, config: {damping: 180, stiffness: 92}});
  const skills = [
    {name: "yt-dlp", subtitle: "grabs the video", x: 108, y: 318, delay: 12},
    {name: "ffmpeg", subtitle: "extracts frames", x: 590, y: 318, delay: 24},
  ];
  const targetX = 540 - 120;
  const targetY = 600 - 74;
  return (
    <Shell bg={FA_CREAM} cream>
      <BigSerif text="Two Skills" top={104} color="#C45A3E" />
      {skills.map((skill, i) => {
        const appear = spring({frame: frame - skill.delay, fps, config: {damping: 200, stiffness: 95}});
        const x = interpolate(gather, [0, 1], [skill.x, targetX], clamp);
        const y = interpolate(gather, [0, 1], [skill.y, targetY], clamp);
        const opacity = interpolate(gather, [0, 0.76, 1], [1, 1, 0], clamp) * interpolate(appear, [0, 1], [0, 1], clamp);
        return (
          <div
            key={skill.name}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: 382,
              height: 228,
              borderRadius: 34,
              background: "rgba(255,255,255,.78)",
              border: "1px solid rgba(196,90,62,.18)",
              boxShadow: "0 25px 72px rgba(111,43,27,.16)",
              opacity,
              transform: `scale(${interpolate(appear, [0, 1], [.82, 1], clamp)}) rotate(${interpolate(gather, [0, 1], [0, i === 0 ? -4 : 4], clamp)}deg)`,
              filter: "blur(10px)",
              fontFamily: FA_UI,
              color: FA_INK,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 14,
              zIndex: 28,
            }}
          >
            <div style={{fontFamily: "'Times New Roman', Times, serif", fontStyle: "italic", fontWeight: 700, fontSize: 74, color: "#C45A3E"}}>
              {skill.name}
            </div>
            <div style={{fontSize: 23, fontWeight: 800, color: "#5b514b"}}>{skill.subtitle}</div>
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: 236,
          top: 514,
          width: 608,
          height: 560,
          borderRadius: 46,
          background: "rgba(255,255,255,.72)",
          border: "1px solid rgba(255,255,255,.86)",
          boxShadow: "0 28px 90px rgba(96,40,27,.2)",
          opacity: interpolate(endpoint, [0, 1], [0, 1], clamp),
          transform: `scale(${interpolate(endpoint, [0, 1], [.72, 1], clamp)})`,
          zIndex: 25,
        }}
      >
        <SimpleClaudeLogo x={244} y={48} size={120} speed={2.1} />
        <div style={{position: "absolute", left: 72, right: 72, top: 194}}>
          <VideoFileCard label="input video" file={reel} x={0} y={0} width={464} height={264} start={50} active />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 446,
          top: 1088,
          fontFamily: FA_UI,
          fontWeight: 900,
          fontSize: 24,
          letterSpacing: 1.8,
          color: "#C45A3E",
          opacity: interpolate(frameReveal, [0, 1], [0, 1], clamp),
        }}
      >
        REAL FRAMES
      </div>
      {[
        [96, 1210, 28, "f_001"],
        [415, 1210, 76, "f_090"],
        [734, 1210, 124, "f_180"],
      ].map(([x, y, sf, name], i) => (
        <RealFrameThumb key={name} x={x as number} y={y as number} w={250} h={444} startFrom={sf as number} delay={96 + i * 6} label={name as string} />
      ))}
      <SoundOnce file="Pop.mp3" from={14} duration={20} volume={0.3} />
      <SoundOnce file="Pop.mp3" from={30} duration={20} volume={0.3} />
      <SoundOnce file="Correct.mp3" from={88} duration={32} volume={0.35} />
    </Shell>
  );
};

export const ClaudeVideoScene3GrabVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const command = `analyze this video locally: ${reel}`;
  const typed = typeText(frame, 18, 76, command);
  const submitted = frame > 82;
  const progress = interpolate(frame, [92, 124], [0, 100], clamp);
  const zoomIn = fade(frame, 10, 24);
  const zoomOut = fade(frame, 80, 98);
  const zoom = 1 + 0.34 * zoomIn * (1 - zoomOut);
  return (
    <Shell>
      <BigSerif text="Grab Video" top={128} />
      <div
        style={{
          transform: `scale(${zoom}) translateY(${interpolate(zoomIn * (1 - zoomOut), [0, 1], [0, -500], clamp)}px)`,
          transformOrigin: "22% 88%",
        }}
      >
        <ClaudeTerminalFrame input={submitted ? "" : typed} cursor={!submitted && frame >= 18 && frame <= 82} top={450} height={1040}>
          <div style={{position: "absolute", inset: 0, padding: 38, fontFamily: FA_CODE, fontSize: 28, lineHeight: 1.45}}>
            {submitted ? (
              <>
                <div style={{color: "#e8ddd6"}}>$ {command}</div>
                <div style={{marginTop: 24, color: "#a8a8a8"}}>Resolving source...</div>
                <div style={{marginTop: 14, color: "#a8a8a8"}}>Saving to ./videos/google-tools.mp4</div>
                <div style={{marginTop: 20, color: "#72d68a"}}>{Math.round(progress)}% downloaded</div>
                <div style={{marginTop: 28, height: 16, borderRadius: 999, background: "#343434", overflow: "hidden"}}>
                  <div style={{width: `${progress}%`, height: "100%", background: "#72d68a"}} />
                </div>
              </>
            ) : (
              <div style={{position: "absolute", inset: 0, display: "grid", placeItems: "center", opacity: 0.14}}>
                <Asterisk size={90} />
              </div>
            )}
          </div>
        </ClaudeTerminalFrame>
      </div>
      <Sequence from={18} durationInFrames={64}>
        <Audio src={staticFile("sounds/Typing.mp3")} volume={0.28} />
      </Sequence>
      <SoundOnce file="Click.mp3" from={86} duration={16} volume={0.35} />
      <SoundOnce file="Correct.mp3" from={116} duration={24} volume={0.34} />
    </Shell>
  );
};

export const ClaudeVideoScene4RipFrames: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const processorIn = spring({frame: frame - 32, fps, config: {damping: 180, stiffness: 92}});
  const videoIntoProcessor = spring({frame: frame - 50, fps, config: {damping: 130, stiffness: 56}});
  const framesOut = spring({frame: frame - 82, fps, config: {damping: 130, stiffness: 58}});
  const scan = fade(frame, 20, 62);
  const processorX = 540;
  const processorY = 1040;
  const frameTargets = [
    {x: 72, y: 1348, start: 18, label: "f_001"},
    {x: 315, y: 1348, start: 68, label: "f_064"},
    {x: 558, y: 1348, start: 118, label: "f_128"},
    {x: 801, y: 1348, start: 168, label: "f_192"},
  ];
  return (
    <Shell>
      <BigSerif text="ffmpeg" top={128} />
      <VideoFileCard label="video file" file={reel} x={360} y={300} width={360} height={640} start={0} active />
      <div
        style={{
          position: "absolute",
          left: 540 - 164,
          top: processorY,
          width: 328,
          height: 188,
          borderRadius: 38,
          background: "linear-gradient(180deg, #15100e 0%, #080706 100%)",
          border: "1px solid rgba(250,243,234,.22)",
          boxShadow: "0 28px 86px rgba(0,0,0,.38), inset 0 1px 0 rgba(255,255,255,.12)",
          display: "grid",
          placeItems: "center",
          fontFamily: FA_CODE,
          color: "#FAF3EA",
          opacity: interpolate(processorIn, [0, 1], [0, 1], clamp),
          transform: `translateY(${interpolate(processorIn, [0, 1], [42, 0], clamp)}px) scale(${interpolate(processorIn, [0, 1], [.86, 1], clamp)})`,
          zIndex: 36,
        }}
      >
        <div style={{textAlign: "center"}}>
          <div style={{fontSize: 54, fontWeight: 950, letterSpacing: -2}}>ffmpeg</div>
          <div style={{marginTop: 10, fontSize: 18, color: "#b8aea8"}}>extract frames</div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 538,
          top: 930,
          width: 4,
          height: 128,
          borderRadius: 999,
          background: "#FAF3EA",
          opacity: fade(frame, 44, 66) * (1 - fade(frame, 78, 92)),
          boxShadow: "0 0 22px rgba(250,243,234,.72)",
          zIndex: 34,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: interpolate(videoIntoProcessor, [0, 1], [540 - 86, processorX - 36], clamp),
          top: interpolate(videoIntoProcessor, [0, 1], [930, processorY + 58], clamp),
          width: interpolate(videoIntoProcessor, [0, 1], [172, 72], clamp),
          height: interpolate(videoIntoProcessor, [0, 1], [96, 44], clamp),
          borderRadius: 14,
          overflow: "hidden",
          border: "2px solid rgba(250,243,234,.88)",
          boxShadow: "0 16px 44px rgba(0,0,0,.32)",
          opacity: interpolate(videoIntoProcessor, [0, .74, 1], [0, 1, 0], clamp),
          zIndex: 42,
        }}
      >
        <Video src={staticFile(reel)} muted startFrom={36} style={{width: "100%", height: "100%", objectFit: "cover"}} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 382,
          top: 342 + 520 * scan,
          width: 316,
          height: 8,
          borderRadius: 999,
          background: "#FAF3EA",
          boxShadow: "0 0 24px rgba(250,243,234,.8)",
          opacity: interpolate(frame, [26, 34, 64, 74], [0, 1, 1, 0], clamp),
          zIndex: 80,
        }}
      />
      {frameTargets.map((thumb, i) => {
        const x = interpolate(framesOut, [0, 1], [processorX - 104, thumb.x], clamp);
        const y = interpolate(framesOut, [0, 1], [processorY + 174, thumb.y], clamp);
        const opacity = interpolate(framesOut, [0, .2, 1], [0, 1, 1], clamp);
        const scale = interpolate(framesOut, [0, 1], [.55, 1], clamp);
        return (
          <div
            key={thumb.label}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: 208,
              height: 300,
              opacity,
              transform: `scale(${scale})`,
              transformOrigin: "50% 0%",
              zIndex: 44 + i,
            }}
          >
            <RealFrameThumb x={0} y={0} w={208} h={300} startFrom={thumb.start} delay={82 + i * 5} label={thumb.label} />
          </div>
        );
      })}
      <SoundOnce file="woosh.mp3" from={82} duration={42} volume={0.3} />
    </Shell>
  );
};

export const ClaudeVideoScene5FrameByFrame: React.FC = () => {
  const frame = useCurrentFrame();
  const frameGlow = fade(frame, 58, 108);
  const trunk = fade(frame, 54, 82);
  const branchA = fade(frame, 70, 98);
  const branchB = fade(frame, 78, 106);
  const branchC = fade(frame, 86, 114);
  return (
    <Shell bg={FA_CREAM} cream>
      <BigSerif text="Visual Read" top={78} color="#C45A3E" size={104} />
      <TranscriptCard x={72} y={60} scale={0.46} blur={0} />
      <ScanLine top={176} start={18} height={286} color="#DE7356" />
      <VideoFileCard label="video" file={reel} x={94} y={934} width={382} height={680} start={46} active />
      <svg width={1080} height={1920} style={{position: "absolute", inset: 0, zIndex: 12, overflow: "visible"}}>
        <defs>
          <filter id="scene5-workflow-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#DE7356" floodOpacity="0.38" />
          </filter>
        </defs>
        <polyline
          points="476,1274 620,1274 620,1020"
          stroke="#DE7356"
          strokeWidth="13"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="3 30"
          strokeDashoffset={(1 - trunk) * 300 - frame * 1.7}
          opacity={trunk}
          fill="none"
          filter="url(#scene5-workflow-glow)"
        />
        <polyline
          points="620,1020 680,1020"
          stroke="#DE7356"
          strokeWidth="13"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="3 30"
          strokeDashoffset={(1 - branchA) * 140 - frame * 1.7}
          opacity={branchA}
          fill="none"
          filter="url(#scene5-workflow-glow)"
        />
        <polyline
          points="620,1120 620,1286 744,1286"
          stroke="#DE7356"
          strokeWidth="13"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="3 30"
          strokeDashoffset={(1 - branchB) * 260 - frame * 1.7}
          opacity={branchB}
          fill="none"
          filter="url(#scene5-workflow-glow)"
        />
        <polyline
          points="620,1120 620,1548 712,1548"
          stroke="#DE7356"
          strokeWidth="13"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="3 30"
          strokeDashoffset={(1 - branchC) * 500 - frame * 1.7}
          opacity={branchC}
          fill="none"
          filter="url(#scene5-workflow-glow)"
        />
        <path d="M 656 1005 L 680 1020 L 656 1035" stroke="#DE7356" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={branchA} filter="url(#scene5-workflow-glow)" />
        <path d="M 720 1271 L 744 1286 L 720 1301" stroke="#DE7356" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={branchB} filter="url(#scene5-workflow-glow)" />
        <path d="M 688 1533 L 712 1548 L 688 1563" stroke="#DE7356" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={branchC} filter="url(#scene5-workflow-glow)" />
      </svg>
      {[
        [680, 932, 32, "frame 001"],
        [744, 1198, 88, "frame 090"],
        [712, 1462, 142, "frame 180"],
      ].map(([x, y, sf, name], i) => {
        const p = fade(frame, 68 + i * 9, 94 + i * 9);
        return (
          <div key={name} style={{filter: `drop-shadow(0 0 ${28 * frameGlow}px rgba(222,115,86,.46))`}}>
            <div style={{opacity: p}}>
              <RealFrameThumb x={x as number} y={y as number} w={228} h={176} startFrom={sf as number} delay={68 + i * 9} label={name as string} />
            </div>
          </div>
        );
      })}
      <SoundOnce file="woosh.mp3" from={50} duration={42} volume={0.26} />
      <SoundOnce file="Correct.mp3" from={94} duration={24} volume={0.3} />
    </Shell>
  );
};

export const ClaudeVideoScene6AnyVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const active = frame < 44 ? 0 : frame < 84 ? 1 : 2;
  const scanX = active === 0 ? 188 : active === 1 ? 608 : 188;
  const scanY1 = active === 2 ? 1260 : 604;
  const scanY2 = active === 2 ? 1632 : 1002;
  const scanW = active === 2 ? 704 : 284;
  const pathA = fade(frame, 12, 40);
  const pathB = fade(frame, 30, 58);
  const pathC = fade(frame, 48, 82);
  return (
    <Shell bg={FA_CREAM} cream>
      <BigSerif text="Entire Video" top={106} color="#C45A3E" size={106} />
      <VideoFileCard label="Reel" file={reel} x={150} y={540} width={332} height={590} start={10} active={active === 0} />
      <VideoFileCard label="Shorts" file={shorts} x={598} y={540} width={332} height={590} start={38} active={active === 1} />
      <div
        style={{
          position: "absolute",
          left: 150,
          top: 1216,
          width: 780,
          height: 428,
          borderRadius: 28,
          overflow: "hidden",
          border: active === 2 ? "3px solid #DE7356" : "1px solid rgba(196,90,62,.22)",
          boxShadow: active === 2 ? "0 22px 76px rgba(222,115,86,.38)" : "0 18px 54px rgba(0,0,0,.14)",
          background: "#111",
        }}
      >
        <Video src={staticFile(youtube)} muted loop style={{width: "100%", height: "100%", objectFit: "cover"}} />
        <div style={{position: "absolute", left: 18, bottom: 18, borderRadius: 999, background: "rgba(0,0,0,.68)", color: "#fff", fontFamily: FA_UI, fontSize: 22, fontWeight: 900, padding: "10px 18px"}}>
          YouTube 16:9
        </div>
      </div>
      <svg width={1080} height={1920} style={{position: "absolute", inset: 0, zIndex: 9}}>
        <defs>
          <filter id="scene6-workflow-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#DE7356" floodOpacity="0.38" />
          </filter>
        </defs>
        <polyline
          points="540,470 316,470 316,540"
          stroke="#DE7356"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="3 30"
          strokeDashoffset={(1 - pathA) * 330 - frame * 1.7}
          opacity={pathA}
          fill="none"
          filter="url(#scene6-workflow-glow)"
        />
        <polyline
          points="540,470 764,470 764,540"
          stroke="#DE7356"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="3 30"
          strokeDashoffset={(1 - pathB) * 330 - frame * 1.7}
          opacity={pathB}
          fill="none"
          filter="url(#scene6-workflow-glow)"
        />
        <polyline
          points="540,470 540,1216"
          stroke="#DE7356"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="10 18"
          strokeDashoffset={(1 - pathC) * 760}
          opacity={pathC}
          fill="none"
          filter="url(#scene6-workflow-glow)"
        />
        <path d="M 301 516 L 316 540 L 331 516" stroke="#DE7356" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={pathA} filter="url(#scene6-workflow-glow)" />
        <path d="M 749 516 L 764 540 L 779 516" stroke="#DE7356" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={pathB} filter="url(#scene6-workflow-glow)" />
        <path d="M 525 1192 L 540 1216 L 555 1192" stroke="#DE7356" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={pathC} filter="url(#scene6-workflow-glow)" />
      </svg>
      <div
        style={{
          position: "absolute",
          left: scanX,
          top: interpolate(frame % 34, [0, 33], [scanY1, scanY2], clamp),
          width: scanW,
          height: 7,
          borderRadius: 999,
          background: "#DE7356",
          boxShadow: "0 0 28px rgba(222,115,86,.76)",
          zIndex: 80,
        }}
      />
      <SoundOnce file="Pop.mp3" from={14} duration={18} volume={0.24} />
      <SoundOnce file="Pop.mp3" from={58} duration={18} volume={0.24} />
      <SoundOnce file="Pop.mp3" from={104} duration={18} volume={0.24} />
      <Img
        src={staticFile("claude.png")}
        style={{
          position: "absolute",
          left: 464,
          top: 302,
          width: 152,
          height: 152,
          objectFit: "contain",
          transform: `rotate(${frame * 1.8}deg)`,
          transformOrigin: "50% 50%",
          zIndex: 120,
          filter: "drop-shadow(0 18px 34px rgba(111,43,27,.22))",
        }}
      />
    </Shell>
  );
};

export const ClaudeVideoScene7ZeroApi: React.FC = () => {
  const frame = useCurrentFrame();
  const command = "python -m video_reader.decode ./reel.mp4 --local";
  const typed = typeText(frame, 12, 56, command);
  const submitted = frame > 60;
  const cardIn = fade(frame, 70, 92);
  return (
    <Shell>
      <BigSerif text="No API Cost" top={128} />
      <div style={{filter: cardIn > 0 ? `blur(${2.4 * cardIn}px)` : undefined}}>
        <ClaudeTerminalFrame input={submitted ? "" : typed} cursor={!submitted && frame >= 12 && frame <= 56} top={430} height={940}>
          <div style={{position: "absolute", inset: 0, padding: 38, fontFamily: FA_CODE, fontSize: 27, lineHeight: 1.48, color: "#e8ddd6"}}>
            {submitted ? (
              <>
                <div>$ {command}</div>
                <div style={{marginTop: 20, color: "#a8a8a8"}}>local ffmpeg ready</div>
                <div style={{color: "#a8a8a8"}}>frames saved to ./.video-cache</div>
                <div style={{color: "#a8a8a8"}}>transcript aligned with visuals</div>
                <div style={{marginTop: 20, color: "#72d68a"}}>network: disabled</div>
                <div style={{color: "#72d68a"}}>api_calls: 0</div>
                <div style={{color: "#72d68a"}}>cost: $0.00</div>
              </>
            ) : null}
          </div>
        </ClaudeTerminalFrame>
      </div>
      <div
        style={{
          position: "absolute",
          left: 172,
          right: 172,
          top: 738,
          height: 310,
          borderRadius: 42,
          background: "rgba(250,243,234,.94)",
          border: "1px solid rgba(255,255,255,.4)",
          boxShadow: "0 28px 94px rgba(80,32,22,.28)",
          display: "grid",
          placeItems: "center",
          opacity: cardIn,
          transform: `scale(${interpolate(cardIn, [0, 1], [.86, 1], clamp)})`,
          zIndex: 100,
        }}
      >
        <div style={{textAlign: "center"}}>
          <div
            style={{
              fontFamily: "'Times New Roman', Times, serif",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: 132,
              lineHeight: 0.86,
              color: "#C45A3E",
              textShadow: "0 3px 0 rgba(255,255,255,.78), 0 20px 48px rgba(111,43,27,.2)",
            }}
          >
            NO API
          </div>
          <div style={{marginTop: 20, fontFamily: FA_UI, fontSize: 34, fontWeight: 950, color: FA_INK}}>
            COST: $0.00
          </div>
        </div>
      </div>
      <Sequence from={12} durationInFrames={44}>
        <Audio src={staticFile("sounds/Typing.mp3")} volume={0.26} />
      </Sequence>
      <SoundOnce file="Click.mp3" from={60} duration={14} volume={0.35} />
      <SoundOnce file="Correct.mp3" from={88} duration={24} volume={0.35} />
    </Shell>
  );
};

export const ClaudeVideoScene8OrangeBirds: React.FC = () => (
  <AbsoluteFill style={{background: FA_ORANGE, overflow: "hidden"}}>
    <VantaRealBackground
      preset="birds"
      options={{
        backgroundColor: 0xde7356,
        color1: 0xfaf3ea,
        color2: 0xf6dfcf,
        birdSize: 1.15,
        wingSpan: 24,
        speedLimit: 0.6,
        separation: 32,
        alignment: 34,
        cohesion: 28,
        quantity: 4,
      }}
      frameLocked
      warmupFrames={95}
    />
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(circle at 28% 18%, rgba(250,243,234,.08), transparent 28%), radial-gradient(circle at 78% 72%, rgba(222,115,86,.12), transparent 34%)",
        pointerEvents: "none",
      }}
    />
  </AbsoluteFill>
);

export const ClaudeVideoSkillsFull: React.FC = () => (
  <>
    <Sequence durationInFrames={CLAUDE_VIDEO_SCENE_1_DURATION}>
      <ClaudeVideoScene1TranscriptMiss />
    </Sequence>
    <Sequence from={CLAUDE_VIDEO_SCENE_1_DURATION} durationInFrames={CLAUDE_VIDEO_SCENE_2_DURATION}>
      <ClaudeVideoScene2TwoSkills />
    </Sequence>
    <Sequence
      from={CLAUDE_VIDEO_SCENE_1_DURATION + CLAUDE_VIDEO_SCENE_2_DURATION}
      durationInFrames={CLAUDE_VIDEO_SCENE_3_DURATION}
    >
      <ClaudeVideoScene3GrabVideo />
    </Sequence>
    <Sequence
      from={CLAUDE_VIDEO_SCENE_1_DURATION + CLAUDE_VIDEO_SCENE_2_DURATION + CLAUDE_VIDEO_SCENE_3_DURATION}
      durationInFrames={CLAUDE_VIDEO_SCENE_4_DURATION}
    >
      <ClaudeVideoScene4RipFrames />
    </Sequence>
    <Sequence
      from={
        CLAUDE_VIDEO_SCENE_1_DURATION +
        CLAUDE_VIDEO_SCENE_2_DURATION +
        CLAUDE_VIDEO_SCENE_3_DURATION +
        CLAUDE_VIDEO_SCENE_4_DURATION
      }
      durationInFrames={CLAUDE_VIDEO_SCENE_5_DURATION}
    >
      <ClaudeVideoScene5FrameByFrame />
    </Sequence>
    <Sequence
      from={
        CLAUDE_VIDEO_SCENE_1_DURATION +
        CLAUDE_VIDEO_SCENE_2_DURATION +
        CLAUDE_VIDEO_SCENE_3_DURATION +
        CLAUDE_VIDEO_SCENE_4_DURATION +
        CLAUDE_VIDEO_SCENE_5_DURATION
      }
      durationInFrames={CLAUDE_VIDEO_SCENE_6_DURATION}
    >
      <ClaudeVideoScene6AnyVideo />
    </Sequence>
    <Sequence
      from={
        CLAUDE_VIDEO_SCENE_1_DURATION +
        CLAUDE_VIDEO_SCENE_2_DURATION +
        CLAUDE_VIDEO_SCENE_3_DURATION +
        CLAUDE_VIDEO_SCENE_4_DURATION +
        CLAUDE_VIDEO_SCENE_5_DURATION +
        CLAUDE_VIDEO_SCENE_6_DURATION
      }
      durationInFrames={CLAUDE_VIDEO_SCENE_7_DURATION}
    >
      <ClaudeVideoScene7ZeroApi />
    </Sequence>
    <Sequence
      from={
        CLAUDE_VIDEO_SCENE_1_DURATION +
        CLAUDE_VIDEO_SCENE_2_DURATION +
        CLAUDE_VIDEO_SCENE_3_DURATION +
        CLAUDE_VIDEO_SCENE_4_DURATION +
        CLAUDE_VIDEO_SCENE_5_DURATION +
        CLAUDE_VIDEO_SCENE_6_DURATION +
        CLAUDE_VIDEO_SCENE_7_DURATION
      }
      durationInFrames={CLAUDE_VIDEO_SCENE_8_DURATION}
    >
      <ClaudeVideoScene8OrangeBirds />
    </Sequence>
  </>
);
