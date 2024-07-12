import React, { useContext } from "react";
import UserContext from "../../context/UserProvider";
import {
  UserIcon,
  XMarkIcon,
  ArchiveBoxIcon,
  PlusCircleIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import useLogout from "../../hooks/useLogout";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import useAuth from "../../hooks/useAuth";
import { NavLink } from "react-router-dom";

const UserSideBar = () => {
  const { isUserSideBarOpen, setIsUserSideBarOpen } = useContext(UserContext);
  const logout = useLogout();
  const { auth } = useAuth();
  const menus = [
    { name: "Your profile", link: "/", icon: UserIcon },
    { name: "Your orders", link: "/", icon: ArchiveBoxIcon },
    { name: "Add Product", link: "/", icon: PlusCircleIcon },
    { name: "Notification", link: "/", icon: BellIcon },
  ];
  console.log(auth);
  return (
    <Dialog
      open={isUserSideBarOpen}
      onClose={setIsUserSideBarOpen}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-sm transform transition duration-600 ease-in-out data-[closed]:translate-x-full sm:duration-700 z-50"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className=" px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between border-b border-gray-200 pb-10">
                    <DialogTitle className="flex items-center flex-grow  text-gray-900">
                      <UserIcon className="h-10 w-auto rounded-full border-2 border-orange-600" />
                      <p className="px-3 text-lg font-medium text-gray-900">
                        {auth && auth.fullName}
                      </p>
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setIsUserSideBarOpen(false)}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-3  ">
                    {menus.map((menu, i) => (
                      <NavLink
                        to={menu.link}
                        key={i}
                        className={`group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-200`}
                      >
                        <menu.icon className="h-5 w-5" />
                        <h2 className="font-normal ">{menu.name}</h2>
                      </NavLink>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="mt-6">
                      <div
                        onClick={() => {
                          logout();
                          setIsUserSideBarOpen(false);
                        }}
                        className="flex items-center justify-center rounded-md border border-transparent bg-orange-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-orange-700"
                      >
                        Sign out
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default UserSideBar;
