export type IconButtonProps = {
  type: "google" | "apple" | "custom";
  onPress: () => void;
  name?: string; // Icon name for custom type
  buttonText?: string; // Button text for custom type
  buttonStyle?: object; // Custom style for the button
  iconStyle?: object; // Custom style for the icon
  textColor?: string; // Custom text color
};
