<script lang="ts">
  import '$lib/web-component-registrations'

  import type { EnumTheme } from '$lib/theme'
  import { theme, themeSchema } from '$lib/theme'
  import { onMount } from 'svelte'

  const toggleTheme = () => {
    theme.update((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
  }

  const applyTheme = (theme: EnumTheme) => {
    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light')
    } else {
      document.documentElement.setAttribute('data-theme', theme)
    }
  }

  const handleSystemThemeChange = () => {
    theme.update((current) => {
      if (current === 'system') {
        applyTheme('system')
      }
      return current
    })
  }

  onMount(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    mediaQuery.addEventListener('change', handleSystemThemeChange)

    theme.subscribe((value) => {
      const parseResult = themeSchema.safeParse(value)
      if (!parseResult.success) {
        value = 'system' as EnumTheme
      } else {
        value = parseResult.data
      }

      localStorage.setItem('theme', value)
      applyTheme(value)
    })
  })
</script>

<button on:click={toggleTheme}> Switch Theme </button>
<!-- 
<select id="theme-switcher" name="theme-switcher" value={}>
  <option value="light">Light</option>
  <option value="dark">Dark</option>
  <option value="system">System</option>
</select> -->

<sp-picker id="picker-s" size="s" label="Selection type">
  <sp-menu-item>Deselect</sp-menu-item>
  <sp-menu-item>Select inverse</sp-menu-item>
  <sp-menu-item>Feather...</sp-menu-item>
  <sp-menu-item>Select and mask...</sp-menu-item>
  <sp-menu-divider></sp-menu-divider>
  <sp-menu-item>Save selection</sp-menu-item>
  <sp-menu-item disabled>Make work path</sp-menu-item>
</sp-picker>
