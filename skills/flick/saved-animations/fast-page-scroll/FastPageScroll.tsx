import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

/** Replace the neutral rows with a supplied page capture when one is approved. */
export const FastPageScroll: React.FC = () => {
  const frame = useCurrentFrame();
  const offset = (frame * 18) % 960;
  return <AbsoluteFill style={{background: '#020617', padding: 70, fontFamily: 'Arial, sans-serif'}}>
    <div style={{height: '100%', overflow: 'hidden', borderRadius: 30, border: '2px solid #334155', background: '#0f172a'}}>
      <div style={{height: 72, background: '#1e293b', display: 'flex', alignItems: 'center', padding: '0 28px', gap: 12}}><i style={{width: 14, height: 14, borderRadius: 20, background: '#fb7185'}} /><i style={{width: 14, height: 14, borderRadius: 20, background: '#facc15'}} /><i style={{width: 14, height: 14, borderRadius: 20, background: '#4ade80'}} /></div>
      <div style={{transform: `translateY(${-offset}px)`, padding: 34}}>{Array.from({length: 16}, (_, index) => <div key={index} style={{height: index % 4 === 0 ? 160 : 58, marginBottom: 22, borderRadius: 16, background: index % 4 === 0 ? 'linear-gradient(135deg, #334155, #0ea5e9)' : '#1e293b', opacity: interpolate(index, [0, 15], [1, .45])}} />)}</div>
    </div>
  </AbsoluteFill>;
};
