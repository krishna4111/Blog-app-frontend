import PostCard from "./PostCard";

const PostBody = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => {
        return (
          <>
            <PostCard key={post._id} post={post} />
          </>
        );
      })}
    </div>
  );
};

export default PostBody;
