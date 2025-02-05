import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "./features/postSlice";
import PostCard from "./component/PostCard";
import { FaListUl, FaRegAddressCard } from "react-icons/fa";
import AddPostFrom from "./component/AddPostFrom";
import PostList from "./component/PostList";

function App() {
  const { status, error } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState("card");

  useEffect(() => {
    const page = { start: 0, end: 6 };
    dispatch(fetchPosts(page));
  }, [dispatch, status]);

  if (status === true) {
    return <div>Loading....</div>;
  }

  if (error != null) {
    return <div>Error:{error}</div>;
  }

  return (
    <div className="">
      {open === true ? (
        <div className="flex justify-center items-center">
          <AddPostFrom setOpen={setOpen} />{" "}
        </div>
      ) : (
        <div className="flex py-10 px-10">
          <div className="flex flex-col ">
            <div className="w-[250px] h-[150px] shadow-xl p-5 rounded text-center">
              <h1 className="text-[25px] font-bold">View Toggle</h1>
              <div className="flex justify-center items-center ">
                <div
                  className="p-5 border cursor-pointer bg-gray-400"
                  onClick={() => setShow("card")}
                >
                  <FaRegAddressCard />
                </div>
                <div
                  className="p-5 border cursor-pointer bg-green-300"
                  onClick={() => setShow("list")}
                >
                  <FaListUl />
                </div>
              </div>
            </div>
            <div className="w-[250px] h-[150px] shadow-xl p-5 rounded">
              <h1 className="text-[25px] font-bold">Have a Feedback</h1>

              <div
                className="p-3 border cursor-pointer bg-green-300 rounded text-black font-semibold text-center"
                onClick={() => setOpen(true)}
              >
                Add Feedback
              </div>
            </div>
          </div>
          {show === "card" ? (
            <div>
              <PostCard />
            </div>
          ) : (
            <div>
              <PostList />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
