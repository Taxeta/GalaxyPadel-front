import { PropsWithChildren } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import paths from "../../paths/paths";

const ProtectedRoute = ({
  children,
}: PropsWithChildren): React.ReactElement => {
  const [user] = useAuthState(auth);

  if (!user) {
    return <Navigate to={paths.home} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
