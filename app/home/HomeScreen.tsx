import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import MainLayout from "../MainLayout";
import HomeHeader from "./components/HomeHeader";
import CategoryTabs from "./components/CategoryTabs";
import AutumnCollectionBanner from "./components/AutumnCollectionBanner";
import FeatureProducts from "./components/FeatureProducts";

const HomeScreen = () => {
  return (
    <MainLayout>
              <HomeHeader />

      <ScrollView showsVerticalScrollIndicator={false}>
        <CategoryTabs />
        <AutumnCollectionBanner/>
        <FeatureProducts/>
        {/* Add more home content here */}
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
});

export default HomeScreen;
