// Ícones Lucide usados no design, inline para não depender de pacote nem de CDN.
const paths = {
  plus: 'M5 12h14M12 5v14',
  minus: 'M5 12h14',
  'arrow-up-right': 'M7 7h10v10M7 17 17 7',
  'arrow-left': 'm12 19-7-7 7-7M19 12H5',
  'arrow-right': 'M5 12h14m-7-7 7 7-7 7',
  'chevron-down': 'm6 9 6 6 6-6',
} as const

export type IconName = keyof typeof paths

export const icon = (name: IconName, size = 12) =>
  `<svg class="icon icon-${name}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name]}"/></svg>`
