import { Text, TextProps } from "react-native";
import React from "react";

const TextSans: React.FC<TextProps> = ({ style, children, ...props }) => {
  return <Text style={[{ fontFamily: "DM-Sans" }, style]} {...props}>
    {children}
  </Text>;
};

export default TextSans;
