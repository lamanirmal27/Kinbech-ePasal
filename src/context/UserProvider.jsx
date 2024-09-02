import { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const { auth } = useAuth();
  const [uid, setUid] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUserSideBarOpen, setIsUserSideBarOpen] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (isLoggedIn) {
      const getUserData = async () => {
        try {
          const response = await axios.get(`/users/${auth.userId}`);
          setUserData(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      getUserData();
    }
  }, [auth.userId, isLoggedIn, userData]);

  return (
    <UserContext.Provider
      value={{
        name,
        setName,
        user,
        setUser,
        pwd,
        setPwd,
        isLoggedIn,
        setIsLoggedIn,
        isUserSideBarOpen,
        setIsUserSideBarOpen,
        username,
        uid,
        setUid,
        userData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
