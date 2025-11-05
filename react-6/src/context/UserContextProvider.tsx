import { useState, type ReactNode } from "react";
import UserContext from "./UserContext";


export default function UserContextProvider({ children }: { children: ReactNode }) {

  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}