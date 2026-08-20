import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

/** Replace the generic promotion and destination heading with approved current copy. */
export const PageCardHeaderZoom: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const card = spring({frame, fps, config: {damping: 16}});
  const exit = interpolate(frame, [85, 120], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const zoom = interpolate(frame, [110, 175], [1, 2.1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{background: '#e2e8f0', fontFamily: 'Arial, sans-serif', overflow: 'hidden'}}>
    <div style={{position: 'absolute', inset: 70, borderRadius: 30, background: '#fff', overflow: 'hidden', transform: `scale(${zoom})`, transformOrigin: '50% 20%'}}><div style={{height: 70, background: '#f1f5f9'}} /><div style={{padding: 70}}><div style={{fontSize: 68, fontWeight: 900}}>DESTINATION<br />PAGE TITLE</div><div style={{marginTop: 36, height: 18, width: '72%', borderRadius: 18, background: '#cbd5e1'}} /><div style={{marginTop: 18, height: 18, width: '56%', borderRadius: 18, background: '#e2e8f0'}} /></div></div>
    <div style={{position: 'absolute', left: 120, right: 120, top: 300, padding: 52, borderRadius: 34, background: '#0f172a', color: '#fff', transform: `translateY(${(1 - card) * 220 - exit * 650}px)`, opacity: 1 - exit}}><div style={{fontSize: 22, letterSpacing: 4, color: '#67e8f9'}}>INTRODUCTION</div><div style={{fontSize: 70, fontWeight: 900, marginTop: 28}}>YOUR<br />PROMISE</div></div>
  </AbsoluteFill>;
};
