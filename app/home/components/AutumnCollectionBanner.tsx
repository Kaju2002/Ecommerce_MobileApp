import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const AutumnCollectionBanner = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/home/girl.png")}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          Autumn{"\n"}Collection{"\n"}2022
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: "hidden",
    margin: 28,
    backgroundColor: "#fff",
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 220,
  },
  textContainer: {
    position: "absolute",
    right: 20,
    top: 30,
    alignItems: "flex-end",
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontFamily: "ProductSans-Bold",
    fontWeight: "700",
    lineHeight: 34,
    textAlign: "right",
  },
  year: {
    color: "#fff",
    fontSize: 18,
    marginTop: 4,
  },
});

export default AutumnCollectionBanner;
