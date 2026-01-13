import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

interface ProductCardProps {
  image: any;
  title: string;
  price: string;
  variant?: "default" | "recommended";
  containerStyle?: object;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  price,
  variant = "default",
  containerStyle = {},
}) => {
  if (variant === "recommended") {
    return (
      <View style={[styles.card, styles.recommendedCard, styles.recommendedRow, containerStyle]}>
        <Image source={image} style={styles.recommendedImage} resizeMode="cover" />
        <View style={styles.recommendedTextContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>{price}</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={[styles.card, containerStyle]}>
      <Image source={image} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>{price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 170,
    borderRadius: 20,
    padding: 16,
    marginRight: 0,
    marginLeft: 0,
    alignItems: "center",
    elevation: 3,
    marginHorizontal: 8,
    backgroundColor: "#fff",
  },
  recommendedCard: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
    elevation: 0,
    flexDirection: "row",
    alignItems: "center",
    width: 250,
    padding: 12,
    borderRadius: 20,
    marginRight: 16, 
  },
  recommendedRow: {
    justifyContent: "flex-start",
  },
  recommendedImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
    marginRight: 12,
    backgroundColor: '#e0e0e0',
  },
  recommendedTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    width: 154,
    height: 192,
    borderRadius: 16,
    marginBottom: 12,
    backgroundColor: '#e0e0e0',
    alignSelf: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    textAlign: "left",
    fontFamily: "ProductSans-Regular",
    alignSelf: "flex-start",
    width: "100%",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
    fontFamily: "ProductSans-Bold",
    textAlign: "left",
    alignSelf: "flex-start",
    width: "100%",
  },
});

export default ProductCard;