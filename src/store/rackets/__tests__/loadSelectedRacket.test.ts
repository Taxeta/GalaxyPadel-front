import { racketMock } from "../../../mocks/racketsMock";
import { RacketState } from "../../types";
import {
  loadSelectedRacketActionCreator,
  racketsReducer,
} from "../racketsSlice";

describe("Given a rackets slice", () => {
  describe("When it receives a loadSelectedRacket action with 'racketMock'", () => {
    test("Then it should return a new state with the selected Racket 'racketMock'", () => {
      const currentRacketState: RacketState = { rackets: [] };
      const loadSelectedRacketAction =
        loadSelectedRacketActionCreator(racketMock);

      const newRacketState = racketsReducer(
        currentRacketState,
        loadSelectedRacketAction,
      );

      expect(newRacketState.selectedRacket).toStrictEqual(racketMock);
    });
  });
});
