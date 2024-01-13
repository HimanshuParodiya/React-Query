import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getPosts } from "./api/post";

const PostList1 = () => {
  const postQuery = useQuery({
    queryKey: ["post"],
    queryFn: getPosts,
  });

  if (postQuery.status === "loading") {
    return <h1>Loading....</h1>;
  }

  if (postQuery.status === "error") {
    return <h1>{postQuery.error}</h1>;
  }
  return (
    <div>
      <h1 className="text-4xl">Post List 1</h1>
      <ol>
        {postQuery.data.map((post) => (
          <li key={post.id}>
            S.no = {post.id} ---- {post.title}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default PostList1;
