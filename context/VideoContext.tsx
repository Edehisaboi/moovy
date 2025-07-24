import { VideoResult } from "@/types";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface VideoContextType {
  history: VideoResult[];
  current: VideoResult | null;
  isIdentifying: boolean;
  progress: number;
  identifyVideo: (
    videoData: any,
    source: "camera" | "screen"
  ) => Promise<VideoResult | null>;
  clearHistory: () => void;
  setCurrent: (video: VideoResult | null) => void;
  addToHistory: (video: VideoResult) => void;
  setProgress: (progress: number) => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider = ({ children }: { children: ReactNode }) => {
  const [history, setHistory] = useState<VideoResult[]>([]);
  const [current, setCurrent] = useState<VideoResult | null>(null);
  const [isIdentifying, setIsIdentifying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Placeholder for real API call
  const identifyVideo = async (
    videoData: any,
    source: "camera" | "screen"
  ): Promise<VideoResult | null> => {
    setIsIdentifying(true);
    setProgress(0);
    try {
      // TODO: Implement real video identification API call here.
      // Update progress as needed based on API response/events.
      // On success, setCurrent(result) and addToHistory(result).
      // Return the identified VideoResult.
      return null;
    } catch (e) {
      return null;
    } finally {
      setIsIdentifying(false);
      setProgress(0);
    }
  };

  const clearHistory = () => setHistory([]);
  const addToHistory = (video: VideoResult) =>
    setHistory((prev) => [video, ...prev]);

  return (
    <VideoContext.Provider
      value={{
        history,
        current,
        isIdentifying,
        progress,
        identifyVideo,
        clearHistory,
        setCurrent,
        addToHistory,
        setProgress,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => {
  const ctx = useContext(VideoContext);
  if (!ctx) throw new Error("useVideo must be used within VideoProvider");
  return ctx;
};
