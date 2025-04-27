import type React from "react"
import { View, Text, StyleSheet } from "react-native"

const Header: React.FC = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>AI Logo</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 15,
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
})

export default Header
