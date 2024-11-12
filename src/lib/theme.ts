import { writable } from 'svelte/store'
import { browser } from '$app/environment'
import { z } from 'zod'

export const themeSchema = z.enum(['light', 'dark', 'system'], { message: 'Invalid theme value' })
export type EnumTheme = z.output<typeof themeSchema>

console.log(themeSchema.safeParse('asdf').error?.issues[0].message)

const getInitialTheme = () => {
  if (browser) {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme && themeSchema.safeParse(savedTheme).success) {
      return savedTheme
    }
  }

  return 'system'
}

export const theme = writable(getInitialTheme())
