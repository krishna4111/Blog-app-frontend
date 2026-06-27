import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

export default function Signup() {
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
          <form className="flex flex-col gap-4 mt-4 md:mt-0 p-4">
            <div>
              <Label>User Name</Label>
              <TextInput
                type="text"
                placeholder="user name"
                id="username"
              ></TextInput>
            </div>

            <div>
              <Label>Email</Label>
              <TextInput
                type="email"
                placeholder="Enter your email here"
                id="email"
              ></TextInput>
            </div>

            <div>
              <Label>Password</Label>
              <TextInput
                type="text"
                placeholder="Enter your password here"
                id="password"
              ></TextInput>
            </div>

            <Button
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:bg-gradient-to-l focus:ring-purple-200 dark:focus:ring-purple-800 cursor-pointer"
              type="submit"
            >
              Sign Up
            </Button>
          </form>
          <div className="text-center md:text-left md:px-4">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-700 px-2">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
