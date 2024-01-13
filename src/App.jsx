import { useQuery } from "@tanstack/react-query";
import "./App.css";

const POST = [
  { title: "Post 1", id: 1 },
  { title: "Post 2", id: 2 },
];

// here we have POST endpoint
// what if we have
// posts       we can do it like ["posts"]
// posts/1                       ["posts", posts.id]
// posts?authorId=1              ["posts", {authorId: 1}]
// posts/2/comments              ["posts", posts.id, "comments"]

function App() {
  const postQuery = useQuery({
    queryKey: ["post"], // key of our query / unique identifier
    // queryFn: ({queryKey}) => // destructuring  queryKey
    queryFn: (obj) =>
      wait(1000).then(() => {
        console.log(obj); // an object which has querykey
        return [...POST];
      }), // this is an async function so we create an function called wait (This will be fetch or axios request)
    // queryFn: () => wait(2000).then(() => [...POeST]), // if the data is wrong we can give an error
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
    </>
  );
}

function wait(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export default App;
