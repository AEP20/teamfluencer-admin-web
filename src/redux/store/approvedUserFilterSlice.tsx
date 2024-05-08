import { createSlice } from '@reduxjs/toolkit';

export const approvedUserFiltersSlice = createSlice({
  name: 'approvedUserFilters',
  initialState: {
    filters: {
      age: { min: '', max: '' },
      followers: { min: '', max: '' },
      average_like: { min: '', max: '' },
      tiktok_followers: { min: '', max: '' },
      tiktok_average_like: { min: '', max: '' },
      tiktok_engagement_rate: { min: '', max: '' },
      country: { value: '' },
    },
  },
  reducers: {
    setApprovedUserFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
});

export const { setApprovedUserFilters } = approvedUserFiltersSlice.actions;

export const selectApprovedUserFilters = (state: any) => state.approvedUserFilters.filters;

export default approvedUserFiltersSlice.reducer;
