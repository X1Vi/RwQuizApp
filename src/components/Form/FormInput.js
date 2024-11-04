import React, { useState } from 'react';
import { Input, ActivityIndicator } from '@rneui/themed';
import { View, Text, Platform } from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';

const FormInput = ({
  value,
  inputTitle,
  onChangeText,
  style,
  errorMessage,
  containerStyle,
  keyboardType,
  onBlur,
  editable,
  onSubmitEditing,
  onFocus,
  autoFocus,
  loading,
  placeHolder,
  placeHolderColor,
  maxLength,
}) => {
  const [inputNameFocus, setInputNameFocus] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const translateY = useSharedValue(0);

  const labelStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    color: inputNameFocus ? '#007BFF' : '#888', // Change color based on focus
    fontSize: 16,
    fontFamily: 'Cereal',
    position: 'absolute',
    left: 15,
    top: -10,
    backgroundColor: '#333', // Dark gray background
    paddingHorizontal: 5,
    zIndex: 1,
  }));

  const inputContainerStyle = {
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#333', // Dark gray background
    padding: 10,
    color: '#FFF', // White text
    fontSize: 16,
    borderColor: inputNameFocus ? '#007BFF' : '#555', // Change border color based on focus
  };

  const inputStyle = [
    inputContainerStyle,
    style,
    Platform.OS === 'ios' && { paddingTop: 15, height: 50 },
  ];

  return (
    <View style={{ marginBottom: 10 }}>
      <View style={{ flexDirection: 'row' }}>
        <Animated.Text style={labelStyle}>{inputTitle}</Animated.Text>
        <Input
          value={value}
          autoCapitalize="none"
          placeholder={placeHolder}
          placeholderTextColor={placeHolderColor}
          inputStyle={inputStyle}
          inputContainerStyle={{
            borderBottomWidth: 0,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: '#007BFF', // Blue color for border
          }}
          containerStyle={[{ paddingHorizontal: 0 }, containerStyle]}
          onFocus={() => {
            setInputNameFocus(true);
            translateY.value = withSpring(-20); // Move label up
            if (onFocus) onFocus();
          }}
          onBlur={() => {
            setInputNameFocus(false);
            translateY.value = withSpring(0); // Move label back down
            if (onBlur) onBlur();
          }}
          onChangeText={text => {
            setCharCount(text.length);
            onChangeText(text);
          }}
          multiline={true}
          errorMessage={errorMessage}
          errorStyle={{
            color: '#FF3D00', // Error color
            fontSize: 12,
          }}
          keyboardType={keyboardType}
          editable={editable}
          onSubmitEditing={onSubmitEditing}
          autoFocus={autoFocus}
          maxLength={maxLength}
        />
        {loading && (
          <ActivityIndicator
            size="large"
            color="#007BFF" // Blue color for loading indicator
            style={{
              position: 'absolute',
              opacity: 0.6,
              right: 10,
              top: 12,
            }}
          />
        )}
      </View>
      {maxLength && (
        <View style={{ position: 'relative', top: -20 }}>
          <Text style={{ marginLeft: 'auto', color: '#FFF' }}> {/* White text color */}
            {charCount}/{maxLength}
          </Text>
        </View>
      )}
    </View>
  );
};

export default FormInput;
