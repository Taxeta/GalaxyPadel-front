import { rest } from "msw";
import { apiRacketsMock, racketsMock } from "./racketsMock";

export const handlers = [
  rest.get(
    `${import.meta.env.VITE_API_RACKETS_URL}rackets`,
    (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ rackets: apiRacketsMock }));
    },
  ),

  rest.delete(
    `${import.meta.env.VITE_API_RACKETS_URL}rackets/${racketsMock[0].id}`,
    (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({ message: "Success, racket deleted!" }),
      );
    },
  ),
];

export const errorHandlers = [
  rest.get(
    `${import.meta.env.VITE_API_RACKETS_URL}rackets`,
    (_req, res, ctx) => {
      return res(ctx.status(404, "Can't get any racket"));
    },
  ),

  rest.delete(
    `${import.meta.env.VITE_API_RACKETS_URL}rackets/${racketsMock[0].id}`,
    (_req, res, ctx) => {
      return res(ctx.status(404, "Could not delete racket"));
    },
  ),
];
