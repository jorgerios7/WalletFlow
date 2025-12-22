import { PreferencesProvider } from "./context/PreferencesProvider";
import UserProvider from "./context/UserProvider";
import { ScreenKeepAwakeController } from "./controllers/screenKeepAwakeController";
import AuthFlow from "./flows/authFlow";
import DynamicBackground from "./layout/dynamicBackground";

export default function AppMain() {
  return (
    <UserProvider>
      <PreferencesProvider>
        <ScreenKeepAwakeController />
        <DynamicBackground>
          <AuthFlow />
        </DynamicBackground>
      </PreferencesProvider>
    </UserProvider>
  );
}
