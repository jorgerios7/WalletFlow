import { FontSizeType, ThemeState } from "@/app/types/appearance";

import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

interface Props {
    theme: ThemeState, fontSizeType: FontSizeType,
    setTheme: (theme: ThemeState) => void, setFontSizeType: (fontSize: FontSizeType) => void
};

export const ThemeContext = createContext<Props>({
    theme: { source: "system", appearance: "light" }, fontSizeType: "medium",
    setTheme: () => { }, setFontSizeType: () => { }
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const THEME_KEY = "app_theme_settings";
    const FONT_SIZE_KEY = "app_font_size_mode";

    const [theme, setThemeState] = useState<ThemeState>({ source: "system", appearance: "light" });
    const [fontSizeType, setFontSizeTypeState] = useState<FontSizeType>("medium");
    const [loading, setLoading] = useState(true);

    const setTheme = async (newTheme: ThemeState) => {
        setThemeState(newTheme);
        await AsyncStorage.setItem(THEME_KEY, newTheme.source + "|" + newTheme.appearance);
    };

    const setFontSizeType = async (newFontSize: FontSizeType) => {
        setFontSizeTypeState(newFontSize);
        await AsyncStorage.setItem(FONT_SIZE_KEY, newFontSize);
    };

    useEffect(() => {
        async function loadSettings() {
            const savedTheme = await AsyncStorage.getItem(THEME_KEY);
            const savedFontSize = await AsyncStorage.getItem(FONT_SIZE_KEY);

            if (savedTheme && savedFontSize) {
                const [savedSourceMode, savedAppearanceMode] = savedTheme.split("|") as [ThemeState["source"], ThemeState["appearance"]];
                setThemeState({ source: savedSourceMode, appearance: savedAppearanceMode });
                setFontSizeTypeState(savedFontSize as FontSizeType);
            }

            setLoading(false);
        }

        loadSettings();
    }, []);

    if (loading) return null;

    return (
        <ThemeContext.Provider value={{ theme, fontSizeType, setTheme, setFontSizeType }}>
            {children}
        </ThemeContext.Provider>
    );
}
