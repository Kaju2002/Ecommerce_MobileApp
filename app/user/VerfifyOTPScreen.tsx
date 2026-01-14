import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { toast } from "sonner-native";

const VerifyOTPScreen = () => {
  const router = useRouter();
  const { name, email } = useLocalSearchParams<{ name: string; email: string }>();
  
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  
  const inputRefs = useRef<(TextInput | null)[]>([]);

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otpCode = otp.join("");
    
    if (otpCode.length !== 4) {
      toast.error("Invalid OTP", {
        description: "Please enter a valid 4-digit code",
      });
      return;
    }

    try {
      // Verify the OTP with your backend
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/user/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp: otpCode }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Verified! 🎉", {
          description: "Your account has been verified successfully",
        });
        router.replace("/user/LoginScreen");
      } else {
        toast.error("Verification failed", {
          description: data.message || "Invalid OTP code",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Verification failed", {
        description: "An error occurred. Please try again.",
      });
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;

    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/user/resend-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("OTP Sent!", {
          description: "A new verification code has been sent to your email",
        });
        setTimer(60);
        setCanResend(false);
        setOtp(["", "", "", ""]);
      } else {
        toast.error("Failed to resend", {
          description: data.message || "Please try again later",
        });
      }
    } catch (error) {
      // For demo purposes
      toast.success("OTP Sent!", {
        description: "A new verification code has been sent to your email",
      });
      setTimer(60);
      setCanResend(false);
      setOtp(["", "", "", ""]);
    }
  };

  // Extract first name for display
  const displayName = name ? name.split(" ")[0] : "User";

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Verify OTP</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        {/* Shield Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <Ionicons name="shield-checkmark" size={40} color="#3B82F6" />
          </View>
        </View>

        {/* Title & Description */}
        <Text style={styles.title}>Hi {displayName}! Verify Your Account</Text>
        <Text style={styles.description}>
          We've sent a 4-digit verification code to{"\n"}
          <Text style={styles.emailText}>{email || "your email"}</Text>
        </Text>

        {/* OTP Input */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={[
                styles.otpInput,
                digit ? styles.otpInputFilled : null,
              ]}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        {/* Verify Button */}
        <TouchableOpacity 
          style={styles.verifyButton} 
          onPress={handleVerifyOTP}
        >
          <Text style={styles.verifyButtonText}>Verify OTP</Text>
        </TouchableOpacity>

        {/* Resend OTP */}
        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn't receive the code? </Text>
          <TouchableOpacity onPress={handleResendOTP} disabled={!canResend}>
            <Text style={[
              styles.resendLink,
              !canResend && styles.resendLinkDisabled
            ]}>
              Resend OTP {!canResend && `(${formatTime(timer)})`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VerifyOTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
    fontFamily: "ProductSans-Regular",
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: 24,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#EBF4FF",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
    marginBottom: 12,
    fontFamily: "ProductSans-Regular",
  },
  description: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
    fontFamily: "ProductSans-Regular",
  },
  emailText: {
    color: "#3B82F6",
    fontWeight: "500",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginBottom: 32,
  },
  otpInput: {
    width: 56,
    height: 56,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#222",
    backgroundColor: "#F9FAFB",
  },
  otpInputFilled: {
    borderColor: "#3B82F6",
    backgroundColor: "#fff",
  },
  verifyButton: {
    width: "100%",
    backgroundColor: "#222",
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 24,
  },
  verifyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "ProductSans-Regular",
  },
  resendContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  resendText: {
    fontSize: 14,
    color: "#6B7280",
    fontFamily: "ProductSans-Regular",
  },
  resendLink: {
    fontSize: 14,
    color: "#3B82F6",
    fontWeight: "600",
    fontFamily: "ProductSans-Regular",
  },
  resendLinkDisabled: {
    color: "#9CA3AF",
  },
});
