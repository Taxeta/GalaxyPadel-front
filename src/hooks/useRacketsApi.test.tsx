import { renderHook } from "@testing-library/react";
import useRacketsApi from "./useRacketsApi";
import { racketsMock } from "../mocks/racketsMock";
import { User } from "firebase/auth";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import { errorHandlers } from "../mocks/handlers";
import { server } from "../mocks/server";

beforeEach(() => {
  vi.clearAllMocks();
});

const user: Partial<User> = {
  getIdToken: vi.fn().mockResolvedValue("token"),
};

const authStateHookMock: Partial<AuthStateHook> = [user as User];
auth.useIdToken = vi.fn().mockReturnValue([user]);
auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

describe("Given a function getRackets from useRacketsApi hook", () => {
  describe("When the function is called", () => {
    const {
      result: {
        current: { getRackets },
      },
    } = renderHook(() => useRacketsApi());

    test("Then it should receive a list of rackets", async () => {
      const rackets = await getRackets();

      expect(rackets).toStrictEqual(racketsMock);
    });

    test("Then it should throw an error 'Can't get any racket'", () => {
      server.resetHandlers(...errorHandlers);

      const error = new Error("Can't get any racket");

      const rackets = getRackets();

      expect(rackets).rejects.toThrowError(error);
    });
  });
});
