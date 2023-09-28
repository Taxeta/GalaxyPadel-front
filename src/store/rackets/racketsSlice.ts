import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RacketState } from "../types";
import { NewApiRacket, Racket } from "../../types";

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
      currentRacketState,
      action: PayloadAction<Racket>,
    ): RacketState => ({
      ...currentRacketState,
      selectedRacket: action.payload,
    }),

    toggleFavoriteRacket: (
      currentRacketsState,
      action: PayloadAction<NewApiRacket>,
    ): RacketState => ({
      ...currentRacketsState,
      selectedRacket: action.payload,
      rackets: currentRacketsState.rackets.map((racket) =>
        racket.id === action.payload.id ? action.payload : racket,
      ),
    }),

    toggleVisibilityRacket: (
      currentRacketsState,
      action: PayloadAction<NewApiRacket>,
    ) => {
      const selectedRacket = currentRacketsState.rackets.find(
        (racket) => racket.id === action.payload.id,
      );
      if (selectedRacket) {
        selectedRacket.visibility = !selectedRacket.visibility;
      }
    },
  },
});

export const racketsReducer = racketsSlice.reducer;
export const {
  loadRackets: loadRacketsActionCreator,
  deleteRackets: deleteRacketActionCreator,
  addRacket: addRacketActionCreator,
  loadSelectedRacket: loadSelectedRacketActionCreator,
  toggleFavoriteRacket: toggleRacketActionCreator,
  toggleVisibilityRacket: toggleVisibilityRacketActionCreator,
} = racketsSlice.actions;
