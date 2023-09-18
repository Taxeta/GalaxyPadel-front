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

    loadSelectedRacket: (
      currentRacketState: RacketState,
      action: PayloadAction<Racket>,
    ) => ({
      ...currentRacketState,
      selectedRacket: action.payload,
    }),

    toggleRacket: (
      currentUsersState,
      action: PayloadAction<string>,
    ): RacketState => ({
      ...currentUsersState,
      rackets: currentUsersState.rackets.map((racket) =>
        racket.id === action.payload
          ? { ...racket, favorite: !racket.favorite }
          : { ...racket },
      ),
    }),
  },
});

export const racketsReducer = racketsSlice.reducer;
export const {
  loadRackets: loadRacketsActionCreator,
  deleteRackets: deleteRacketActionCreator,
  addRacket: addRacketActionCreator,
  loadSelectedRacket: loadSelectedRacketActionCreator,
  toggleRacket: toggleRacketActionCreator,
} = racketsSlice.actions;
