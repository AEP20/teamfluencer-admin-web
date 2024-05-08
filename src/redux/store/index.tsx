import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './themeConfigSlice';
import userSlice from './userSlice';
import userFiltersSlice from './userFilterSlice';
import campaignFiltersSlice from './campaignFilterSlice';
import waitingApprovalUserFilterSlice from './waitingApprovalUserFilterSlice';
import approvedUserFiltersSlice from './approvedUserFilterSlice';

const rootReducer = combineReducers({
  themeConfig: themeConfigSlice,
  user: userSlice,
  userFilter: userFiltersSlice,
  campaignFilters: campaignFiltersSlice,
  waitingApprovalUserFilters: waitingApprovalUserFilterSlice,
  approvedUserFilters: approvedUserFiltersSlice,
});

export default configureStore({
  reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
