import Header from "@/components/Header";
import VideoList from "@/components/Video-List";
import VideoPlayer from "@/components/Video-Player";
// import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-start ">
      <Header />
      {/* <VideoPlayer/> */}
      <VideoList />
    </div>
  );
}
