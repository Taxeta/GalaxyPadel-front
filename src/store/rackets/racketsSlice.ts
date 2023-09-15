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

    deleteRackets: (
      currentRacketsState,
      action: PayloadAction<string>,
    ): RacketState => ({
      ...currentRacketsState,
      rackets: currentRacketsState.rackets.filter(
        (racket) => racket.id !== action.payload,
      ),
    }),

    addRacket: (currentRacketsState, action: PayloadAction<Racket>) => ({
      ...currentRacketsState,
      rackets: [...currentRacketsState.rackets, action.payload],
    }),
  },
});

export const racketsReducer = racketsSlice.reducer;
export const {
  loadRackets: loadRacketsActionCreator,
  deleteRackets: deleteRacketActionCreator,
  addRacket: addRacketActionCreator,
} = racketsSlice.actions;
