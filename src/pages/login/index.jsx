import { Link, useNavigate, useLocation } from "react-router-dom";
import UserContext from "../../context/UserProvider";
import { useContext, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
const LOGIN_URL = "/auth";

const LoginPage = () => {
  const { setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { user, setUser, pwd, setPwd, setUsers } = useContext(UserContext);

  const userRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(user, pwd);
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, accessToken, roles });
      setUser("");
      setPwd("");
      toast.success("Login Success");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        toast.error("No response from server");
      } else if (err.response?.status === 400) {
        toast.error("Missing username or password");
      } else if (err.response?.status === 401) {
        toast.error("Unauthorized");
      } else {
        toast.error("Login failed");
      }
      setUser("");
      setPwd("");
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <div className="flex min-h-screen items-center justify-center mx-auto px-4 lg:mx-auto md:mx-auto sm:mx-auto">
      <div className="relative flex flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none">
        <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          Login
        </h4>
        <p className="mt-1 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
          Enter your details to Login.
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-8 mb-2 w-80 max-w-md mx-auto px-4 sm:w-90 sm:px-0"
        >
          <div className="mb-4 flex flex-col gap-6">
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                className="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-orange-600 focus:border-t-transparent focus:outline-none disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
                ref={userRef}
                value={user}
                onChange={(e) => setUser(e.target.value)}
                autoComplete="off"
                required
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
                className="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-orange-600 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-orange-600 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-orange-600 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-orange-600 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Password
              </label>
            </div>
          </div>
          <button
            className="mt-6 block w-full select-none rounded-lg bg-orange-600 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-orange-600/20 transition-all hover:shadow-lg hover:shadow-orange-600/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-light="true"
          >
            Login
          </button>
          <div className="flex flex-row items-center justify-start py-2 px-4 text-[0.875rem]">
            <input
              type="checkbox"
              id="persist"
              onChange={togglePersist}
              checked={persist}
              className="mr-2"
            />
            <label htmlFor="persist">Keep me Logged In</label>
          </div>
          <p className="mt-4 block text-center font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
            No Account?
            <Link
              to={"/register"}
              className="font-semibold text-orange-600 transition-colors hover:text-orange-600"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
