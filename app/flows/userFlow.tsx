import BottomSheet from "@/components/ui/sheet/bottomSheet";
import { useUser } from "../context/UserProvider";
import TabNavigation from "../navigation/tabNavigation";
import { LoadScreen } from "../pages/LoadScreen";
import GroupAccessSetup from "../screens/groupAccessSetup";

export default function UserFlow() {
    const {
        loadingUserAndGroup,
        userHasGroup
    } = useUser();

    if (loadingUserAndGroup || userHasGroup === null) {
        return <LoadScreen />;
    }

    if (!userHasGroup) {
        return (
            <BottomSheet
                visible
                initialSize="small"
                isDragHandleVisible={false}
            >
                <GroupAccessSetup />
            </BottomSheet>
        );
    }

    return (
        <TabNavigation />
    );
}
