import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';

export const FLICK_GITHUB_DARK_FAST_SCROLL_DURATION = 240;

// Four complete passes through the real screenshot sequence. Each pass takes
// 60 render frames (two seconds) and keeps the velocity intentionally too fast
// for individual GitHub UI details to be read.
export const FlickGithubDarkFastScroll: React.FC = () => {
  const frame = useCurrentFrame();
  const frameWithinPass = frame % 60;
  const screenshotIndex = Math.min(
    119,
    Math.max(0, Math.round(interpolate(frameWithinPass, [0, 59], [0, 119]))),
  );
  const screenshot = staticFile(
    `flick-github-dark-chisel-frames/frame${String(screenshotIndex).padStart(3, '0')}.png`,
  );

  return (
    <AbsoluteFill style={{width: 1080, height: 1920, background: '#0d1117', overflow: 'hidden'}}>
      <Img
        src={screenshot}
        style={{
          position: 'absolute',
          left: 54,
          top: 96,
          width: 972,
          height: 1728,
          borderRadius: 24,
          objectFit: 'cover',
          display: 'block',
          boxShadow: '0 26px 70px rgba(0,0,0,.58)',
        }}
      />
    </AbsoluteFill>
  );
};
