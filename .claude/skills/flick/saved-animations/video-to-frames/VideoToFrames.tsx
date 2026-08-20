import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

/** Replace the neutral video and frames with approved supplied media when available. */
export const VideoToFrames: React.FC = () => {
  const frame = useCurrentFrame();
  const shrink = interpolate(frame, [45, 105], [1, .42], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{background: '#020617', color: '#fff', fontFamily: 'Arial, sans-serif', display: 'grid', placeItems: 'center'}}>
    <div style={{width: 330, height: 580, borderRadius: 32, background: 'linear-gradient(155deg, #f472b6, #7c3aed 45%, #0ea5e9)', transform: `translateY(${interpolate(frame, [0, 100], [-50, -250], {extrapolateRight: 'clamp'})}px) scale(${shrink})`, display: 'grid', placeItems: 'center', fontSize: 26, fontWeight: 900}}>VIDEO INPUT<div style={{width: 180, height: 4, background: '#fff', opacity: .8}} /></div>
    <div style={{position: 'absolute', top: 480, width: 290, height: 110, borderRadius: 22, background: '#1e293b', display: 'grid', placeItems: 'center', opacity: interpolate(frame, [75, 105], [0, 1], {extrapolateRight: 'clamp'})}}>SCAN → EXTRACT</div>
    <div style={{position: 'absolute', bottom: 120, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, opacity: interpolate(frame, [110, 165], [0, 1], {extrapolateRight: 'clamp'})}}>{Array.from({length: 4}, (_, index) => <div key={index} style={{width: 150, height: 170, borderRadius: 18, background: `linear-gradient(145deg, hsl(${190 + index * 32} 65% 50%), #0f172a)`, transform: `translateY(${Math.max(0, 150 - (frame - 110 - index * 8) * 8)}px)`}} />)}</div>
  </AbsoluteFill>;
};
