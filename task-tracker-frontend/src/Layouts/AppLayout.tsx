import React from "react";
import { useSidebar } from "../Context/SidebarContext";
import { Sidebar } from "../Utils/LeftSideBar/Components/SideBar";
import BackDrop from "./BackDrop";

const LayoutContent: React.FC = () => {
    const { isExpanded, isHovered, isMobileOpen } = useSidebar();
    return(
        <div className="min-h-screen xl:flex">
            <div>
                <Sidebar />
                <BackDrop />    
            </div>
        </div>
    )
}