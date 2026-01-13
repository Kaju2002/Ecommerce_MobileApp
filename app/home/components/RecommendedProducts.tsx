import React from "react";
import { View, ScrollView } from "react-native";
import ProductCard from "./ProductCard";

const recommendedProducts = [
  {
    image: require("../../../assets/products/hoodie.png"),
    title: "White fashion hoodie",
    price: "$29.00",
  },
  {
    image: require("../../../assets/products/tshirt.png"),
    title: "Cotton T-shirt",
    price: "$30.00",
  },
  // Add more products as needed
];

const RecommendedProducts = () => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    {recommendedProducts.map((product, idx) => (
      <ProductCard
        key={idx}
        image={product.image}
        title={product.title}
        price={product.price}
        variant="recommended"
        containerStyle={idx === 0 ? { marginLeft: 16 } : {}}
      />
    ))}
  </ScrollView>
);

export default RecommendedProducts;
