import { useQuery } from "@tanstack/react-query";
import { getPost, getPosts } from "./api/post";

const NewUser = ({ id }) => {
  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPost(id),
  });

  if (postQuery.status === "loading") return <h1>Loading...</h1>;
  if (postQuery.status === "error") {
    return <h1>{JSON.stringify(postQuery.error)}</h1>;
  }

  return (
    <>
      <h1>
        {postQuery.data.title} <br />
      </h1>
      <p>{postQuery.data.body}</p>
    </>
  );
};

export default NewUser;
