import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

/** Replace document label, request, and limit copy with the current approved scene. */
export const DocumentLimitTerminal: React.FC = () => {
  const frame = useCurrentFrame();
  const limit = interpolate(frame, [95, 155], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{background: '#16131d', color: '#f8fafc', fontFamily: 'monospace', padding: 72}}>
    <div style={{height: '100%', borderRadius: 30, overflow: 'hidden', background: '#241f2e', border: '1px solid #5b516b'}}>
      <div style={{padding: 26, background: '#342c40', color: '#c4b5fd'}}>DOCUMENT WORKSPACE</div>
      <div style={{padding: 46, fontSize: 28, lineHeight: 1.7}}><div style={{color: '#fda4af'}}>▣ source-document.pdf</div><div style={{marginTop: 40}}>$ summarize this document<span style={{opacity: frame % 20 < 10 ? 1 : 0}}>|</span></div>{frame > 58 && <div style={{marginTop: 32, color: '#cbd5e1'}}>reading pages…<br />extracting content…<br />estimating resource use…</div>}{frame > 90 && <div style={{marginTop: 48, fontFamily: 'Arial, sans-serif', textAlign: 'center', transform: `scale(${1 + limit * .18})`, color: '#fb7185', fontWeight: 900, fontSize: 58}}>LIMIT<br />REACHED</div>}</div>
    </div>
  </AbsoluteFill>;
};
