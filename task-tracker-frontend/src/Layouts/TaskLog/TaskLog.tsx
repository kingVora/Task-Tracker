// import { useEffect, useState } from "react";
// import TaskModel from "../../Models/TaskModel"
// import axios from "axios";

// export default function TaskLog(){

//     const baseURL = import.meta.env.VITE_API_BASE_URL;

//     const [tasks,setTasks] = useState<TaskModel[]>([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [taskPerPage] = useState(6);
//     const [totalPages, setTotalPages] = useState(0);
//     const [tasksCountForPagination, setTasksCountForPagination] = useState(0);
//     const [searchUrl, setSearchUrl] = useState("");
//     const [category, setCategory] = useState("");

//     useEffect(() => {
//         const fetchTasks = async () => {
//             try{
//                 const baseUrl = `${baseURL}/tasks`;
//                 let url = "";
                
//                 if (searchUrl === ""){
//                     url = `${baseUrl}?page=${currentPage-1}&size=${taskPerPage}`;
//                 }
//             }
//             catch (error) {
//                 console.error("Error fetching tasks:",error);
//             }
//         }
//     },[])

//     const categoryChange = (value: string) => {
//         setCurrentPage(1);
//         if(value === "Priority" || value === "Status" || value === "Category"){
//             setCategory(value);
//             setSearchUrl(`/search/findByCategory?category=${value}&page=<pageNumber>&size=${taskPerPage}`);
//         }
//         else{
//             setCategory("All");
//             setSearchUrl(`?page=<pageNumber>&size=${taskPerPage}`);
//         }
//     }
//     return (
//         <>
//         </>
//     )
// }
import { useEffect, useState } from "react";
import Tasks from "../Dashboard/Components/Tasks";
import { ChevronDownIcon } from "../../icons";

export default function TaskLog () {

    const [updateMetrics, setUpdateMetrics] = useState(false);
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

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

    useEffect(() => {
        console.log(`Category changed to: ${category}`);
        console.log(`Subcategory changed to: ${subCategory}`);
    },[category,subCategory]);
    // A <select> element in React is used to create a dropdown menu that allows users to select one option from a list of options. It is typically used in forms to capture user input, such as selecting a category or a status.
    return (
        <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6">
          {/* Dropdown Container */}
          <div className="relative inline-block text-left">
            {/* Category dropdown as <select> */}
            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="border p-2 rounded w-48 bg-white shadow-md"
            >
              <option value="">Select Category</option>
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
  
          {/* Tasks Component */}
          <Tasks
            key={`${category}-${subCategory}`} // ensures re-render
            onUpdate={() => setUpdateMetrics((prev) => !prev)}
            tasksPerPageProp={6}
            backendUrl={
              category && subCategory
                ? `fetchTasksBy${category}/${subCategory.toLowerCase()}`
                : "tasks"
            }
          />
        </div>
      </div>
        // <div className="grid grid-cols-12 gap-4 md:gap-6">
        //     <div className="col-span-12 space-y-6">
        //     {/* <TaskMetrics updateTrigger = {updateMetrics}/> */}
        //     <div className="relative inline-block text-left">
        //         <div className="bg-white border rounded-md shadow-md w-48">
        //             {/* {categoryOptions.map((option) => (
        //                 <div
        //                     key={option}
        //                     className="group relative flex justify-between items-center p-2 cursor-pointer hover:bg-gray-100"
        //                     onClick={() => handleCategoryChange(option)}>
        //                         <span>{option}</span>
        //                         <ChevronDownIcon className="w-4 h-4 ml-1" />
                        

        //                     {
        //                         category === option && showDropdown && (
        //                             <div className="absolute left-full top-0 ml-1 w-48 bg-white border rounded-md shadow-md z-50">
        //                                 {
        //                                     subCategoryOptions[option].map((sub) => (
        //                                         console.log(`Subcategory: ${sub}`),
        //                                         <div
        //                                             key={sub}
        //                                             className={`p-2 cursor-pointer hover:bg-blue-100 ${
        //                                                 subCategory === sub ? "bg-blue-50 font-semibold" : ""
        //                                               }`}
        //                                             onClick={(e) => {
        //                                                 e.stopPropagation(); // Prevents the click from bubbling up to the parent div
        //                                                 handleSubCategoryChange(sub);
        //                                             }}
        //                                         >
        //                                             {sub}
        //                                         </div>
        //                                     ))
        //                                 }
        //                             </div>
        //                         )
        //                     } */}
        //                 </div>
        //             {/* ))
        //             } */}
        //             <select
        //     value={category}
        //     // onChange={(e) => setCategory(e.target.value)}
        //     onChange={(e)  => handleCategoryChange(e.target.value)}
        //     className="group relative flex justify-between items-center p-2 cursor-pointer hover:bg-gray-100"
        //   >
        //     <option value="">Select Category</option>
        //     {categoryOptions.map((cat) => (
        //       <option key={cat} value={cat}>
        //         {cat}
        //       </option>
        //     ))}
        //   </select>

        //   {/* Subcategory dropdown */}
        //   {category && showDropdown && (
        //     <select
        //       value={subCategory}
        //       onChange={(e) => setSubCategory(e.target.value)}
        //       className="absolute left-full top-0 ml-1 w-48 bg-white border rounded-md shadow-md z-50"
        //     >
        //       <option value="">Select Subcategory</option>
        //       {subCategoryOptions[category].map((sub) => (
        //         <option key={sub} value={sub}>
        //           {sub}
        //         </option>
        //       ))}
        //     </select> )}
        //     </div>  
        
        //     <Tasks onUpdate = { () => setUpdateMetrics(prev => !prev)} 
        //     tasksPerPageProp = {6} 
        //     backendUrl={
        //         category && subCategory ?
        //         `fetchTasksBy${category}/${subCategory}` : "tasks"
        //     }
        //     />         
        //     </div>
        // </div>
    )
};