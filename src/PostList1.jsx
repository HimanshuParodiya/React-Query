import { useQueries, useQuery } from "@tanstack/react-query";
import React from "react";
import { getPost, getPosts } from "./api/post";

const PostList1 = ({ id }) => {
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
    enabled: postQuery?.data?.[0].id != null,
    queryFn: () => getPost(postQuery?.data?.[0]?.id),
  });

  // for multiple useQuery
  const queries = useQueries({
    queries: (postQuery?.data ?? []).map((post) => {
      return {
        queryKey: ["post", post.id],
        queryFn: () => getPost(post.id),
      };
    }),
  });

  //   console.log(queries.map((eachData) => eachData?.data?.id));
  if (postQuery.status === "loading") {
    return <h1>Loading....</h1>;
  }

  if (postQuery.status === "error") {
    return <h1>{postQuery.error}</h1>;
  }
  return (
    <div>
      <h1 className="text-4xl">Post List 1</h1>
      {userQuery.isLoading
        ? "Loading User..."
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

export default PostList1;
