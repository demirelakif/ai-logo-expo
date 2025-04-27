import React from "react";
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface PromptInputProps {
  value: string;
  onChangeText: (text: string) => void;
  editable?: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ 
  value, 
  onChangeText, 
  editable = true 
}) => {
  const handleSurpriseMe = () => {
    const surprisePrompts = [
      "A blue lion logo reading 'HEXA' in bold letters",
      "A minimalist logo for a coffee shop called 'Brew'",
      "A tech company logo with a geometric pattern",
      "A professional logo for Harrison & Co. Law Firm, using balanced serif fonts"
    ];
    
    const randomPrompt = surprisePrompts[Math.floor(Math.random() * surprisePrompts.length)];
    onChangeText(randomPrompt);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Your Prompt</Text>
      
      <TouchableOpacity 
        style={styles.surpriseButton} 
        onPress={handleSurpriseMe}
        disabled={!editable}
      >
        <Ionicons name="shuffle-outline" size={16} color="#FAFAFA" />
        <Text style={styles.surpriseText}>Surprise me</Text>
      </TouchableOpacity>
      
      <View style={[styles.inputContainer, !editable && styles.disabledInput]}>
        <TextInput
          style={styles.input}
          textAlign="left"
          textAlignVertical="auto"
          placeholder="A blue lion logo reading 'HEXA' in bold letters"
          placeholderTextColor="#71717A"
          multiline
          value={value}
          onChangeText={onChangeText}
          editable={editable}
        />
        <Text style={styles.counter}>{value.length}/500</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  surpriseButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  surpriseText: {
    color: "#FAFAFA",
    marginLeft: 5,
    fontSize: 14,
  },
  inputContainer: {
    backgroundColor: "#27272A",
    borderRadius: 12,
    padding: 12,
    minHeight: 120,
  },
  disabledInput: {
    opacity: 0.7,
  },
  input: {
    color: "#FFFFFF",
    fontSize: 16,
    flex: 1,
  },
  counter: {
    color: "#71717A",
    fontSize: 12,
    alignSelf: "flex-end",
    marginTop: 8,
  },
});

export default PromptInput;