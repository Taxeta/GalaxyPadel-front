import { rest } from "msw";
import {
  apiRacketsMock,
  getMockId,
  newRacketsMock,
  onlyMockId,
  racketsMock,
} from "./racketsMock";

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

  rest.post(
    `${import.meta.env.VITE_API_RACKETS_URL}rackets`,
    (_req, res, ctx) => {
      return res(ctx.status(201), ctx.json({ racket: newRacketsMock }));
    },
  ),

  rest.get(
    `${import.meta.env.VITE_API_RACKETS_URL}rackets/${onlyMockId}`,
    (_req, res, ctx) => {
      return res(ctx.json({ racket: getMockId }));
    },
  ),

  rest.patch(
    `${import.meta.env.VITE_API_RACKETS_URL}rackets/${onlyMockId}`,
    (_req, res, ctx) => {
      return res(ctx.json({ racket: { ...getMockId } }));
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

  rest.post(
    `${import.meta.env.VITE_API_RACKETS_URL}rackets`,
    (_req, res, ctx) => {
      return res(ctx.status(500, "Could not create the racket"));
    },
  ),

  rest.get(
    `${import.meta.env.VITE_API_RACKETS_URL}rackets/${onlyMockId}`,
    (_req, res, ctx) => {
      return res(ctx.status(500, "Couldn't load the racket"));
    },
  ),

  rest.patch(
    `${import.meta.env.VITE_API_RACKETS_URL}rackets/${onlyMockId}`,
    (_req, res, ctx) => {
      return res(ctx.status(500, "Can't modify the racket"));
    },
  ),
];
