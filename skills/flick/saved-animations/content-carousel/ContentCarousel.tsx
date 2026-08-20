import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

/** Replace labels and colours with approved slide material; no image files are required. */
export const ContentCarousel: React.FC = () => {
  const frame = useCurrentFrame();
  const active = Math.floor(frame / 45) % 5;
  return <AbsoluteFill style={{background: '#111827', color: '#fff', fontFamily: 'Arial, sans-serif', overflow: 'hidden'}}>
    <div style={{position: 'absolute', inset: 0, background: `radial-gradient(circle at ${20 + active * 16}% 40%, hsl(${190 + active * 28} 70% 42%), transparent 45%)`, filter: 'blur(20px)'}} />
    <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24}}>{Array.from({length: 5}, (_, index) => { const relative = index - active; return <div key={index} style={{width: 260, height: 490, borderRadius: 28, padding: 28, background: `linear-gradient(160deg, hsl(${190 + index * 28} 70% 58%), #0f172a)`, transform: `translateX(${relative * 210}px) scale(${index === active ? 1.12 : .72})`, opacity: index === active ? 1 : .42, zIndex: 5 - Math.abs(relative), boxShadow: index === active ? '0 30px 70px #020617' : 'none'}}><div style={{fontSize: 18, letterSpacing: 3}}>SLIDE {index + 1}</div><div style={{fontSize: 46, fontWeight: 900, marginTop: 62}}>CONTENT<br />IDEA</div></div>; })}</div>
    <div style={{position: 'absolute', bottom: 80, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 13}}>{Array.from({length: 5}, (_, index) => <div key={index} style={{width: index === active ? 42 : 12, height: 12, borderRadius: 12, background: '#fff', opacity: index === active ? 1 : .4}} />)}</div>
  </AbsoluteFill>;
};
