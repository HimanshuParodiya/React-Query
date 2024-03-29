import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getPost, getPosts } from "./api/post";

const PostList2 = () => {
  const postQuery = useQuery({
    queryKey: ["post"],
    queryFn: getPosts,
  });

  //   const userQuery = useQuery({
  //     queryKey: ["users", postQuery?.data?.userId],
  //     enabled: postQuery?.data?.userId != null,
  //     queryFn: () => getUser(postQuery.data.userId),
  //   })

  const userQuery = useQuery({
    queryKey: ["users", postQuery?.data?.[0].id],
    enabled: postQuery?.data?.[0].id != null, // if this expression is true then this function will  work
    queryFn: () => getPost(postQuery?.data?.[0]?.id),
  });

  if (postQuery.status === "loading") {
    return <h1>Loading....</h1>;
  }

  if (postQuery.status === "error") {
    return <h1>{postQuery.error}</h1>;
  }
  return (
    <div>
      <h1 className="text-4xl">Post List 2</h1>
      {userQuery.isLoading
        ? "Loading 1st user body..."
        : userQuery.isError
        ? "Error Loading User"
        : userQuery?.data?.body}
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

export default PostList2;
