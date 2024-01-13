import React, { useState } from "react";
import PostList1 from "./PostList1";
import PostList2 from "./PostList2";
import CreatePost from "./CreatePost";
import PostListPagination from "./PostListPagination";

const App = () => {
  const [currentPage, setCurrentPage] = useState(<PostList1 />);
  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
        onClick={() => setCurrentPage(<PostList1 />)}
      >
        Post List 1
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
        onClick={() => setCurrentPage(<PostList2 />)}
      >
        Post List 2
      </button>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
        onClick={() =>
          setCurrentPage(<CreatePost setCurrentPage={setCurrentPage} />)
        }
      >
        New Post
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
        onClick={() => setCurrentPage(<PostListPagination />)}
      >
        Post List Paginated
      </button>
      {currentPage}
    </div>
  );
};

export default App;
