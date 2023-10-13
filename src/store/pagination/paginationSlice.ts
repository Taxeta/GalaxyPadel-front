import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    page: 1,
    pageSize: 10,
    totalPages: 1,
    totalRackets: 0,
    loadingMore: false,
  },
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    setTotalRackets: (state, action: PayloadAction<number>) => {
      state.totalRackets += action.payload;
    },
    initialPagination: (state, action: PayloadAction<number>) => {
      state.totalRackets = action.payload;
      state.totalPages = Math.ceil(action.payload / state.pageSize);
    },
    setLoadingMore: (state, action: PayloadAction<boolean>) => {
      state.loadingMore = action.payload;
    },
  },
});

export const paginationReducer = paginationSlice.reducer;
export const {
  setPage: setPageActionCreator,
  setTotalPages: setTotalPagesActionCreator,
  setTotalRackets: setTotalRacketsActionCreator,
  initialPagination: initialPaginationActionCreator,
  setLoadingMore: setLoadingMoreActionCreator,
} = paginationSlice.actions;
