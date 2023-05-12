import { useEffect, useState } from "react";
import { User } from "../types";
import axios from "axios";

export default function useAuth(): [User | null, boolean] {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users/me", {
        withCredentials: true,
      })
      .then((response) => {
        setUser(response.data.user);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  }, []);

  return [user, isLoading];
}
