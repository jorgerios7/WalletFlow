import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { useKeepAwake } from "expo-keep-awake";
import { useContext } from "react";

export function ScreenKeepAwakeController() {
  const { preferences } = useContext(PreferencesContext);

  if (preferences.screenActivationTime === "alwaysOn") {
    useKeepAwake();
  }

  return null;
}
