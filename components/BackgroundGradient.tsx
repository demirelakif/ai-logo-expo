import React from "react"
import { StyleSheet, View } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

const BackgroundGradient: React.FC = () => {
  return (
    <LinearGradient
    colors={["#943DFF", "#2938DC"]}
    locations={[0.25, 1]}
    start={{ x: 0, y: 1 }}
    end={{ x: 1, y: 0 }}
    style={styles.gradientOverlay}
    pointerEvents="none"
  />
  )
}

const styles = StyleSheet.create({
  gradientOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 12,
    opacity: 0.05,
    pointerEvents: "none",
  },
})

export default BackgroundGradient
