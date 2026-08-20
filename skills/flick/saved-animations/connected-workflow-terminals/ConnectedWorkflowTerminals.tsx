import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

/** Replace the stages and task/result copy with the current approved workflow. */
export const ConnectedWorkflowTerminals: React.FC = () => {
  const frame = useCurrentFrame();
  const stages = [['PLAN', 120, 200], ['MAKE', 405, 470], ['CHECK', 690, 740]];
  return <AbsoluteFill style={{background: '#eef2ff', color: '#0f172a', fontFamily: 'monospace', overflow: 'hidden'}}>
    <svg width="1080" height="1920" style={{position: 'absolute'}}><path d="M320 470 C450 470, 480 720, 565 720 S700 970, 850 970" fill="none" stroke="#6366f1" strokeWidth="9" strokeDasharray="18 18" strokeDashoffset={-frame * 7} /></svg>
    {stages.map(([title, left, top], index) => <div key={title} style={{position: 'absolute', left, top, width: 300, height: 260, borderRadius: 24, background: '#111827', color: '#e0e7ff', padding: 30, opacity: interpolate(frame, [index * 28, index * 28 + 20], [0, 1], {extrapolateRight: 'clamp'})}}><div style={{color: '#a5b4fc'}}>STAGE {index + 1}</div><strong style={{fontSize: 42, display: 'block', marginTop: 24}}>{title}</strong><div style={{marginTop: 30, color: '#94a3b8'}}>task → result</div></div>)}
  </AbsoluteFill>;
};
