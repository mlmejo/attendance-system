import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { Box, Center } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";

export default function Authenticated({ children }: { children: ReactNode }) {
  const [user, isLoading] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isLoading) {
      navigate("/login");
    }
  }, [user, isLoading]);

  return (
    <>
      {isLoading ? (
        <Center h="100vh">
          <Spinner size="xl" />
        </Center>
      ) : (
        <Box>{children}</Box>
      )}
    </>
  );
}
