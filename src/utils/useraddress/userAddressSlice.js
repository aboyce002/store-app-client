import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import serverApi from '../../api/serverApi';

export const fetchUserAddress = createAsyncThunk('userAddresses/fetchAddress', async (id) => {
  try {
    const res = await serverApi.get(`/userAddresses/${id}`);
    return res.data || false;
  } catch (error) {
    return console.error(error.response.data.message);
  }
});

export const fetchAddressesForUser = createAsyncThunk('userAddresses/fetchAddresses', async (userId) => {
  try {
    const res = await serverApi.get(`/userAddresses/user/${userId}`);
    return res.data || false;
  } catch (error) {
    return console.error(error.response.data.message);
  }
});

export const addUserAddress = createAsyncThunk('userAddresses/createAddress', async ({ userId, address }) => {
  try {
    const res = await serverApi.post('/userAddresses',
      {
        user_id: userId,
        first_name: address.firstName,
        last_name: address.lastName,
        street: address.address1,
        street2: address.address2,
        city: address.city,
        state: address.state,
        zip: address.zipcode,
        country: address.country
      });
    return res.data;
  } catch (error) {
    return console.error(error.response.data.message);
  }
});

export const updateUserAddress = createAsyncThunk('userAddresses/updateAddress', async ({ id, userId, address }) => {
  try {
    const res = await serverApi.patch(`/userAddresses/${id}`,
      {
        user_id: parseInt(userId),
        first_name: address.first_name,
        last_name: address.last_name,
        street: address.street,
        street2: address.street2,
        street3: address.street3,
        city: address.city,
        state: address.state,
        zip: address.zip,
        country: address.country
      });
    return res.data || false;
  } catch (error) {
    return console.error(error.response.data.message);
  }
});

export const deleteUserAddress = createAsyncThunk('userAddresses/delete', async ({ id }) => {
  try {
    const res = await serverApi.delete(`/userAddresses/${id}`);
    return res.data || false;
  } catch (error) {
    return console.error(error.response.data.message);
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
        state.status = 'pending';
      })
      .addCase(fetchUserAddress.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.currentAddress = action.payload || null;
      })
      .addCase(fetchUserAddress.rejected, (state, action) => {
        state.isFetching = false;
      })
      .addCase(fetchAddressesForUser.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(fetchAddressesForUser.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.addressList = action.payload || null;
      })
      .addCase(fetchAddressesForUser.rejected, (state, action) => {
        state.isFetching = false;
      })
      .addCase(addUserAddress.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(addUserAddress.fulfilled, (state, action) => {
        console.log("added address: ", action.payload);
        state.addressList.push(action.payload);
        state.status = 'fulfilled';
      })
      .addCase(addUserAddress.rejected, (state, action) => {
        state.isFetching = false;
      })
      .addCase(updateUserAddress.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(updateUserAddress.fulfilled, (state, action) => {
        console.log("updated address: ", action.payload);
        const addressIndex = state.addressList.findIndex(
          address => address.id === parseInt(action.payload.id)
        );
        state.addressList[addressIndex] = action.payload;
        state.status = 'fulfilled';
      })
      .addCase(updateUserAddress.rejected, (state, action) => {
        state.isFetching = false;
      })
      .addCase(deleteUserAddress.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(deleteUserAddress.fulfilled, (state, action) => {
        console.log("deleted address: ", action.payload);
        const addressIndex = state.addressList.findIndex(
          address => address.id === parseInt(action.payload.id)
        );
        state.addressList.splice(addressIndex, 1);
        state.status = 'fulfilled';
      })
      .addCase(deleteUserAddress.rejected, (state, action) => {
        state.isFetching = false;
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
