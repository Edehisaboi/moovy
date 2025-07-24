import { Ionicons } from "@expo/vector-icons";
import {
  CameraMode,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { ThemeColors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import { useTheme } from "@/context/ThemeContext";

// const { width, height } = Dimensions.get("window");

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [mode, setMode] = useState<CameraMode>("video");
  const [facing, setFacing] = useState<CameraType>("back");
  const cameraRef = useRef<CameraView>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { colors } = useTheme();

  const timerAnimation = useSharedValue(0);
  const frameAnimation = useSharedValue(0);

  useEffect(() => {
    if (isRecording) {
      // Start timer animation
      timerAnimation.value = withRepeat(
        withTiming(1, { duration: 1000 }),
        -1,
        false
      );

      // Start frame animation
      frameAnimation.value = withRepeat(
        withTiming(1, { duration: 2000 }),
        -1,
        true
      );

      // Start recording timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= 15) {
            stopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      // Stop animations
      timerAnimation.value = withTiming(0);
      frameAnimation.value = withTiming(0);

      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [isRecording]);

  const startRecording = async () => {
    try {
      setIsRecording(true);
      setRecordingTime(0);

      // Start recording
      const video = await cameraRef.current?.recordAsync({
        maxDuration: 15,
      });

      console.log("Video recorded:", video);

      // Navigate to processing after recording
      setTimeout(() => {
        router.push({
          pathname: "/processing",
          params: { source: "camera" },
        });
      }, 1000);
    } catch (error) {
      console.error("Error recording video:", error);
      Alert.alert("Error", "Failed to record video. Please try again.");
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (isRecording) {
      setIsRecording(false);

      // Stop recording
      cameraRef.current?.stopRecording();
    }
  };

  const handleClose = () => {
    if (isRecording) {
      stopRecording();
    }
    router.back();
  };

  const toggleFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  const timerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(timerAnimation.value, [0, 1], [1, 0.5]);
    return { opacity };
  });

  const frameStyle = useAnimatedStyle(() => {
    const scale = interpolate(frameAnimation.value, [0, 1], [1, 1.02]);
    const opacity = interpolate(frameAnimation.value, [0, 1], [0.3, 0.6]);
    return {
      transform: [{ scale }],
      opacity,
    };
  });

  // Handle permission states
  if (!permission) {
    return (
      <View style={styles(colors).container}>
        <Text style={styles(colors).loadingText}>
          Requesting camera permission...
        </Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles(colors).container}>
        <Text style={styles(colors).errorText}>
          Camera permission is required
        </Text>
        <TouchableOpacity
          style={styles(colors).button}
          onPress={requestPermission}
        >
          <Text style={styles(colors).buttonText}>Grant Permission</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles(colors).button, styles(colors).secondaryButton]}
          onPress={handleClose}
        >
          <Text style={styles(colors).secondaryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles(colors).container}>
      {/* Camera View - No children */}
      <CameraView
        ref={cameraRef}
        style={styles(colors).camera}
        mode={mode}
        facing={facing}
        mute={false}
        responsiveOrientationWhenOrientationLocked
      />

      {/* Overlay - Positioned absolutely */}
      <View style={styles(colors).overlay}>
        {/* Header */}
        <View style={styles(colors).header}>
          <TouchableOpacity
            style={styles(colors).closeButton}
            onPress={handleClose}
          >
            <Ionicons name="close" size={24} color={colors.text} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles(colors).flipButton}
            onPress={toggleFacing}
          >
            <Ionicons name="camera-reverse" size={24} color={colors.text} />
          </TouchableOpacity>

          {isRecording && (
            <Animated.View style={[styles(colors).timerContainer, timerStyle]}>
              <Text style={styles(colors).timerText}>
                {15 - recordingTime}s
              </Text>
            </Animated.View>
          )}
        </View>

        {/* Camera Frame */}
        <View style={styles(colors).frameContainer}>
          <Animated.View style={[styles(colors).cameraFrame, frameStyle]} />
          <Text style={styles(colors).instructionText}>
            {isRecording
              ? "Recording... Hold steady"
              : "Point your camera at the video and hold steady"}
          </Text>
        </View>

        {/* Controls */}
        <View style={styles(colors).controls}>
          {!isRecording ? (
            <TouchableOpacity
              style={styles(colors).recordButton}
              onPress={startRecording}
            >
              <Ionicons name="videocam" size={32} color={colors.background} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles(colors).stopButton}
              onPress={stopRecording}
            >
              <View style={styles(colors).stopIcon} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    camera: {
      flex: 1,
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "transparent",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: Layout.spacing.lg,
      paddingTop: Layout.spacing.xl,
      paddingBottom: Layout.spacing.md,
    },
    closeButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.overlayLight,
      justifyContent: "center",
      alignItems: "center",
    },
    flipButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.overlayLight,
      justifyContent: "center",
      alignItems: "center",
    },
    timerContainer: {
      backgroundColor: colors.error,
      paddingHorizontal: Layout.spacing.md,
      paddingVertical: Layout.spacing.sm,
      borderRadius: Layout.borderRadius.md,
    },
    timerText: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "bold",
    },
    frameContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: Layout.spacing.lg,
    },
    cameraFrame: {
      width: Layout.cameraFrame.width,
      height: Layout.cameraFrame.height,
      borderWidth: 2,
      borderColor: colors.primary,
      borderRadius: Layout.cameraFrame.borderRadius,
      marginBottom: Layout.spacing.lg,
    },
    instructionText: {
      color: colors.text,
      fontSize: 16,
      textAlign: "center",
      backgroundColor: colors.overlayLight,
      paddingHorizontal: Layout.spacing.lg,
      paddingVertical: Layout.spacing.md,
      borderRadius: Layout.borderRadius.md,
    },
    controls: {
      paddingBottom: Layout.spacing.xl,
      alignItems: "center",
    },
    recordButton: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.primary,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: colors.primary,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    stopButton: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.error,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: colors.error,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    stopIcon: {
      width: 24,
      height: 24,
      backgroundColor: colors.text,
      borderRadius: 2,
    },
    loadingText: {
      color: colors.text,
      fontSize: 18,
      textAlign: "center",
      marginTop: Layout.spacing.xxl,
    },
    errorText: {
      color: colors.error,
      fontSize: 18,
      textAlign: "center",
      marginTop: Layout.spacing.xxl,
      marginBottom: Layout.spacing.lg,
    },
    button: {
      backgroundColor: colors.primary,
      paddingHorizontal: Layout.spacing.lg,
      paddingVertical: Layout.spacing.md,
      borderRadius: Layout.borderRadius.md,
      marginTop: Layout.spacing.lg,
      alignSelf: "center",
    },
    secondaryButton: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.primary,
    },
    buttonText: {
      color: colors.background,
      fontSize: 16,
      fontWeight: "bold",
    },
    secondaryButtonText: {
      color: colors.primary,
      fontSize: 16,
      fontWeight: "600",
    },
  });
