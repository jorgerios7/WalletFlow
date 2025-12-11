export type ThemeSource = "system" | "manual";
export type ThemeType = "light" | "dark";
export type FontSizeType = "small" | "medium" | "big";
export type FontWheightType = "light" | "regular" | "medium" | "bold";


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
