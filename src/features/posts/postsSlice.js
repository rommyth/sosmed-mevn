import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
const initialState = {
  loading: false,
  posts: [],
  error: '',
};

const fetchPosts = createAsyncThunk(
  'posts/fetchAllPosts',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/posts');
      return data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.statusText);
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = false;
      (state.posts = action.payload), (state.error = '');
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      (state.loading = false),
        (state.posts = []),
        (state.error = action.payload);
    });
  },
});

export { fetchPosts };
export default postsSlice.reducer;
