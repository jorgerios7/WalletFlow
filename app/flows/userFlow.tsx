import { useUser } from "../context/UserProvider";
import TabNavigation from "../navigation/tabNavigation";
import { LoadScreen } from "../pages/LoadScreen";
import GroupAccessSetup from "../screens/groupAccessSetup";
import CreateGroup from "../services/firebase/groupService/createGroup";

interface Props {
    onError?: (message: string) => void;
}

export default function UserFlow({ onError }: Props) {
    const {
        user,
        userId,
        loadingUserAndGroup,
        userHasGroup,
        refresh
    } = useUser(); 

    if (loadingUserAndGroup) {
        return <LoadScreen />;
    }

    if (!userHasGroup) {
        return (
            <GroupAccessSetup
                onPressingReturnButton={() => console.log("GroupAccessSetup.tsx, button return has been pressed!")}
                onReady={({ action, values }) => {
                    if (!user) return;
                    
                    CreateGroup(
                        action,
                        values,
                        {
                            id: userId as string,
                            name: user.identification.name,
                            surname: user.identification.surname
                        },
                        refresh,
                        (_, message) => onError
                            ? onError(message)
                            : console.log("unknow error!")
                    );
                }}
            />
        );
    }

    return (
        <TabNavigation />
    );
}
