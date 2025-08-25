import {
  View,
  Text,
  Image,
  Keyboard,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import { useForm, Controller } from "react-hook-form";
import { vs, s, mvs, ms } from "react-native-size-matters";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import CustomKeyboardView from "@/components/customKeyboardView";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "@react-native-firebase/auth";
import firestore, {doc, getDoc, setDoc} from "@react-native-firebase/firestore";

const Signup = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const auth = getAuth();

  const submit = async (data: signup) => {
    console.log(data);
    const { email, Password } = data;
    try {
      // Create account with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        Password
      );
      const { user } = userCredential;

      // Save extra user info into Firestore
      await firestore().collection("users").doc(user.uid).set({
        email: user.email,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      Alert.alert("Success", "Account created!");
      router.push("./login");
    } catch (error: any) {
      switch (error.code) {
        case "auth/email-already-in-use":
          Alert.alert("Error", "This email is already in use.");
          break;
        case "auth/invalid-email":
          Alert.alert("Error", "The email address is invalid.");
          break;
        case "auth/weak-password":
          Alert.alert("Error", "Password must be at least 6 characters.");
          break;
        case "auth/network-request-failed":
          Alert.alert("Error", "Network error. Check your connection.");
          break;
        case "auth/too-many-requests":
          Alert.alert("Error", "Too many attempts, please try again later.");
          break;
        default:
          Alert.alert("Error", error.message);
      }
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={{ flex: 1, backgroundColor: "#030014" }}
        className="z-0 border border-white"
      >
        <CustomKeyboardView>
          <Image source={images.bg} className="absolute w-full z-0" />
          <View className="flex-row w-96 mx-auto mt-[100px] ml-[50px] items-center">
            <Image source={icons.logo} className="size-[125px]" />
            <Text className="text-white font-bold text-[30px] absolute left-[100px]">
              PopCornPal
            </Text>
          </View>
          <View style={{ height: vs(20) }}></View>
          <View className="mx-auto flex-col">
            <Text
              className="text-white font-bold"
              style={{ marginBottom: 15, fontSize: ms(20) }}
            >
              Sign Up
            </Text>
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <TextInput
                    placeholder="Email"
                    placeholderTextColor="#FFFFFFCC"
                    style={[
                      styles.TextInput,
                      { marginBottom: 13, color: "white" },
                    ]}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                  />
                </>
              )}
              rules={{
                required: true,
                pattern: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm,
              }}
            />

            {errors.email && (
              <View
                style={{ marginLeft: 30 }}
                className="flex-row items-center"
              >
                <Ionicons name="warning" size={24} color="red" />
                <View style={{ width: ms(10) }}></View>
                <Text className="text-red-600">Email is required</Text>
              </View>
            )}

            <Controller
              name="Password"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <View className="flex-row relative">
                    <TextInput
                      placeholder="Password"
                      placeholderTextColor="#FFFFFFCC"
                      style={[
                        styles.TextInput,
                        { marginBottom: 13, marginTop: 10, color: "white" },
                      ]}
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                      style={{ position: "absolute", right: 20, top: 26 }}
                      onPress={() => {
                        setShowPassword(!showPassword);
                      }}
                    >
                      {showPassword ? (
                        <Ionicons name="eye" size={24} color="#A8B5DB" />
                      ) : (
                        <Ionicons name="eye-off" size={24} color="#A8B5DB" />
                      )}
                    </TouchableOpacity>
                  </View>
                </>
              )}
            />
            <Controller
              name="Confirm Password"
              control={control}
              rules={{
                required: true,
                validate: (value) =>
                  value === getValues("Password") || "Passwords do not match",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <View className="flex-row relative">
                    <TextInput
                      placeholder="Confirm Password"
                      placeholderTextColor="#FFFFFFCC"
                      style={[
                        styles.TextInput,
                        { marginBottom: 13, marginTop: 10, color: "white" },
                      ]}
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      secureTextEntry={!showConfirmPassword}
                    />
                    <TouchableOpacity
                      style={{ position: "absolute", right: 20, top: 26 }}
                      onPress={() => {
                        setShowConfirmPassword(!showConfirmPassword);
                      }}
                    >
                      {showConfirmPassword ? (
                        <Ionicons name="eye" size={24} color="#A8B5DB" />
                      ) : (
                        <Ionicons name="eye-off" size={24} color="#A8B5DB" />
                      )}
                    </TouchableOpacity>
                  </View>
                </>
              )}
            />

            {errors["Confirm Password"] && (
              <View
                style={{ marginLeft: 30 }}
                className="flex-row items-center"
              >
                <Ionicons name="warning" size={24} color="red" />
                <View style={{ width: ms(10) }}></View>
                <Text style={{ color: "red" }}>
                  {typeof errors["Confirm Password"].message === "string"
                    ? errors["Confirm Password"].message
                    : "Passwords do not match"}
                </Text>
              </View>
            )}
            <TouchableOpacity
              style={{ left: ms(200), marginBottom: ms(13) }}
              onPress={() => Alert.alert("Forgot Password")}
            >
              <Text className="text-white" style={{ fontSize: ms(10) }}>
                Forgot Password?
              </Text>
            </TouchableOpacity>


            {
              isLoading ? (
                <ActivityIndicator size="large" color="#ffffff" className="my-3" />
              ) : (
                <TouchableOpacity
              style={{ width: 319, height: 56 }}
              onPress={handleSubmit(submit)}
              className="font-dmsans text-black bg-white rounded-full flex-row justify-center items-center"
            >
              <Text className="text-black text-[15px] font-bold">Sign Up</Text>
            </TouchableOpacity>
              )
            }
            
          </View>

          {/* for more login options */}
          <View className="flex-col items-center" style={{ marginTop: ms(20) }}>
            <View
              className="flex-row justify-center items-center"
              style={{ marginBottom: 20 }}
            >
              <View style={styles.line}></View>
              <Text
                className="text-white"
                style={{ marginLeft: ms(10), marginRight: ms(10) }}
              >
                or sign up with
              </Text>
              <View style={styles.line}></View>
            </View>
            <View className="flex-row justify-center items-center gap-x-5">
              <Image source={icons.google} className="size-12" />
              <Image source={icons.apple} className="size-12" />
            </View>
          </View>
        </CustomKeyboardView>
        {/* sigup if no account */}
        <View
          style={{
            position: "absolute",
            bottom: 50,
            left: 0,
            right: 0,
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text className="text-white">Already have an account?</Text>

          <TouchableOpacity
            onPress={() => {
              router.push("./login");
            }}
          >
            <Text style={{ marginLeft: ms(5) }} className="text-[#FEDE7D]">
              Log In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Signup;

const styles = StyleSheet.create({
  TextInput: {
    fontWeight: "700",
    fontSize: 13,
    borderRadius: 27.5,
    paddingLeft: 29.83,
    width: 319,
    height: 56,
    fontFamily: "DM-Sans",
    backgroundColor: "#3E356E",
    marginBottom: 13,
  },
  line: {
    width: 100,
    height: 1,
    backgroundColor: "#FFFF",
  },
});
