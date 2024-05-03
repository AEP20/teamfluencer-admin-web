import { createSlice } from '@reduxjs/toolkit';

export const userFiltersSlice = createSlice({
  name: 'userFilters',
  initialState: {
    filters: {
      age: { min: '', max: '' },
      followers: { min: '', max: '' },
      average_like: { min: '', max: '' },
      tiktok_followers: { min: '', max: '' },
      tiktok_average_like: { min: '', max: '' },
      tiktok_engagement_rate: { min: '', max: '' },
      country: { value: '' },
      city: { value: '' },
      job: { value: '' },
      hobbies: [],
      keywords: [],
      gender: '',
      verification: '',
    },
  },
  reducers: {
    setUserFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
});

export const { setUserFilters } = userFiltersSlice.actions;

export const selectUserFilters = (state: any) => state.userFilter.filters;

export default userFiltersSlice.reducer;
