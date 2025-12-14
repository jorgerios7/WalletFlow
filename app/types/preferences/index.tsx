export type ThemeSource = "system" | "manual";
export type ThemeType = "light" | "dark";
export type FontSizeType = "small" | "medium" | "big";
export type FontWheightType = "light" | "regular" | "medium" | "bold";
export type ScreensType = "analysis" | "transactions" | "group" | "profile";
export type ScreenActivationTimeState = "automatic" | "alwaysOn"

export interface ThemeState {
    source: ThemeSource,
    appearance: ThemeType
};

export interface TypographyState {
    fontSize: FontSizeType,
    fontWheight: FontWheightType
};

export interface AppearanceSettings {
    appearance: ThemeType, 
    fontSizeType: FontSizeType
};  

export interface AppPreferences {
    theme: ThemeState,
    fontSizeType: FontSizeType,
    initScreen: ScreensType;
    screenActivationTime: ScreenActivationTimeState;
};

export const DEFAULT_PREFERENCES = {
    theme: { source: "system", appearance: "light" } as ThemeState,
    fontSizeType: "medium" as FontSizeType,
    initScreen: "analysis" as ScreensType,
    screenActivationTime: "automatic" as ScreenActivationTimeState
};
