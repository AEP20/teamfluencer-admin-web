import { createSlice } from '@reduxjs/toolkit';

export const campaignFiltersSlice = createSlice({
  name: 'campaignFilters',
  initialState: {
    filters: {
      platform: '',
      created_at: '',
      is_verified: '',
      visibility: '',
      gender: '',
      country: '',
      max_follower: '',
      min_follower: '',
      max_age: '',
      min_age: '',
      max_cost: '',
      campaignName: '',
    },
  },
  reducers: {
    setCampaignFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
});

export const { setCampaignFilters } = campaignFiltersSlice.actions;

export const selectCampaignFilters = (state: any) => state.campaignFilters.filters;

export default campaignFiltersSlice.reducer;
