import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const ForgotPasswordScreen = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={28} color="#222" />
      </TouchableOpacity>
      <View style={styles.inner}>
        <Text style={styles.title}>Forgot password?</Text>
        <Text style={styles.subtitle}>
          Enter email associated with your account{"\n"}
          and we&apos;ll send an email with instructions to{"\n"}
          reset your password
        </Text>
        <View style={styles.inputBox}>
          <Ionicons name="mail-outline" size={18} color="#bdbdbd" style={styles.inputIcon} />
          <TextInput
            placeholder="enter your email here"
            placeholderTextColor="#444"
            style={styles.inputField}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity style={styles.sendBtn} onPress={() => router.push("/user/VerficationScreen")}>
          <Text style={styles.sendBtnText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backBtn: {
    marginTop: 24,
    marginLeft: 16,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    paddingHorizontal: 32,
    paddingTop: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000000",
    fontFamily: "ProductSans-Regular",
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 18,
    color: "#000000",
    fontFamily: "ProductSans-Regular",
    marginBottom: 80,
    lineHeight: 22,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingLeft: 8,
    marginBottom: 32,
    height: 40,
  },
  inputIcon: {
    marginRight: 12,
    marginLeft: 2,
  },
  inputField: {
    flex: 1,
    fontSize: 16,
    color: '#222',
    fontFamily: 'ProductSans-Regular',
    paddingVertical: 0,
    backgroundColor: 'transparent',
  },
  sendBtn: {
    backgroundColor: "#3B2C27",
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  sendBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "ProductSans-Regular",
    letterSpacing: 1,
  },
});
