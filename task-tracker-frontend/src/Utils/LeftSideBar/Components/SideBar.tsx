import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";

// import { useSidebar } from "../context/SidebarContext";
// import SidebarWidget from "./SidebarWidget";

type NavItem = {
  name: string;
  icon?: React.ReactNode;
  path?: string;
};

const navItems: NavItem[] = [
  {
    name: "Dashboard",
  },
  {
    name: "Task Log"
  },
  {
    name: "Calendar"
  },
  {
    name : "Reports"
  }
];

export const Sidebar: React.FC = () => {
  return(
    <></>
  )
}