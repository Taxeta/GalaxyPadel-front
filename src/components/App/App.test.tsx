import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import App from "./App";
import paths from "../../paths/paths";
import auth, { AuthStateHook, IdTokenHook } from "react-firebase-hooks/auth";
import userEvent from "@testing-library/user-event";
import { Auth, User, signInWithPopup, signOut } from "firebase/auth";
import { Provider } from "react-redux";
import { setupStore, store } from "../../store";
import { racketsMock } from "../../mocks/racketsMock";

beforeEach(() => {
  vi.clearAllMocks();
});

vi.mock("firebase/auth", async () => {
  const actual: Auth = await vi.importActual("firebase/auth");
  return {
    ...actual,
    signInWithPopup: vi.fn(),
    signOut: vi.fn(),
  };
});

const user: Partial<User> = {
  getIdToken: vi.fn().mockResolvedValue("token"),
};

auth.useIdToken = vi.fn().mockReturnValue([user]);

describe("Given a App component", () => {
  describe("When it's rendered", () => {
    test("Then it should show a 'Galaxy Padel' title", () => {
      const appTitle = "Galaxy Padel";

      const user: Partial<User> = {
        displayName: "Arturo",
      };

      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>,
      );

      const textHeader = screen.getByRole("heading", { name: appTitle });

      expect(textHeader).toBeInTheDocument();
    });
  });

  describe("When login button is clicked", () => {
    test("Then it should show call login function", async () => {
      const buttonText = "Github logo Login via Github";
      const route = paths.home;

      const authStateHookMock: Partial<AuthStateHook> = [null as null];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <MemoryRouter initialEntries={[route]}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>,
      );

      const loginButton = screen.getByRole("button", { name: buttonText });
      await userEvent.click(loginButton);

      expect(signInWithPopup).toHaveBeenCalled();
    });
  });

  describe("When the user clicks on the logout Button", () => {
    test("Then it should call logout function", async () => {
      const buttonText = "Exit icon";
      const route = paths.rackets;

      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <MemoryRouter initialEntries={[route]}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>,
      );

      const logoutButton = screen.getByRole("button", { name: buttonText });
      await userEvent.click(logoutButton);

      expect(signOut).toHaveBeenCalled();
    });
  });

  describe("When the user is not logged", () => {
    test("Then it should show 'Login to access your account'", () => {
      const route = paths.rackets;
      const text = "Login to access your account";
      const authStateHookMock: Partial<AuthStateHook> = [null as null];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <MemoryRouter initialEntries={[route]}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>,
      );

      const headingText = screen.getByRole("heading", { name: text });

      expect(headingText).toBeInTheDocument();
    });
  });

  describe("When the user is logged", () => {
    test("Then it should show 'Login to access your account'", () => {
      const route = paths.home;
      const text = "Padel Professional Rackets";

      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <MemoryRouter initialEntries={[route]}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>,
      );

      const headingText = screen.getByRole("heading", { name: text });

      expect(headingText).toBeInTheDocument();
    });
  });
});

describe("Given a RacketsForm component rendered on App component", () => {
  describe("When the user creates a racket 'newRacket' in FormPage", () => {
    test("Then it should show the RacketsPage with 'Black Crown Hurricane 2.0' racket", async () => {
      const nameLabelText = "Name:";
      const shapeLabelText = "Shape:";
      const weightLabelText = "Weight ( 300 - 400g ):";
      const materialLabelText = "Material:";
      const imageLabelText = "Image URL:";
      const descriptionLabelText = "Description:";

      const name = "Black Piton";
      const size = "Tear shape";
      const weight = 350;
      const material = "Soft EVA";
      const image = "https://image.png";
      const description = "Racket to prove if description is ok";

      const user: Partial<User> = {
        displayName: "Arturo",
      };

      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      const store = setupStore({
        racketsState: { rackets: racketsMock },
      });

      const buttonText = "Create";
      const headingText = "Adidas Metalbone 3.2";

      render(
        <MemoryRouter initialEntries={[paths.create]}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>,
      );

      const nameLabel = await screen.findByLabelText(nameLabelText);
      const shapeLabel = await screen.findByLabelText(shapeLabelText);
      const weightLabel = await screen.findByLabelText(weightLabelText);
      const materialLabel = await screen.findByLabelText(materialLabelText);
      const imageLabel = await screen.findByLabelText(imageLabelText);
      const descriptionLabel = await screen.findByLabelText(
        descriptionLabelText,
      );

      await userEvent.type(nameLabel, name);
      await userEvent.selectOptions(shapeLabel, size);
      await userEvent.type(weightLabel, weight.toString());
      await userEvent.selectOptions(materialLabel, material);
      await userEvent.type(imageLabel, image);
      await userEvent.type(descriptionLabel, description);

      const button = await screen.findByRole("button", { name: buttonText });
      await userEvent.click(button);

      await waitFor(async () => {
        const heading = await screen.findByRole("heading", {
          name: headingText,
        });
        expect(heading).toBeInTheDocument();
      });
    });
  });

  describe("When the user clicks on 'see details' link", () => {
    test("Then it should navigate to detail and show the name of the racket in a heading", async () => {
      const rackets = "/rackets";
      const detail = "/rackets/64f3a180784b0b6d4ddd8fe2";
      const headingText = "See details";
      const racketText = "description";

      const store = setupStore({ racketsState: { rackets: racketsMock } });

      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);
      const authIdTokenHookMock: Partial<IdTokenHook> = [user as User];
      auth.useAuthState = vi.fn().mockReturnValue(authIdTokenHookMock);

      render(
        <MemoryRouter initialEntries={[rackets, detail]} initialIndex={0}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>,
      );

      const detailLink = await screen.findAllByRole("link", {
        name: headingText,
      });

      await userEvent.click(detailLink[0]);

      const heading = await screen.findByLabelText(racketText);
      expect(heading).toBeInTheDocument();
    });
  });

  describe("When it's rendered", () => {
    test("Then it should show when the state is true, a favorite fill button", async () => {
      const expectedAltTextImage = "Fill favorite icon";
      const altTextImage = "Empty favorite icon";
      const rackets = "/rackets";

      const user: Partial<User> = {
        getIdToken: vi.fn().mockResolvedValue("token"),
      };

      auth.useIdToken = vi.fn().mockReturnValue([user]);
      const store = setupStore({ racketsState: { rackets: racketsMock } });

      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);
      const authIdTokenHookMock: Partial<IdTokenHook> = [user as User];
      auth.useAuthState = vi.fn().mockReturnValue(authIdTokenHookMock);

      render(
        <MemoryRouter initialEntries={[rackets]}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>,
      );

      const favoriteIcon = await screen.findAllByRole("button", {
        name: altTextImage,
      });

      await userEvent.click(favoriteIcon[0]);

      const newFavoriteState = await screen.findAllByRole("button", {
        name: expectedAltTextImage,
      });
      expect(newFavoriteState[0]).toBeInTheDocument();
    });
  });
});
