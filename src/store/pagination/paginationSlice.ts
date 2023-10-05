import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    page: 1,
    pageSize: 10,
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const paginationReducer = paginationSlice.reducer;
export const { setPage: setPageActionCreator } = paginationSlice.actions;
