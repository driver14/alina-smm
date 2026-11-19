/** Generated responsive photo manifest (public/media/photos/<name>-<width>.webp). */
export const PHOTOS = {
  'barcelona': { w: 1080, h: 1620, widths: [800, 1080] },
  'cafe-smile': { w: 1080, h: 1620, widths: [800, 1080] },
  'cafe-pose': { w: 1080, h: 1620, widths: [800, 1080] },
  'sea': { w: 1080, h: 1620, widths: [800, 1080] },
  'desk-notion': { w: 1125, h: 2000, widths: [800, 1125] },
  'desk-roses': { w: 1125, h: 2000, widths: [800, 1125] },
  'desk-book': { w: 960, h: 1280, widths: [800, 960] },
  'desk-starbucks': { w: 960, h: 1280, widths: [800, 960] },
  'desk-matcha': { w: 6048, h: 8064, widths: [800, 1600] },
  'desk-terrazzo': { w: 6048, h: 8064, widths: [800, 1600] },
  'desk-candles': { w: 6048, h: 8064, widths: [800, 1600] },
  'cafe-dessert': { w: 682, h: 1024, widths: [682] },
  'editorial': { w: 768, h: 1024, widths: [768] },
  'flowers': { w: 682, h: 1024, widths: [682] },
  'suit': { w: 819, h: 1024, widths: [800] },
  'white-dress': { w: 767, h: 1024, widths: [767] },
} as const

export type PhotoName = keyof typeof PHOTOS

/** src / srcSet / intrinsic size for a photo; pass sizes from the layout. */
export function photo(name: PhotoName) {
  const p = PHOTOS[name]
  const widths = p.widths as readonly number[]
  const largest = widths[widths.length - 1]
  return {
    src: `/media/photos/${name}-${widths[0]}.webp`,
    srcSet: widths.map((w) => `/media/photos/${name}-${w}.webp ${w}w`).join(', '),
    width: largest,
    height: Math.round((p.h / p.w) * largest),
  }
}
