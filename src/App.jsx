import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./App.css";

const POST = [
  { title: "Post 1", id: 1 },
  { title: "Post 2", id: 2 },
];

function App() {
  const queryClient = useQueryClient();
  const postQuery = useQuery({
    queryKey: ["post"], // key of our query / unique identifier
    queryFn: () => wait(1000).then(() => [...POST]), // this is an async function so we create an function called wait (This will be fetch or axios request)
    // queryFn: () => wait(2000).then(() => [...POeST]), // if the data is wrong we can give an error
  });

  const newPostMutation = useMutation({
    mutationFn: async (title) => {
      await wait(1000);
      return POST.push({ id: crypto.randomUUID, title });
    },
    // if the mutation is succeed
    onSuccess: () => {
      queryClient.invalidateQueries(["post"]);
    },
  });

  // Checking status like loading and error
  if (postQuery.isLoading) {
    return <div>Loading....</div>;
  }
  if (postQuery.isError) {
    return <pre>{JSON.stringify(postQuery.error)}</pre>;
  }

  return (
    <>
      {postQuery?.data?.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
      <button
        disabled={newPostMutation.isLoading}
        onClick={() => newPostMutation.mutate("Post 3")}
      >
        Add New Post
      </button>
    </>
  );
}

function wait(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export default App;
