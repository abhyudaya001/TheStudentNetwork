import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import Post from "./Post";

const Posts = ({ userId, isProfile = false }) => {
  let p = "overlay an image in CSS";
  console.log(p);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  // const getPosts = async () => {
  //   const response = await fetch(`http://127.0.0.1:5000/recommend?tag=${[p]}`, {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const data = await response.json();
  //   dispatch(setPosts({ posts: data }));
  // };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    const limitedPosts = data.slice(0, 10);
    dispatch(setPosts({ posts: limitedPosts }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      // getPosts();
      // const intervalId = setInterval(() => {
      //   dispatch(getPosts());
      // }, 15000); // Fetch posts every 5 seconds
      // return () => clearInterval(intervalId);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          title,
          description,
          likes,
          comments,
        }) => (
          <Post
            key={_id}
            postId={_id}
            postUserId={userId}
            firstName={firstName}
            lastName={lastName}
            title={title}
            description={
              <div
                className="desc-div"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            }
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default Posts;
