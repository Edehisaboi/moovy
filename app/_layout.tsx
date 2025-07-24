import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { VideoProvider } from "@/context/VideoContext";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function RootLayoutInner() {
  const { colors, theme } = useTheme();

  useEffect(() => {
    // Hide splash screen after resources are loaded
    SplashScreen.hideAsync();
  }, []);

  return (
    <>
      <StatusBar
        style={theme === "dark" ? "light" : "dark"}
        backgroundColor={colors.background}
      />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: "bold",
          },
          contentStyle: {
            backgroundColor: colors.background,
          },
          animation: "slide_from_bottom",
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            headerBackButtonDisplayMode: "minimal",
          }}
        />
        <Stack.Screen
          name="camera"
          options={{
            title: "Record Video",
            headerShown: false,
            presentation: "fullScreenModal",
            headerBackButtonDisplayMode: "minimal",
          }}
        />
        <Stack.Screen
          name="processing"
          options={{
            title: "Identifying...",
            headerShown: false,
            presentation: "modal",
            headerBackButtonDisplayMode: "minimal",
          }}
        />
        <Stack.Screen
          name="results"
          options={{
            title: "Video Found",
            headerShown: false,
            presentation: "modal",
            headerBackButtonDisplayMode: "minimal",
          }}
        />
        <Stack.Screen
          name="history"
          options={{
            title: "History",
            headerShown: false,
            headerBackButtonDisplayMode: "minimal",
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            title: "Settings",
            headerShown: true,
            headerBackButtonDisplayMode: "minimal",
          }}
        />
        <Stack.Screen
          name="welcome"
          options={{
            title: "Welcome to Moovy",
            headerShown: false,
            presentation: "modal",
            headerBackButtonDisplayMode: "minimal",
          }}
        />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <VideoProvider>
        <RootLayoutInner />
      </VideoProvider>
    </ThemeProvider>
  );
}
