import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

/** Replace generic page blocks with approved page material or a supplied capture. */
export const PageScrollTitleFocus: React.FC = () => {
  const frame = useCurrentFrame();
  const scroll = interpolate(frame, [0, 105], [0, 520], {extrapolateRight: 'clamp'});
  const zoom = interpolate(frame, [105, 165], [1, 2.25], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{background: '#0f172a', padding: 70, fontFamily: 'Arial, sans-serif', overflow: 'hidden'}}>
    <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(circle, #334155, #020617 70%)', filter: 'blur(26px)'}} />
    <div style={{position: 'relative', height: '100%', overflow: 'hidden', borderRadius: 30, background: '#f8fafc', transform: `scale(${zoom})`, transformOrigin: '50% 24%'}}><div style={{transform: `translateY(${-scroll}px)`, padding: 54}}><div style={{fontSize: 66, fontWeight: 900, color: '#0f172a'}}>IMPORTANT<br />PAGE HEADING</div>{Array.from({length: 12}, (_, index) => <div key={index} style={{height: index % 4 === 0 ? 160 : 28, width: `${92 - (index % 3) * 14}%`, marginTop: 30, borderRadius: 14, background: index % 4 === 0 ? '#bae6fd' : '#cbd5e1'}} />)}</div><div style={{position: 'absolute', top: 94, left: 45, right: 45, height: 190, border: '8px solid #f97316', borderRadius: 24, opacity: interpolate(frame, [122, 152], [0, 1], {extrapolateRight: 'clamp'})}} /></div>
  </AbsoluteFill>;
};
