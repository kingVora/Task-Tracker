import { useCallback, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { useSidebar } from "../../../Context/SidebarContext";
import {
  CalenderIcon,
  GridIcon,
  HorizontaLDots,
  ListIcon,
  PieChartIcon,
} from "../../../icons";
// import SidebarWidget from "./SidebarWidget";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
};

const navItems: NavItem[] = [
  {
    name: "Dashboard",
    icon: <GridIcon/>
  },
  {
    name: "Task Log",
    icon: <ListIcon/>
  },
  {
    name: "Calendar",
    icon: <CalenderIcon/>
  },
  {
    name : "Reports",
    icon: <PieChartIcon/>
  }
];

export const Sidebar: React.FC = () => {
    const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
    const location = useLocation();

    // State to manage the open submenu
    // and the type of submenu (main or others)
    const [openSubmenu, setOpenSubmenu] = useState<{
      type: "main";
      index: number;
    } | null >(null);

    // State to manage the height of the submenu
    const [subMenuHeight, setSubMenuHeight] = useState<Record<string,number>>(
      {}
    );

    // Ref to store the submenu elements for height calculation
    const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

    // Used to indicate whether the current submenu is active or not.
    const isActive = useCallback(
      (path: string) => location.pathname === path,
      [location.pathname]
    );

    const renderMenuItems = (items: NavItem[]) => {
      return(
        <ul className="flex flex-col gap-4">
          {items.map((nav) => (
            <li key={nav.name}>
                {nav.path && (
                  <Link
                    to={nav.path}
                    className={`menu-item group ${
                      isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                    }`}  
                  >
                    <span className={`menu-item-icon-size ${
                      isActive(nav.path) ? "menu-item-icon-active" : "menu-item-icon-inactive"
                    }`}
                    >
                      {nav.icon}
                    </span>
                    {(isExpanded || isHovered || isMobileOpen) && (
                      <span className="menu-item-text">{nav.name}</span>
                    )}
                  </Link>
                )}
            </li>
          ))}
        </ul>
      )
    }

    return (
      <aside
        className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200
          ${
            isExpanded || isMobileOpen ? "w-[290px]" : isHovered ? "w-[290px]" : "w-[90px]"
          }
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
          onMouseEnter={() => !isExpanded && setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`py-8 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}>
            <Link to="/">
            {isExpanded || isHovered || isMobileOpen ? (
            <>
              <img
                className="dark:hidden"
                src="/images/logo/logo.svg"
                alt="Logo"
                width={150}
                height={40}
              />
              <img
                className="hidden dark:block"
                src="/images/logo/logo-dark.svg"
                alt="Logo"
                width={150}
                height={40}
              />
            </>
          ) : (
            <img
              src="/images/logo/logo-icon.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
            </Link>
        </div>
        <div>
          <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
            <nav className="mb-6">
              <div className="flex flex-col gap-4">
                <div>
                  <h2
                    className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                      !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
                    }`}
                  >
                    {isExpanded || isHovered || isMobileOpen ? (
                      "Menu"
                    ) : (
                      <HorizontaLDots className="size-6" />
                    )}
                  </h2>
                  {renderMenuItems(navItems)}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </aside>
    )
};