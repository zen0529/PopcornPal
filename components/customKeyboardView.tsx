import {
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import React from "react";
import { ReactNode } from "react";

const ios = Platform.OS == "ios";
interface CustomKeyboardViewProps {
  children: ReactNode;
}

const CustomKeyboardView = ({ children }: CustomKeyboardViewProps) => {
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={ios ? 0 : 10}
      behavior={ios ? "padding" : "height"}
    >
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CustomKeyboardView;

const styles = StyleSheet.create({});
