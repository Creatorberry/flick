import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

/** Replace the generic page/card copy with the current approved material. */
export const ProductCardOverPage: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const cardIn = spring({frame, fps, config: {damping: 14}});
  const cardOut = interpolate(frame, [120, 156], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{background: '#111827', color: '#f8fafc', fontFamily: 'Arial, sans-serif', overflow: 'hidden'}}>
    <div style={{position: 'absolute', inset: -110, opacity: 0.38, transform: `translateY(${-frame * 4}px)`, backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '44px 44px'}} />
    <div style={{position: 'absolute', top: 90, left: 90, right: 90, fontSize: 52, fontWeight: 800, letterSpacing: -2}}>YOUR KEY RESULT</div>
    <div style={{position: 'absolute', top: 175, left: 90, fontSize: 24, color: '#94a3b8'}}>A supporting page scrolls behind the focal card.</div>
    <div style={{position: 'absolute', left: '16%', right: '16%', top: 330, height: 780, borderRadius: 36, background: 'linear-gradient(135deg, #38bdf8, #6366f1 55%, #f472b6)', boxShadow: '0 35px 80px #020617', transform: `translateY(${(1 - cardIn) * 180 - cardOut * 460}px) rotate(${interpolate(frame, [0, 50], [-7, 0], {extrapolateRight: 'clamp'})}deg)`, opacity: 1 - cardOut}}>
      <div style={{margin: 28, height: 'calc(100% - 56px)', borderRadius: 24, background: '#f8fafc', color: '#0f172a', padding: 48, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        <div style={{fontSize: 22, fontWeight: 700, color: '#475569'}}>APPROVED VISUAL / PRODUCT / IDEA</div>
        <div style={{fontSize: 68, lineHeight: 1, fontWeight: 900}}>FOCAL<br />CARD</div>
        <div style={{height: 14, borderRadius: 14, background: '#cbd5e1', overflow: 'hidden'}}><div style={{width: `${interpolate(frame, [20, 155], [0, 100], {extrapolateRight: 'clamp'})}%`, height: '100%', background: '#6366f1'}} /></div>
      </div>
    </div>
  </AbsoluteFill>;
};
