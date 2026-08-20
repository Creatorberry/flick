import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

/** Replace the three inputs and central label with the current approved tools or ideas. */
export const ToolConstellationMerge: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const items = [{label: 'INPUT A', x: -390, y: -230}, {label: 'INPUT B', x: 390, y: -120}, {label: 'INPUT C', x: -300, y: 260}];
  return <AbsoluteFill style={{background: '#fb923c', color: '#1c1917', fontFamily: 'Arial, sans-serif', overflow: 'hidden'}}>
    <div style={{position: 'absolute', inset: 0, opacity: .28, backgroundImage: 'linear-gradient(#7c2d12 1px, transparent 1px), linear-gradient(90deg, #7c2d12 1px, transparent 1px)', backgroundSize: '42px 42px'}} />
    <div style={{position: 'absolute', inset: 0, display: 'grid', placeItems: 'center'}}>
      {items.map((item, index) => { const p = spring({frame: frame - index * 9, fps, config: {damping: 13}}); const merge = interpolate(frame, [105 + index * 6, 145 + index * 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}); return <div key={item.label} style={{position: 'absolute', width: 230, height: 150, borderRadius: 28, background: '#fff7ed', display: 'grid', placeItems: 'center', fontWeight: 900, transform: `translate(${item.x * (1 - merge)}px, ${item.y * (1 - merge)}px) scale(${p * (1 - merge)})`, opacity: p * (1 - merge)}}>{item.label}</div>; })}
      <div style={{width: 350, height: 250, borderRadius: 40, background: '#1c1917', color: '#fff7ed', display: 'grid', placeItems: 'center', textAlign: 'center', fontWeight: 900, fontSize: 42, transform: `scale(${interpolate(frame, [0, 170], [.7, 1.12], {extrapolateRight: 'clamp'})})`, boxShadow: `0 0 ${interpolate(frame, [105, 170], [0, 105], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}px #fff7ed`}}>ONE<br />CAPABILITY</div>
    </div>
  </AbsoluteFill>;
};
