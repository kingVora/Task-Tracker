import { createContext, useContext, useState, useEffect } from "react";

type SidebarContextType = {
    isExpanded: boolean;
    isMobileOpen: boolean;
    isHovered: boolean;
    activeItem: string | null;
    toggleSidebar: () => void;
    toggleMobileSidebar: () => void;
    setIsHovered: (isHovered: boolean) => void;
    setActiveItem: (item: string | null) => void;
}

//Creating the context object consisting of the producer and consumer.
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// Custom hook to consume the sidebar context. So no need to use the consumer component.
export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
}

export const SidebarProvider: React.FC<{ children: React.ReactNode}> = ({
    children,
}) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [activeItem, setActiveItem] = useState<string | null>(null);

    // For mobile screens
    useEffect(()=>{
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if(!mobile){
                setIsMobileOpen(false);
            }
        };
        
        handleResize();
        //Adding the event listener to the window object to listen for resize events.
        window.addEventListener("resize",handleResize);

        return () => {
            //Cleaning up the event listener when the component unmounts.
            window.removeEventListener("resize",handleResize);
        }
    },[]);

    //Making use of the callback version as React's state updates are asynchronous.
    const toggleSidebar = () => {
        setIsExpanded((prev) => !prev);
    }

    const toggleMobileSidebar = () => {
        setIsMobileOpen((prev) => !prev);
    }
    // whatever is inside value is what is shared to its children.
    //The provider wraps other components and supplies the context value to them.
    return (
        <SidebarContext.Provider
            value={{
                isExpanded: isMobile ? false: isExpanded,
                isMobileOpen,
                isHovered,
                activeItem,
                toggleSidebar,
                toggleMobileSidebar,
                setIsHovered,
                setActiveItem,
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
};