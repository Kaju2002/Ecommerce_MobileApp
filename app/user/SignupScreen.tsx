


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
import { toast } from "sonner-native";
// ...existing imports...
import { useFocusEffect } from "@react-navigation/native";

interface FieldErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}
// Password validation: min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
const validatePassword = (password: string) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&()[\]{}^#_~\-+=|\\:;"'<>,./])[A-Za-z\d@$!%*?&()[\]{}^#_~\-+=|\\:;"'<>,./]{8,}$/;
  if (!regex.test(password)) {
    return {
      valid: false,
      message:
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
    };
  }
  return { valid: true };
};

const SignUpScreen = () => {
  // Clear fields when the screen is focused (works for Expo Router stack navigation)
  useFocusEffect(
    React.useCallback(() => {
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setErrors({});
    }, [])
  );
  const [errors, setErrors] = useState<FieldErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    const newErrors: FieldErrors = {};
    if (!name || name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    const passwordValidation = validatePassword(password);
    if (!password) {
      newErrors.password = "Password is required";
    } else if (!passwordValidation.valid) {
      newErrors.password = passwordValidation.message;
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/user/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, confirmPassword }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Account created! 🎉", {
          description: "Please verify your email to continue",
        });
        // Navigate to OTP verification screen with name and email
        router.push({
          pathname: "/user/VerfifyOTPScreen",
          params: { name, email },
        });
      } else {
        toast.error("Registration failed", {
          description: data.message || "Please try again",
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
        <Text style={styles.title}>Create{"\n"}your account</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter your name"
            placeholderTextColor="#888"
            style={styles.input}
            autoCapitalize="words"
            value={name}
            onChangeText={text => {
              setName(text);
              setErrors(errors => ({
                ...errors,
                name: text.trim().length < 3 ? "Name must be at least 3 characters" : undefined,
              }));
            }}
          />
          {errors.name ? (
            <Text style={styles.errorText}>{errors.name}</Text>
          ) : null}
          <TextInput
            placeholder="Email address"
            placeholderTextColor="#888"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={text => {
              setEmail(text);
              setErrors(errors => ({
                ...errors,
                email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)
                  ? "Please enter a valid email address"
                  : undefined,
              }));
            }}
          />
          {errors.email ? (
            <Text style={styles.errorText}>{errors.email}</Text>
          ) : null}
          <View style={{ position: "relative" }}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#888"
              style={styles.input}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={text => {
                setPassword(text);
                const passwordValidation = validatePassword(text);
                setErrors(errors => ({
                  ...errors,
                  password: !text
                    ? "Password is required"
                    : !passwordValidation.valid
                    ? passwordValidation.message
                    : undefined,
                  // Also update confirmPassword error if needed
                  confirmPassword:
                    confirmPassword && text !== confirmPassword
                      ? "Passwords do not match"
                      : errors.confirmPassword && text === confirmPassword
                      ? undefined
                      : errors.confirmPassword,
                }));
              }}
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
            {errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
          </View>
          <View style={{ position: "relative" }}>
            <TextInput
              placeholder="Confirm password"
              placeholderTextColor="#888"
              style={styles.input}
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={text => {
                setConfirmPassword(text);
                // Remove confirmPassword error while typing
                setErrors(errors => ({
                  ...errors,
                  confirmPassword: undefined,
                }));
              }}
              onBlur={() => {
                setErrors(errors => ({
                  ...errors,
                  confirmPassword:
                    confirmPassword.length > 0 && confirmPassword !== password
                      ? "Passwords do not match"
                      : undefined,
                }));
              }}
            />
            <TouchableOpacity
              style={{ position: "absolute", right: 16, top: 18 }}
              onPress={() => setShowConfirmPassword((prev) => !prev)}
            >
              <Ionicons
                name={showConfirmPassword ? "eye-off" : "eye"}
                size={22}
                color="#888"
              />
            </TouchableOpacity>
            {errors.confirmPassword ? (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            ) : null}
          </View>
        </View>
        <Text style={styles.socialProof}>Join 10,000+ happy shoppers!</Text>
        <TouchableOpacity
          style={[styles.loginBtn, loading && { opacity: 0.6 }]}
          onPress={handleSignUp}
          disabled={loading}
        >
          {loading ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.loginBtnText}>Creating...</Text>
            </View>
          ) : (
            <Text style={styles.loginBtnText}>Create Account</Text>
          )}
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or sign up with</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialBtn}>
            <Ionicons name="logo-apple" size={24} color="#222" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn}>
            <Image
              source={{
                uri: "https://developers.google.com/identity/images/g-logo.png",
              }}
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
          <Text style={styles.signupText}>Already have account? </Text>
          <TouchableOpacity onPress={() => router.push("/user/LoginScreen")}>
            <Text style={styles.signupLink}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;

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
  errorText: {
    color: '#e11d48',
    fontSize: 13,
    marginTop: -18,
    marginBottom: 12,
    marginLeft: 2,
    fontFamily: 'ProductSans-Regular',
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
  socialProof: {
    color: "#16a34a",
    fontSize: 15,
    fontFamily: "ProductSans-Regular",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    marginTop: 8,
    letterSpacing: 0.2,
  },
});
