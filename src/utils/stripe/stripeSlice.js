import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import serverApi from '../../api/serverApi';

export const handleToken = createAsyncThunk('stripe/handleToken', async (token) => {
  const res = await serverApi.post('/stripe', token);
  return res.data;
});

const stripeSlice = createSlice({
  name: 'stripe',
  initialState: { stripe: null },
  reducers: {
    handleToken(state, action) {
        state.stripe = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(handleToken.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(handleToken.fulfilled, (state, action) => {
        state.status = 'idle'
      })
      .addCase(handleToken.rejected, (state,action) => {
        state.isFetching = false
      })
  }
});

export default stripeSlice.reducer;
