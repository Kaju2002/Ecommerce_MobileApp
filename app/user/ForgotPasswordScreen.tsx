import React, { useState } from "react";
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
import { toast } from "sonner-native";
import { forgotPassword } from "@/services/authService";
import { ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const ForgotPasswordScreen = () => {
  // Clear email field when screen is focused (e.g., after navigating back)
  useFocusEffect(
    React.useCallback(() => {
      setEmail("");
    }, [])
  );
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Email required", { description: "Please enter your email address." });
      return;
    }
    setLoading(true);
    try {
      const result = await forgotPassword(email);
      toast.success("Request sent", { description: result.message });
      // Navigate to verification screen (pass email)
      router.push({ pathname: "/user/VerficationScreen", params: { email } });
    } catch (error) {
      toast.error("Error", { description: "Could not send reset request." });
    } finally {
      setLoading(false);
    }
  };

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
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            style={styles.inputField}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity style={styles.sendBtn} onPress={handleForgotPassword} disabled={loading}>
          {loading ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator color="#fff" />
              <Text style={[styles.sendBtnText, { marginLeft: 8 }]}>Sending...</Text>
            </View>
          ) : (
            <Text style={styles.sendBtnText}>Send</Text>
          )}
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
