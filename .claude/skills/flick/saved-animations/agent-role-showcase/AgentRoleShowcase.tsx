import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

/** Replace role names and task copy with the current approved specialists. */
export const AgentRoleShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const roles = ['PLAN', 'DESIGN', 'REVIEW', 'RELEASE'];
  return <AbsoluteFill style={{background: '#f8fafc', color: '#0f172a', fontFamily: 'Arial, sans-serif', padding: 82}}>
    <div style={{fontWeight: 900, fontSize: 100, letterSpacing: -5}}>SPECIALIST<br />TEAM</div>
    <div style={{color: '#64748b', fontSize: 28, marginTop: 18}}>One role comes into focus at a time.</div>
    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginTop: 90}}>{roles.map((role, index) => { const active = Math.floor(Math.max(0, frame - 28) / 40) === index; const opacity = interpolate(frame, [index * 22, index * 22 + 20], [0, 1], {extrapolateRight: 'clamp'}); return <div key={role} style={{height: 270, borderRadius: 30, padding: 34, background: active ? '#0f172a' : '#e2e8f0', color: active ? '#fff' : '#334155', opacity, transform: `scale(${active ? 1.04 : .96})`, boxShadow: active ? '0 24px 50px #94a3b8' : 'none'}}><div style={{fontSize: 20, letterSpacing: 3}}>ROLE {index + 1}</div><div style={{fontWeight: 900, fontSize: 55, marginTop: 32}}>{role}</div><div style={{marginTop: 20, opacity: .75}}>Current task appears here.</div></div>; })}</div>
  </AbsoluteFill>;
};
