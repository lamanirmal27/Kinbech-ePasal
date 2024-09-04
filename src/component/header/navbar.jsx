import { useContext, useEffect, useState } from "react";
import logo from "../../assets/new-logo.png";
import SearchItems from "../SearchItems";
import "./animate.css";
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  XMarkIcon,
  BookOpenIcon,
  ShoppingBagIcon,
  UserIcon,
  BuildingLibraryIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useLocation, Link } from "react-router-dom";
import ProductContext from "../../context/ProductProvider";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
import UserContext from "../../context/UserProvider";
import toast from "react-hot-toast";

const products = [
  {
    name: "Fashion",
    description: "Pant, shirt, t-shirt",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Electronics",
    description: "TVs, Laptop, Mobile, Accessories",
    icon: ChartPieIcon,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItemCount,
    scrollToElectronics,
    scrollToFashion,
  } = useContext(ProductContext);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { auth } = useAuth();
  const { isLoggedIn, setIsLoggedIn, isUserSideBarOpen, setIsUserSideBarOpen } =
    useContext(UserContext);
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/register" ||
    location.pathname === "/login" ||
    location.pathname === "/admin/";

  const count = 1;
  const isAdmin = auth?.roles?.find((role) => [5150]?.includes(role));

  const logout = useLogout();

  useEffect(() => {
    setIsLoggedIn(!!auth?.roles?.find((role) => [5150, 2001].includes(role)));
  }, [auth]);
  return (
    <header className="bg-white top-0 fixed mt-0 w-full bg-opacity-20 backdrop-blur-lg z-10 ">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 "
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link
            to={"/"}
            className="-m-1.5 p-1.5 flex  font-semibold leading-6 text-gray-900"
          >
            <img className="h-16 w-auto spin-on-hover" src={logo} alt="logo" />
            <span className="flex items-center">Kinbech e-Pasal</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              Categories
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
              />
            </PopoverButton>

            {!isAuthPage && (
              <PopoverPanel
                transition
                className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        if (item.name === "Fashion") {
                          scrollToFashion();
                        } else {
                          scrollToElectronics();
                        }
                      }}
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon
                          className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-auto">
                        <a className="block font-semibold text-gray-900">
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </PopoverPanel>
            )}
          </Popover>
        </PopoverGroup>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <SearchItems />

          {isAdmin && (
            <Link to={"admin/"} className="flex items-center">
              <BuildingLibraryIcon className="h-7 px-7 w-auto relative" />
            </Link>
          )}
          <button
            onClick={() => {
              if (!isLoggedIn) {
                toast.error("Log in to see your cart");
              } else {
                setIsCartOpen(!isCartOpen);
              }
            }}
            className="flex items-center relative"
          >
            <ShoppingBagIcon className="h-7 px-7 w-auto relative" />
            {cartItemCount > 0 && (
              <div className="absolute top-0 right-3 px-2 py-1 text-xs leading-none text-white bg-orange-600 rounded-full">
                {cartItemCount}
              </div>
            )}
          </button>
          {!isLoggedIn ? (
            <Link
              to={"/login"}
              className="text-sm my-auto font-semibold leading-6 text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          ) : (
            <div
              onClick={() => {
                setIsUserSideBarOpen(!isUserSideBarOpen);
                console.log(isUserSideBarOpen);
                
              }}
              className="flex items-center gap-x-6 rounded-full "
            >
              <UserIcon className="h-10 w-auto " />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
