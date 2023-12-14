import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import serverApi from '../../api/serverApi';

export const fetchUser = createAsyncThunk('users/fetchUser', async () => {
  const res = await serverApi.get('/users/current_user');
  return res.data || false;
});

export const registerUser = createAsyncThunk('users/registerUser', async ({ email, password }) => {
  try {
    const res = await serverApi.post('/users/register', { email, password });
    return res.data;
  } catch (error) {
    return console.error(error.message);
  }
});

export const updateUser = createAsyncThunk('users/updateUser', async ({ id, data }) => {
  try {
    const res = await serverApi.patch(`/users/${id}`, data);
    return res.data || false;
  } catch (error) {
    return console.error(error.message);
  }
});

export const deleteUser = createAsyncThunk('users/deleteUser', async ({ id }) => {
  try {
    const res = await serverApi.delete(`/users/${id}`);
    return res.data || false;
  } catch (error) {
    return console.error(error.message);
  }
});

export const loginUser = createAsyncThunk('users/login', async ({ email, password }) => {
  try {
    const res = await serverApi.get('/users/login', { email, password });
    return res.data || false;
  } catch (error) {
    return console.error(error.message);
  }
});

export const logoutUser = createAsyncThunk('users/logout', async () => {
  const res = await serverApi.post('/users/logout');
  return res.data || false;
});

export const verifyUserPass = createAsyncThunk('users/verifyPass', async ({ email, password }) => {
  try {
    const res = await serverApi.get(`/users/verifyPass`, { email, password });
    return res.data || false;
  } catch (error) {
    return console.error(error.message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: { userInfo: null },
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.status = 'pending'
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
export default userSlice.reducer;
