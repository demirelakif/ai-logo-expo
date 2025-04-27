import { Feather } from "@expo/vector-icons";
import type React from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";


interface LogoStylesProps {
  selectedStyle: string;
  onSelectStyle: (style: string) => void;
  disabled?: boolean;
}
interface StyleOption {
  name: string;
  image?: any;  // image is optional for "No Style"
}

const LogoStyles: React.FC<LogoStylesProps> = ({ 
  selectedStyle, 
  onSelectStyle,
  disabled = false
}) => {

  const styleOptions: StyleOption[] = [
    {
      name: "No Style",
    },
    {
      name: "Monogram",
      image: require("../assets/images/monogram.png"),
    },
    {
      name: "Abstract",
      image: require("../assets/images/abstract.png"),
    },
    {
      name: "Mascot",
      image: require("../assets/images/mascot.png"),
    },
  ];
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logo Styles</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {styleOptions.map((style) => (
          <TouchableOpacity
            key={style.name}
            style={styles.styleItem}
            disabled={disabled}
            onPress={() => !disabled && onSelectStyle(style.name)}
          >
            <View
              style={[
                styles.imageWrapper,
                selectedStyle === style.name && styles.selectedImageWrapper,
              ]}
            >
              {style.name === "No Style" ? (
                <Feather name="slash" size={24} color="white" style={styles.noStyleIcon} />
              ) : (
                <Image
                  source={style.image}
                  style={styles.styleImage}
                  resizeMode="cover"
                />
              )}
            </View>
            <Text
              style={[
                styles.styleName,
                selectedStyle === style.name && styles.selectedName,
              ]}
            >
              {style.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FAFAFA",
    marginBottom: 12,
    fontFamily: "Manrope",
  },
  scrollContent: {
    paddingLeft: 0,
    paddingRight: 12,
  },
  styleItem: {
    width: 90,
    height: 114,
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    marginRight: 12,
  },
  imageWrapper: {
    width: 90,
    height: 90,
    borderRadius: 14,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedImageWrapper: {
    borderWidth: 2,
    borderColor: "#FAFAFA",
    borderRadius: 16,
  },
  styleImage: {
    width: "100%",
    height: "100%",
  },
  noStyleIcon: {
    fontSize: 40,
  },
  styleName: {
    fontSize: 13,
    fontWeight: "400",
    color: "#71717A",
    textAlign: "center",
    fontFamily: "Manrope",
  },
  selectedName: {
    color: "#FAFAFA",
    fontWeight: "700",
  },
});

export default LogoStyles;
