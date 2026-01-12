import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const categories = [
  {
    key: "women",
    label: "Women",
    image: { uri: "https://cdn-icons-png.flaticon.com/512/2922/2922561.png" },
  },
  {
    key: "men",
    label: "Men",
    image: { uri: "https://cdn-icons-png.flaticon.com/512/2922/2922510.png" },
  },
  {
    key: "accessories",
    label: "Accessories",
    icon: (color: string, size: number) => (
      <MaterialCommunityIcons name="sunglasses" color={color} size={size} />
    ),
  },
  {
    key: "beauty",
    label: "Beauty",
    icon: (color: string, size: number) => (
      <MaterialCommunityIcons name="lipstick" color={color} size={size} />
    ),
  },
];

const CategoryTabs = () => {
  const [active, setActive] = useState("women");

  return (
    <View style={styles.container}>
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat.key}
          style={styles.tab}
          onPress={() => setActive(cat.key)}
          activeOpacity={0.8}
        >
          <View
            style={[
              styles.iconCircle,
              active === cat.key && styles.iconCircleActive,
            ]}
          >
            {cat.image ? (
              <Image
                source={cat.image}
                style={[
                  styles.icon,
                  active === cat.key && styles.iconActive,
                  { borderRadius: 12 },
                ]}
                resizeMode="cover"
              />
            ) : (
              cat.icon && cat.icon("#B0B0B0", 24)
            )}
          </View>
          <Text
            style={[styles.label, active === cat.key && styles.labelActive]}
          >
            {cat.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
    marginHorizontal: 0,
  },
  tab: {
    alignItems: "center",
    flex: 1,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  iconCircleActive: {
    backgroundColor: "#3B2C27",
    borderWidth: 2,
    borderColor: "#3B2C27",
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: "#B0B0B0",
  },
  iconActive: {
    tintColor: "#fff",
  },
  label: {
    fontSize: 13,
    color: "#B0B0B0",
    fontFamily: "ProductSans-Regular",
    marginTop: 2,
  },
  labelActive: {
    color: "#3B2C27",
    fontWeight: "bold",
  },
});

export default CategoryTabs;
