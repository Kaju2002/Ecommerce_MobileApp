import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeHeader = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity>
        <Image
          source={require("../../../assets/home/expand.png")}
          style={styles.icon}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Erronix Fashion</Text>
      <TouchableOpacity>
        <Image
          source={require("../../../assets/home/bell.png")}
          style={styles.icon}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontFamily: "ProductSans-Bold",
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  icon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
});
