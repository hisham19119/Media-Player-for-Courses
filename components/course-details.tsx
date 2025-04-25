import { Book, Clock, Earth, User, WholeWord } from "lucide-react";
import React from "react";

const CourseDetails = () => {
  return (
    <div className="flex flex-col justify-start items-start gap-8">
      <div>
        <h1 className="text-2xl "> Course Materials</h1>
      </div>
      <div className="w-full bg-white shadow-md shadow-gray-200 flex flex-col gap-8 py-8 border-t-1  border-gray-100 ">
        <div className=" flex flex-col justify-center items-center sm:flex-row sm:justify-around sm:items-start gap-8">
          <div className="flex flex-col items-start justify-start gap-4">
            <div className="border-b-1 border-gray-300 flex justify-between items-center space-x-16 pb-4 w-full ">
              <div className="flex justify-start items-start space-x-2 ">
                <Clock />
                <h1 className="text-gray-600 ">Duration</h1>
              </div>
              <div>3 Weeks</div>
            </div>
            <div className="border-b-1 border-gray-300 flex justify-between items-center space-x-16 pb-4 w-full">
              <div className="flex justify-start items-start space-x-2">
                <Book />
                <h1 className="text-gray-600 ">Lessons: </h1>
              </div>
              <div>8</div>
            </div>
            <div className="border-b-1 border-gray-300 flex justify-between items-center space-x-16 pb-4  w-full">
              <div className="flex justify-start items-start space-x-2">
                <User />
                <h1 className="text-gray-600 ">Enrolled</h1>
              </div>
              <div>65 Students</div>
            </div>
            <div className="border-b-1 border-gray-300 flex justify-between items-center space-x-16 pb-4 w-full ">
              <div className="flex justify-start items-start space-x-2">
                <Earth />
                <h1 className="text-gray-600 ">Languages</h1>
              </div>
              <div>English</div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-4">
            <div className="border-b-1 border-gray-300 flex justify-between items-center space-x-16 pb-4 w-full ">
              <div className="flex justify-start items-start space-x-2 ">
                <Clock />
                <h1 className="text-gray-600 ">Duration</h1>
              </div>
              <div>3 Weeks</div>
            </div>
            <div className="border-b-1 border-gray-300 flex justify-between items-center space-x-16 pb-4 w-full">
              <div className="flex justify-start items-start space-x-2">
                <Book />
                <h1 className="text-gray-600 ">Lessons: </h1>
              </div>
              <div>8</div>
            </div>
            <div className="border-b-1 border-gray-300 flex justify-between items-center space-x-16 pb-4  w-full">
              <div className="flex justify-start items-start space-x-2">
                <User />
                <h1 className="text-gray-600 ">Enrolled</h1>
              </div>
              <div>65 Students</div>
            </div>
            <div className="border-b-1 border-gray-300 flex justify-between items-center space-x-16 pb-4 w-full ">
              <div className="flex justify-start items-start space-x-2">
                <Earth />
                <h1 className="text-gray-600 ">Languages</h1>
              </div>
              <div>English</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
