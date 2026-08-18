import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOutSuccess } from "../redux/user/userSlice";

const useSignOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signOut = async () => {
    try {
      const result = await fetch("http://localhost:4500/api/user/signout", {
        method: "POST",
        credentials: "include",
      });

      if (!result.ok) {
        console.error("Error when signout user");
        return;
      }

      const data = await result.json();

      if (!data.success) {
        console.error("Error when signout user");
      }

      dispatch(signOutSuccess());
      navigate("/sign-in");
    } catch (error) {
      console.error("Error when signout user", error);
    }
  };

  return signOut;
};

export default useSignOut;
