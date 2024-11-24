import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get, getById, post } from '@/services/api';
import { toast } from 'react-toastify';
import employerMenu from '@/data/employerMenuData';

// Thunk to fetch esubemplyerdashboard
export const fetchSubemployer = createAsyncThunk(
  'sub-employers/permissions/',
  async (id, { rejectWithValue }) => {
    try {
      const res = (await getById('/sub-ployers/',id)).data.data;
      return res
    } catch (error) {
      if (error.response?.data?.error === 'Failed to find cv!') {
        toast.info('Please fill the information to get going!');
      }
      return rejectWithValue(error.response?.data?.error || 'Error fetching esubemplyerdashboard');
    }
  }
);


// Thunk to add an item to the esubemplyerdashboard


// esubemplyerdashboard slice
const employermenudashboardlice = createSlice({
  name: 'esubemplyerdashboard',
  initialState: {
    employermenudashboard:[],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handle fetchSubemployer states
    builder
      .addCase(fetchSubemployer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSubemployer.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("employermenudashboard????",action.payload)
        // state.employermenudashboard = action.payload;
      })
      .addCase(fetchSubemployer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.employermenudashboard = [];
      });
   
  },
});

export const esubemplyerdashboardReducer = employermenudashboardlice.reducer;

// Selectors
export const selectesubemplyerdashboard = (state) => state.esubemplyerdashboard.employermenudashboard;
export const selectesubemplyerdashboardLoading = (state) => state.esubemplyerdashboard.isLoading;
export const selectesubemplyerdashboardError = (state) => state.esubemplyerdashboard.error;

