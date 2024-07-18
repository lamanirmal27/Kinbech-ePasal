import { createContext, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [uid, setUid] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUserSideBarOpen, setIsUserSideBarOpen] = useState(false);

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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
