import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TextInput as RNTextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { verifyResetOtp, resendResetOtp } from "@/services/authService";
import { toast } from "sonner-native";
import { SafeAreaView } from "react-native-safe-area-context";

const VerificationScreen = () => {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const [code, setCode] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);
    // Resend OTP handler
    const handleResend = async () => {
      if (timer > 0) return;
      try {
        const result = await resendResetOtp(email);
        toast.success("OTP resent", { description: result.message });
        setTimer(60);
        setCode(["", "", "", ""]);
      } catch (error) {
        toast.error("Resend failed", { description: "Could not resend OTP." });
      }
    };
  const [loading, setLoading] = useState(false);
  const inputs = useRef<Array<RNTextInput | null>>([]);

  // Timer countdown effect
  React.useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = async (text: string, idx: number) => {
    if (!/^\d*$/.test(text)) return; // Only allow numbers
    const newCode = [...code];
    newCode[idx] = text;
    setCode(newCode);

    // Move to next input if not last and text entered
    if (text && idx < 3 && inputs.current[idx + 1]) {
      inputs.current[idx + 1]?.focus();
    }

    // Auto-verify when all digits entered
    if (newCode.every((v) => v.length === 1)) {
      setLoading(true);
      try {
        const otp = newCode.join("");
        const result = await verifyResetOtp(email, otp);
        if (result.success) {
          toast.success("OTP Verified", { description: result.message });
          router.replace({ pathname: "/user/NewPassword", params: { email } });
        } else {
          toast.error("Verification failed", { description: result.message });
        }
      } catch (error) {
        toast.error("Verification failed", { description: "Server error" });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={28} color="#222" />
      </TouchableOpacity>
      <View style={styles.inner}>
        <Text style={styles.title}>Verification code</Text>
        <Text style={styles.subtitle}>
          Please enter the verification code we sent{"\n"}to your email address
        </Text>
        <View style={styles.codeRow}>
          {[0, 1, 2, 3].map((idx) => (
            <TextInput
              key={idx}
              ref={(el) => {
                inputs.current[idx] = el;
              }}
              style={styles.codeInput}
              keyboardType="number-pad"
              maxLength={1}
              value={code[idx]}
              onChangeText={(text) => handleChange(text, idx)}
              autoFocus={idx === 0}
              textAlign="center"
              selectionColor="#222"
              editable={!loading}
            />
          ))}
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
          {timer > 0 ? (
            <Text style={styles.resendText}>
              Resend in 00:{timer.toString().padStart(2, "0")}
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResend}>
              <Text style={[styles.resendText, { color: "#3B82F6", fontWeight: "bold" }]}>Resend Code</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VerificationScreen;

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
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: "#000000",
    fontFamily: "ProductSans-Regular",
    marginBottom: 32,
    lineHeight: 22,
  },
  codeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
    marginTop: 16,
  },
  codeInput: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#bbb",
    backgroundColor: "#fff",
    fontSize: 28,
    color: "#222",
    fontFamily: "ProductSans-Regular",
  },
  resendText: {
    color: "#bbb",
    fontSize: 16,
    marginTop: 8,
    fontFamily: "ProductSans-Regular",
  },
});
