// components/theme-switch.tsx
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme()

  return (
      <a className="xzy" onClick={e => setTheme(theme == 'dark' ? 'light' : 'dark')}>xxx</a>
  )
}

export default ThemeSwitch