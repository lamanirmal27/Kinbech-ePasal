import { createContext, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  return (
    <UserContext.Provider value={{ name, setName, user, setUser, pwd, setPwd }}>
      {children}
    </UserContext.Provider>
  );
};


export default UserContext;