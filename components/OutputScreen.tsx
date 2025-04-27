import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import BackgroundGradient from "./BackgroundGradient"

interface OutputScreenProps {
  setSeenDesign: (value: boolean) => void
  setShowStatusIndicator: (value: boolean) => void
  setIsGenerating: (value: boolean) => void
  prompt?: string
  style?: string
}

const OutputScreen: React.FC<OutputScreenProps> = ({
  setSeenDesign,
  setShowStatusIndicator,
  setIsGenerating,
  prompt = "A professional logo for Harrison & Co. Law Firm, using balanced serif fonts",
  style = "Monogram",
}) => {

  const handleClose = () => {
    setSeenDesign(false)
    setShowStatusIndicator(false)
    setIsGenerating(false)
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <BackgroundGradient />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Design</Text>
          <TouchableOpacity onPress={handleClose}>
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>HC</Text>
            <Text style={styles.logoSubtext}>HARRISON & CO.</Text>
            <Text style={styles.logoSmallText}>— LAW FIRM —</Text>
          </View>
        </View>

        <View style={styles.promptContainer}>
          <View style={styles.promptHeader}>
            <Text style={styles.promptTitle}>Prompt</Text>
            <TouchableOpacity style={styles.copyButton}>
              <Ionicons name="copy-outline" size={16} color="#A1A1AA" />
              <Text style={styles.copyText}>Copy</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.promptBox}>
            <Text style={styles.promptText}>{prompt}</Text>
            <View style={styles.styleTag}>
              <Text style={styles.styleTagText}>{style}</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09090B",
    paddingTop:40
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FAFAFA",
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "white",
    borderRadius: 16,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
  },
  logoSubtext: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginTop: 8,
  },
  logoSmallText: {
    fontSize: 12,
    color: "#333",
    marginTop: 4,
  },
  promptContainer: {
    marginTop: 20,
  },
  promptHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  promptTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FAFAFA",
  },
  copyButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  copyText: {
    fontSize: 11,
    color: "#A1A1AA",
  },
  promptBox: {
    backgroundColor: "rgba(39, 39, 42, 1)",
    borderRadius: 12,
    padding: 12,
  },
  promptText: {
    color: "#FAFAFA",
    fontSize: 16,
    marginBottom: 10,
  },
  styleTag: {
    backgroundColor: "rgba(250, 250, 250, 0.1)",
    borderRadius: 50,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: "flex-start",
  },
  styleTagText: {
    color: "#FAFAFA",
    fontSize: 12,
  },
  homeIndicator: {
    height: 34,
    justifyContent: "center",
    alignItems: "center",
  },
  indicator: {
    width: 134,
    height: 5,
    backgroundColor: "#FFFFFF",
    borderRadius: 100,
  },
})

export default OutputScreen
