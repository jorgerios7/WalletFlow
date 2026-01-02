import { PreferencesContext } from '@/app/context/PreferencesProvider';
import { Colors } from '@/constants/Colors';
import React, {
    useContext,
    useEffect,
    useMemo,
    useRef
} from 'react';
import {
    Animated,
    Dimensions,
    Modal,
    PanResponder,
    StyleSheet,
    TouchableWithoutFeedback,
    View
} from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const SNAP = {
    FULL: 0,
    MEDIUM: SCREEN_HEIGHT * 0.3,
    SMALL: SCREEN_HEIGHT * 0.6,
    CLOSED: SCREEN_HEIGHT,
};

const ANIMATION_DURATION = 300;
const DRAG_THRESHOLD = 10;

interface BottomSheetProps {
    visible: boolean;
    onClose: () => void;
    children: React.ReactNode;
    isDragHandleVisible: boolean;
    initialSize: "small" | "medium" | "full";
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
    visible,
    onClose,
    children,
    isDragHandleVisible,
    initialSize,
}) => {
    const { preferences } = useContext(PreferencesContext);
    const theme = useMemo(
        () => Colors[preferences.theme.appearance],
        [preferences.theme.appearance]
    );

    const translateY = useRef(new Animated.Value(SNAP.CLOSED)).current;
    const lastTranslateY = useRef(SNAP.CLOSED);
    const currentTranslateY = useRef(SNAP.CLOSED);

    const animateTo = (toValue: number, callback?: () => void) => {
        Animated.timing(translateY, {
            toValue,
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
        }).start(() => {
            lastTranslateY.current = toValue;
            currentTranslateY.current = toValue;
            callback?.();
        });
    };


    const snapToNearest = () => {
        const position = currentTranslateY.current;

        if (position > SNAP.SMALL - 20) {
            animateTo(SNAP.SMALL);
        } else if (position > SNAP.MEDIUM) {
            animateTo(SNAP.MEDIUM);
        } else {
            animateTo(SNAP.FULL);
        }
    };

    const applyResistance = (
        value: number,
        min: number,
        max: number,
        resistance = 0.35
    ) => {
        if (value < min) {
            return min + (value - min) * resistance;
        }

        if (value > max) {
            return max + (value - max) * resistance;
        }

        return value;
    };

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, g) =>
                Math.abs(g.dy) > DRAG_THRESHOLD,

            onPanResponderMove: (_, g) => {
                const raw = lastTranslateY.current + g.dy;

                const resisted = applyResistance(
                    raw,
                    SNAP.FULL,
                    SNAP.SMALL
                );

                currentTranslateY.current = resisted;
                translateY.setValue(resisted);
            },

            onPanResponderRelease: (_, g) => {
                snapToNearest();
            },
        })
    ).current;

    useEffect(() => {
        if (!visible) return;

        animateTo(
            initialSize === "small"
                ? SNAP.SMALL
                : initialSize === "medium"
                    ? SNAP.MEDIUM
                    : SNAP.FULL
        );
    }, [visible, initialSize]);

    if (!visible) return null;

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
        >
            <TouchableWithoutFeedback
                onPress={() => animateTo(SNAP.CLOSED, onClose)}
            >
                <View
                    style={[
                        styles.background,
                        { backgroundColor: "orange" },
                    ]}
                />
            </TouchableWithoutFeedback>

            <Animated.View
                {...panResponder.panHandlers}
                style={[
                    styles.sheetContainer,
                    {
                        backgroundColor: theme.surface,
                        transform: [{ translateY }],
                    },
                ]}
            >
                {/*<Header
                    theme={theme}
                    isDragHandleVisible={isDragHandleVisible}
                    onClose={() => animateTo(SNAP.CLOSED, onClose)}
                />*/}

                {children}
            </Animated.View>
        </Modal>
    );
};

export default BottomSheet;

const styles = StyleSheet.create({
    background: {
        //flex: 1,

    },
    sheetContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: SCREEN_HEIGHT,
        padding: 40,
        borderTopStartRadius: 50,
        borderTopEndRadius: 50,
        gap: 20
    }
});
