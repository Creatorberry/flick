import type {FC} from 'react';
import {Composition} from 'remotion';
import sceneSpec from './data/scene-spec.json';
import {FlickVideo, getDurationInFrames, type FlickSceneSpec} from './components/FlickVideo';

const spec = sceneSpec as FlickSceneSpec;

export const RemotionRoot: FC = () => (
  <Composition
    id="FlickVideo"
    component={FlickVideo}
    durationInFrames={getDurationInFrames(spec)}
    fps={spec.fps}
    width={spec.width}
    height={spec.height}
    defaultProps={{spec}}
  />
);
