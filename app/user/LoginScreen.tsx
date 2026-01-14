import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { loginUser } from "@/services/authService";
import { toast } from "sonner-native";
//
const LoginScreen = () => {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Missing credentials", {
        description: "Please enter your email and password",
      });
      return;
    }
    setLoading(true);
    try {
      const data = await loginUser({ email, password });
      if (data.success && data.user && data.token) {
        await login(data.user, data.token);
        toast.success(`Welcome back! 👋`, {
          description: "You've logged in successfully",
        });
        router.replace("/home/HomeScreen");
      } else {
        toast.error("Login failed", {
          description: data.message || "Invalid email or password",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Connection error", {
        description: "Unable to reach the server. Check your internet connection.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Log into{"\n"}your account</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email address"
            placeholderTextColor="#888"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <View style={{ position: "relative" }}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#888"
              style={styles.input}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={{ position: "absolute", right: 16, top: 18 }}
              onPress={() => setShowPassword((prev) => !prev)}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={22}
                color="#888"
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.forgotBtn} onPress={() => router.push("/user/ForgotPasswordScreen")}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.loginBtn, loading && { opacity: 0.6 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator color="#fff" />
              <Text style={[styles.loginBtnText, { marginLeft: 8 }]}>Logging in...</Text>
            </View>
          ) : (
            <Text style={styles.loginBtnText}>LOG IN</Text>
          )}
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Or using other method</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialBtn}>
            <Ionicons name="logo-apple" size={24} color="#222" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn}>
            <Image
              source={{ uri: "https://developers.google.com/identity/images/g-logo.png" }}
              style={styles.googleIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn}>
            <Image
              source={require("../../assets/onboarding/facebook.png")}
              style={styles.googleIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.signupRow}>
          <Text style={styles.signupText}>Don&apos;t have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/user/SignupScreen")}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>


      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  inner: {
    flex: 1,
    padding: 32,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#222",
    fontFamily: "ProductSans-Regular",
    marginBottom: 40,
    marginTop: 40,
  },
  inputContainer: {
    marginBottom: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    fontSize: 16,
    paddingVertical: 12,
    marginBottom: 24,
    fontFamily: "ProductSans-Regular",
    color: "#222",
  },
  forgotBtn: {
    alignSelf: "flex-end",
    marginBottom: 32,
  },
  forgotText: {
    color: "#222",
    fontSize: 14,
    fontFamily: "ProductSans-Regular",
    textDecorationLine: "underline",
  },
  loginBtn: {
    backgroundColor: "#222",
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 32,
  },
  loginBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: "ProductSans-Regular",
    letterSpacing: 1,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#e5e7eb",
  },
  dividerText: {
    marginHorizontal: 16,
    color: "#6b7280",
    fontSize: 14,
    fontFamily: "ProductSans-Regular",
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
  },
  socialBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
    backgroundColor: "#fff",
  },
  googleIcon: {
    width: 24,
    height: 24,
  },
  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 32,
  },
  signupText: {
    color: "#222",
    fontSize: 14,
    fontFamily: "ProductSans-Regular",
  },
  signupLink: {
    color: "#222",
    fontSize: 14,
    fontFamily: "ProductSans-Regular",
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
});
