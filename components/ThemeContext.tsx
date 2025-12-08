import { ThemeType } from "@/app/types/appearance";
import { createContext, useContext } from "react";

export const ThemeContext = createContext({
  theme: "light" as ThemeType,
  setTheme: (t: ThemeType) => {}
});

export function useAppTheme() {
  return useContext(ThemeContext);
};