import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    Modal,
    PanResponder,
    Pressable,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface BottomSheetProps {
    visible: boolean;
    onClose: () => void;
    children: React.ReactNode;
    isDragHandleVisible: boolean;
    isFullHeight: boolean;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
    visible,
    onClose,
    children,
    isDragHandleVisible,
    isFullHeight,
}) => {

    const FULL_HEIGHT = 0;
    const PARTIAL_HEIGHT = SCREEN_HEIGHT * 0.5;
    const CLOSED = SCREEN_HEIGHT;
    const INITIAL_PARTIAL_HEIGHT = PARTIAL_HEIGHT;
    const INITIAL_FULL_HEIGHT = FULL_HEIGHT;

    const translateY = useRef(new Animated.Value(CLOSED)).current;
    const lastTranslateY = useRef(CLOSED);

    const animateTo = (toValue: number, callback?: () => void) => {
        Animated.timing(translateY, {
            toValue,
            duration: 300,
            useNativeDriver: true,
        }).start(callback);
        lastTranslateY.current = toValue;
    };

    const snapToNearest = (dy: number) => {
        const currentPosition = lastTranslateY.current + dy;

        if (currentPosition > SCREEN_HEIGHT * 0.6) {
            animateTo(CLOSED, onClose);
        } else if (currentPosition > SCREEN_HEIGHT * 0.3) {
            animateTo(PARTIAL_HEIGHT);
        } else {
            animateTo(FULL_HEIGHT);
        }
    };

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dy) > 10,
            onPanResponderMove: (_, gesture) => {
                const newTranslateY = lastTranslateY.current + gesture.dy;
                if (newTranslateY >= FULL_HEIGHT && newTranslateY <= CLOSED) {
                    translateY.setValue(newTranslateY);
                }
            },
            onPanResponderRelease: (_, gesture) => {
                snapToNearest(gesture.dy);
            },
        })
    ).current;

    useEffect(() => {
        if (visible) {
            animateTo(
                isFullHeight ?
                    INITIAL_FULL_HEIGHT
                    :
                    INITIAL_PARTIAL_HEIGHT
            );
        }
    }, [visible]);

    if (!visible) return null;

    const Header = () => {
        return (
            isDragHandleVisible ?
                <Pressable style={styles.dragHandle} />
                :
                <View style={styles.butonReturnHeader}>
                    <TouchableOpacity style={styles.buttonReturn} onPress={() => animateTo(CLOSED, onClose)}>
                        <MaterialIcons style={{ marginTop: '20%' }} activeOpacity={0.8} name={'arrow-back'} size={24} color={'black'} />
                    </TouchableOpacity>
                </View>
        );
    }

    return (
        <Modal visible={visible} transparent animationType="fade">
            <TouchableWithoutFeedback onPress={() => animateTo(CLOSED, onClose)}>
                <View style={styles.background} />
            </TouchableWithoutFeedback>

            <Animated.View {...panResponder.panHandlers}
                style={[styles.sheetContainer, { transform: [{ translateY },] }]}
            >
                <Header />

                {children}
            </Animated.View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: Colors.light.primary,
    },
    sheetContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: SCREEN_HEIGHT,
        backgroundColor: Colors.light.background,
        paddingTop: 10,
        paddingHorizontal: 16,
    },
    dragHandle: {
        width: 100,
        height: 10,
        backgroundColor: Colors.light.background,
        borderRadius: 4,
        alignSelf: 'center',
        marginVertical: 10,
    },
    butonReturnHeader: {
        width: '100%',
        backgroundColor: Colors.light.background,
        borderBottomColor: Colors.light.border,
        borderBottomWidth: 0.5,
        marginBottom: 10
    },
    buttonReturn: {
        width: 40,
        height: 40,
        backgroundColor: Colors.light.background,
        borderRadius: 30,
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginVertical: 10

    }
});

