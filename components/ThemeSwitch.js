// components/theme-switch.tsx
import { useTheme } from 'next-themes'
import { useEffect } from 'react'

const ThemeSwitch = () => {
  const { theme, setTheme, resolvedTheme } = useTheme()

  // update system to specific one
  useEffect(() => {
    if (['dark', 'light'].indexOf(theme) === -1 && ['dark', 'light'].indexOf(resolvedTheme) !== -1) setTheme(resolvedTheme)
  }, [resolvedTheme])

  // not render on SSR
  if (!theme) return ''

  return theme == "light" ?
  (
    <a className="btn nav-btn btn-switch-theme" onClick={e => setTheme('dark')} data-tip="Switch to Dark Theme">
      <span className="icon"><i className="fad fa-moon" /></span>
      <span className="btn--text">Dark</span>
    </a>
  ) 
  :
  (
    <a className="btn nav-btn btn-switch-theme" onClick={e => setTheme('light')} data-tip="Switch to Light Theme">
      <span className="icon"><i className="fad fa-sun" /></span>
      <span className="btn--text">Light</span>
    </a>
  ) 

}

export default ThemeSwitch