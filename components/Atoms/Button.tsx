import React from "react";
import useDimension from "@/hooks/useDimension";
import { Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { IconButtonProps } from "./Button.types";

export const IconButton = ({
  type,
  onPress,
  name,
  buttonText,
  buttonStyle,
  iconStyle,
  textColor,
}: IconButtonProps) => {
  const { dWidth } = useDimension();

  // add handling for custom button styles if needed
  const styles = StyleSheet.create({
    googleButton: {
      justifyContent: "center",
      width: dWidth * 0.8,
      height: 44,
      backgroundColor: "white",
      borderColor: "black",
      borderWidth: 1,
      borderRadius: 5,
    },
    appleButton: {
      justifyContent: "center",
      width: dWidth * 0.8,
      height: 44,
      backgroundColor: "black",
      borderRadius: 5,
    },
  });

  const defaultStyles = {
    google: {
      buttonText: "Continue with Google",
      buttonStyle: styles.googleButton,
      iconStyle: { color: "black" },
      textColor: "black",
    },
    apple: {
      buttonText: "Continue with Apple",
      buttonStyle: styles.appleButton,
      iconStyle: { color: "white" },
      textColor: "white",
    },
  };

  if (type !== "custom") {
    const {
      buttonText: defaultText,
      buttonStyle: defaultButtonStyle,
      iconStyle: defaultIconStyle,
      textColor: defaultTextColor,
    } = defaultStyles[type];
    name = type;
    buttonText = buttonText || defaultText;
    buttonStyle = { ...defaultButtonStyle, ...buttonStyle };
    iconStyle = { ...defaultIconStyle, ...iconStyle };
    textColor = textColor || defaultTextColor;
  }

  return (
    <FontAwesome5.Button
      name={name}
      onPress={onPress}
      style={buttonStyle}
      iconStyle={iconStyle}
    >
      <Text style={{ color: textColor }}>{buttonText}</Text>
    </FontAwesome5.Button>
  );
};
