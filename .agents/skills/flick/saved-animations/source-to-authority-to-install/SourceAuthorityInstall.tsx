import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

/** Replace each label with the current source, authority, and install action. */
export const SourceAuthorityInstall: React.FC = () => {
  const frame = useCurrentFrame();
  const stage = Math.min(2, Math.floor(frame / 70));
  const cards = [['SOURCE PAGE', 'A relevant project or resource'], ['AUTHORITY', 'The person or team behind it'], ['INSTALL', '$ install current-tool']];
  return <AbsoluteFill style={{background: '#111827', color: '#f9fafb', fontFamily: 'Arial, sans-serif', display: 'grid', placeItems: 'center', padding: 90}}>
    {cards.map(([title, subtitle], index) => <div key={title} style={{position: 'absolute', width: 760, minHeight: 440, padding: 52, borderRadius: 38, background: index === 2 ? '#ecfeff' : '#1f2937', color: index === 2 ? '#0f172a' : '#fff', opacity: stage === index ? 1 : 0, transform: `translateY(${stage === index ? 0 : 70}px) scale(${stage === index ? 1 : .9})`, border: '1px solid #475569'}}><div style={{fontSize: 20, letterSpacing: 4, color: '#94a3b8'}}>STEP {index + 1}</div><div style={{fontSize: 75, fontWeight: 900, marginTop: 60}}>{title}</div><div style={{fontSize: 30, marginTop: 30, opacity: .72}}>{subtitle}</div>{index === 2 && <div style={{fontFamily: 'monospace', marginTop: 80, padding: 24, borderRadius: 16, background: '#0f172a', color: '#67e8f9'}}>{subtitle}<span style={{opacity: frame % 18 < 9 ? 1 : 0}}>|</span></div>}</div>)}
    <div style={{position: 'absolute', bottom: 70, width: `${interpolate(frame, [0, 210], [0, 100], {extrapolateRight: 'clamp'})}%`, height: 8, background: '#67e8f9'}} />
  </AbsoluteFill>;
};
