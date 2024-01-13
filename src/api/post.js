import axios from "axios";

// get all posts
export async function getPosts() {
    const res = await axios
        .get('https://jsonplaceholder.typicode.com/posts');
    return res.data;
}

// get post according to id
export async function getPost(id) {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    return res.data;
}

// create post

export async function createPost({ title, body }) {
    const res = await axios
        .post("https://jsonplaceholder.typicode.com/posts", {
            title,
            body,
            userId: 1,
            id: Date.now()
        });
    return res.data;
}