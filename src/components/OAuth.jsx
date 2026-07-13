import { Button } from "flowbite-react";
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();

    console.log("provider is ", provider);
    //which always we needs to select the account
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      dispatch(signInStart());
      const resultsFromGoogle = await signInWithPopup(auth, provider);

      const { accessToken, email, displayName, photoURL, uid, providerData } =
        resultsFromGoogle.user;

      const actualProviderDetails = providerData[0].providerId;

      const res = await fetch("api/user/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: displayName,
          email: email,
          profile: photoURL,
          token: accessToken,
          userId: uid,
          provider: actualProviderDetails,
        }),
      });
      console.log(res);

      const data = await res.json();

      if (data.success) {
        dispatch(signInSuccess(data.user));
        navigate("/home");
      } else {
        dispatch(signInFailure(data.message));
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
      console.error("Error when handle google oauth click", error);
    }
  };

  return (
    <div>
      <Button
        type="button"
        className="w-full  hover:cursor-pointer"
        outline
        onClick={handleGoogleClick}
      >
        <div className="flex items-center justify-center gap-3">
          <FaGoogle />
          Continue With Google
        </div>
      </Button>
    </div>
  );
}
