import { Racket } from "../types";

export interface RacketState {
  rackets: Racket[];
  selectedRacket?: Racket | null;
}
