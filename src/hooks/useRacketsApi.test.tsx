import { renderHook } from "@testing-library/react";
import useRacketsApi from "./useRacketsApi";
import { racketMock, racketsMock } from "../mocks/racketsMock";
import { User } from "firebase/auth";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import { errorHandlers } from "../mocks/handlers";
import { server } from "../mocks/server";
import { setupStore } from "../store";
import { Provider } from "react-redux";
import { PropsWithChildren } from "react";

beforeEach(() => {
  vi.clearAllMocks();
});

const uiWrapper = ({ children }: PropsWithChildren): React.ReactElement => {
  const store = setupStore({ racketsState: { rackets: racketsMock } });

  return <Provider store={store}>{children}</Provider>;
};

describe("Given a function getRackets from useRacketsApi hook", () => {
  describe("When the function is called", () => {
    const user: Partial<User> = {
      getIdToken: vi.fn().mockResolvedValue("token"),
    };

    const authStateHookMock: Partial<AuthStateHook> = [user as User];
    auth.useIdToken = vi.fn().mockReturnValue([user]);
    auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

    const {
      result: {
        current: { getRackets },
      },
    } = renderHook(() => useRacketsApi(), { wrapper: uiWrapper });

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

  describe("When calls a deleteRacketApi function with id '64f3a180784b0b6d4ddd8fe2'", async () => {
    const user: Partial<User> = {
      getIdToken: vi.fn().mockResolvedValue("token"),
    };

    const authStateHookMock: Partial<AuthStateHook> = [user as User];
    auth.useIdToken = vi.fn().mockReturnValue([user]);
    auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

    const { result } = renderHook(async () => await useRacketsApi(), {
      wrapper: uiWrapper,
    });
    const { deleteRacketApi } = await result.current;

    test("Then it should return the message ''", async () => {
      const expectedMessage = { message: "Success, racket deleted!" };
      const id = "64f3a180784b0b6d4ddd8fe2";

      const message = await deleteRacketApi(id);

      expect(message).toStrictEqual(expectedMessage);
    });

    test("Then it should throw an error 'Couldn't delete the racket'", () => {
      server.resetHandlers(...errorHandlers);

      const id = "64f3a180784b0b6d4ddd8fe2";
      const error = new Error("Couldn't delete the racket");

      const message = deleteRacketApi(id);

      expect(message).rejects.toThrowError(error);
    });
  });

  describe("When is received a createRacketApi function with a racket 'newRacketMock'", async () => {
    const user: Partial<User> = {
      getIdToken: vi.fn().mockResolvedValue("token"),
    };

    const authStateHookMock: Partial<AuthStateHook> = [user as User];
    auth.useIdToken = vi.fn().mockReturnValue([user]);
    auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

    const { result } = renderHook(async () => await useRacketsApi(), {
      wrapper: uiWrapper,
    });
    const { createRacketApi } = await result.current;

    test("Then it should show a new racket 'Black Crown Hurricane 2.0'", async () => {
      const newRacket = await createRacketApi(racketMock);

      expect(newRacket).toStrictEqual(racketMock);
    });

    test("Then it should throw an error 'Couldn't create the racket'", async () => {
      server.resetHandlers(...errorHandlers);

      const error = new Error("Couldn't create the racket");

      const newRacket = createRacketApi(racketMock);

      expect(newRacket).rejects.toThrowError(error);
    });
  });
});
