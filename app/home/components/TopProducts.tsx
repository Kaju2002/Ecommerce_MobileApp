import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import CollectionBanner from "./CollectionBanner";
import Card from "./Card";

const TopProducts = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Top Collection</Text>
      <CollectionBanner
        label="| Sale up to 40%"
        title={"FOR SLIM\n& BEAUTY"}
        image={require("../../../assets/products/yellowgirl.png")}
        outerCircleColor="#ECECEC"
        innerCircleColor="#ECECEC"
        containerStyle={{ backgroundColor: "#F8F8FA" }}
        textColor="#A0A0A0"
        showOuterCircle={false}
      />
      <CollectionBanner
        label="| Summer Collection 2021"
        title={"Most sexy\n& fabulous\ndesign"}
        image={require("../../../assets/products/summergirl.png")}
        outerCircleColor="#ECECEC"
        innerCircleColor="#ECECEC"
        containerStyle={{ backgroundColor: "#F8F8FA" }}
        textColor="#A0A0A0"
        showOuterCircle={false}
      />

      <View style={styles.horizontalRow}>
        <View style={styles.cardBg}> 
          <Card
            image={require("../../../assets/products/white.png")}
            label="T-Shirts"
            title={"The\nOffice\nLife"}
          />
        </View>
        <View style={[styles.cardBg,]}> 
          <Card
            image={require("../../../assets/products/whilegirl.png")}
            label="Dresses"
            title={"Elegant\nDesign"}
            reverse 
          />
        </View>
      </View>
    </View>
  );
};

export default TopProducts;

const styles = StyleSheet.create({
  section: {
    marginHorizontal: 16,
    marginTop: 24,
  },
  heading: {
    fontSize: 24,
    fontFamily: "ProductSans-Regular",
    fontWeight: "bold",
    marginBottom: 8,
    color: "#222",
  },
  horizontalRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  cardBg: {
    borderRadius: 22,
    padding: 4,
    marginBottom:16,
  },
});
