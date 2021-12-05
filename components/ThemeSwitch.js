// components/theme-switch.tsx
import { useTheme } from "next-themes";
import { useEffect } from "react";

const ThemeSwitch = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  // update system to specific one
  useEffect(() => {
    if (
      ["dark", "light"].indexOf(theme) === -1 &&
      ["dark", "light"].indexOf(resolvedTheme) !== -1
    )
      setTheme(resolvedTheme);
  }, [resolvedTheme]);

  // not render on SSR
  //if (!theme) return null

  return theme == "light" ? (
    <button
      className="btn btn-default btn-switch-theme"
      onClick={(e) => setTheme("dark")}
      title="Enable Dark Theme"
    >
      <span className="icon">
        <i className="fa-solid fa-moon" />
      </span>
      <span className="icon">
        <i className="fa-solid fa-sun" />
      </span>
      <span className="btn--text">Dark</span>
    </button>
  ) : (
    <button
      className="btn btn-default btn-switch-theme active"
      onClick={(e) => setTheme("light")}
      title="Disable Dark Theme"
    >
      <span className="icon">
        <i className="fa-solid fa-moon" />
      </span>
      <span className="icon">
        <i className="fa-solid fa-sun" />
      </span>
      <span className="btn--text">Light</span>
    </button>
  );
};

export default ThemeSwitch;
