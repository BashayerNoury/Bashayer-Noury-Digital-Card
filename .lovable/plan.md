

## Make the 3D Voxel Yin Yang More Recognizable

The current shape uses a vague sine-based gradient that doesn't read as a Yin Yang. The fix is to implement the actual Yin Yang geometry while keeping the voxel building-block aesthetic and theme-aware coloring.

### Changes to `src/components/FloatingCube.tsx`

Replace the abstract S-curve algorithm with proper Yin Yang logic:

1. **Classic Yin Yang division**: Use the standard geometric rule — the circle is split by two smaller semicircles along the vertical axis, creating the iconic S-curve. A block is "dark" if it's in the left half, unless it falls inside the upper small circle (flip to light) or the lower small circle (flip to dark).

2. **Two "eye" dots**: Add the traditional contrasting dots — a light dot in the dark region and a dark dot in the light region, each at radius ~0.25 of the main radius.

3. **Keep existing styling**: Maintain the theme-aware shade mapping (dark mode = light tones, light mode = dark tones), the metallic `meshPhysicalMaterial`, rounded voxel blocks, and the `Float` animation.

4. **Two distinct shade values**: Instead of a continuous gradient, use two clearly distinct shades (e.g., 0.15 and 0.85) so the yin/yang halves are visually obvious, with the eyes using the opposite shade.

This is a single-file edit to the `blocks` generation logic (~15 lines of the `useMemo` callback).

