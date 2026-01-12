import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

type BottomTabBarProps = {
  activeTab?: string;
  onTabPress: (tab: string) => void;
};

const BottomTabBar = ({ activeTab = "home", onTabPress }: BottomTabBarProps) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={() => onTabPress("home")} style={styles.tab}>
      <Ionicons name="home-outline" size={28} color={activeTab === "home" ? "#222" : "#ccc"} />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => onTabPress("search")} style={styles.tab}>
      <Feather name="search" size={28} color={activeTab === "search" ? "#222" : "#ccc"} />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => onTabPress("bag")} style={styles.tab}>
      <Feather name="shopping-bag" size={28} color={activeTab === "bag" ? "#222" : "#ccc"} />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => onTabPress("profile")} style={styles.tab}>
      <Ionicons name="person-outline" size={28} color={activeTab === "profile" ? "#222" : "#ccc"} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingTop: 20,
    paddingBottom: 16,
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: 0,
    marginBottom: 0,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
    // Elevation for Android
    elevation: 8,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 56,
  },
});

export default BottomTabBar;