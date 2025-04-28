import { useState } from "react";
import { useSidebar } from "../Context/SidebarContext"

const AppHeader: React.FC = () => {
    const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();
    const [ isApplicationMenuOpen, setIsApplicationMenuOpen ] = useState(false);
    
}