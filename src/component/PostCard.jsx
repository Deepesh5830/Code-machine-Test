import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Pagination from "./pagination";
import { deletePosts } from "../features/postSlice";

const PostCard = () => {
  const { posts } = useSelector((state) => state.posts);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const dispatch = useDispatch();

  let date = new Date();

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
    setPostsPerPage(currentPage);
  };

  return (
    <div>
      <div className="flex  flex-wrap gap-5 justify-center">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-lg p-5 max-w-sm w-full rounded relative"
          >
            <div
              className="text-[25px] text-red-700 absolute top-3 right-5 cursor-pointer"
              onClick={() => dispatch(deletePosts(post?.id))}
            >
              X
            </div>
            <div className="text-[20px] font-semibold">{post?.title}</div>
            <div>{post?.body}</div>
            <div className=" font-medium text-gray-500">
              {date.toString().slice(0, 21)}
            </div>
            <img
              className="w-full rounded"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOMW4V9pwRzqkEgzfoyfTDDBJdoWS-5wB5bQ&s"
              alt="no-iage"
            />
          </div>
        ))}
      </div>

      <Pagination
        length={posts.length}
        postsPerPage={postsPerPage}
        handlePagination={handlePagination}
      />
    </div>
  );
};

export default PostCard;
