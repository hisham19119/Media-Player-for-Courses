"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { type Video } from "@/utils/videos";
import ReactPlayer from "react-player";
import { cn } from "@/lib/utils";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import {
  CheckCircle,
  Maximize,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useWatchProgress } from "@/hooks/use-watch-progress";

interface VideoPlayerProps {
  video: Video;
  onProgress: (progress: number) => void;
  startPosition?: number;
  onEnded?: () => void;
}

const VideoPlayer = ({
  video,
  onProgress,
  startPosition = 0,
  onEnded,
}: VideoPlayerProps) => {
  const {
    watchProgress,
    updateProgress,
    getVideoProgress,

    resetProgress,
    resetAllProgress,
  } = useWatchProgress();
  const playerRef = useRef<ReactPlayer | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [played, setPlayed] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [duration, setDuration] = useState(0);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isWatched, setIsWatched] = useState(false);

  useEffect(() => {
    if (played >= 0.8) {
      setIsWatched(true);
    }
  }, [played]);

  const handleEnded = () => {
    setIsWatched(true);
    onEnded?.();
  };

  useEffect(() => {
    if (playerRef.current && startPosition > 0) {
      playerRef.current.seekTo(startPosition, "fraction");
      setPlayed(startPosition);
    }
  }, [startPosition, video]);

  useEffect(() => {
    setPlaying(false);
    setPlayed(0);
    setLoaded(0);
  }, [video]);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    if (value === 0) {
      setMuted(true);
    } else {
      setMuted(false);
    }
  };

  const handleMuteToggle = () => {
    setMuted(!muted);
  };

  const handleProgress = (state: { played: number; loaded: number }) => {
    if (!seeking) {
      setPlayed(state.played);
      setLoaded(state.loaded);
      onProgress(state.played);
    }
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setPlayed(value);
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
    setPlaying(false);
  };

  const handleSeekMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    setSeeking(false);
    setPlaying(true);
    playerRef.current?.seekTo(parseFloat((e.target as HTMLInputElement).value));
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const formatTime = (seconds: number) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, "0");

    if (hh) {
      return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
    }

    return `${mm}:${ss}`;
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement && playerContainerRef.current) {
      playerContainerRef.current
        .requestFullscreen()
        .then(() => {
          setIsFullScreen(true);
        })
        .catch((err) => {
          console.error(
            `Error attempting to enable full-screen mode: ${err.message}`
          );
        });
    } else {
      if (document.exitFullscreen) {
        document
          .exitFullscreen()
          .then(() => {
            setIsFullScreen(false);
          })
          .catch((err) => {
            console.error(
              `Error attempting to exit full-screen mode: ${err.message}`
            );
          });
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <Card className="overflow-hidden outline-0 border-0 pt-0 ">
      <div
        ref={playerContainerRef}
        className={cn(
          "group relative w-full aspect-video bg-black",
          isFullScreen ? "fixed inset-0 z-50" : ""
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <ReactPlayer
            ref={playerRef}
            url={video.url}
            width="100%"
            height="100%"
            playing={playing}
            muted={muted}
            volume={volume}
            onProgress={handleProgress}
            onDuration={handleDuration}
            onEnded={handleEnded}
            progressInterval={500}
            style={{ position: "absolute", top: 0, left: 0 }}
            config={{
              youtube: {
                playerVars: { disablekb: 1 },
              },
            }}
          />
        </div>

        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3",
            "transition-opacity duration-300",
            !playing && "opacity-100",
            playing && "opacity-0 group-hover:opacity-100"
          )}
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-white text-xs">
                {formatTime(duration * played)} / {formatTime(duration)}
              </span>
              <div className="flex-1 relative">
                <Progress value={loaded * 100} className="h-1 bg-white/30" />
                <input
                  type="range"
                  min={0}
                  max={0.999999}
                  step="any"
                  value={played}
                  onMouseDown={handleSeekMouseDown}
                  onChange={handleSeekChange}
                  onMouseUp={handleSeekMouseUp}
                  className="absolute inset-0 w-full h-1 opacity-0 cursor-pointer"
                />
                <div
                  className="absolute top-0 left-0 h-1 bg-primary"
                  style={{ width: `${played * 100}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:text-white hover:bg-white/20"
                  onClick={handlePlayPause}
                >
                  {playing ? <Pause size={18} /> : <Play size={18} />}
                </Button>

                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white hover:text-white hover:bg-white/20"
                    onClick={handleMuteToggle}
                  >
                    {muted || volume === 0 ? (
                      <VolumeX size={18} />
                    ) : (
                      <Volume2 size={18} />
                    )}
                  </Button>

                  <input
                    type="range"
                    min={0}
                    max={1}
                    step="any"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-16 h-1.5 bg-white/30 rounded-full appearance-none cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:text-white hover:bg-white/20"
                  onClick={toggleFullScreen}
                >
                  <Maximize size={18} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-4  pt-0 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-600">{video.title}</h2>
        <Button
          disabled={!isWatched}
          onClick={() => {
            if (isWatched) {
              onEnded?.();
            }
          }}
          className={cn(
            "transition-colors cursor-pointer",
            !isWatched && "opacity-50 cursor-not-allowed"
          )}
        >
          Next Video
        </Button>
      </CardContent>
    </Card>
  );
};

export default VideoPlayer;
