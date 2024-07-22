import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) {
        navigate("/");
      }
    },
    [isAuthenticated, navigate]
  );
  /*
  so remember how our effect is actually pnly executed
  after the component has already been rendered and so that 
  is actually the key to understanding why this happens. so our component 
  will actually initailly render the children which dose of course include the user so then of course everything that the user 
  is trying to read from the user object does not exists. so 
  thats why we get this error . to check error simple return children;
  */
  return isAuthenticated ? children : null;
}
export default ProtectedRoute;
