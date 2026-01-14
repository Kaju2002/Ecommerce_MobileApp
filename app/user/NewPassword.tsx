import React, { useState } from "react";
import { resetPassword } from "@/services/authService";
import { toast } from "sonner-native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SuccessModal from "@/components/ui/SuccessModal";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const NewPasswordScreen = () => {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const isValid = password.length > 0 && confirm.length > 0;

  const handleResetPassword = async () => {
    if (!email) {
      toast.error("Missing email", { description: "Email is required for password reset." });
      return;
    }
    setLoading(true);
    try {
      const result = await resetPassword(email, password, confirm);
      if (result.success) {
        setPassword("");
        setConfirm("");
        setShowSuccessModal(true);
      } else {
        toast.error("Reset failed", { description: result.message });
      }
    } catch {
      toast.error("Reset failed", { description: "Server error" });
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
        <Text style={styles.title}>Create new password</Text>
        <Text style={styles.subtitle}>
          Your new password must be different{"\n"}
          from previously used password
        </Text>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>New Password</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword((v) => !v)}>
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={22}
                color="#888"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.underline} />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              secureTextEntry={!showConfirm}
              value={confirm}
              onChangeText={setConfirm}
            />
            <TouchableOpacity onPress={() => setShowConfirm((v) => !v)}>
              <Ionicons
                name={showConfirm ? "eye-outline" : "eye-off-outline"}
                size={22}
                color="#888"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.underline} />
        </View>

        <TouchableOpacity
          style={[styles.confirmBtn, (!isValid || loading) && styles.confirmBtnDisabled]}
          disabled={!isValid || loading}
          onPress={handleResetPassword}
        >
          {loading ? (
            <Text style={styles.confirmBtnText}>Resetting...</Text>
          ) : (
            <Text style={styles.confirmBtnText}>Confirm</Text>
          )}
        </TouchableOpacity>
      </View>
      <SuccessModal
        isVisible={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onBrowseHome={() => {
          setShowSuccessModal(false);
          router.replace("/home/HomeScreen");
        }}
      />
    </SafeAreaView>
  );
};

export default NewPasswordScreen;

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
    color: "#000",
    fontFamily: "ProductSans-Regular",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: "#222",
    fontFamily: "ProductSans-Regular",
    marginBottom: 32,
    lineHeight: 22,
  },
  inputWrapper: {
    marginBottom: 16,
  },
   label: {
    fontSize: 14,
    color: "#888",
    fontFamily: "ProductSans-Regular",
    marginBottom: 4,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: "#222",
    fontFamily: "ProductSans-Regular",
    paddingVertical: 8,
  },
  underline: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginTop: -2,
  },
  confirmBtn: {
    backgroundColor: "#000",
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 40,
    marginBottom: 16,
  },
  confirmBtnDisabled: {
    backgroundColor: "#bbb",
  },
  confirmBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: "ProductSans-Regular",
    letterSpacing: 1,
  },
});
