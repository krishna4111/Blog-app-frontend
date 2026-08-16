import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import OAuth from "../components/OAuth";
import { mapUser } from "../dto/user.dto";

export default function Signin() {
  const [formData, setFormData] = useState();

  const { loading: isLoading, error: errorMessage } = useSelector(
    (state) => state.user,
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();
    let { email, password } = formData;

    email = email.trim();
    password = password.trim();

    try {
      dispatch(signInStart());

      setTimeout(() => {}, 50000);

      if (!email || !password) {
        return dispatch(signInFailure("Email and password is required"));
      }
      const signInUrl = "/api/user/sign-in";

      const result = await fetch(signInUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await result.json();

      console.log("actual user data is this ===>", data);

      if (!data.success) {
        dispatch(signInFailure(data.message));
        return;
      }

      console.log("user data ==>", data.data);

      const user = mapUser(data.data);

      dispatch(signInSuccess(user));

      //we get the token keep it in the redux store and toolkit etc.
      navigate("/home");
    } catch (error) {
      dispatch(signInFailure(error.message));
      console.error("Error when sign in ", error);
    }
  };

  return (
    <div className="min-h-screen max-w-3xl mx-auto p-4 mt-20">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* left side  */}
        <div className="flex-1">
          <Link to="/" className="font-bold text-4xl dark:text-white">
            <span className="bg-gradient-to-r from-indigo-400 via-violet-600 to-pink-500 p-2 rounded-2xl text-white">
              Krishna's
            </span>
            Blog
          </Link>
          <p className="font-semibold mt-5">
            This is krishna's blog application
          </p>
        </div>
        {/* right side */}
        <div className="flex-1">
          <form onSubmit={handleSignIn} className="flex flex-col gap-4">
            <div>
              <Label>Email</Label>
              <TextInput
                type="text"
                placeholder="Enter your email"
                id="email"
                onChange={(e) => {
                  setFormData((preState) => {
                    return {
                      ...preState,
                      [e.target.id]: e.target.value,
                    };
                  });
                }}
              ></TextInput>
            </div>
            <div>
              <Label>Password</Label>
              <TextInput
                type="password"
                placeholder="Enter your password"
                id="password"
                onChange={(e) => {
                  setFormData((prevState) => {
                    return {
                      ...prevState,
                      [e.target.id]: e.target.value,
                    };
                  });
                }}
              ></TextInput>
            </div>
            {errorMessage && (
              <p className="font-semibold text-red-700 p-2">{errorMessage}</p>
            )}
            <Button
              type="submit"
              className="bg-gradient-to-r from-indigo-400 via-violet-600 to-pink-500 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Spinner className="p-4" />
                  <span className="text-sm font-semibold text-white">
                    Loading ...
                  </span>
                </>
              ) : (
                "singIn"
              )}
            </Button>
            <OAuth />

            <p>
              Don't Have an account please click here to{" "}
              <Link to="/sign-up" className="text-blue-600 cursor-pointer">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
