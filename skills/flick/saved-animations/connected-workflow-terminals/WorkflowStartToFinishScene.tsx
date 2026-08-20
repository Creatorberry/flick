import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export const WORKFLOW_START_TO_FINISH_DURATION = 106;

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const COLORS = {
  cream: '#FAF3EA',
  creamSoft: '#FFF9F0',
  ink: '#1A1A1A',
  chrome: '#2A2A2A',
  chromeDark: '#1E1E1E',
  body: '#1A1A1A',
  border: '#3A3A3A',
  claude: '#CC785C',
  peach: '#DE7356',
  peachLight: '#E8896E',
  peachDark: '#C45A3E',
  code: '#D4D4D4',
  muted: '#888888',
  green: '#79D88B',
  blue: '#7CB7FF',
  yellow: '#F2C56B',
};

type Stage = {
  id: string;
  label: string;
  tab: string;
  prompt: string;
  lines: string[];
  x: number;
  y: number;
  width: number;
  height: number;
  enter: number;
  activeStart: number;
  activeEnd: number;
  accent: string;
};

const stages: Stage[] = [
  {
    id: 'planning',
    label: 'CEO',
    tab: 'workflow-plan.ts',
    prompt: 'claude plan workflow',
    x: 88,
    y: 368,
    width: 620,
    height: 390,
    enter: 0,
    activeStart: 0,
    activeEnd: 36,
    accent: COLORS.yellow,
    lines: [
      'scan project files...',
      'map dependencies...',
      'create implementation plan',
      'assign("design-review")',
      'assign("release-checks")',
      'plan.ready = true',
    ],
  },
  {
    id: 'designing',
    label: 'Designer',
    tab: 'ui-review.tsx',
    prompt: 'claude review interface',
    x: 372,
    y: 736,
    width: 620,
    height: 390,
    enter: 22,
    activeStart: 34,
    activeEnd: 74,
    accent: COLORS.blue,
    lines: [
      'open src/App.tsx',
      'adjust spacing tokens',
      'fix mobile overflow',
      'polish button states',
      'contrast.check() -> AAA',
      'design.review = approved',
    ],
  },
  {
    id: 'releases',
    label: 'Developer',
    tab: 'release-runner.sh',
    prompt: 'claude ship release',
    x: 88,
    y: 1110,
    width: 620,
    height: 400,
    enter: 66,
    activeStart: 72,
    activeEnd: 106,
    accent: COLORS.green,
    lines: [
      'run typecheck',
      'run tests -> 482 passed',
      'generate changelog',
      'tag v1.4.0',
      'deploy preview passed',
      'release.ready = true',
    ],
  },
];

const ClaudeMark: React.FC<{size: number; color?: string}> = ({
  size,
  color = COLORS.claude,
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
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

const PixelRobot: React.FC<{scale?: number}> = ({scale = 1}) => (
  <svg
    viewBox="0 0 242 152"
    width={118 * scale}
    height={74 * scale}
    shapeRendering="crispEdges"
    style={{display: 'block'}}
  >
    <rect x="30" y="0" width="182" height="32" fill={COLORS.claude} />
    <rect x="30" y="32" width="31" height="28" fill={COLORS.claude} />
    <rect x="72" y="32" width="98" height="28" fill={COLORS.claude} />
    <rect x="181" y="32" width="31" height="28" fill={COLORS.claude} />
    <rect x="0" y="60" width="242" height="32" fill={COLORS.claude} />
    <rect x="30" y="92" width="182" height="30" fill={COLORS.claude} />
    <rect x="42" y="122" width="19" height="30" fill={COLORS.claude} />
    <rect x="72" y="122" width="19" height="30" fill={COLORS.claude} />
    <rect x="151" y="122" width="19" height="30" fill={COLORS.claude} />
    <rect x="181" y="122" width="19" height="30" fill={COLORS.claude} />
  </svg>
);

const WorkflowPath: React.FC = () => {
  const frame = useCurrentFrame();
  const pathOne = interpolate(frame, [18, 50], [0, 1], clamp);
  const pathTwo = interpolate(frame, [58, 92], [0, 1], clamp);
  const dotOne = interpolate(frame, [20, 48], [0, 1], clamp);
  const dotTwo = interpolate(frame, [62, 90], [0, 1], clamp);
  const oneX = interpolate(dotOne, [0, 0.38, 0.9, 1], [708, 1030, 1030, 992], clamp);
  const oneY = interpolate(dotOne, [0, 0.38, 0.9, 1], [563, 563, 931, 931], clamp);
  const twoX = interpolate(dotTwo, [0, 0.62, 1], [880, 880, 708], clamp);
  const twoY = interpolate(dotTwo, [0, 0.62, 1], [1126, 1310, 1310], clamp);

  return (
    <svg
      width="1080"
      height="1920"
      viewBox="0 0 1080 1920"
      style={{position: 'absolute', inset: 0, zIndex: 95, overflow: 'visible'}}
    >
      <defs>
        <filter id="workflow-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor={COLORS.peach} floodOpacity="0.38" />
        </filter>
      </defs>
      <polyline
        points="708,563 1030,563 1030,931 992,931"
        stroke={COLORS.peach}
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="3 30"
        strokeDashoffset={(1 - pathOne) * 760 - frame * 1.7}
        opacity={pathOne}
        fill="none"
        filter="url(#workflow-glow)"
      />
      <polyline
        points="880,1126 880,1310 708,1310"
        stroke={COLORS.peach}
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="3 30"
        strokeDashoffset={(1 - pathTwo) * 390 - frame * 1.7}
        opacity={pathTwo}
        fill="none"
        filter="url(#workflow-glow)"
      />
      <path
        d="M 1018 916 L 992 931 L 1018 946"
        stroke={COLORS.peach}
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity={pathOne}
        filter="url(#workflow-glow)"
      />
      <path
        d="M 733 1295 L 707 1310 L 733 1325"
        stroke={COLORS.peach}
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity={pathTwo}
        filter="url(#workflow-glow)"
      />
      <circle cx={oneX} cy={oneY} r="17" fill={COLORS.peachLight} opacity={pathOne} />
      <circle cx={oneX} cy={oneY} r="35" fill={COLORS.peachLight} opacity={pathOne * 0.22} />
      <circle cx={twoX} cy={twoY} r="17" fill={COLORS.peachLight} opacity={pathTwo} />
      <circle cx={twoX} cy={twoY} r="35" fill={COLORS.peachLight} opacity={pathTwo * 0.22} />
    </svg>
  );
};

const CodeLine: React.FC<{
  text: string;
  index: number;
  localFrame: number;
  accent: string;
}> = ({text, index, localFrame, accent}) => {
  const appear = interpolate(localFrame, [6 + index * 4, 12 + index * 4], [0, 1], clamp);
  const color =
    text.includes('ready') || text.includes('approved') || text.includes('passed')
      ? COLORS.green
      : text.includes('assign') || text.includes('plan')
        ? COLORS.yellow
        : text.includes('open') || text.includes('run') || text.includes('deploy')
          ? COLORS.blue
          : COLORS.code;

  return (
    <div
      style={{
        opacity: appear,
        transform: `translateY(${interpolate(appear, [0, 1], [14, 0], clamp)}px)`,
        color,
        display: 'flex',
        gap: 16,
        textShadow: text.includes('ready') ? `0 0 18px ${accent}` : undefined,
      }}
    >
      <span style={{color: 'rgba(250,243,234,0.32)', width: 38, textAlign: 'right'}}>
        {String(index + 1).padStart(2, '0')}
      </span>
      <span>{text}</span>
    </div>
  );
};

const ClaudeTerminal: React.FC<{
  stage: Stage;
  isActive: boolean;
  progress: number;
}> = ({stage, isActive, progress}) => {
  const frame = useCurrentFrame();
  const localFrame = Math.max(0, frame - stage.enter);
  const promptText = stage.prompt.slice(0, Math.floor(interpolate(localFrame, [0, 16], [0, stage.prompt.length], clamp)));
  const submitted = interpolate(localFrame, [18, 24], [0, 1], clamp);
  const scrollY = interpolate(localFrame, [38, 86], [0, -46], clamp);
  const cursorOpacity = Math.floor(frame / 7) % 2 === 0 ? 1 : 0.16;
  const activeScale = isActive ? 1.02 : 1;
  const activeOpacity = 1;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        borderRadius: 18,
        background: COLORS.chromeDark,
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow:
          '0 2px 4px rgba(0,0,0,0.22), 0 8px 24px rgba(0,0,0,0.38), 0 28px 64px rgba(0,0,0,0.45), 0 70px 140px rgba(0,0,0,0.22)',
        transform: `scale(${interpolate(progress, [0, 1], [0.92, activeScale], clamp)})`,
        opacity: progress * activeOpacity,
        transformOrigin: 'center center',
        fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
      }}
    >
      <div
        style={{
          height: 58,
          background: COLORS.chrome,
          borderBottom: '1px solid #3a3a3a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 17px',
        }}
      >
        <div
          style={{
            height: 43,
            borderRadius: '11px 11px 0 0',
            background: COLORS.chromeDark,
            border: '1px solid #3a3a3a',
            borderBottom: '1px solid #1e1e1e',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '0 16px',
            color: COLORS.code,
            fontSize: 21,
            fontWeight: 750,
          }}
        >
          <ClaudeMark size={22} />
          Claude Code
          <span style={{color: COLORS.muted, fontSize: 17}}>x</span>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, opacity: 0.7}}>
          <ClaudeMark size={20} color="#888888" />
          <span style={{color: COLORS.muted, fontSize: 23, letterSpacing: 2}}>...</span>
        </div>
      </div>

      <div
        style={{
          height: 52,
          background: COLORS.chromeDark,
          borderBottom: '1px solid #2e2e2e',
          color: COLORS.code,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          fontSize: 21,
          fontWeight: 700,
        }}
      >
        <span>Untitled</span>
        <span style={{color: COLORS.muted}}>time menu</span>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 110,
          bottom: 142,
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0)), #1a1a1a',
          overflow: 'hidden',
          padding: '32px 38px',
          isolation: 'isolate',
          WebkitFontSmoothing: 'antialiased',
          fontFamily: "Consolas, 'Courier New', Courier, monospace",
          fontSize: 21,
          lineHeight: 1.52,
        }}
      >
        {submitted < 0.5 ? (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              color: COLORS.code,
              opacity: 0.18,
              fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 10, fontSize: 21, fontWeight: 650}}>
              <ClaudeMark size={28} />
              Claude Code
            </div>
            <PixelRobot scale={0.9} />
          </div>
        ) : null}
        <div
          style={{
            opacity: submitted,
            transform: `translateY(${scrollY}px)`,
          }}
        >
          <div style={{color: COLORS.cream, marginBottom: 18}}>
            &gt; {stage.prompt}
          </div>
          {stage.lines.map((line, index) => (
            <CodeLine
              key={line}
              text={line}
              index={index}
              localFrame={localFrame}
              accent={stage.accent}
            />
          ))}
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 142,
          background: COLORS.chromeDark,
          borderTop: '1px solid #2e2e2e',
          padding: '17px 21px 12px',
        }}
      >
        <div
          style={{
            height: 66,
            borderRadius: 13,
            background: '#2A2A2A',
            border: '1px solid #3A3A3A',
            color: promptText.length ? COLORS.code : COLORS.muted,
            fontSize: 18,
            display: 'flex',
            alignItems: 'center',
            padding: '0 20px',
            fontWeight: 560,
          }}
        >
          {promptText || 'ctrl esc to focus or unfocus Claude'}
          <span
            style={{
              display: 'inline-block',
              width: 9,
              height: 20,
              marginLeft: 6,
              background: COLORS.code,
              opacity: cursorOpacity * (1 - submitted),
            }}
          />
        </div>
        <div
          style={{
            marginTop: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: COLORS.muted,
            fontSize: 13,
            fontWeight: 650,
          }}
        >
          <span>+ attach | {stage.tab}</span>
          <span
            style={{
              color: COLORS.code,
              border: '1px solid #3a3a3a',
              background: '#2a2a2a',
              borderRadius: 6,
              padding: '7px 12px',
            }}
          >
            &lt;/&gt; Edit automatically
          </span>
        </div>
      </div>
    </div>
  );
};

const StageTerminal: React.FC<{stage: Stage; index: number}> = ({stage, index}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({
    frame: frame - stage.enter,
    fps,
    config: {damping: 16, stiffness: 130},
  });
  const progress = interpolate(enter, [0, 1], [0, 1], clamp);
  const isActive = frame >= stage.activeStart && frame < stage.activeEnd;
  const drift = Math.sin((frame + index * 11) / 14) * 2;
  const labelIn = spring({
    frame: frame - stage.enter - 6,
    fps,
    config: {damping: 10, stiffness: 190},
  });
  const labelOpacity = interpolate(frame, [stage.enter + 2, stage.enter + 12], [0, 1], clamp);
  const labelLift = -60;
  const labelX = 0;

  return (
    <div
      style={{
        position: 'absolute',
        left: stage.x,
        top: stage.y + drift,
        width: stage.width,
        height: stage.height,
        zIndex: isActive ? 60 : 30 + index,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: labelLift,
          transform: `translateX(calc(-50% + ${labelX}px)) scale(${interpolate(labelIn, [0, 0.75, 1], [0.84, 1.08, 1], clamp)})`,
          opacity: labelOpacity * (isActive ? 1 : 0.62),
          zIndex: 90,
          color: COLORS.peachDark,
          fontFamily: "'Times New Roman', Times, serif",
          fontWeight: 700,
          fontStyle: 'italic',
          fontSize: 66,
          lineHeight: 0.9,
          textShadow: '0 6px 24px rgba(255,255,255,0.92), 0 8px 34px rgba(196,90,62,0.18)',
          whiteSpace: 'nowrap',
          padding: '0 22px',
          borderRadius: 999,
          background: 'rgba(250,243,234,0.44)',
          backdropFilter: 'blur(2px)',
        }}
      >
        {stage.label}
      </div>
      <ClaudeTerminal stage={stage} isActive={isActive} progress={progress} />
    </div>
  );
};

export const WorkflowStartToFinishScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        overflow: 'hidden',
        background: COLORS.cream,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle, rgba(196,90,62,0.16) 0 1.7px, transparent 2px)',
          backgroundSize: '36px 36px',
          maskImage:
            'radial-gradient(circle at 50% 44%, black 0%, black 65%, transparent 92%)',
          opacity: 0.56,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% 34%, rgba(255,249,240,0.92), rgba(250,243,234,0) 48%), radial-gradient(circle at 20% 88%, rgba(222,115,86,0.12), rgba(222,115,86,0) 34%)',
        }}
      />

      <WorkflowPath />

      {stages.map((stage, index) => (
        <StageTerminal key={stage.id} stage={stage} index={index} />
      ))}
    </AbsoluteFill>
  );
};
