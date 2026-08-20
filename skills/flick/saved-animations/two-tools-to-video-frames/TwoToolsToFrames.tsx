import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

/** Replace labels with the two current capabilities and the approved output concept. */
export const TwoToolsToFrames: React.FC = () => {
  const frame = useCurrentFrame();
  const merge = interpolate(frame, [75, 120], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{background: '#0f172a', color: '#f8fafc', fontFamily: 'Arial, sans-serif', display: 'grid', placeItems: 'center'}}>
    {[['TOOL A', -300], ['TOOL B', 300]].map(([label, x], index) => <div key={label} style={{position: 'absolute', width: 240, height: 160, borderRadius: 28, background: '#1e293b', display: 'grid', placeItems: 'center', fontWeight: 900, transform: `translateX(${Number(x) * (1 - merge)}px) scale(${1 - merge * .25})`, opacity: 1 - merge * .35}}>{label}</div>)}
    <div style={{width: 285, height: 180, borderRadius: 32, background: '#38bdf8', color: '#082f49', display: 'grid', placeItems: 'center', fontSize: 30, fontWeight: 900, opacity: merge}}>INPUT<br />VIDEO</div>
    <div style={{position: 'absolute', bottom: 160, display: 'flex', gap: 20, opacity: interpolate(frame, [128, 165], [0, 1], {extrapolateRight: 'clamp'})}}>{Array.from({length: 3}, (_, index) => <div key={index} style={{width: 170, height: 100, borderRadius: 16, background: `hsl(${190 + index * 35} 70% 55%)`, border: '5px solid #e0f2fe'}} />)}</div>
  </AbsoluteFill>;
};
