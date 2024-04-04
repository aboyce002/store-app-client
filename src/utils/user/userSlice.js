import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import serverApi from '../../api/serverApi';

export const fetchUser = createAsyncThunk('users/fetchUser', async () => {
  const res = await serverApi.get('/users/current_user');
  return res.data || false;
});

export const loginUser = createAsyncThunk('users/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const res = await serverApi.post('/users/login', {
      email: email,
      password: password
    });
    return res.data || false;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const logoutUser = createAsyncThunk('users/logout', async () => {
  const res = await serverApi.get('/users/logout');
  return res.data || false;
});

export const registerUser = createAsyncThunk('users/registerUser', async ({ email, password }, { rejectWithValue }) => {
  try {
    const res = await serverApi.post('/users/register', {
      email: email,
      password: password
    });
    return res.data || false;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const updateUser = createAsyncThunk('users/updateUser', async ({ id, data }) => {
  try {
    const res = await serverApi.patch(`/users/${id}`,
      {
        email: data.email,
        password: data.password,
        phone: data.phone,
        main_address: parseInt(data.main_address)
      });
    return res.data || false;
  } catch (error) {
    return console.error(error.response.data.message);
  }
});

export const deleteUser = createAsyncThunk('users/deleteUser', async ({ id }) => {
  try {
    const res = await serverApi.delete(`/users/${id}`);
    return res.data || false;
  } catch (error) {
    return console.error(error.response.data.message);
  }
});

export const verifyUserPass = createAsyncThunk('users/verifyPass', async ({ email, password }) => {
  try {
    const res = await serverApi.get(`/users/verifyPass`, { email, password });
    return res.data || false;
  } catch (error) {
    return console.error(error.response.data.message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: { userInfo: null },
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.status = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.userInfo = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isFetching = false
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.userInfo = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isFetching = false
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.userInfo = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isFetching = false
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'fulfilled'
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
      })
  }
});

export const {
  clearError
} = userSlice.actions;

export const getUser = state => state.user.userInfo;
export const getCurrentUserId = state => state.user.userInfo.id;
export const getStatus = state => state.user.status;
export const getError = state => state.user.error;

export default userSlice.reducer;
