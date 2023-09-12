import { UiState } from "./types";
import {
  startLoadingActionCreator,
  stopLoadingActionCreator,
  uiReducer,
} from "./ui";

describe("Given a ui slice", () => {
  describe("When it is called with a startLoading action and a currentState with a property isLoading set to false", () => {
    test("Then it should return a new state with the property isLoading to true", () => {
      const currentUiState: UiState = {
        isLoading: false,
      };

      const loadingAction = startLoadingActionCreator();

      const startUiState = uiReducer(currentUiState, loadingAction);

      expect(startUiState).toHaveProperty("isLoading", true);
    });
  });

  describe("When it is called with a stopLoading action and a currentState with a property isLoading set to true", () => {
    test("Then it should return a new state with the property isLoading to false", () => {
      const currentUiState: UiState = {
        isLoading: true,
      };

      const loadingAction = stopLoadingActionCreator();

      const startUiState = uiReducer(currentUiState, loadingAction);

      expect(startUiState).toHaveProperty("isLoading", false);
    });
  });
});
