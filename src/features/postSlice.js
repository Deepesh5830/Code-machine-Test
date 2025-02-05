import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = createAsyncThunk("fetch/post", async (page) => {
  const posts = await axios.get(
    `${API_URL}?_page=${page.start}&_limit=${page.end}`
  );
  return posts.data;
});

export const addPosts = createAsyncThunk("add/post", async (data) => {
  const posts = await axios.post(API_URL, data, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  console.log("Addpost-->", posts);
  return posts.data;
});

export const deletePosts = createAsyncThunk("delete/post", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: false,
    error: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = false;
        state.error = action.payload.error;
      })
      .addCase(addPosts.pending, (state) => {
        state.status = true;
      })
      .addCase(addPosts.fulfilled, (state, action) => {
        state.status = false;
        state.posts.push(action.payload);
      })
      .addCase(addPosts.rejected, (state, action) => {
        state.status = false;
        state.error = action.payload.error;
      })
      .addCase(deletePosts.pending, (state) => {
        state.status = true;
      })
      .addCase(deletePosts.fulfilled, (state, action) => {
        state.status = false;

        const datas = JSON.stringify(state.posts);
        const data = JSON.parse(datas).filter(
          (post) => post.id !== action.payload
        );

        state.posts = data;
      })
      .addCase(deletePosts.rejected, (state, action) => {
        state.status = false;
        state.error = action.payload.error;
      });
  },
});

export default postSlice.reducer;
