import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

interface ProductCardProps {
  image: any;
  title: string;
  price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, title, price }) => (
  <View style={styles.card}>
    <Image source={image} style={styles.image} resizeMode="contain" />
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.price}>{price}</Text>
  </View>
);

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