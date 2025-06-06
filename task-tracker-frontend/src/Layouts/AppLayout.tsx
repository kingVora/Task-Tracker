import React from "react";
import { SidebarProvider, useSidebar } from "../Context/SidebarContext";
import { Sidebar } from "../Utils/LeftSideBar/Components/SideBar";
import BackDrop from "./BackDrop";
import AppHeader from "./AppHeader";
import { Outlet } from "react-router";

const LayoutContent: React.FC = () => {
    const { isExpanded, isHovered, isMobileOpen } = useSidebar();
    return(
        <div className="min-h-screen xl:flex">
            <div>
                <Sidebar />
                <BackDrop />    
            </div>
            <div
                className={`flex-1 transition-all duration-300 ease-in-out ${
                isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
                } ${isMobileOpen ? "ml-0" : ""}`}
            >
                <AppHeader />
                <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    )
};

const AppLayout: React.FC = () => {
    return (
        <SidebarProvider>
            <LayoutContent />
        </SidebarProvider>
    )
}

export default AppLayout;