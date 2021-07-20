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
    <a className="btn nav-btn btn-switch-theme" onClick={e => setTheme('dark')} title="Swith to Dark Theme">
      <span className="icon leading-5"><i className="fad fa-moon" /></span>
    </a>
  ) 
  :
  (
    <a className="btn nav-btn btn-switch-theme" onClick={e => setTheme('light')} title="Swith to Light Theme">
      <span className="leading-5"><i className="fad fa-sun" /></span>
    </a>
  ) 

}

export default ThemeSwitch