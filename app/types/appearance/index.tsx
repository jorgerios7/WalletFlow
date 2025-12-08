export type ThemeSource = "system" | "manual";
export type ThemeType = "light" | "dark";
export type TextSizeType = "small" | "medium" | "big";


export interface ThemeState { source: ThemeSource, appearance: ThemeType };