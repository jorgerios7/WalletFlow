import { PreferencesContext } from '@/app/context/PreferencesProvider';
import { Colors } from '@/constants/Colors';
import React, {
    useContext,
    useMemo
} from 'react';
import {
    Modal,
    StyleSheet,
    View
} from 'react-native';

interface Props {
    children: React.ReactNode;
}

export const CustomBottomSheet: React.FC<Props> = ({
    children,
}) => {
    const { preferences } = useContext(PreferencesContext);
    const theme = useMemo(
        () => Colors[preferences.theme.appearance],
        [preferences.theme.appearance]
    );

    return (
        <Modal
            visible
            transparent
            animationType="fade"
        >
            <View
                style={[
                    styles.sheetContainer,
                    { backgroundColor: theme.background }
                ]}
            >
                {children}
            </View>
        </Modal>
    );
};

export default CustomBottomSheet;

const styles = StyleSheet.create({
    sheetContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 40,
    borderTopEndRadius: 70,
    gap: 20,
}
});
