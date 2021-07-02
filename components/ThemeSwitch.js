// components/theme-switch.tsx
import { useTheme } from 'next-themes'

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme('light')

  if (theme == "light"){

  return (
    <a className="btn btn-switch-theme" onClick={e => setTheme(theme == 'dark' ? 'light' : 'dark')} title="Swith to Dark Theme">
      <span className="text-base leading-5"><i className="far fa-moon" /></span>
    </a>
  ) 
  }

  else {
    return (
      <a className="btn btn-switch-theme" onClick={e => setTheme(theme == 'dark' ? 'light' : 'dark')} title="Swith to Light Theme">
        <span className="text-base leading-5"><i className="fad fa-sun" /></span>
      </a>
    ) 
  }

}

export default ThemeSwitch