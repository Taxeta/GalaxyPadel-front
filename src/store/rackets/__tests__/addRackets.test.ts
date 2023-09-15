import { newRacketsMock, racketsMock } from "../../../mocks/racketsMock";
import { RacketState } from "../../types";
import { addRacketActionCreator, racketsReducer } from "../racketsSlice";

describe("Given a addRackets reducer", () => {
  describe("When it receives a list of rackets and addRacketAction", () => {
    test("Then it should create a new racket", () => {
      const currentState: RacketState = { rackets: racketsMock };

      const addRacketAction = addRacketActionCreator(newRacketsMock);

      const newRacketState = racketsReducer(currentState, addRacketAction);

      const expectedNewState: RacketState = {
        ...currentState,
        rackets: [...currentState.rackets, newRacketsMock],
      };

      expect(newRacketState.rackets).toStrictEqual(expectedNewState.rackets);
    });
  });
});
