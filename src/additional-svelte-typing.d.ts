// declare namespace svelteHTML {
//   interface IntrinsicElements {
//     'sp-picker': Picker
//   }
// }

import type { Picker } from '@spectrum-web-components/picker'

declare module 'svelte/elements' {
  type X = typeof Picker & HTMLAttributes

  export interface SvelteHTMLElements {
    'sp-picker': X
  }
}

export {}
