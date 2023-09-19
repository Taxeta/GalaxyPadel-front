import { racketsMock } from "../../../mocks/racketsMock";
import { RacketState } from "../../types";
import { racketsReducer, toggleRacketActionCreator } from "../racketsSlice";

describe("Given a racketsReducer reducer", () => {
  describe("When it receives a state with 2 rackets and a toggleRacket action with id '64f3a180784b0b6d4ddd8fe2'", () => {
    test("Then it should return a new state with 2 rackets and the property 'favorite' of the racket with id '64f3a180784b0b6d4ddd8fe2' set to true", () => {
      const currentRacketsState: RacketState = {
        rackets: racketsMock,
      };

      const toggleRacketAction = toggleRacketActionCreator({
        ...racketsMock[0],
        favorite: true,
      });

      const newRacketsState = racketsReducer(
        currentRacketsState,
        toggleRacketAction,
      );

      expect(newRacketsState.rackets[0]).toHaveProperty("favorite", true);
    });
  });

  describe("When it receives a state with no rackets and a toggleRacket action", () => {
    test("Then it should return a new state without rackets", () => {
      const currentRacketsState: RacketState = { rackets: [] };

      const modifyRacketAction = toggleRacketActionCreator({
        ...racketsMock[0],
        favorite: true,
      });

      const newRacketsState = racketsReducer(
        currentRacketsState,
        modifyRacketAction,
      );

      expect(newRacketsState.rackets).toHaveLength(0);
    });
  });
});
