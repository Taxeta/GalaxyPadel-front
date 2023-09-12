import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RacketState } from "../types";
import { Racket } from "../../types";

const initialRacketsState: RacketState = {
  rackets: [],
};

const racketsSlice = createSlice({
  name: "rackets",
  initialState: initialRacketsState,
  reducers: {
    loadRackets: (
      currentRacketsState,
      action: PayloadAction<Racket[]>,
    ): RacketState => ({
      ...currentRacketsState,
      rackets: action.payload,
    }),
  },
});

export const racketsReducer = racketsSlice.reducer;
export const { loadRackets: loadRacketsActionCreator } = racketsSlice.actions;
