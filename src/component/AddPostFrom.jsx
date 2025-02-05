import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPosts } from "../features/postSlice";

const AddPostFrom = ({ setOpen }) => {
  //   const [postId, setPostId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const status = useSelector((state) => state.status);

  const sendPost = async () => {
    if (!title || !body) {
      return alert("Required missing fields.");
    }
    const data = {
      //   id: postId,
      title: title,
      body: body,
      userId: 1,
    };
    await dispatch(addPosts(data));
    setOpen(false);
  };
  return (
    <div className="max-w-lg w-full h-[500px] border-2 p-5 ">
      <div className=" relative my-5">
        <h1 className=" font-bold text-[25px]">Add Post</h1>
        <span
          className="text-[25px] text-red-700 absolute top-0 right-0 cursor-pointer"
          onClick={() => setOpen(false)}
        >
          X
        </span>
      </div>
      <div className="flex flex-col gap-4 py-5">
   
        <input
          className="p-4 border border-black w-full rounded outline-none"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Title..."
        />
        <input
          className="p-4 border border-black w-full rounded outline-none"
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Enter Body..."
        />
      </div>
      <div className="text-center ">
        {status === true ? (
          <div>Loading...</div>
        ) : (
          <button
            className="border px-6 py-3 rounded bg-green-400 "
            onClick={() => sendPost()}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default AddPostFrom;
