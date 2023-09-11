import { racketsMock } from "../../../mocks/racketsMock";
import { RacketState } from "../../types";
import { loadRacketsActionCreator, racketsReducer } from "../racketsSlice";

describe("Given a rackets slice", () => {
  describe("When it receives a loadRackets reducer and rackets", () => {
    test("Then it should return a new state with the received rackets", () => {
      const currentRacketState: RacketState = {
        rackets: [],
      };
      const rackets = racketsMock;

      const loadRacketsAction = loadRacketsActionCreator(rackets);

      const newRacketState = racketsReducer(
        currentRacketState,
        loadRacketsAction,
      );

      expect(newRacketState).toHaveProperty("rackets", rackets);
    });
  });
});
