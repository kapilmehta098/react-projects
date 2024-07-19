import { createContext, useContext, useState } from "react";
import { faker } from "@faker-js/faker";

function createRandomPosts() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}
// 1) CREATE A CONTEXT
const PostContext = createContext();
function PostProvider({ children }) {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPosts())
  );
  const [searchQuery, setSearchQuery] = useState("");

  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }
  return (
    <PostContext.Provider
      value={{
        posts: searchedPosts,
        onClearPosts: handleClearPosts,
        searchQuery,
        onAddPost: handleAddPost,
        setSearchQuery,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
function usePosts() {
  const context = useContext(PostContext);
  if (context === undefined)
    throw new Error("PostContext was used outside the PostProvider");
  return context;
}
// here this usePost act as the custom context api as we are exporting this
export { PostProvider, usePosts };
