import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import serverApi from '../../api/serverApi';

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const res = await serverApi.get('/current_user');
  return res.data || false;
});

export const logout = createAsyncThunk('user/logout', async () => {
  const res = await serverApi.post('/logout');
  return res.data || false;
});

export const loginUser = createAsyncThunk('user/login', async (email, password) => {
  try {
    const res = await serverApi.get('/user/login', email, password);
    return res.data || false;
  } catch (error) {
    return console.error(error.message);
  }
});

export const registerUser = createAsyncThunk('user/register', async (email, password) => {
  try {
    const res = await serverApi.post('/user/register', email, password);
    return res.data;
  } catch (error) {
    return console.error(error.message);
  }
});

export const updateUser = createAsyncThunk('user/update', async (id) => {
  const res = await serverApi.get(`/user/update/${id}`);
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
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isFetching = false
      })
  }
});

export const getUser = state => state.user.userInfo;
export const getCredits = state => state.user.credits;
export default userSlice.reducer;
