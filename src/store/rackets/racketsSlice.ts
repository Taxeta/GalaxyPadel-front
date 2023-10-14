import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RacketState } from "../types";
import { NewApiRacket, Racket } from "../../types";

const initialRacketsState: RacketState = {
  rackets: [],
  selectedRacket: null,
};

const racketsSlice = createSlice({
  name: "rackets",
  initialState: initialRacketsState,
  reducers: {
    loadRackets: (
      currentRacketsState,
      action: PayloadAction<Racket[]>,
    ): RacketState => {
      const uniqueRackets = action.payload.filter((racket) => {
        return !currentRacketsState.rackets.some(
          (hasRacket) => hasRacket.id === racket.id,
        );
      });

      return {
        ...currentRacketsState,
        rackets: [...currentRacketsState.rackets, ...uniqueRackets],
      };
    },

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

    clearSelectedRacket: (state) => {
      state.selectedRacket = null;
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
  clearSelectedRacket: clearSelectedRacketActionCreator,
} = racketsSlice.actions;
