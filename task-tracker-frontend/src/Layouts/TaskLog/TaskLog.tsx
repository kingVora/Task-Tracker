import { useEffect, useRef, useState } from "react";
import Tasks from "../Dashboard/Components/Tasks";

export default function TaskLog () {

    const [updateMetrics, setUpdateMetrics] = useState(false);
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [backendUrl, setBackendUrl] = useState("tasks");
    const [search, setSearch] = useState("");

    const dropdownRef = useRef<HTMLDivElement>(null);

    const categoryOptions = ["Priority", "Status"];
    const subCategoryOptions: { [key: string]: string[] } = {
        Priority: ["Low", "Medium", "High"],
        Status: ["Due", "Completed", "Overdue"]
    };
    /*
     React.ChangeEvent<HTMLSelectElement> is a typescript type annotation that specifies the type of the event object (e) in a change
     event handler for a select element. It indicates that the event is triggered by a change in a select input, allowing you to access properties like e.target.value to get the selected value.
    */
    const handleCategoryChange = (selectedCategory: string) => {
        console.log(`Selected Category: ${selectedCategory}`);
        if (category === selectedCategory && showDropdown) {
            setCategory("");
        }
        else {
            setCategory(selectedCategory);
            setShowDropdown(true);
        }   
        setSubCategory("");
    }

    const handleSubCategoryChange = (selectedSubCategory: string) => {
        console.log(`Selected Subcategory: ${selectedSubCategory}`);
        setSubCategory(selectedSubCategory.toLowerCase());
        setShowDropdown(false); 
    }

    const handleSearchChange = () => {
        // This function can be used to handle search input changes if needed
        console.log(`Title: ${search}`);

    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown",handleClickOutside);
        }
    },[]);

    useEffect(() => {
        if(category && subCategory){
            setBackendUrl(`fetchTasksBy${category}/${subCategory.toLowerCase()}`);
        } else if (search) {
            setBackendUrl(`search/${search}`)
        } else {
            setBackendUrl("tasks");
        }
    },[category, subCategory, search]);

    // A <select> element in React is used to create a dropdown menu that allows users to select one option from a list of options. It is typically used in forms to capture user input, such as selecting a category or a status.
    return (
        <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6">
            {/* Search Bar and Dropdown Container */}
            <div className="flex justify-between items-center">
                    {/* Search Bar */}
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            className="text-white border p-2 rounded w-64"
                            placeholder="Search"
                            onChange={e => setSearch(e.target.value)}
                        />
                        <button
                            className="bg-[#954C2E] text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            Search
                        </button>
                    </div>
                    {/* Dropdown Container */}
                    <div className="relative inline-block text-left" ref={dropdownRef}>
                        {/* Category dropdown as <select> */}
                        <select
                        value={category}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className="border p-2 rounded w-48 bg-white shadow-md"
                        >
                        <option value="">All</option>
                        {categoryOptions.map((option) => (
                            <option key={option} value={option}>
                            {option}
                            </option>
                        ))}
                        </select>
            
                        {/* Subcategory floating dropdown */}
                        {category && showDropdown && (
                        <div className="absolute left-full top-0 ml-2 w-48 bg-white border rounded-md shadow-md z-50">
                            {subCategoryOptions[category].map((sub) => (
                            <div
                                key={sub}
                                className={`p-2 cursor-pointer hover:bg-blue-100 ${
                                subCategory === sub ? "bg-blue-50 font-semibold" : ""
                                }`}
                                onClick={() => handleSubCategoryChange(sub)}
                            >
                                {sub}
                            </div>
                            ))}
                        </div>
                        )}
                    </div>
            </div>
  
          {/* Tasks Component */}
          <Tasks
            key={`${category}-${subCategory}`} // ensures re-render
            onUpdate={() => setUpdateMetrics((prev) => !prev)}
            tasksPerPageProp={6}
            backendUrl={backendUrl}
            //   category && subCategory
            //     ? `fetchTasksBy${category}/${subCategory.toLowerCase()}`
            //     : "tasks"
          />
        </div>
      </div>
    )
};