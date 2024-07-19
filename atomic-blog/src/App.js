import { useState, useEffect, useContext } from "react";
import { faker } from "@faker-js/faker";
import { PostProvider, usePosts } from "./postContext";

function createRandomPosts() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

function App() {
  // const x = usePosts();
  /*console.log(x) ; x will give undefined for that we have written condition in postContext file in useposts function this error occurs because we are using this context in app but this context is for its children as we can see below under section we used  */
  const [isFakeDark, setIsFakeDark] = useState(false);

  useEffect(
    function () {
      document.documentElement.classList.toggle("fake-dark-mode");
    },
    [isFakeDark]
  );

  return (
    <section>
      {/* 2) PROVIDE VALUE TO CHILD COMPONENTS */}
      <PostProvider>
        <button
          onClick={() => setIsFakeDark((isFakeDark) => !isFakeDark)}
          className="btn-fake-dark-mode"
        >
          {isFakeDark ? "☀️" : "🌙"}
        </button>

        <Header />
        <Main />

        <Footer />
      </PostProvider>
    </section>
  );
}

function Header() {
  // 3) CONSUMING CONTEXT VALUE
  const { onClearPosts } = usePosts();
  return (
    <header>
      <h1>
        <span>⚛️</span>The Atomic Blog
      </h1>
      <div>
        <Results />
        <SearchPosts />
        <button onClick={onClearPosts}>Clear Posts</button>
      </div>
    </header>
  );
}

function SearchPosts() {
  const { searchQuery, setSearchQuery } = usePosts();
  return (
    <input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="search Posts..."
    ></input>
  );
}
function Results() {
  const { posts } = usePosts();

  return <p>🚀 {posts.length} atomic posts found</p>;
}
function Main() {
  return (
    <main>
      <FormAddPost />
      <Posts />
    </main>
  );
}

function Posts() {
  return (
    <section>
      <List />
    </section>
  );
}

function FormAddPost() {
  const { onAddPost } = usePosts();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = function (e) {
    e.preventDefault();
    if (!body || !title) return;
    onAddPost({ title, body });
    setTitle("");
    setBody("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post Title"
      ></input>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Post Body"
      ></textarea>
      <button>Add Post</button>
    </form>
  );
}
function List() {
  const { posts } = usePosts();
  return (
    <ul>
      {posts.map((post, i) => (
        <li key={i}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  );
}
function Footer() {
  return <footer>&copy; by the Atomic Blog✌️</footer>;
}
export default App;
