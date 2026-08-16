import type {FC} from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

export type FlickSoundEffect = {file: string; from?: number; volume?: number};

export type FlickScene = {
  id: string;
  name: string;
  from: number;
  durationInFrames: number;
  title: string;
  body: string;
  background: string;
  accent: string;
  soundEffects?: FlickSoundEffect[];
};

export type FlickSceneSpec = {width: number; height: number; fps: number; scenes: FlickScene[]};

export const getDurationInFrames = (spec: FlickSceneSpec) =>
  Math.max(1, ...spec.scenes.map((scene) => scene.from + scene.durationInFrames));

export const FlickSceneView: FC<{scene: FlickScene}> = ({scene}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame, fps, config: {damping: 180}});
  const exit = interpolate(frame, [scene.durationInFrames - 12, scene.durationInFrames], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{background: scene.background, color: '#fff', fontFamily: 'Arial, sans-serif', overflow: 'hidden'}}>
      {(scene.soundEffects ?? []).map((effect, index) => (
        <Sequence key={`${effect.file}-${index}`} from={effect.from ?? 0}>
          <Audio src={staticFile(`sounds/${effect.file}`)} volume={effect.volume ?? 0.7} />
        </Sequence>
      ))}
      <div style={{position: 'absolute', width: 560, height: 560, borderRadius: 999, background: scene.accent, filter: 'blur(80px)', opacity: 0.35, right: -170, top: -120, transform: `translateY(${Math.sin(frame / 16) * 16}px)`}} />
      <div style={{display: 'flex', height: '100%', padding: 92, flexDirection: 'column', justifyContent: 'center', opacity: exit, transform: `translateY(${(1 - enter) * 48}px)`}}>
        <h1 style={{fontSize: 104, lineHeight: 0.98, margin: 0, maxWidth: 820}}>{scene.title}</h1>
        <p style={{fontSize: 42, lineHeight: 1.2, maxWidth: 760, marginTop: 42, color: 'rgba(255,255,255,0.82)'}}>{scene.body}</p>
      </div>
    </AbsoluteFill>
  );
};

export const FlickVideo: FC<{spec: FlickSceneSpec}> = ({spec}) => (
  <AbsoluteFill>
    {spec.scenes.map((scene) => (
      <Sequence key={scene.id} from={scene.from} durationInFrames={scene.durationInFrames}>
        <FlickSceneView scene={scene} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
