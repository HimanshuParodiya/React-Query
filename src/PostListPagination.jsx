import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getPostsPaginated } from "./api/post";

const PostListPagination = () => {
  const [page, setPage] = useState(1);

  const { status, error, data, isPreviousData } = useQuery({
    queryKey: ["posts", { page }],
    keepPreviousData: true,
    queryFn: () => getPostsPaginated(page),
  });
  console.log(data);

  if (status === "loading") return <h1>Loading...</h1>;
  if (status === "error") return <h1>{JSON.stringify(error)}</h1>;

  return (
    <>
      <h1>
        Post List Paginated
        <br />
        <small>{isPreviousData && "Previous Data"}</small>
      </h1>
      {data.posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
      {data.previousPage && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
          onClick={() => setPage(data.previousPage)}
        >
          Previous
        </button>
      )}{" "}
      {data.nextPage && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
          onClick={() => setPage(data.nextPage)}
        >
          Next
        </button>
      )}
    </>
  );
};

export default PostListPagination;
