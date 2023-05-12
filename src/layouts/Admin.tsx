import { ReactNode } from "react";
import SidebarWithHeader from "../components/SidebarWithHeader";
import Authenticated from "./Authenticated";

export default function Admin({ children }: { children: ReactNode }) {
  return (
    <Authenticated>
      <SidebarWithHeader>{children}</SidebarWithHeader>
    </Authenticated>
  );
}
