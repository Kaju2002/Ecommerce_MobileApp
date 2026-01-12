import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import ProductCard from "./ProductCard";

const products = [
  {
    image: require("../../../assets/products/sweater.png"),
    title: "Turtleneck Sweater",
    price: "$ 39.99",
  },
  {
    image: require("../../../assets/products/dress.png"),
    title: "Long Sleeve Dress",
    price: "$ 45.00",
  },
  {
    image: require("../../../assets/products/sportwear.png"),
    title: "Sportwear Set",
    price: "$ 80.00",
  },
   {
    image: require("../../../assets/products/sweater.png"),
    title: "Turtleneck Sweater",
    price: "$ 39.99",
  },
  {
    image: require("../../../assets/products/dress.png"),
    title: "Long Sleeve Dress",
    price: "$ 45.00",
  },
  {
    image: require("../../../assets/products/sportwear.png"),
    title: "Sportwear Set",
    price: "$ 80.00",
  },
];

const FeatureProducts = () => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.title}>Feature Products</Text>
      <Text style={styles.showAll}>Show all</Text>
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {products.map((item, idx) => (
        <ProductCard
          key={idx}
          image={item.image}
          title={item.title}
          price={item.price}
        />
      ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginHorizontal: 18, 
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
        fontWeight: "400",
    fontFamily: "ProductSans-Bold",
    
  },
  showAll: {
    fontSize: 14,
    color: "#888",
    fontFamily: "ProductSans-Regular",
  },
});

export default FeatureProducts;