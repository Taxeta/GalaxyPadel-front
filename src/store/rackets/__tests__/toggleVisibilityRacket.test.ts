import { racketsMock } from "../../../mocks/racketsMock";
import { RacketState } from "../../types";
import {
  racketsReducer,
  toggleVisibilityRacketActionCreator,
} from "../racketsSlice";

describe("Given a racketsReducer reducer", () => {
  describe("When it receives a state with 2 rackets and a toggleRacket action with id '64f3a180784b0b6d4ddd8fe2'", () => {
    test("Then it should return a new state with 2 rackets and the property 'visibility' of the racket with id '64f3a180784b0b6d4ddd8fe2' set to true", () => {
      const currentRacketsState: RacketState = {
        rackets: racketsMock,
      };

      const toggleRacketAction = toggleVisibilityRacketActionCreator({
        ...racketsMock[0],
        visibility: true,
      });

      const newRacketsState = racketsReducer(
        currentRacketsState,
        toggleRacketAction,
      );

      expect(newRacketsState.rackets[0]).toHaveProperty("visibility", false);
    });
  });

  describe("When it receives a state with no rackets and a toggleRacket action", () => {
    test("Then it should return a new state without rackets", () => {
      const currentRacketsState: RacketState = { rackets: [] };

      const modifyVisibilityAction = toggleVisibilityRacketActionCreator({
        ...racketsMock[0],
        visibility: false,
      });

      const newRacketsState = racketsReducer(
        currentRacketsState,
        modifyVisibilityAction,
      );

      expect(newRacketsState.rackets).toHaveLength(0);
    });
  });
});
