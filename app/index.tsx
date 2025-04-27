import React, { useState } from "react";
import {
  Keyboard,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Header from "../components/Header";
import BackgroundGradient from "../components/BackgroundGradient";
import CreateButton from "../components/CreateButton";
import LogoStyles from "../components/LogoStyles";
import PromptInput from "../components/PromptInput";
import StatusIndicator from "../components/StatusIndicator";
import OutputScreen from "../components/OutputScreen";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("No Style");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showStatusIndicator, setShowStatusIndicator] = useState(false);
  const [seenDesign, setSeenDesign] = useState(false);

  const handleCreatePress = () => {
    if (prompt.trim() === "") {
      // You might want to show an error message here
      return;
    }

    setIsGenerating(true);
    setShowStatusIndicator(true);
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#09090B", flex: 1 }}>
      <BackgroundGradient />
      {!seenDesign ? (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.content}>
            <Header />

            {showStatusIndicator && (
              <StatusIndicator
                prompt={prompt}
                style={selectedStyle}
                setSeeDesign={setSeenDesign}
              />
            )}

            <PromptInput
              value={prompt}
              onChangeText={setPrompt}
              editable={!isGenerating}
            />

            <LogoStyles
              selectedStyle={selectedStyle}
              onSelectStyle={setSelectedStyle}
              disabled={isGenerating}
            />

            <View style={styles.buttonContainer}>
              <CreateButton
                onPress={handleCreatePress}
                isLoading={isGenerating}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <OutputScreen
          setSeenDesign={setSeenDesign}
          setShowStatusIndicator={setShowStatusIndicator}
          setIsGenerating={setIsGenerating}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 30,
  },
});
