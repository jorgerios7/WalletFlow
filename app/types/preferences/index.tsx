export type ThemeSource = "system" | "manual";
export type ThemeType = "light" | "dark";
export type FontSizeType = "small" | "medium" | "big";
export type FontWheightType = "light" | "regular" | "medium" | "bold";
export type ScreensType = "analysis" | "transactions" | "group" | "profile";
export type ScreenActivationTimeState = "automatic" | "alwaysOn";
export type FontSizeLevel = 0 | 1 | 2;

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

export const FONT_SIZE_TYPE: Record<FontSizeLevel, FontSizeType> = {
    0: "small",
    1: "medium",
    2: "big"
};

export const FONT_SIZE_VALUES: Record<FontSizeType, FontSizeLevel> = {
    "small": 0,
    "medium": 1,
    "big": 2
};

export const DEFAULT_PREFERENCES = {
    theme: { source: "system", appearance: "light" } as ThemeState,
    fontSizeType: "medium" as FontSizeType,
    initScreen: "analysis" as ScreensType,
    screenActivationTime: "automatic" as ScreenActivationTimeState, 
    userEmailReminder: ""
};
