import { useState } from "react";
import { Video } from "@/utils/videos";
import { CheckCircle, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoCardProps {
  video: Video;
  isSelected: boolean;
  isWatched: boolean;
  progressPercentage: number;
  onClick: () => void;
}

const VideoCard = ({
  video,
  isSelected,
  isWatched,
  progressPercentage,
  onClick,
}: VideoCardProps) => {
  const [isHovering, setIsHovering] = useState(false);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={cn(
        "relative  cursor-pointer transition-all duration-200 transform hover:scale-[1.02] hover:shadow-md",
        isSelected && "border-1  shadow-md"
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative w-full">
        {isWatched && (
          <div className="absolute top-4 right-16 bg-green-500 text-white p-1 rounded-full">
            <CheckCircle size={16} />
          </div>
        )}

        {isHovering && (
          <div className="absolute inset-0 flex items-center justify-center ">
            {/* <PlayCircle size={48} className="text-white opacity-90" /> */}
          </div>
        )}

        {progressPercentage > 0 && !isWatched && (
          <div
            className="absolute bottom-0 left-0 h-1 bg-primary"
            style={{ width: `${progressPercentage * 100}%` }}
          />
        )}
      </div>

      <div className="p-3 border-b-2">
        {/* <h3 className="font-medium text-base line-clamp-1">{video.title}</h3> */}
        <div className="flex  items-center justify-between space-x-1 ">
          <div className="flex items-center space-x-1 ">
            <FileText className="size-4 text-md font-extralight text-gray-500" />
            <h3 className=" text-md font-extralight text-gray-500">
              {" "}
              {video.title}
            </h3>
          </div>
          <div className="absolute bottom-2 right-2  text-gray-500 text-sm px-2 py-1 rounded-md">
            {formatDuration(video.duration)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
