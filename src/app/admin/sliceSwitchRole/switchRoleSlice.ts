import { createSlice } from "@reduxjs/toolkit";
import { DataState } from "../../contant/IntefaceContaint";

const initialState: DataState<boolean> = {
  data: false,
  isError: false,
  isLoading: false,
};

export const switchRoleReducer = createSlice({
  name: "switch/role",
  initialState,
  reducers: {
    updateSwitchRole: (state, action) => {
      state.data = action.payload;
    },
  },
});
export const { updateSwitchRole } = switchRoleReducer.actions;
export default switchRoleReducer.reducer;
