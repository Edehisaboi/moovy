import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { Button, IconButton, VideoResultCard } from "../components";
import { Layout } from "@/constants/Layout";
import { useTheme } from "@/context/ThemeContext";
import { HistoryItem } from "@/types";

// const { width } = Dimensions.get("window");

// Mock history data
const mockHistory: HistoryItem[] = [
  {
    id: "1",
    videoResult: {
      id: "1",
      title: "The Matrix",
      posterUrl:
        "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
      year: 1999,
      director: "Lana Wachowski, Lilly Wachowski",
      genre: "Sci-Fi, Action",
      description:
        "A computer programmer discovers a mysterious world of digital reality.",
      trailerUrl: "https://www.youtube.com/watch?v=m8e-FF8MsqU",
      imdbRating: 8.7,
      duration: "2h 16m",
      identifiedAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      source: "camera",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: "2",
    videoResult: {
      id: "2",
      title: "Inception",
      posterUrl:
        "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
      year: 2010,
      director: "Christopher Nolan",
      genre: "Sci-Fi, Thriller",
      description:
        "A thief who steals corporate secrets through dream-sharing technology.",
      trailerUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0",
      imdbRating: 8.8,
      duration: "2h 28m",
      identifiedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      source: "screen",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: "3",
    videoResult: {
      id: "3",
      title: "Interstellar",
      posterUrl:
        "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      year: 2014,
      director: "Christopher Nolan",
      genre: "Sci-Fi, Drama",
      description: "A team of explorers travel through a wormhole in space.",
      trailerUrl: "https://www.youtube.com/watch?v=2LqzF5WauAw",
      imdbRating: 8.6,
      duration: "2h 49m",
      identifiedAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      source: "camera",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
];

export default function HistoryScreen() {
  const [history, setHistory] = useState<HistoryItem[]>(mockHistory);
  const { colors } = useTheme();

  const handleItemPress = (item: HistoryItem) => {
    router.push({
      pathname: "/results",
      params: { videoResult: JSON.stringify(item.videoResult) },
    });
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleBack = () => {
    router.back();
  };

  const handleStartIdentifying = () => {
    router.push("/");
  };

  const renderHistoryItem = ({ item }: { item: HistoryItem }) => (
    <VideoResultCard
      video={item.videoResult}
      variant="compact"
      showActions={false}
      onPress={() => handleItemPress(item)}
    />
  );

  return (
    <LinearGradient
      colors={colors.backgroundGradient}
      style={styles(colors).container}
    >
      {/* Header */}
      <View style={styles(colors).header}>
        <IconButton icon="arrow-back" onPress={handleBack} variant="default" />
        <Text style={styles(colors).title}>History</Text>
        <IconButton
          icon="trash"
          onPress={handleClearHistory}
          variant="secondary"
        />
      </View>

      {/* Content */}
      {history.length === 0 ? (
        <View style={styles(colors).emptyState}>
          <Ionicons name="time-outline" size={64} color={colors.textMuted} />
          <Text style={styles(colors).emptyTitle}>No History Yet</Text>
          <Text style={styles(colors).emptySubtitle}>
            Your identified videos will appear here
          </Text>
          <Button
            title="Start Identifying"
            onPress={handleStartIdentifying}
            icon="videocam"
            size="large"
          />
        </View>
      ) : (
        <FlatList
          data={history}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles(colors).listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </LinearGradient>
  );
}

const styles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: Layout.spacing.lg,
      paddingTop: Layout.spacing.xxl,
      paddingBottom: Layout.spacing.md,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: colors.text,
      textAlign: "center",
      flex: 1,
    },
    clearButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.overlayLight,
      justifyContent: "center",
      alignItems: "center",
    },
    listContainer: {
      paddingHorizontal: Layout.spacing.lg,
      paddingBottom: Layout.spacing.xl,
    },
    historyItem: {
      flexDirection: "row",
      backgroundColor: colors.surface,
      borderRadius: Layout.borderRadius.lg,
      padding: Layout.spacing.md,
      marginBottom: Layout.spacing.md,
    },
    thumbnail: {
      width: 60,
      height: 80,
      borderRadius: Layout.borderRadius.md,
      backgroundColor: colors.surfaceLight,
      marginRight: Layout.spacing.md,
      position: "relative",
      overflow: "hidden",
    },
    thumbnailPlaceholder: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    sourceBadge: {
      position: "absolute",
      top: 4,
      right: 4,
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: colors.primary,
      justifyContent: "center",
      alignItems: "center",
    },
    itemContent: {
      flex: 1,
      justifyContent: "space-between",
    },
    itemTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
      marginBottom: Layout.spacing.xs,
    },
    itemDetails: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: Layout.spacing.xs,
    },
    itemYear: {
      fontSize: 14,
      color: colors.textSecondary,
      marginRight: Layout.spacing.sm,
    },
    itemGenre: {
      fontSize: 14,
      color: colors.textSecondary,
      flex: 1,
    },
    itemTime: {
      fontSize: 12,
      color: colors.textMuted,
    },
    arrowContainer: {
      justifyContent: "center",
      alignItems: "center",
      width: 24,
    },
    emptyState: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: Layout.spacing.lg,
    },
    emptyTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
      marginTop: Layout.spacing.lg,
      marginBottom: Layout.spacing.sm,
    },
    emptySubtitle: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: "center",
      marginBottom: Layout.spacing.xl,
      lineHeight: 24,
    },
    identifyButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: Layout.spacing.lg,
      paddingVertical: Layout.spacing.md,
      borderRadius: Layout.borderRadius.lg,
    },
    identifyButtonText: {
      color: colors.background,
      fontSize: 16,
      fontWeight: "bold",
    },
  });
