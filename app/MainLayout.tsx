import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import BottomTabBar from "./home/components/BottomTabBar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState("home");

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    // Add navigation logic here (e.g., navigate to the correct screen)
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>{children}</View>
      <BottomTabBar activeTab={activeTab} onTabPress={handleTabPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { flex: 1 },
});

export default MainLayout;
