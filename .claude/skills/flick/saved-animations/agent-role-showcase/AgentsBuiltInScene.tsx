import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export const AGENTS_BUILT_IN_DURATION = 267;

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const f = (seconds: number) => Math.round(seconds * 30);

const COLORS = {
  cream: '#FAF3EA',
  creamSoft: '#FFF9F0',
  ink: '#1A1A1A',
  chrome: '#2A2A2A',
  chromeDark: '#1E1E1E',
  body: '#1A1A1A',
  border: '#3A3A3A',
  claude: '#D97A57',
  peach: '#DE7356',
  peachLight: '#E8896E',
  peachDark: '#C45A3E',
  code: '#D4D4D4',
  muted: '#888888',
  green: '#79D88B',
  blue: '#7CB7FF',
  yellow: '#F2C56B',
  red: '#FF7B72',
};

type Role = {
  id: string;
  heading: string;
  tab: string;
  prompt: string;
  lines: string[];
  start: number;
  end: number;
  accent: string;
};

const roles: Role[] = [
  {
    id: 'planning',
    heading: 'Planning',
    tab: 'CEO agent',
    prompt: 'Act as CEO. Plan this project.',
    start: f(1.46),
    end: f(4.06),
    accent: COLORS.yellow,
    lines: [
      'CEO_AGENT.init({mode: "strategy"})',
      'goal = "ship the right feature, fast"',
      'milestones = ["scope", "build", "review", "release"]',
      'assign("design-review", after: "prototype")',
      'assign("qa", gate: "before_ship")',
      'roadmap.ready = true',
    ],
  },
  {
    id: 'design',
    heading: 'Design Reviews',
    tab: 'Design reviewer',
    prompt: 'Review the interface before merge.',
    start: f(4.06),
    end: f(5.72),
    accent: COLORS.blue,
    lines: [
      'scan("/src/app")',
      'checkHierarchy({mobile: true})',
      'contrast.score("#FAF3EA", "#1A1A1A") -> AAA',
      'flag("primary CTA needs stronger focus")',
      'suggest("tighten spacing in toolbar")',
      'review.status = "approved with polish"',
    ],
  },
  {
    id: 'release',
    heading: 'Releases',
    tab: 'Release manager',
    prompt: 'Prepare the release train.',
    start: f(5.72),
    end: f(7.46),
    accent: COLORS.peachLight,
    lines: [
      'version.bump("minor")',
      'generateChangelog(from: "main")',
      'verifyMigrations()',
      'createReleaseNotes(channel: "prod")',
      'stageDeploy({region: "all"})',
      'release.candidate = "ready"',
    ],
  },
  {
    id: 'testing',
    heading: 'Testing',
    tab: 'QA agent',
    prompt: 'Test everything before it ships.',
    start: f(7.46),
    end: AGENTS_BUILT_IN_DURATION,
    accent: COLORS.green,
    lines: [
      'run("unit") -> 482 passed',
      'run("integration") -> 96 passed',
      'run("e2e:checkout") -> passed',
      'run("visual-regression") -> 0 diffs',
      'coverage.report() -> 94.8%',
      'ship_gate = "GREEN"',
    ],
  },
];

const miniAgents = [
  'CEO',
  'Design',
  'QA',
  'Release',
  'Docs',
  'Backend',
  'Frontend',
  'Security',
  'Data',
  'Planner',
  'Reviewer',
  'Refactor',
  'Test',
  'Deploy',
  'Perf',
  'Search',
  'Git',
  'Triage',
  'UX',
  'API',
  'Build',
  'Debug',
  'Ops',
];

const miniPositions = miniAgents.map((name, index) => {
  const col = index % 4;
  const row = Math.floor(index / 4);
  const jitterX = [0, 18, -14, 10, -22, 14][row % 6];
  const jitterY = [0, -10, 16, -6][col];
  return {
    name,
    x: 54 + col * 246 + jitterX,
    y: 418 + row * 136 + jitterY,
    rotate: [-5, 4, -2, 6, -4, 3][index % 6],
  };
});

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

const DotGrid: React.FC<{opacity?: number}> = ({opacity = 0.26}) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      opacity,
      backgroundImage:
        'radial-gradient(circle, rgba(255,255,255,0.76) 0 1.8px, transparent 2px)',
      backgroundSize: '36px 36px',
      maskImage:
        'radial-gradient(circle at 50% 40%, black 0%, black 58%, transparent 88%)',
    }}
  />
);

const TopProgress: React.FC = () => {
  const frame = useCurrentFrame();
  const pct = interpolate(frame, [0, AGENTS_BUILT_IN_DURATION], [0, 1], clamp);
  return (
    <div
      style={{
        position: 'absolute',
        top: 42,
        left: 70,
        right: 70,
        height: 12,
        borderRadius: 999,
        background: 'rgba(250,243,234,0.22)',
        overflow: 'hidden',
        zIndex: 200,
      }}
    >
      <div
        style={{
          width: `${pct * 100}%`,
          height: '100%',
          borderRadius: 999,
          background: COLORS.cream,
          boxShadow: '0 0 22px rgba(250,243,234,0.72)',
        }}
      />
    </div>
  );
};

const MiniTerminal: React.FC<{
  name: string;
  x: number;
  y: number;
  rotate: number;
  index: number;
}> = ({name, x, y, rotate, index}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({
    frame: frame - 4 - index * 1.25,
    fps,
    config: {damping: 8, stiffness: 210},
  });
  const pulse = Math.sin((frame + index * 7) / 7) * 2.5;
  const swarmOut = spring({
    frame: frame - f(1.43),
    fps,
    config: {damping: 22, stiffness: 120},
  });
  const scale = interpolate(pop, [0, 0.72, 1], [0.24, 1.09, 1], clamp);
  const opacity =
    interpolate(pop, [0, 0.2], [0, 1], clamp) *
    interpolate(swarmOut, [0, 1], [1, 0.2], clamp);
  const outY = interpolate(swarmOut, [0, 1], [0, 42 + (index % 5) * 8], clamp);
  const outScale = interpolate(swarmOut, [0, 1], [1, 0.64], clamp);

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y + pulse + outY,
        width: 222,
        height: 104,
        borderRadius: 9,
        overflow: 'hidden',
        background: COLORS.body,
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow:
          '0 18px 48px rgba(47,20,12,0.42), 0 3px 10px rgba(0,0,0,0.26)',
        opacity,
        transform: `rotate(${rotate}deg) scale(${scale * outScale})`,
        transformOrigin: 'center center',
        zIndex: 20 + index,
      }}
    >
      <div
        style={{
          height: 22,
          background: COLORS.chrome,
          borderBottom: '1px solid #3a3a3a',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '0 8px',
          color: COLORS.code,
          fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
          fontSize: 10,
          fontWeight: 700,
        }}
      >
        <ClaudeMark size={11} />
        {name}
      </div>
      <div
        style={{
          padding: '8px 10px',
          fontFamily: "Consolas, 'Courier New', monospace",
          fontSize: 10,
          lineHeight: 1.46,
          color: COLORS.code,
        }}
      >
        <div style={{color: COLORS.green}}>$ agent run {name.toLowerCase()}</div>
        <div style={{opacity: 0.72}}>loading tools...</div>
        <div style={{color: index % 3 === 0 ? COLORS.blue : COLORS.yellow}}>
          {Math.floor(frame / 4 + index) % 2 ? 'thinking...' : 'writing...'}
        </div>
      </div>
    </div>
  );
};

const HeroTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const inS = spring({frame: frame - 8, fps, config: {damping: 8, stiffness: 170}});
  const outS = spring({frame: frame - f(1.47), fps, config: {damping: 20, stiffness: 130}});
  const opacity =
    interpolate(frame, [0, 10], [0, 1], clamp) *
    interpolate(outS, [0, 1], [1, 0], clamp);
  const scale = interpolate(inS, [0, 0.65, 1], [0.78, 1.08, 1], clamp);

  return (
    <div
      style={{
        position: 'absolute',
        top: 160,
        left: 0,
        right: 0,
        textAlign: 'center',
        opacity,
        transform: `scale(${scale})`,
        zIndex: 120,
      }}
    >
      <div
        style={{
          fontFamily: "'Times New Roman', Times, serif",
          fontStyle: 'italic',
          fontWeight: 700,
          fontSize: 146,
          lineHeight: 0.92,
          color: COLORS.cream,
          textShadow: '0 7px 34px rgba(70,31,20,0.48)',
        }}
      >
        100 Agents
      </div>
      <div
        style={{
          marginTop: 18,
          display: 'none',
          alignItems: 'center',
          gap: 12,
          padding: '12px 22px',
          borderRadius: 999,
          background: 'rgba(26,26,26,0.28)',
          color: COLORS.cream,
          fontFamily: 'Inter, Arial, sans-serif',
          fontSize: 34,
          fontWeight: 800,
          border: '1px solid rgba(250,243,234,0.18)',
        }}
      >
        <ClaudeMark size={30} color={COLORS.cream} />
        built in
      </div>
    </div>
  );
};

const TerminalChrome: React.FC<{
  children: React.ReactNode;
  tab: string;
  prompt: string;
  accent: string;
  localFrame: number;
}> = ({children, tab}) => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        borderRadius: 18,
        background: COLORS.chromeDark,
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow:
          '0 2px 4px rgba(0,0,0,0.22), 0 8px 24px rgba(0,0,0,0.38), 0 28px 64px rgba(0,0,0,0.45), 0 70px 140px rgba(0,0,0,0.35)',
        fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
      }}
    >
      <div
        style={{
          height: 68,
          background: COLORS.chrome,
          borderBottom: '1px solid #3a3a3a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
        }}
      >
        <div
          style={{
            height: 52,
            borderRadius: '12px 12px 0 0',
            background: COLORS.chromeDark,
            border: '1px solid #3a3a3a',
            borderBottom: '1px solid #1e1e1e',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '0 18px',
            color: COLORS.code,
            fontSize: 24,
            fontWeight: 750,
          }}
        >
          <ClaudeMark size={24} />
          Claude Code
          <span style={{color: COLORS.muted, fontSize: 18}}>x</span>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 17, opacity: 0.68}}>
          <ClaudeMark size={22} color="#888888" />
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span style={{color: COLORS.muted, fontSize: 24, letterSpacing: 2}}>...</span>
        </div>
      </div>

      <div
        style={{
          height: 58,
          background: COLORS.chromeDark,
          borderBottom: '1px solid #2e2e2e',
          color: COLORS.code,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 26px',
          fontSize: 23,
          fontWeight: 700,
        }}
      >
        <span>{tab}</span>
        <span style={{color: COLORS.muted}}>time  menu</span>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 126,
          bottom: 154,
          background: COLORS.body,
          overflow: 'hidden',
        }}
      >
        {children}
      </div>

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 154,
          background: COLORS.chromeDark,
          borderTop: '1px solid #2e2e2e',
          padding: '18px 22px 12px',
        }}
      >
        <div
          style={{
            height: 72,
            borderRadius: 13,
            background: '#2A2A2A',
            border: '1px solid #3A3A3A',
            color: COLORS.code,
          fontSize: 24,
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          opacity: 0.28,
          }}
        >
          ctrl esc to focus or unfocus Claude
        </div>
        <div
          style={{
            marginTop: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: COLORS.muted,
            fontSize: 18,
            fontWeight: 650,
          }}
        >
          <span>+  attach  |  project.ts</span>
          <span
            style={{
              color: COLORS.code,
              border: '1px solid #3a3a3a',
              background: '#2a2a2a',
              borderRadius: 6,
              padding: '8px 13px',
            }}
          >
            &lt;/&gt; Edit automatically
          </span>
        </div>
      </div>
    </div>
  );
};

const CodeLine: React.FC<{
  text: string;
  index: number;
  localFrame: number;
  accent: string;
}> = ({text, index, localFrame, accent}) => {
  const appear = interpolate(localFrame, [2 + index * 4, 9 + index * 4], [0, 1], clamp);
  const color =
    text.includes('ready') || text.includes('GREEN') || text.includes('approved')
      ? COLORS.green
      : text.includes('assign') || text.includes('flag')
        ? COLORS.yellow
        : text.includes('run(') || text.includes('check')
          ? COLORS.blue
          : COLORS.code;

  return (
    <div
      style={{
        opacity: appear,
        transform: `translateY(${interpolate(appear, [0, 1], [16, 0], clamp)}px)`,
        display: 'flex',
        gap: 18,
        color,
        textShadow: text.includes('GREEN') ? `0 0 18px ${accent}` : undefined,
      }}
    >
      <span style={{color: 'rgba(250,243,234,0.34)', width: 44, textAlign: 'right'}}>
        {String(index + 1).padStart(2, '0')}
      </span>
      <span>{text}</span>
    </div>
  );
};

const RoleTerminal: React.FC<{role: Role; index: number}> = ({role, index}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const cycle = Math.max(0, frame - role.start);
  const localFrame = cycle % 96;
  const enter = spring({
    frame: frame - role.start,
    fps,
    config: {damping: 18, stiffness: 140},
  });
  const exit = spring({
    frame: frame - (role.end - 15),
    fps,
    config: {damping: 24, stiffness: 130},
  });
  const activeOpacity =
    interpolate(frame, [role.start - 4, role.start + 9], [0, 1], clamp) *
    interpolate(frame, [role.end - 11, role.end], [1, index === roles.length - 1 ? 1 : 0], clamp);
  const x = interpolate(enter, [0, 1], [-1050, 0], clamp) + interpolate(exit, [0, 1], [0, 980], clamp);
  const y = interpolate(enter, [0, 1], [26, 0], clamp);
  const scale = interpolate(enter, [0, 0.82, 1], [0.96, 1.025, 1], clamp);
  const headingIn = spring({
    frame: frame - role.start - 8,
    fps,
    config: {damping: 10, stiffness: 180},
  });
  const headingOpacity = interpolate(frame, [role.start + 3, role.start + 15], [0, 1], clamp);
  const logShift = interpolate(localFrame, [50, Math.max(84, role.end - role.start - 8)], [0, -54], clamp);

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: 166,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: activeOpacity * headingOpacity,
          transform: `translateY(${interpolate(headingIn, [0, 1], [-24, 0], clamp)}px) scale(${interpolate(headingIn, [0, 0.75, 1], [0.9, 1.05, 1], clamp)})`,
          zIndex: 150,
        }}
      >
        <div
          style={{
            fontFamily: "'Times New Roman', Times, serif",
            fontStyle: 'italic',
            fontWeight: 700,
            fontSize: role.heading.length > 10 ? 142 : 158,
            lineHeight: 0.92,
            color: COLORS.cream,
            textShadow: '0 8px 34px rgba(48,20,12,0.48)',
          }}
        >
          {role.heading}
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 66 + x,
          top: 360 + y,
          width: 948,
          height: 990,
          opacity: activeOpacity,
          transform: `scale(${scale})`,
          transformOrigin: 'center top',
          borderRadius: 18,
          zIndex: 100 + index,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: COLORS.body,
            borderRadius: 18,
            opacity: activeOpacity,
            transform: 'translateY(10px)',
            zIndex: 0,
          }}
        />
        <TerminalChrome
          tab={role.tab}
          prompt={role.prompt}
          accent={role.accent}
          localFrame={cycle}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              padding: '38px 42px',
              isolation: 'isolate',
              WebkitFontSmoothing: 'antialiased',
              fontFamily: "Consolas, 'Courier New', monospace",
              fontSize: 31,
              lineHeight: 1.58,
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0)), #1a1a1a',
            }}
          >
            <div
              style={{
              opacity: 1,
              transform: 'translateY(0px)',
                color: COLORS.cream,
                marginBottom: 22,
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
                fontSize: 27,
                fontWeight: 760,
              }}
            >
              <PixelRobot scale={0.58} />
              <span style={{color: role.accent}}>agent</span>
              <span style={{color: COLORS.muted}}>accepted prompt</span>
            </div>
            <div style={{transform: `translateY(${logShift}px)`}}>
              {role.lines.map((line, lineIndex) => (
                <CodeLine
                  key={line}
                  text={line}
                  index={lineIndex}
                  localFrame={localFrame}
                  accent={role.accent}
                />
              ))}
            </div>
          </div>
        </TerminalChrome>
      </div>
    </>
  );
};

const TranscriptPulse: React.FC = () => {
  const frame = useCurrentFrame();
  const active =
    roles.find((role) => frame >= role.start && frame < role.end) ?? roles[roles.length - 1];
  const rolePct = interpolate(frame, [active.start, active.end], [0, 1], clamp);

  return (
    <div
      style={{
        position: 'absolute',
        left: 78,
        right: 78,
        bottom: 122,
        height: 16,
        borderRadius: 999,
        overflow: 'hidden',
        background: 'rgba(26,26,26,0.22)',
        border: '1px solid rgba(250,243,234,0.16)',
        zIndex: 180,
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${rolePct * 100}%`,
          borderRadius: 999,
          background: `linear-gradient(to right, ${COLORS.cream}, ${active.accent})`,
          boxShadow: `0 0 24px ${active.accent}`,
        }}
      />
    </div>
  );
};

export const AgentsBuiltInScene: React.FC = () => {
  const frame = useCurrentFrame();
  const swarmDim = interpolate(frame, [f(1.32), f(1.58)], [0, 1], clamp);
  const finalGlow = interpolate(frame, [f(8.25), f(8.8)], [0, 1], clamp);

  return (
    <AbsoluteFill
      style={{
        overflow: 'hidden',
        background:
          'radial-gradient(ellipse at 45% 35%, #E8896E 0%, #DE7356 55%, #C45A3E 100%)',
      }}
    >
      <DotGrid />
      <TopProgress />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% 44%, rgba(250,243,234,0.18), transparent 42%), radial-gradient(circle at 16% 90%, rgba(26,26,26,0.2), transparent 34%)',
        }}
      />

      {miniPositions.map((item, index) => (
        <MiniTerminal key={item.name} {...item} index={index} />
      ))}

      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: swarmDim,
          background: 'rgba(54,20,10,0.22)',
          backdropFilter: `blur(${interpolate(swarmDim, [0, 1], [0, 4], clamp)}px)`,
          zIndex: 80,
        }}
      />

      <HeroTitle />

      {roles.map((role, index) => (
        <RoleTerminal key={role.id} role={role} index={index} />
      ))}

      <TranscriptPulse />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: finalGlow,
          background:
            'radial-gradient(circle at 50% 52%, rgba(121,216,139,0.22), rgba(121,216,139,0) 36%)',
          zIndex: 220,
        }}
      />
    </AbsoluteFill>
  );
};
