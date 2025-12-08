import { ThemeSource, ThemeState, ThemeType } from "@/app/types/appearance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

interface Props { theme: ThemeState, setTheme: (theme: ThemeState) => void };

export const ThemeContext = createContext<Props>({ theme: { source: "system", appearance: "light" }, setTheme: () => { } });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const APPEARANCE_MODE_KEY = "app_theme_appearance";
    const SOURCE_MODE_KEY = "app_theme_source";

    const [theme, setThemeState] = useState<ThemeState>({ source: "system", appearance: "light" });
    const [loading, setLoading] = useState(true);

    const setTheme = async (newTheme: { source: ThemeSource, appearance: ThemeType }) => {
        setThemeState(newTheme);
        await AsyncStorage.setItem(SOURCE_MODE_KEY, newTheme.source);
        await AsyncStorage.setItem(APPEARANCE_MODE_KEY, newTheme.appearance);
    };

    useEffect(() => {
        async function loadTheme() {
            const savedSourceMode = await AsyncStorage.getItem(SOURCE_MODE_KEY) as ThemeSource | null;
            const savedAppearanceMode = await AsyncStorage.getItem(APPEARANCE_MODE_KEY) as ThemeType | null;

            if (savedSourceMode && savedAppearanceMode) {
                setThemeState({source: savedSourceMode, appearance: savedAppearanceMode, });
            }

            setLoading(false);
        }

        loadTheme();
    }, []);

    if (loading) return null;

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
