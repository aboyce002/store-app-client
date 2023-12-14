import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import serverApi from '../../api/serverApi';

export const fetchUserAddress = createAsyncThunk('userAddresses/fetchAddress', async (id) => {
  try {
    const res = await serverApi.get(`/userAddresses/${id}`);
    return res.data || false;
  } catch (error) {
    return console.error(error.message);
  }
});

export const fetchAddressesForUser = createAsyncThunk('userAddresses/fetchAddresses', async (userId) => {
  try {
    const res = await serverApi.get(`/userAddresses/user/${userId}`);
    return res.data || false;
  } catch (error) {
    return console.error(error.message);
  }
});

export const addUserAddress = createAsyncThunk('userAddresses/createAddress', async ({ data }) => {
  try {
    const res = await serverApi.post('/userAddresses', { data });
    return res.data;
  } catch (error) {
    return console.error(error.message);
  }
});

export const updateUserAddress = createAsyncThunk('userAddresses/updateAddress', async ({ id, data }) => {
  try {
    const res = await serverApi.patch(`/userAddresses/${id}`, data);
    return res.data || false;
  } catch (error) {
    return console.error(error.message);
  }
});

export const deleteUserAddress = createAsyncThunk('userAddresses/delete', async ({ id }) => {
  try {
    const res = await serverApi.delete(`/userAddresses/${id}`);
    return res.data || false;
  } catch (error) {
    return console.error(error.message);
  }
});

const userAddressSlice = createSlice({
  name: 'userAddress',
  initialState: { addressList: [], currentAddress: null },
  reducers: {
    setCurrentAddress: (state, action) => {
      state.currentAddress = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserAddress.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetchUserAddress.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.currentAddress = action.payload || null;
      })
      .addCase(fetchAddressesForUser.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.addressList = action.payload || null;
      })
      .addCase(fetchUserAddress.rejected, (state, action) => {
        state.isFetching = false
      })
  }
});

export const {
  setCurrentAddress
} = userAddressSlice.actions;

export const getUserAddresses = state => state.userAddress.addressList;
export const getCurrentAddress = state => state.userAddress.currentAddress;
export const getAddressFromId = (state, addressId) => state.userAddress.addressList.find(
  address => address.id === parseInt(addressId)
);
export const getStatus = state => state.product.status;
export default userAddressSlice.reducer;
