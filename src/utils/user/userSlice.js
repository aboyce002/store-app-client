import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import serverApi from '../../api/serverApi';

export const fetchUser = createAsyncThunk('users/fetchUser', async () => {
  const res = await serverApi.get('/current_user');
  console.log("User data is " + res.data);
  return res.data || false;
});

const userSlice = createSlice({
  name: 'user',
  initialState: { userInfo: null, credits: null },
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'idle'
        state.userInfo = action.payload;
        console.log("userinfo: " + state.userInfo);
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isFetching = false
      })
  }
});

export const getUser = state => state.user.userInfo;
export const getCredits = state => state.user.credits;
export default userSlice.reducer;
