import { createSlice } from '@reduxjs/toolkit';

export const waitingApprovalUserFilterSlice = createSlice({
  name: 'waitingApprovalUserFilters',
  initialState: {
    filters: {
      age: { min: '', max: '' },
      followers: { min: '', max: '' },
      average_like: { min: '', max: '' },
      tiktok_followers: { min: '', max: '' },
      tiktok_average_like: { min: '', max: '' },
      tiktok_engagement_rate: { min: '', max: '' },
      country: { value: '' },
      keyword: [],
    },
  },
  reducers: {
    setWaitingApprovalUserFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
});

export const { setWaitingApprovalUserFilters } = waitingApprovalUserFilterSlice.actions;

export const selectWaitingApprovalUserFilters = (state: any) => state.waitingApprovalUserFilters.filters;

export default waitingApprovalUserFilterSlice.reducer;
