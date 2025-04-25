"use client";
import { useState, useEffect } from "react";
import { videos, type Video } from "@/utils/videos";
import { useWatchProgress } from "@/hooks/use-watch-progress";
import VideoCard from "./video-card";
import VideoPlayer from "./Video-Player";
import CourseDetails from "./course-details";

const VideoList = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const { watchProgress, updateProgress, getVideoProgress } =
    useWatchProgress();

  const [prevWatchedStatus, setPrevWatchedStatus] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const currentWatchedStatus: { [key: string]: boolean } = {};

    Object.entries(watchProgress).forEach(([videoId, progress]) => {
      if (progress.isWatched && !prevWatchedStatus[videoId]) {
        const watchedVideo = videos.find((v) => v.id === videoId);
      }
      currentWatchedStatus[videoId] = progress.isWatched;
    });

    setPrevWatchedStatus(currentWatchedStatus);
  }, [watchProgress]);

  const handleSelectVideo = (video: Video) => {
    setSelectedVideo(video);
  };

  const handleProgress = (progress: number) => {
    if (selectedVideo) {
      updateProgress(
        selectedVideo.id,
        progress * selectedVideo.duration,
        selectedVideo.duration
      );
    }
  };

  const handleVideoEnded = () => {
    if (selectedVideo) {
      updateProgress(
        selectedVideo.id,
        selectedVideo.duration,
        selectedVideo.duration
      );
      const currentIndex = videos.findIndex((v) => v.id === selectedVideo.id);

      if (currentIndex !== -1 && currentIndex < videos.length - 1) {
        const nextVideo = videos[currentIndex + 1];
        setSelectedVideo(nextVideo);
      }
    }
  };

  const watchedCount = Object.values(watchProgress).filter(
    (progress) => progress.isWatched
  ).length;

  const watchedPercentage =
    videos.length > 0 ? (watchedCount / videos.length) * 100 : 0;

  return (
    <div className=" mx-auto py-4 sm:py-2  sm:px-6 px-2  w-full">
      <div className="grid grid-cols-1  lg:grid-cols-3 gap-4 sm:gap-6 ">
        <div className="col-span-1 lg:col-span-2 order-2 lg:order-2 space-y-16 ">
          {selectedVideo ? (
            <VideoPlayer
              video={selectedVideo}
              onProgress={handleProgress}
              startPosition={
                getVideoProgress(selectedVideo.id).lastPosition /
                selectedVideo.duration
              }
              onEnded={handleVideoEnded}
            />
          ) : (
            <div className="bg-muted rounded-lg aspect-video flex items-center justify-center">
              <div className="text-center p-6">
                <h3 className="text-xl font-medium mb-2">No Video Selected</h3>
                <p className="text-muted-foreground">
                  Select a video from the list to start watching
                </p>
              </div>
            </div>
          )}

          <CourseDetails />
        </div>

        <div className="col-span-1 order-2 lg:order-2 mb-4 lg:mb-0 flex flex-col justify-start items-center px-1 sm:px-8">
          <h2 className="font-medium text-xl mb-3  flex  w-full ">
            Topics for This Course
          </h2>
          <div className=" relative w-full py-8 my-4 mb-16">
            {watchedPercentage > 0 && (
              <>
                <div className="absolute bottom-0 left-0 h-1 bg-gray-200 w-[90%] z-0"></div>
                <div
                  className="absolute bottom-0 left-0 h-1 bg-green-500 z-10"
                  style={{ width: `${watchedPercentage}%` }}
                />

                <div
                  className="absolute -top-2 flex flex-col items-center transition-all duration-300"
                  style={{ left: `calc(${watchedPercentage}% - 16px)` }} // Adjusted for circle width
                >
                  <div className="w-10 h-10 rounded-full  border-1 text-xs text-black font-semibold flex items-center justify-center mb-1 ">
                    You
                  </div>

                  <div className="text-gray-400 text-xs leading-none">▼</div>
                </div>
                <div
                  className="absolute top-18 flex flex-col items-center transition-all duration-300"
                  style={{ left: `calc(${watchedPercentage}% - 16px)` }} // Adjusted for circle width
                >
                  {watchedPercentage.toFixed(0)}%
                </div>
              </>
            )}
          </div>
          <div className="flex flex-col space-y-4 w-full   items-center sm:items-start">
            <div className="border-gray-300 border-1 px-4 py-8 w-full sm:w-[90%]">
              <div className="flex flex-col border-b-1 py-2 space-y-1">
                <h1 className="text-lg">Weak 1-4</h1>
                <p className="text-gray-500 text-sm">
                  {" "}
                  Advanced story telling techniques for writers: Personas,
                  Characters & Plots
                </p>
              </div>
              <div className="  pb-4 pr-0  ">
                {videos.map((video) => {
                  const progress = getVideoProgress(video.id);
                  return (
                    <VideoCard
                      key={video.id}
                      video={video}
                      isSelected={selectedVideo?.id === video.id}
                      isWatched={progress.isWatched}
                      progressPercentage={progress.progress}
                      onClick={() => handleSelectVideo(video)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoList;
