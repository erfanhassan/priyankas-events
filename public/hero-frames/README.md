# Hero Frame Sequence

Place your WebP image sequence files here.

## Naming Convention
Files must be named: `frame_0001.webp`, `frame_0002.webp`, `frame_0003.webp`, etc.

## Recommended Specs
- **Resolution:** 1920×1080 (Full HD) or 2560×1440 (2K)
- **Format:** WebP (for optimal loading)
- **Frame Count:** 120-200 frames for smooth scrubbing
- **File Size:** Each frame should be under 200KB for fast loading

## How It Works
The `ScrollyCanvas` component will automatically detect and load frames from this directory.
As the user scrolls through the 500vh hero section, frames are rendered to an HTML5 canvas,
creating a video-like scrubbing effect.

If no frames are found, a beautiful animated gradient fallback is shown.
