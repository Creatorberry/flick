import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export const GSTACK_REVEAL_CEO_INSTALL_DURATION = 267;

const INSTALL_COMMAND =
  'git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack && cd ~/.claude/skills/gstack && ./setup';

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const frameAt = (seconds: number) => Math.round(seconds * 30);

const COLORS = {
  cream: '#FAF3EA',
  claude: '#D97A57',
  terminal: '#1A1A1A',
  terminalChrome: '#2A2A2A',
  terminalLine: '#3A3A3A',
  text: '#D4D4D4',
  muted: '#8A8A8A',
  green: '#79D88B',
};

const scrollFrames = Array.from({length: 60}, (_, index) =>
  staticFile(`github-gstack-scroll/frame_${String(index).padStart(3, '0')}.jpg`),
);

const PixelRobot: React.FC<{size?: number}> = ({size = 5}) => {
  const cols = 16;
  const rows = 9;
  const filled = new Set([
    '0,2', '0,3', '0,4', '0,5', '0,6', '0,7', '0,8', '0,9', '0,10', '0,11', '0,12', '0,13',
    '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '1,10', '1,11', '1,12', '1,13',
    '2,2', '2,3', '2,5', '2,6', '2,7', '2,8', '2,9', '2,10', '2,12', '2,13',
    '3,0', '3,1', '3,2', '3,3', '3,4', '3,5', '3,6', '3,7', '3,8', '3,9', '3,10', '3,11', '3,12', '3,13', '3,14', '3,15',
    '4,0', '4,1', '4,2', '4,3', '4,4', '4,5', '4,6', '4,7', '4,8', '4,9', '4,10', '4,11', '4,12', '4,13', '4,14', '4,15',
    '5,2', '5,3', '5,4', '5,5', '5,6', '5,7', '5,8', '5,9', '5,10', '5,11', '5,12', '5,13',
    '6,2', '6,3', '6,4', '6,5', '6,6', '6,7', '6,8', '6,9', '6,10', '6,11', '6,12', '6,13',
    '7,3', '7,4', '7,6', '7,7', '7,8', '7,9', '7,11', '7,12',
    '8,3', '8,4', '8,6', '8,7', '8,8', '8,9', '8,11', '8,12',
  ]);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, ${size}px)`,
        gridTemplateRows: `repeat(${rows}, ${size}px)`,
        gap: 0,
        flexShrink: 0,
      }}
    >
      {Array.from({length: rows * cols}, (_, index) => {
        const row = Math.floor(index / cols);
        const col = index % cols;
        return (
          <div
            key={index}
            style={{
              width: size,
              height: size,
              background: filled.has(`${row},${col}`) ? COLORS.claude : 'transparent',
            }}
          />
        );
      })}
    </div>
  );
};

const TopText: React.FC<{text: string; opacity: number; fontSize?: number; top?: number; color?: string}> = ({
  text,
  opacity,
  fontSize = 116,
  top = 172,
  color = COLORS.cream,
}) => (
  <div
    style={{
      position: 'absolute',
      top,
      left: 54,
      right: 54,
      opacity,
      zIndex: 100,
      color,
      fontFamily: "'Times New Roman', Times, serif",
      fontStyle: 'italic',
      fontWeight: 700,
      fontSize,
      lineHeight: 1,
      textAlign: 'center',
      whiteSpace: 'nowrap',
      textShadow:
        color === COLORS.claude
          ? '0 8px 26px rgba(0,0,0,0.45)'
          : color === '#24292F'
            ? '0 4px 20px rgba(255,255,255,0.72), 0 12px 34px rgba(0,0,0,0.22)'
            : '0 8px 34px rgba(0,0,0,0.64)',
    }}
  >
    {text}
  </div>
);

const FadeBlack: React.FC<{opacity: number}> = ({opacity}) => (
  <div style={{position: 'absolute', inset: 0, background: '#050608', opacity, zIndex: 90}} />
);

const GitHubScroll: React.FC<{localFrame: number; duration: number; opacity: number}> = ({
  localFrame,
  duration,
  opacity,
}) => {
  const index = Math.min(59, Math.max(0, Math.round(interpolate(localFrame, [0, duration - 1], [0, 59], clamp))));
  const zoom = 1.72;
  const zoomedWidth = 1080 * zoom;
  const zoomedHeight = 1920 * zoom;
  const veil = interpolate(localFrame, [18, 30, 96, 114], [0, 0.2, 0.2, 0.08], clamp);

  return (
    <div style={{position: 'absolute', inset: 0, opacity, background: '#F6F8FA', overflow: 'hidden'}}>
      <Img
        src={scrollFrames[index]}
        style={{
          position: 'absolute',
          inset: -70,
          width: 'calc(100% + 140px)',
          height: 'calc(100% + 140px)',
          objectFit: 'cover',
          filter: 'blur(18px)',
          opacity: 0.72,
          transform: 'scale(1.03)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(
            180deg,
            rgba(246,248,250,${veil}) 0%,
            rgba(246,248,250,${veil * 0.78}) 48%,
            rgba(13,17,23,${veil * 0.18}) 100%
          )`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 54,
          right: 54,
          top: 96,
          bottom: 96,
          overflow: 'hidden',
          borderRadius: 22,
        }}
      >
        <Img
          src={scrollFrames[index]}
          style={{
            position: 'absolute',
            left: -18,
            top: -420,
            width: zoomedWidth,
            height: zoomedHeight,
            objectFit: 'fill',
          }}
        />
      </div>
    </div>
  );
};

const GstackCard: React.FC<{localFrame: number; opacity: number}> = ({localFrame, opacity}) => {
  const {fps} = useVideoConfig();
  const enter = spring({frame: localFrame, fps, config: {damping: 13, stiffness: 135}});
  const scale = interpolate(enter, [0, 1], [0.86, 1], clamp);
  const rotateX = interpolate(enter, [0, 1], [10, 0], clamp);
  const rotateY = interpolate(enter, [0, 1], [-16, 0], clamp);
  const y = Math.sin(localFrame / 11) * -10;

  return (
    <div
      style={{
        position: 'absolute',
        left: 80,
        top: 510 + y,
        width: 920,
        height: 520,
        opacity,
        zIndex: 50,
        transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
        transformOrigin: 'center center',
        borderRadius: 20,
        overflow: 'hidden',
        background: '#0D1117',
        border: '1px solid rgba(255,255,255,0.14)',
        boxShadow:
          '0 2px 4px rgba(0,0,0,0.22), 0 8px 24px rgba(0,0,0,0.38), 0 28px 64px rgba(0,0,0,0.45), 0 70px 140px rgba(0,0,0,0.35)',
      }}
    >
      <Img src={staticFile('gstck.avif')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
    </div>
  );
};

const GarryTanImage: React.FC<{localFrame: number; opacity: number}> = ({localFrame, opacity}) => {
  const {fps} = useVideoConfig();
  const enter = spring({frame: localFrame, fps, config: {damping: 14, stiffness: 120}});
  const scale = interpolate(enter, [0, 1], [0.94, 1], clamp);

  return (
    <div
      style={{
        position: 'absolute',
        left: 90,
        top: 330,
        width: 900,
        height: 1120,
        opacity,
        zIndex: 50,
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
        borderRadius: 28,
        overflow: 'hidden',
        background: '#080A0E',
        boxShadow: '0 36px 110px rgba(0,0,0,0.58)',
      }}
    >
      <Img src={staticFile('gary-tan.png')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
    </div>
  );
};

const ClaudeCodeTerminal: React.FC<{localFrame: number; opacity: number}> = ({localFrame, opacity}) => {
  const typeStart = frameAt(0.62);
  const submitAt = frameAt(2.35);
  const typedChars = Math.floor(interpolate(localFrame, [typeStart, submitAt], [0, INSTALL_COMMAND.length], clamp));
  const typed = INSTALL_COMMAND.slice(0, Math.max(0, Math.min(INSTALL_COMMAND.length, typedChars)));
  const submitted = localFrame >= submitAt;
  const line1 = interpolate(localFrame, [submitAt + 8, submitAt + 14], [0, 1], clamp);
  const line2 = interpolate(localFrame, [submitAt + 18, submitAt + 24], [0, 1], clamp);
  const line3 = interpolate(localFrame, [submitAt + 28, submitAt + 34], [0, 1], clamp);
  const line4 = interpolate(localFrame, [submitAt + 38, submitAt + 44], [0, 1], clamp);

  return (
    <div
      style={{
        position: 'absolute',
        left: 54,
        top: 330,
        width: 972,
        height: 1060,
        opacity,
        zIndex: 50,
        borderRadius: 16,
        overflow: 'hidden',
        background: '#1E1E1E',
        color: COLORS.text,
        fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
        border: '1px solid #3A3A3A',
        boxShadow:
          '0 2px 4px rgba(0,0,0,0.22), 0 8px 24px rgba(0,0,0,0.38), 0 28px 64px rgba(0,0,0,0.45), 0 70px 140px rgba(0,0,0,0.35)',
      }}
    >
      <div style={{height: 78, background: COLORS.terminalChrome, borderBottom: `1px solid ${COLORS.terminalLine}`, display: 'flex', alignItems: 'center', padding: '0 22px'}}>
        <div style={{height: 58, display: 'flex', alignItems: 'center', gap: 12, padding: '0 18px', background: '#1E1E1E', border: `1px solid ${COLORS.terminalLine}`, borderBottomColor: '#1E1E1E', borderRadius: '12px 12px 0 0', fontSize: 24, fontWeight: 760}}>
          <PixelRobot size={2.2} />
          Claude Code
        </div>
      </div>

      <div style={{height: 70, borderBottom: '1px solid #2E2E2E', display: 'flex', alignItems: 'center', padding: '0 28px', color: '#C8C8C8', fontSize: 25, fontWeight: 650}}>
        Untitled
      </div>

      <div style={{position: 'absolute', left: 0, right: 0, top: 148, bottom: 190, padding: '38px 34px', overflow: 'hidden', background: COLORS.terminal}}>
        {submitted ? (
          <div style={{fontFamily: "Consolas, 'Courier New', monospace", fontSize: 24, lineHeight: 1.55}}>
            <div style={{color: COLORS.green}}>&gt; {INSTALL_COMMAND}</div>
            <div style={{marginTop: 28, opacity: line1, color: '#C8C8C8'}}>Cloning into '~/.claude/skills/gstack'...</div>
            <div style={{opacity: line2, color: '#C8C8C8'}}>Installing dependencies...</div>
            <div style={{opacity: line3, color: '#C8C8C8'}}>Registering gstack skills...</div>
            <div style={{opacity: line4, color: COLORS.green}}>gstack ready.</div>
          </div>
        ) : (
          <div style={{height: '100%', display: 'grid', placeItems: 'center', opacity: 0.42}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, fontSize: 34, fontWeight: 650}}>
              <PixelRobot size={8} />
              Claude Code
            </div>
          </div>
        )}
      </div>

      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 190, borderTop: '1px solid #2E2E2E', padding: '20px 24px 12px', background: '#1E1E1E'}}>
        <div style={{height: 94, borderRadius: 14, background: '#2A2A2A', border: `1px solid ${COLORS.terminalLine}`, padding: '16px 20px', overflow: 'hidden', fontFamily: "Consolas, 'Courier New', monospace", fontSize: 23, lineHeight: '31px', color: '#E6E6E6'}}>
          {submitted ? '' : typed}
          {!submitted && <span style={{display: 'inline-block', width: 12, height: 25, marginLeft: 4, background: '#AAA', verticalAlign: -4}} />}
        </div>
        <div style={{position: 'absolute', left: 24, right: 24, bottom: 14, display: 'flex', justifyContent: 'space-between', color: COLORS.muted, fontSize: 18}}>
          <span>+  image  |  index.html</span>
          <span style={{background: '#2A2A2A', border: `1px solid ${COLORS.terminalLine}`, borderRadius: 6, padding: '8px 16px', color: '#C0C0C0', fontWeight: 650}}>&lt;/&gt; Edit automatically</span>
        </div>
      </div>
    </div>
  );
};

export const GstackRevealCeoInstall: React.FC = () => {
  const frame = useCurrentFrame();

  const gstackStart = 0;
  const gstackEnd = frameAt(2.2);
  const ceoStart = frameAt(2.2);
  const ceoEnd = frameAt(4.2);
  const installStart = frameAt(4.2);
  const installEnd = GSTACK_REVEAL_CEO_INSTALL_DURATION;

  const gLocal = frame - gstackStart;
  const ceoLocal = frame - ceoStart;
  const installLocal = frame - installStart;

  const gOpacity = interpolate(frame, [0, 8, gstackEnd - 10, gstackEnd], [1, 1, 1, 0], clamp);
  const ceoOpacity = interpolate(frame, [ceoStart, ceoStart + 10, ceoEnd - 10, ceoEnd], [0, 1, 1, 0], clamp);
  const installOpacity = interpolate(frame, [installStart, installStart + 12], [0, 1], clamp);

  const gLabel = interpolate(frame, [6, 12, gstackEnd - 10, gstackEnd], [0, 1, 1, 0], clamp);
  const ceoLabel = interpolate(frame, [ceoStart + 6, ceoStart + 13, ceoEnd - 10, ceoEnd], [0, 1, 1, 0], clamp);
  const installLabel = interpolate(frame, [installStart + 8, installStart + 16], [0, 1], clamp);

  const black1 = interpolate(frame, [gstackEnd - 5, gstackEnd, ceoStart + 5], [0, 1, 0], clamp);
  const black2 = interpolate(frame, [ceoEnd - 5, ceoEnd, installStart + 5], [0, 1, 0], clamp);

  return (
    <AbsoluteFill style={{background: '#050608', overflow: 'hidden'}}>
      <GitHubScroll localFrame={gLocal} duration={gstackEnd - gstackStart} opacity={gOpacity} />
      <GstackCard localFrame={gLocal} opacity={gOpacity} />
      <TopText text="GSTACK" opacity={gLabel} fontSize={136} top={354} color="#24292F" />

      <div style={{position: 'absolute', inset: 0, opacity: ceoOpacity, background: '#f26522'}}>
        <GarryTanImage localFrame={ceoLocal} opacity={1} />
      </div>
      <TopText text="YC CEO" opacity={ceoLabel} />

      <div style={{position: 'absolute', inset: 0, opacity: installOpacity, background: 'radial-gradient(ellipse at 50% 28%, #E8896E 0%, #D97A57 58%, #C45A3E 100%)'}}>
        <ClaudeCodeTerminal localFrame={installLocal} opacity={1} />
      </div>
      <TopText text="INSTALL: ONE COMMAND" opacity={installLabel} fontSize={76} top={230} />

      <FadeBlack opacity={Math.max(black1, black2)} />
    </AbsoluteFill>
  );
};
