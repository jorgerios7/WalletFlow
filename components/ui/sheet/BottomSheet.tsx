import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Button,
    Dimensions,
    Modal,
    PanResponder,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface BottomSheetProps {
    visible: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
    visible,
    onClose,
    children,
}) => {
    const FULL_HEIGHT = 0;
    const PARTIAL_HEIGHT = SCREEN_HEIGHT * 0.5; // 80% visível
    const CLOSED = SCREEN_HEIGHT;

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
            animateTo(CLOSED, onClose); // fechar
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
            animateTo(FULL_HEIGHT);
        }
    }, [visible]);

    if (!visible) return null;

    return (
        <Modal visible={visible} transparent animationType="fade">
            <TouchableWithoutFeedback onPress={() => animateTo(CLOSED, onClose)}>
                <View style={styles.background} />
            </TouchableWithoutFeedback>

            <Animated.View  {...panResponder.panHandlers}
                style={[styles.sheetContainer, { transform: [{ translateY },] }]}
            >
                {/* Gesto só aqui */}
                <Button title='' ></Button>

                {/* Conteúdo livre, não interfere no gesto */}
                {children}
            </Animated.View>
        </Modal>
    );

};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    sheetContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: SCREEN_HEIGHT,
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingHorizontal: 16,
    },
    dragHandle: {
        width: 60,
        height: 8,
        backgroundColor: '#ccc',
        borderRadius: 4,
        alignSelf: 'center',
        marginVertical: 10,
    },
});

