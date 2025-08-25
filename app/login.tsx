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
import {
  getAuth,
  signInWithEmailAndPassword,
} from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";


const Login = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth();

  const submit = async (email: string, password: string) => {
    try {
      // sign in
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;

      // fetch profile from Firestore
      const doc = await firestore().collection("users").doc(user.uid).get();

      if (doc.exists) {
        const userData = doc.data();
        console.log("User profile:", userData);
        Alert.alert("Welcome", `Hello ${userData?.email}`);
      } else {
        console.log("No profile found, but user is authenticated.");
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 bg-[#030014]">
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
            Login
          </Text>
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  placeholder="Enter your email"
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
            <View style={{ marginLeft: 30 }} className="flex-row items-center">
              <Ionicons name="warning" size={24} color="red" />
              <View style={{ width: ms(10) }}></View>
              <Text className="text-red-600">Email is required</Text>
            </View>
          )}

          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <View className="flex-row relative">
                  <TextInput
                    placeholderTextColor="#FFFFFFCC"
                    placeholder="Enter your password"
                    // className="w-[319px] h-[56px] bg-[#3E356E] font-dmsans"
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
          <TouchableOpacity
            style={{ left: ms(200), marginBottom: ms(13) }}
            onPress={() => Alert.alert("Forgot Password")}
          >
            <Text className="text-white" style={{ fontSize: ms(10) }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          {isLoading ? (
            <ActivityIndicator size="large" color="#ffffff" className="my-3" />
          ) : (
            <TouchableOpacity
              style={{ width: 319, height: 56 }}
              onPress={handleSubmit(submit)}
              className="font-dmsans text-black bg-white rounded-full flex-row justify-center items-center"
            >
              <Text className="text-black text-[15px] font-bold">Login</Text>
            </TouchableOpacity>
          )}
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
              or login with
            </Text>
            <View style={styles.line}></View>
          </View>
          <View className="flex-row justify-center items-center gap-x-5">
            <Image source={icons.google} className="size-12" />
            <Image source={icons.apple} className="size-12" />
          </View>
        </View>

        {/* sigup if no account */}
        <View
          style={{ marginTop: ms(100) }}
          className="flex-row justify-center items-center"
        >
          <Text className="text-white">Dont have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              router.push("/signup");
            }}
          >
            <Text style={{ marginLeft: ms(5) }} className="text-[#FEDE7D]">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;

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
