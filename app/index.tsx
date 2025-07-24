import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Card from "../components/Card";
import IconButton from "../components/IconButton";
import type { ThemeColors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import { useTheme } from "@/context/ThemeContext";

// Mock history data (sync with app/history.tsx)
const mockHistory = [
  { id: "1" },
  { id: "2" },
  { id: "3" },
  // ...add up to 50 for demo
];
while (mockHistory.length < 50)
  mockHistory.push({ id: String(mockHistory.length + 1) });

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const { colors } = useTheme();

  const handleIdentifyVideo = () => {
    router.push("/camera");
  };

  const handleHistory = () => {
    router.push("/history");
  };

  const handleSettings = () => {
    router.push("/settings");
  };

  // const handleWelcome = () => {
  //   router.push("/welcome");
  // };

  const handleCancelSearch = () => {
    setSearch("");
    setIsFocused(false);
    Keyboard.dismiss();
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  // Method for handling search submissions
  const handleSearch = () => {
    console.log("Search submitted:", search);
    // Add your search logic here (e.g., filter videos, call API, etc.)
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <LinearGradient
        colors={colors.backgroundGradient}
        style={styles(colors).container}
      >
        <StatusBar style="light" />
        {/* Header with search bar and icons */}
        <View style={styles(colors).headerContainer}>
          <Card style={styles(colors).searchBarCard} padding="small">
            <View style={styles(colors).searchBarRow}>
              <Ionicons
                name="search"
                size={20}
                color={colors.textSecondary}
                style={{ marginRight: 8 }}
              />
              <TextInput
                ref={inputRef}
                style={styles(colors).searchInput}
                placeholder="Search movies..."
                placeholderTextColor={colors.textSecondary}
                value={search}
                onChangeText={setSearch}
                onFocus={handleFocus}
                onBlur={handleBlur}
                returnKeyType="search"
                underlineColorAndroid="transparent"
                onSubmitEditing={handleSearch}
              />
              {isFocused || search.length > 0 ? (
                <TouchableOpacity
                  onPress={handleCancelSearch}
                  style={styles(colors).cancelButton}
                >
                  <Text style={styles(colors).cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </Card>
          <View style={styles(colors).headerIcons}>
            <IconButton
              icon="settings-outline"
              onPress={handleSettings}
              style={styles(colors).headerIconButton}
            />
          </View>
        </View>

        {/* Main Content */}
        <View style={styles(colors).content}>
          {/* Main Button */}
          <View style={styles(colors).buttonContainer}>
            <TouchableOpacity
              style={styles(colors).mainButton}
              onPress={handleIdentifyVideo}
              activeOpacity={0.8}
            >
              <Ionicons name="videocam" size={48} color={colors.background} />
            </TouchableOpacity>
          </View>
          {/* Tagline */}
          <Text style={styles(colors).tagline}>
            Identify any video clip instantly
          </Text>
        </View>

        {/* Bottom Dock */}
        <View style={styles(colors).dockContainer}>
          <Card style={styles(colors).dockCard} padding="small">
            <View style={styles(colors).dockRow}>
              <View style={styles(colors).dockLeft}>
                <Text style={styles(colors).dockTitle}>My Videos</Text>
                <Text style={styles(colors).dockSubtitle}>
                  {mockHistory.length} videos
                </Text>
              </View>
              <IconButton icon="time-outline" onPress={handleHistory} />
            </View>
          </Card>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: Layout.spacing.lg,
      paddingTop: Layout.spacing.xxl,
      marginBottom: Layout.spacing.lg,
    },
    searchBarCard: {
      flex: 1,
      backgroundColor: colors.surfaceLight,
      marginRight: Layout.spacing.md,
      minHeight: 44,
      justifyContent: "center",
    },
    searchBarRow: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
    },
    searchInput: {
      flex: 1,
      color: colors.text,
      fontSize: 16,
      paddingVertical: 4,
      backgroundColor: "transparent",
      minHeight: 36,
    },
    cancelButton: {
      marginLeft: Layout.spacing.md,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    cancelButtonText: {
      color: colors.primary,
      fontSize: 16,
      fontWeight: "600",
    },
    headerIcons: {
      flexDirection: "row",
      alignItems: "center",
      gap: 0,
    },
    headerIconButton: {
      marginLeft: 4,
    },
    content: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: Layout.spacing.lg,
    },
    buttonContainer: {
      position: "relative",
      marginBottom: Layout.spacing.xxl,
    },
    mainButton: {
      width: 160,
      height: 160,
      borderRadius: 80,
      backgroundColor: colors.primary,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
    },
    tagline: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
      textAlign: "center",
      marginBottom: Layout.spacing.lg,
    },
    dockContainer: {
      paddingHorizontal: Layout.spacing.lg,
      paddingBottom: Layout.spacing.xl,
      backgroundColor: "transparent",
    },
    dockCard: {
      backgroundColor: colors.surface,
      borderRadius: Layout.borderRadius.lg,
    },
    dockRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: Layout.spacing.md,
      paddingHorizontal: Layout.spacing.lg,
    },
    dockLeft: {
      flexDirection: "column",
    },
    dockTitle: {
      color: colors.text,
      fontSize: 18,
      fontWeight: "bold",
    },
    dockSubtitle: {
      color: colors.textSecondary,
      fontSize: 14,
      marginTop: 2,
    },
  });
