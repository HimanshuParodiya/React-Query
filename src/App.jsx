// these two custom hook comes from react-query
import { useQuery } from "@tanstack/react-query";
import Post from "./Post";
// import "./App.css";

// let's create data here

const POST = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
];

// when ever we have long url just break it down

// /post   -> ["post"]
// /post/1 -> ["post", 1]
// /post?author=1 -> ["post", {author:1}]
// /post/2/comment -> ["post",2,comment]

// just like this

function App() {
  const postQuery = useQuery({
    queryKey: ["post"], // to uniquely identify the query(fetching data), we can have multiple thing here like ["post", 1, 3]
    // queryFn: () => wait(1000).then(() => [...POST]), // function to actually query our data
    // queryFn: () => Promise.reject("When the query is fail this will return"), // Showing error
    // this will be a fetch or axios request

    queryFn: async () => {
      try {
        // Use await to make sure the asynchronous code is executed sequentially
        await wait(1000);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const data = await response.json();
        return data;
      } catch (error) {
        // Handle errors here
        console.error("Error fetching data:", error);
        throw error; // Rethrow the error to inform React Query about the failure
      }
    },
  });

  if (postQuery.isLoading) {
    return <h1>Loading.....</h1>;
  }

  if (postQuery.isError) {
    return <div>Sorry! there is an error {postQuery.error}</div>;
  }

  console.log(postQuery.fetchStatus);

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {postQuery.data &&
          postQuery.data.map((post) => <Post key={post.id} postData={post} />)}
      </div>
    </>
  );
}

// function to slowdown response (we can also do throttling but let's try this one)
function wait(duration) {
  // this wait function will return our according to giving response
  return new Promise((resolve) => setTimeout(resolve, duration));
}
export default App;
