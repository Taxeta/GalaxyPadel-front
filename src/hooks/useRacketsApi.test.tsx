import { renderHook } from "@testing-library/react";
import useRacketsApi from "./useRacketsApi";
import {
  myMockId,
  myMockId3,
  racketMock,
  racketsMock,
} from "../mocks/racketsMock";
import { User } from "firebase/auth";
import auth, { AuthStateHook, IdTokenHook } from "react-firebase-hooks/auth";
import { errorHandlers } from "../mocks/handlers";
import { server } from "../mocks/server";
import { setupStore } from "../store";
import { Provider } from "react-redux";
import { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";

beforeEach(() => {
  vi.clearAllMocks();
});

const uiWrapper = ({ children }: PropsWithChildren): React.ReactElement => {
  const store = setupStore({ racketsState: { rackets: racketsMock } });

  return (
    <BrowserRouter>
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  );
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

    test("Then it should return the message 'Success, racket deleted!'", async () => {
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

  describe("When calls a getRacketByIdApi function with id '64f3a180784b0b6d4ddd8feb'", async () => {
    const user: Partial<User> = {
      getIdToken: vi.fn().mockResolvedValue("token"),
    };

    const authStateHookMock: Partial<AuthStateHook> = [user as User];
    auth.useIdToken = vi.fn().mockReturnValue([user]);
    auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

    const { result } = renderHook(async () => await useRacketsApi(), {
      wrapper: uiWrapper,
    });
    const { getRacketByIdApi } = await result.current;

    const id = "64f3a180784b0b6d4ddd8fe2";

    test("Then it should return a racket 'Puma SolarATTACK Momo'", async () => {
      const selectedRacket = await getRacketByIdApi(id);

      expect(selectedRacket).toStrictEqual(myMockId);
    });

    test("Then it should throw an error 'Couldn't create the racket'", async () => {
      server.resetHandlers(...errorHandlers);

      const error = new Error("Couldn't get the racket");

      const newRacket = getRacketByIdApi(id);

      expect(newRacket).rejects.toThrowError(error);
    });
  });
});

describe("Given a function getRackets from useRacketsApi hook", () => {
  describe("When calls a modifyRacketById function with id '64f3a180784b0b6d4ddd8feb' and modify favorite", async () => {
    const user: Partial<User> = {
      getIdToken: vi.fn().mockResolvedValue("token"),
    };

    const authStateHookMock: Partial<AuthStateHook> = [user as User];
    auth.useIdToken = vi.fn().mockReturnValue([user]);
    auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

    const { result } = renderHook(async () => await useRacketsApi(), {
      wrapper: uiWrapper,
    });
    const { modifyRacketByIdApi } = await result.current;

    const id = "64f3a180784b0b6d4ddd8fe2";

    test("Then it should return the property favorite to true of the racket 'Puma SolarATTACK Momo'", async () => {
      const selectedRacket = await modifyRacketByIdApi(
        id,
        myMockId3[0].favorite,
      );

      expect(selectedRacket).toHaveProperty("favorite", false);
    });

    test("Then it should throw an error 'Couldn't create the racket'", async () => {
      server.resetHandlers(...errorHandlers);

      const error = new Error("Couldn't modify the racket");

      const newRacket = modifyRacketByIdApi(id, myMockId3[0].favorite);

      expect(newRacket).rejects.toThrowError(error);
    });
  });

  describe("When calling a modifyRacketApi function without user", () => {
    test("Then it should throw an error 'Couldn't modify the racket'", async () => {
      const id = "casdsadasd25427";

      const authStateHookMock: Partial<AuthStateHook> = [undefined];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      const idTokenHookMock: Partial<IdTokenHook> = [undefined];
      auth.useIdToken = vi.fn().mockReturnValue(idTokenHookMock);

      const error = new Error("Couldn't modify the racket");

      const { result } = renderHook(async () => await useRacketsApi(), {
        wrapper: uiWrapper,
      });
      const { modifyRacketByIdApi } = await result.current;

      const selectedRacket = modifyRacketByIdApi(id, myMockId3[0].favorite);

      expect(selectedRacket).rejects.toThrowError(error);
    });
  });

  describe("When calls a modifyVisibilityRacket function with id '64f3a180784b0b6d4ddd8feb' and modify visibility", async () => {
    const user: Partial<User> = {
      getIdToken: vi.fn().mockResolvedValue("token"),
    };

    const authStateHookMock: Partial<AuthStateHook> = [user as User];
    auth.useIdToken = vi.fn().mockReturnValue([user]);
    auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

    const { result } = renderHook(async () => await useRacketsApi(), {
      wrapper: uiWrapper,
    });
    const { modifyVisibilityRacket } = await result.current;

    const id = "64f3a180784b0b6d4ddd8fe2";

    test("Then it should return the property visibility to false of the racket 'Puma SolarATTACK Momo'", async () => {
      const selectedRacket = await modifyVisibilityRacket(
        id,
        myMockId3[0].visibility,
      );

      expect(selectedRacket).toHaveProperty("visibility", true);
    });

    test("Then it should throw an error 'Couldn't change visibility of the racket'", async () => {
      server.resetHandlers(...errorHandlers);

      const error = new Error("Couldn't change visibility of the racket");

      const newRacket = modifyVisibilityRacket(id, myMockId3[0].visibility);

      expect(newRacket).rejects.toThrowError(error);
    });
  });

  describe("When calling a modifyVisibilityRacket function without user", () => {
    test("Then it should throw an error 'Couldn't change visibility of the racket'", async () => {
      const id = "casdsadasd25427";

      const authStateHookMock: Partial<AuthStateHook> = [undefined];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      const idTokenHookMock: Partial<IdTokenHook> = [undefined];
      auth.useIdToken = vi.fn().mockReturnValue(idTokenHookMock);

      const error = new Error("Couldn't change visibility of the racket");

      const { result } = renderHook(async () => await useRacketsApi(), {
        wrapper: uiWrapper,
      });
      const { modifyVisibilityRacket } = await result.current;

      const selectedRacket = modifyVisibilityRacket(
        id,
        myMockId3[0].visibility,
      );

      expect(selectedRacket).rejects.toThrowError(error);
    });
  });
});
