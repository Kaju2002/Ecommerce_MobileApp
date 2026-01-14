import React from "react";
import { View, Text, TouchableOpacity,Image } from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";

interface SuccessModalProps {
  isVisible: boolean;
  onClose: () => void;
  onBrowseHome: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isVisible, onClose, onBrowseHome }) => (
  <Modal
    isVisible={isVisible}
    onBackdropPress={onClose}
    style={{ justifyContent: "flex-end", margin: 0 }}
  >
    <View
      style={{
        backgroundColor: "#fff",
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 32,
        alignItems: "center",
      }}
    >
      <View
        style={{
          backgroundColor: "#979797",
          borderRadius: 48,
          padding: 24,
          marginBottom: 16,
        }}
      >
        <Image
          source={require("../../assets/images/Success.png")}
          style={{ width: 48, height: 48 }}
          resizeMode="contain"
        />
      </View>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 8 }}>
        Your password has been changed
      </Text>
      <Text style={{ color: "#888", marginBottom: 24 }}>
        Welcome back! Discover now!
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: "#000",
          borderRadius: 24,
          paddingVertical: 14,
          paddingHorizontal: 40,
          marginTop: 8,
        }}
        onPress={onBrowseHome}
      >
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
          Browse home
        </Text>
      </TouchableOpacity>
    </View>
  </Modal>
);

export default SuccessModal;
