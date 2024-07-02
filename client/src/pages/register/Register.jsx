import { useContext, useEffect, useRef, useState } from "react";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import UserContext from "../../context/UserProvider";

const userUrl = "/user";
const NAMEREGEX = /^(?!.*\d)(?!.*[^a-zA-Z\s]).{6,}$/;
const USERREGEX = /^(?![A-Z])\S{6,}$/;

export default function Register() {
  const nameRef = useRef();
  const { name, setName, user, setUser, pwd, setPwd } = useContext(UserContext);

  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [validUser, setValidUser] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(NAMEREGEX.test(name));
  }, [name]);

  useEffect(() => {
    setValidUser(USERREGEX.test(user));
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validName || !validUser) {
      return;
    }
    try {
      const response = await axios.post(
        userUrl,
        JSON.stringify({ name, user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success("Registration Success");
      setName("");
      setUser("");
      setPwd("");
      setNameFocus(false);
      setUserFocus(false);
    } catch (err) {
      if (!err?.response) {
        toast.error("No response from server");
      } else if (err.response?.status === 409) {
        toast.error("Username already taken");
      } else {
        toast.error("Registration Failed");
      }
      setName("");
      setUser("");
      setPwd("");
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center lg:mx-auto md:mx-auto sm:mx-auto">
      <div className="relative flex flex-col rounded-xl bg-transparent bg-clip-border text-black shadow-none">
        <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          Sign Up
        </h4>
        <p className="mt-1 block font-sans text-base font-normal leading-relaxed text-black antialiased">
          Enter your details to register.
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-80 sm:px-0"
        >
          <div className="mb-4 flex flex-col gap-6">
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                ref={nameRef}
                value={name}
                autoComplete="off"
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setNameFocus(true)}
                required
                className="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-black outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-orange-600 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-orange-600 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-orange-600 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-orange-600 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Name
              </label>
            </div>
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                value={user}
                onChange={(e) => setUser(e.target.value)}
                autoComplete="off"
                onFocus={() => setUserFocus(true)}
                required
                className="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-black outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-orange-600 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-orange-600 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-orange-600 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-orange-600 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Username
              </label>
            </div>
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                type="password"
                className="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-black outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-orange-600 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-orange-600 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-orange-600 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-orange-600 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Password
              </label>
            </div>
          </div>
          <button
            disabled={!validName || !validUser || !(pwd.length > 5)}
            className="mt-6 block w-full select-none rounded-lg bg-orange-600 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-orange-600/20 transition-all hover:shadow-lg hover:shadow-orange-600/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-light="true"
          >
            Register
          </button>
          <p className="mt-4 block text-center font-sans text-base font-normal leading-relaxed text-black antialiased">
            Already have an account?
            <Link
              to={"/login"}
              className="font-semibold text-orange-600 transition-colors hover:text-blue-700"
              href="#"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
