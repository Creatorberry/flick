import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

/** Replace the prompt, response, and metric with the current scene's approved copy. */
export const TerminalCostEscalation: React.FC = () => {
  const frame = useCurrentFrame();
  const typed = Math.min(28, Math.floor(frame / 2));
  const cost = Math.floor(interpolate(frame, [70, 210], [0, 48200], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  return <AbsoluteFill style={{background: '#080b12', color: '#e2e8f0', fontFamily: 'monospace', padding: 80}}>
    <div style={{height: '100%', border: '2px solid #334155', borderRadius: 28, background: '#0f172a', overflow: 'hidden', boxShadow: `0 0 ${interpolate(frame, [0, 180], [0, 80], {extrapolateRight: 'clamp'})}px #fb7185`}}>
      <div style={{height: 68, background: '#1e293b', padding: '20px 28px', color: '#94a3b8'}}>WORKSPACE · USAGE</div>
      <div style={{padding: 50, fontSize: 30, lineHeight: 1.55}}>
        <div style={{color: '#67e8f9'}}>$ {`do the simple task`.slice(0, typed)}<span style={{opacity: frame % 20 < 10 ? 1 : 0}}>|</span></div>
        {frame > 60 && <div style={{marginTop: 34, color: '#cbd5e1'}}>thinking…<br />expanding the response…<br />adding unnecessary detail…<br />still processing…</div>}
        {frame > 105 && <div style={{marginTop: 54, padding: 30, borderRadius: 20, background: '#1e293b', transform: `scale(${interpolate(frame, [105, 210], [1, 1.32], {extrapolateRight: 'clamp'})})`, transformOrigin: 'left center'}}><span style={{color: '#fb7185'}}>RESOURCE COUNT</span><br /><strong style={{fontSize: 72}}>{cost.toLocaleString()}</strong></div>}
      </div>
    </div>
  </AbsoluteFill>;
};
