import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const OnboardingScreen = () => {
  const router = useRouter();
  return (
    <ImageBackground
      source={require("../../assets/onboarding/on_boarding.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Text style={styles.title}>Welcome to Erronix</Text>
          <Text style={styles.subtitle}>The home for a fashionista</Text>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={() => router.replace("/onboarding/OnboardingScreen1")}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: "flex-end" },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  content: {
    alignItems: "center",
    marginBottom: 80,
  },
  title: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 8,
    fontFamily: "ProductSans-Regular",
  },
  subtitle: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 64,
    fontFamily: "ProductSans-Regular",
  },
  button: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 24,
    paddingHorizontal: 50,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#fff",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: "ProductSans-Regular",
  },
  safeArea: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
