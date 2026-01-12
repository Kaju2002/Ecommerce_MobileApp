import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";


const { height } = Dimensions.get("window");

const OnboardingScreen1 = () => {
  const router = useRouter();

  return (
    <View style={styles.root}>
      <View style={styles.topHalf} />
      <View style={styles.bottomHalf} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Text style={styles.title}>Discover something new</Text>
          <Text style={styles.subtitle}>Special new arrivals just for you</Text>
          <View style={styles.imageWrapper}>
            <View style={styles.imageCard}>
              <Image
                source={require("../../assets/onboarding/on_boarding1.png")}
                style={styles.productImage}
                resizeMode="contain"
              />
            </View>
          </View>
          <View style={styles.bottomSection}>
            <View style={styles.pagination}>
              <View style={[styles.dot, styles.activeDot]} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
            onPress={() => router.replace("/onboarding/OnboardingScreen2")}
            >
              <Text style={styles.buttonText}>Shopping now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default OnboardingScreen1;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: "relative",
    backgroundColor: "#fff",
  },
  topHalf: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.4,
    backgroundColor: "#fff",
    zIndex: 0,
  },
  bottomHalf: {
    position: "absolute",
    top: height * 0.6,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#464447",
    zIndex: 0,
  },
  safeArea: {
    flex: 1,
    zIndex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 12,
    fontFamily: "ProductSans-Regular",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 32,
    fontFamily: "ProductSans-Regular",
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 24,
    marginBottom: 0,
    zIndex: 2,
  },
  imageCard: {
    backgroundColor: '#E7E8E9',
    borderRadius: 24,
    width: 261,
    height: 368,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  productImage: {
    width: 240,
    height: 340,
    alignSelf: 'center',
    marginTop: 30,
  },
  bottomSection: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 40,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#222",
    width: 16,
  },
  button: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 24,
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#fff",
    marginBottom: 40,
    width: 220,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: "ProductSans-Regular",
  },
});
