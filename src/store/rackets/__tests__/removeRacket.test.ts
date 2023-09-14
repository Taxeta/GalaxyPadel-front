import { racketsMock } from "../../../mocks/racketsMock";
import { RacketState } from "../../types";
import { removeRacketActionCreator, racketsReducer } from "../racketsSlice";

describe("Given a rackets Slice", () => {
  describe("When it receives a deleteRacket action with a rackets 'Adidas Metalbone 3.2' and 'Bullpadel Vertex 03 CTR' and id 'addidasId'", () => {
    test(
      "Then it should return a new state with the racket 'Bullpadel Vertex 03 CTR'",
    );
    const currentRacketsState: RacketState = {
      rackets: racketsMock,
    };

    const removeRacketAction = removeRacketActionCreator(
      "64f3a180784b0b6d4ddd8fe2",
    );

    const newRacketsState = racketsReducer(
      currentRacketsState,
      removeRacketAction,
    );

    expect(newRacketsState.rackets).not.toContain(racketsMock[0]);
  });

  describe("When it receives a deleteRacket action with a rackets 'Adidas Metalbone 3.2' and 'Bullpadel Vertex 03 CTR' and no exist id 'noexistid'", () => {
    test("Then it should return a new state with the same rackets", () => {
      const currentRacketsState: RacketState = {
        rackets: racketsMock,
      };
      const deleteRacketAction = removeRacketActionCreator("noexistid");

      const newRacketsState = racketsReducer(
        currentRacketsState,
        deleteRacketAction,
      );

      expect(newRacketsState.rackets).toStrictEqual(racketsMock);
    });
  });
});
