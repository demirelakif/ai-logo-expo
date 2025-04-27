import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";

interface CreateButtonProps {
  onPress: () => void;
  isLoading?: boolean;
}

const CreateButton: React.FC<CreateButtonProps> = ({ onPress, isLoading = false }) => {
  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={onPress}
      disabled={isLoading}
    >
      <LinearGradient
        colors={["#943DFF", "#2938DC"]}
        locations={[0.25, 1]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={[styles.gradient, isLoading && styles.disabledGradient]}
      >
        <View style={styles.iconText}>
          <Text style={styles.buttonText}>
            {isLoading ? "Creating..." : "Create"}
          </Text>
          <Ionicons name="sparkles-outline" size={16} color="white" />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    overflow: "hidden",
  },
  gradient: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 50,
  },
  disabledGradient: {
    opacity: 0.6,
  },
  iconText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
});

export default CreateButton;