import { racketsMock } from "../../../mocks/racketsMock";
import { RacketState } from "../../types";
import { racketsReducer, toggleRacketActionCreator } from "../racketsSlice";

describe("Given a racketsReducer reducer", () => {
  describe("When it receives a state with 2 rackets and a toggleRacket action with id '64f3a180784b0b6d4ddd8fe2'", () => {
    test("Then it should return a new state with 2 user and the property 'favorite' of the user with id '64f3a180784b0b6d4ddd8fe2' changed", () => {
      const currentRacketsState: RacketState = {
        rackets: racketsMock,
      };

      const idToToggle = "64f3a180784b0b6d4ddd8fe2";

      const toggleRacketAction = toggleRacketActionCreator(idToToggle);
      const newRacketsState = racketsReducer(
        currentRacketsState,
        toggleRacketAction,
      );

      const toggledRacket = newRacketsState.rackets.find(
        (rackets) => rackets.id === idToToggle,
      );

      expect(toggledRacket).toHaveProperty("favorite", true);
    });
  });
});
