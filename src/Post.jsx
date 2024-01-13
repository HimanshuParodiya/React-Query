import React from "react";

const Post = ({ postData }) => {
  return (
    <div className="w-[300px] h-[300px] bg-white p-4 border border-gray-300 rounded">
      <h3 className="text-xl font-semibold text-blue-500">ID: {postData.id}</h3>
      <h2 className="text-2xl font-bold text-red-700 mt-2">
        Title: {postData.title}
      </h2>
    </div>
  );
};

export default Post;
