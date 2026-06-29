import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleOnChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value.trim() });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      setErrorMessage("Please Fill all the fields");
    }

    try {
      //when we start the api call we must needs to set the loading
      setIsLoading(true);
      setErrorMessage(null);

      const signUpUrl = `/api/user/sign-up`;

      const response = await fetch(signUpUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      //Error from server side
      if (!data.success) {
        setErrorMessage(data.message);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);

      if (data.success) {
        navigate("/sign-in");
      }
    } catch (error) {
      //Error from client side
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex flex-col md:flex-row md:items-center p-3 max-w-3xl mx-auto">
        {/* left side  */}
        <div className="flex-1">
          <Link to="/" className="text-4xl font-bold dark:text-white">
            <span className="bg-gradient-to-r  from-cyan-500 to-fuchsia-500 rounded-2xl p-2  text-white ">
              Krishna's
            </span>{" "}
            Blog
          </Link>
          <p className="mt-5 text-sm font-semibold">
            This is a blog application you can signup here using your email or
            your google account
          </p>
        </div>
        {/* Right side  */}
        <div className="flex-1">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 mt-4 md:mt-0 p-4"
          >
            <div>
              <Label>User Name</Label>
              <TextInput
                type="text"
                placeholder="user name"
                id="username"
                onChange={handleOnChange}
              ></TextInput>
            </div>

            <div>
              <Label>Email</Label>
              <TextInput
                type="email"
                placeholder="Enter your email here"
                id="email"
                onChange={handleOnChange}
              ></TextInput>
            </div>

            <div>
              <Label>Password</Label>
              <TextInput
                type="password"
                placeholder="Enter your password here"
                id="password"
                onChange={handleOnChange}
              ></TextInput>
            </div>

            <Button
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:bg-gradient-to-l focus:ring-purple-200 dark:focus:ring-purple-800 cursor-pointer"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? (
                <>
                  <Spinner size="sm" /> <span className="p-3">Loading...</span>
                </>
              ) : (
                `Sign Up`
              )}
            </Button>
          </form>
          <div className="text-center md:text-left md:px-4">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-700 px-2">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
