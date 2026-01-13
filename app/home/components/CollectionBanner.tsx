import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from "react-native";

interface CollectionBannerProps {
  label: string;
  title: string;
  image: ImageSourcePropType;
  outerCircleColor?: string;
  innerCircleColor?: string;
  containerStyle?: object;
  textColor?: string;
  showOuterCircle?: boolean;
  variant?: "default" | "vertical";
}

const OUTER_CIRCLE_SIZE = 200;
const INNER_CIRCLE_SIZE = 160;

const CollectionBanner: React.FC<CollectionBannerProps> = ({
  label,
  title,
  image,
  outerCircleColor = "#E2E2E2",
  innerCircleColor = "#E2E2E2",
  containerStyle = {},
  textColor = "#222",
  showOuterCircle = true,
  variant = "default",
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.title, { color: textColor }]}>{title}</Text>
      </View>
      <View style={styles.imageCircleContainer}>
        {showOuterCircle && (
          <View
            style={[styles.outerCircle, { backgroundColor: outerCircleColor }]}
          />
        )}
        <View
          style={[styles.innerCircle, { backgroundColor: innerCircleColor }]}
        />
        <Image source={image} style={styles.image} resizeMode="contain" />
      </View>
    </View>
  );
};

export default CollectionBanner;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8FA",
    marginVertical: 16,
    padding: 20,
    borderRadius: 16,
  },
  verticalContainer: {
    alignItems: "center",
    backgroundColor: "#F8F8FA",
    marginVertical: 16,
    padding: 20,
    borderRadius: 16,
    width: 180,
  },
  verticalImage: {
    width: 120,
    height: 180,
    marginBottom: 12,
    resizeMode: "contain",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  label: {
    color: "#A0A0A0",
    fontSize: 13,
    marginBottom: 6,
    letterSpacing: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    lineHeight: 28,
  },
  imageCircleContainer: {
    width: OUTER_CIRCLE_SIZE,
    height: OUTER_CIRCLE_SIZE,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  outerCircle: {
    position: "absolute",
    width: OUTER_CIRCLE_SIZE,
    height: OUTER_CIRCLE_SIZE,
    borderRadius: OUTER_CIRCLE_SIZE / 2,
    opacity: 0.5,
    top: 0,
    left: 0,
    zIndex: 1,
  },
  innerCircle: {
    position: "absolute",
    width: INNER_CIRCLE_SIZE,
    height: INNER_CIRCLE_SIZE,
    borderRadius: INNER_CIRCLE_SIZE / 2,
    top: (OUTER_CIRCLE_SIZE - INNER_CIRCLE_SIZE) / 2,
    left: (OUTER_CIRCLE_SIZE - INNER_CIRCLE_SIZE) / 2,
    zIndex: 2,
  },
  image: {
    width: OUTER_CIRCLE_SIZE,
    height: OUTER_CIRCLE_SIZE + 40,
    resizeMode: "contain",
    zIndex: 3,
  },
});
