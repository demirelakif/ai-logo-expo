import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";

interface StatusIndicatorProps {
  prompt: string;
  style: string;
  setSeeDesign: (value: boolean) => void;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  prompt,
  style,
  setSeeDesign,
}) => {
  const [status, setStatus] = useState<"processing" | "done">("processing");
  const [docId, setDocId] = useState<string | null>(null);
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();

    // Save the prompt to Firestore
    const savePrompt = async () => {
      try {
        const docRef = await addDoc(collection(db, "designs"), {
          prompt,
          style,
          status: "processing",
          createdAt: new Date(),
        });
        setDocId(docRef.id);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    };

    savePrompt();

    const delay = Math.floor(Math.random() * (60000 - 30000 + 1)) + 10000;

    const timer = setTimeout(() => {
      setStatus("done");

      // Update the status in Firestore
      if (docId) {
        updateDoc(doc(db, "designs", docId), {
          status: "done",
          completedAt: new Date(),
        });
      }
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  const handlePress = () => {
    if (status === "done") {
      setSeeDesign(true);
    }
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.leftContainer}>
        {status === "processing" ? (
          <ActivityIndicator size="large" color="#FFFFFF" />
        ) : (
          <Image
            style={styles.imagePreview}
            source={require("../assets/images/preview.png")}
          />
        )}
      </View>

      <TouchableOpacity
        activeOpacity={status === "done" ? 0.7 : 1}
        onPress={handlePress}
        disabled={status === "processing"}
        style={styles.rightContainer}
      >
        <LinearGradient
          colors={
            status === "done"
              ? ["#943DFF", "#2938DC"]
              : ["rgba(148, 61, 255, 0.05)", "rgba(41, 56, 220, 0.05)"]
          }
          locations={[0.25, 1]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={styles.gradient}
        >
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              {status === "processing"
                ? "Creating Your Design..."
                : "Your Design is Ready!"}
            </Text>
            <Text
              style={[
                styles.subtitle,
                status === "done"
                  ? styles.subtitleDone
                  : styles.subtitleProcessing,
              ]}
            >
              {status === "processing"
                ? "Ready in 2 minutes"
                : "Tap to see it."}
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: 342,
    height: 70,
    borderRadius: 16,
    overflow: "hidden",
    marginVertical: 20,
  },
  leftContainer: {
    width: 70,
    height: 70,
    backgroundColor: "#18181B",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  imagePreview: {
    width: 70,
    height: 70,
    backgroundColor: "#27272A",
    borderRadius: 16,
    borderTopRightRadius:0,
    borderBottomRightRadius: 0,
  },
  rightContainer: {
    flex: 1,
    height: 70,
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 12,
    justifyContent: "center",
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  textContainer: {
    flexDirection: "column",
    justifyContent: "center",
    gap: 2,
  },
  title: {
    fontFamily: "Manrope",
    fontWeight: "800",
    fontSize: 16,
    lineHeight: 21,
    color: "#FAFAFA",
  },
  subtitle: {
    fontFamily: "Manrope",
    fontWeight: "500",
    fontSize: 13,
    lineHeight: 18,
  },
  subtitleProcessing: {
    color: "#71717A",
  },
  subtitleDone: {
    color: "#D4D4D8",
  },
});

export default StatusIndicator;
