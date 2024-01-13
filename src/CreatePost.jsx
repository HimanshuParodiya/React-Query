import { useMutation } from "@tanstack/react-query";
import React, { useRef } from "react";
import { createPost } from "./api/post";
import NewUser from "./NewUser";

const CreatePost = ({ setCurrentPage }) => {
  const titleRef = useRef();
  const bodyRef = useRef();
  const createPostMutation = useMutation({
    // here we only need mutationFn which returns promise
    mutationFn: createPost, //
    // onSuccess: (data, variables, context), // data is what we getting / variable {title, body}
    onSuccess: (data) => {
      setCurrentPage(<NewUser id={data.id} />);
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    createPostMutation.mutate({
      title: titleRef.current.value,
      body: bodyRef.current.value,
    });
  }
  return (
    <div>
      {createPostMutation.isError && JSON.stringify(createPostMutation.error)}
      <h1>Create a Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title: </label>
          <input className="border" id="title" type="text" ref={titleRef} />
        </div>
        <div>
          <label htmlFor="body">Body: </label>
          <input className="border" id="body" type="text" ref={bodyRef} />
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
          disabled={createPostMutation.isLoading}
        >
          {createPostMutation.isLoading ? "Loading..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
