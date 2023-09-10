import { rest } from "msw";
import { apiRacketsMock } from "./racketsMock";

export const handlers = [
  rest.get(
    `${import.meta.env.VITE_API_RACKETS_URL}rackets`,
    (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json(apiRacketsMock));
    },
  ),
];

export const errorHandlers = [
  rest.get(
    `${import.meta.env.VITE_API_RACKETS_URL}rackets`,
    (_req, res, ctx) => {
      return res(ctx.status(404, "Can't get any user"));
    },
  ),
];
