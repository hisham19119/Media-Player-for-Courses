import React from "react";

const Header = () => {
  return (
    <div className="bg-[#f5f9fa] flex flex-col justify-start items-start w-full h-32 p-8 space-y-4">
      <span className="text-gray-700">
        Home &gt; Courses &gt;{" "}
        <span className="text-black"> Course Details</span>{" "}
      </span>
      <div className="text-lg sm:text-3xl font-bold">
        Starting SEO as your home
      </div>
    </div>
  );
};

export default Header;
