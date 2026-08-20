import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

/** Replace the generic editorial text with the current approved resource or page. */
export const WebsiteResourceReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const reveal = (start: number) => interpolate(frame, [start, start + 22], [0, 1], {extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{background: '#111827', color: '#f8fafc', fontFamily: 'Arial, sans-serif', padding: 88}}>
    <div style={{fontSize: 20, color: '#67e8f9', letterSpacing: 4, opacity: reveal(0)}}>RESOURCE SPOTLIGHT</div>
    <div style={{fontSize: 82, fontWeight: 900, lineHeight: .96, marginTop: 36, transform: `translateY(${(1 - reveal(16)) * 45}px)`, opacity: reveal(16)}}>ONE USEFUL<br />RESOURCE</div>
    <div style={{width: '78%', fontSize: 29, color: '#cbd5e1', marginTop: 42, lineHeight: 1.35, opacity: reveal(42)}}>A concise explanation of what it does and why it matters.</div>
    <div style={{display: 'grid', gap: 22, marginTop: 70}}>{['Key idea one', 'Key idea two', 'What to do next'].map((item, index) => <div key={item} style={{padding: 28, borderLeft: '7px solid #67e8f9', background: '#1e293b', fontSize: 29, opacity: reveal(65 + index * 19), transform: `translateX(${(1 - reveal(65 + index * 19)) * 80}px)`}}>{item}</div>)}</div>
  </AbsoluteFill>;
};
