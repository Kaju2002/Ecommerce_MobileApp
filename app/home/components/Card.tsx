import React from "react";
import { View, Text, StyleSheet, Image, ImageSourcePropType, ViewStyle } from "react-native";

interface CardProps {
  image: ImageSourcePropType;
  label: string;
  title: string;
  reverse?: boolean; // NEW: to flip image/text
  style?: ViewStyle; // for spacing
}

const Card: React.FC<CardProps> = ({ image, label, title, reverse = false, style }) => {
  return (
    <View style={[styles.card, style, { flexDirection: reverse ? "row-reverse" : "row" }]}>
      <Image
        source={image}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    width: 220,
    height: 180,
    borderRadius: 18,
    backgroundColor: "#F8F8FA",
    overflow: "hidden",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 14,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    alignItems: "center",
  },
  image: {
    width: 110,
    height: 180,
    marginLeft: 0,
    marginRight: 0,
  },
  textContainer: {
    flex: 1,
    marginLeft: 4,
    marginRight: 2,
    justifyContent: "center",
  },
  label: {
    color: "#A0A0A0",
    fontSize: 15,
    marginBottom: 6,
    fontWeight: "500",
  },
  title: {
    color: "#222",
    fontSize: 22,
    fontWeight: "400",
    lineHeight: 28,
  },
});