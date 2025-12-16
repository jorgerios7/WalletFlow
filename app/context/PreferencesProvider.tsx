import { STORAGE_KEYS } from "@/app/storage/keys";
import {
    DEFAULT_PREFERENCES,
    FontSizeType,
    ScreenActivationTimeState,
    ScreensType,
    ThemeState,
} from "@/app/types/preferences";

import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";

interface Props {
    preferences: {
        theme: ThemeState;
        fontSizeType: FontSizeType;
        initScreen: ScreensType;
        screenActivationTime: ScreenActivationTimeState;
    };
    setFontSizeType: (fontSize: FontSizeType) => void;
    setInitScreen: (initScreen: ScreensType) => void;
    setScreenActivationTime: (screenState: ScreenActivationTimeState) => void;
}

export const PreferencesContext = createContext<Props>({
    preferences: {
        theme: { source: "system", appearance: "light" },
        fontSizeType: "medium",
        initScreen: "analysis",
        screenActivationTime: "automatic",
    },
    setFontSizeType: () => {},
    setInitScreen: () => {},
    setScreenActivationTime: () => {},
});

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
    const systemTheme = useColorScheme();

    const [preferences, setPreferencesState] = useState({
        fontSizeType: DEFAULT_PREFERENCES.fontSizeType,
        initScreen: DEFAULT_PREFERENCES.initScreen,
        screenActivationTime: DEFAULT_PREFERENCES.screenActivationTime,
    });

    const [loading, setLoading] = useState(true);

    const theme: ThemeState = useMemo(
        () => ({
            source: "system",
            appearance: systemTheme === "dark" ? "dark" : "light",
        }),
        [systemTheme]
    );

    const setFontSizeType = async (newFontSize: FontSizeType) => {
        await AsyncStorage.setItem(STORAGE_KEYS.FONT_SIZE, newFontSize);
        setPreferencesState((prev) => ({ ...prev, fontSizeType: newFontSize }));
    };

    const setInitScreen = async (newInitScreen: ScreensType) => {
        await AsyncStorage.setItem(STORAGE_KEYS.INIT_SCREEN, newInitScreen);
        setPreferencesState((prev) => ({ ...prev, initScreen: newInitScreen }));
    };

    const setScreenActivationTime = async (
        newScreenActivationTime: ScreenActivationTimeState
    ) => {
        await AsyncStorage.setItem(
            STORAGE_KEYS.SCREEN_ACTIVATION_TIME,
            newScreenActivationTime
        );
        setPreferencesState((prev) => ({
            ...prev,
            screenActivationTime: newScreenActivationTime,
        }));
    };

    useEffect(() => {
        async function loadPreferences() {
            const entries = await AsyncStorage.multiGet([
                STORAGE_KEYS.FONT_SIZE,
                STORAGE_KEYS.INIT_SCREEN,
                STORAGE_KEYS.SCREEN_ACTIVATION_TIME,
            ]);

            const next = { ...preferences };

            for (const [key, value] of entries) {
                if (!value) continue;

                switch (key) {
                    case STORAGE_KEYS.FONT_SIZE:
                        next.fontSizeType = value as FontSizeType;
                        break;

                    case STORAGE_KEYS.INIT_SCREEN:
                        next.initScreen = value as ScreensType;
                        break;

                    case STORAGE_KEYS.SCREEN_ACTIVATION_TIME:
                        next.screenActivationTime =
                            value as ScreenActivationTimeState;
                        break;
                }
            }

            setPreferencesState(next);
            setLoading(false);
        }

        loadPreferences();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) return null;

    return (
        <PreferencesContext.Provider
            value={{
                preferences: {
                    ...preferences,
                    theme,
                },
                setFontSizeType,
                setInitScreen,
                setScreenActivationTime,
            }}
        >
            {children}
        </PreferencesContext.Provider>
    );
}
