import { ReactNode, useEffect, useState } from "react";
import { User } from "../types";
import axios from "axios";
import SidebarWithHeader from "../components/SidebarWithHeader";

export default function Admin({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/users/me", {
        withCredentials: true,
      })
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((error) => console.error(error));
  }, []);

  return <SidebarWithHeader user={user}>{children}</SidebarWithHeader>;
}
