import { useState, useEffect } from "react";
import type { Video } from "@/utils/videos";

interface WatchProgress {
  [videoId: string]: {
    progress: number;
    isWatched: boolean;
    lastPosition: number;
    lastWatched: string; // ISO date string
  };
}

export const useWatchProgress = () => {
  const [watchProgress, setWatchProgress] = useState<WatchProgress>({});
  const WATCHED_THRESHOLD = 0.8; // 80%

  useEffect(() => {
    const savedProgress = localStorage.getItem("videoWatchProgress");
    if (savedProgress) {
      try {
        setWatchProgress(JSON.parse(savedProgress));
      } catch (error) {
        console.error(
          "Failed to parse watch progress from localStorage:",
          error
        );
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("videoWatchProgress", JSON.stringify(watchProgress));
  }, [watchProgress]);

  const updateProgress = (
    videoId: string,
    playedSeconds: number,
    duration: number
  ) => {
    const progressPercentage = playedSeconds / duration;
    const isWatched = progressPercentage >= WATCHED_THRESHOLD;

    setWatchProgress((prev) => ({
      ...prev,
      [videoId]: {
        progress: progressPercentage,
        isWatched,
        lastPosition: playedSeconds,
        lastWatched: new Date().toISOString(),
      },
    }));
  };

  const getVideoProgress = (videoId: string) => {
    return (
      watchProgress[videoId] || {
        progress: 0,
        isWatched: false,
        lastPosition: 0,
        lastWatched: "",
      }
    );
  };

  const resetProgress = (videoId: string) => {
    setWatchProgress((prev) => {
      const updated = { ...prev };
      delete updated[videoId];
      return updated;
    });
  };
  const resetAllProgress = () => {
    setWatchProgress({});
    localStorage.removeItem("videoWatchProgress");
  };

  return {
    watchProgress,
    updateProgress,
    getVideoProgress,
    resetProgress,
    resetAllProgress,
  };
};
