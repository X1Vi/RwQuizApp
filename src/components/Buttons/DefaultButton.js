import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  withSpring
} from 'react-native-reanimated';
import { FONTSIZE } from '../../Values/Fonts/fontSize';
const DefaultButton = ({ onPressButton = () => {}, buttonText = "Button", widthIncrease="90%", heightIncrease=80 }) => {
    // Initialize shared values with starting values
    const width = useSharedValue('0%');
    const height = useSharedValue(0);
    
    // Function to handle button animation
    const handleButtonAnimation = () => {
        // Use withSpring for smoother animation
        width.value = withSpring(widthIncrease, {
            damping: 15,
            stiffness: 90
        });
        
        height.value = withSpring(heightIncrease, {
            damping: 15,
            stiffness: 90
        });
    };

    // Trigger animation on mount
    useEffect(() => {
        // Small delay to ensure proper initialization
        const timeout = setTimeout(() => {
            handleButtonAnimation();
        }, 100);
        
        return () => clearTimeout(timeout);
    }, []);

    // Create animated styles
    const animatedStyle = useAnimatedStyle(() => {
        return {
            width: width.value,
            height: height.value,
            overflow: 'hidden'
        };
    });

    return (
        <Animated.View style={[
            animatedStyle,
            {
                // Base styles
                minWidth: 100,
                minHeight: 40
            }
        ]}>
            <TouchableOpacity 
                style={{ 
                    backgroundColor: '#C43939',
                    justifyContent: 'center', 
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    borderRadius: 16
                }} 
                onPress={onPressButton}
            >
                <Text style={{ 
                    color: '#FCFCFC',
                    fontSize: FONTSIZE.subtitle2,
                    fontWeight: '400',
                    fontStyle:'normal',
                    lineHeight:30,

                }}>
                    {buttonText}
                </Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default DefaultButton;