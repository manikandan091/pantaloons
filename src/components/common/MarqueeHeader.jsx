import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const MarqueeHeader = ({
    text = "The SALE just got bigger & better! Flat 50% OFF* Is Now Live",
    speed = 14
}) => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const textWidth = useRef(0);

    useEffect(() => {
        const startAnimation = () => {
            scrollX.setValue(SCREEN_WIDTH);

            Animated.loop(
                Animated.timing(scrollX, {
                    toValue: -textWidth.current,
                    duration: (SCREEN_WIDTH + textWidth.current) * speed,
                    useNativeDriver: true,
                })
            ).start();
        };

        // Small delay to ensure text is measured
        const timer = setTimeout(startAnimation, 100);
        return () => clearTimeout(timer);
    }, [text, speed]);

    const onTextLayout = (event) => {
        textWidth.current = event.nativeEvent.layout.width;
    };

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.textContainer,
                    {
                        transform: [{ translateX: scrollX }]
                    }
                ]}
            >
                <Text
                    style={styles.text}
                    onLayout={onTextLayout}
                    numberOfLines={1}
                >
                    {text}
                </Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 32,
        backgroundColor: '#ffffffff',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        color: '#000000ff',
        fontSize: 13,
        fontWeight: '400',
        paddingHorizontal: 10,
    },
});

export default MarqueeHeader;
