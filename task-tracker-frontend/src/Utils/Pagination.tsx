export const Pagination:React.FC<{currentPage:number, totalPages: number, paginate: any}> = (props) => {
    
    const pageNumbers = [];

    if(props.currentPage === 1) {
        pageNumbers.push(props.currentPage);
        if(props.totalPages >= props.currentPage+1){
            pageNumbers.push(props.currentPage+1);
        }
        if(props.totalPages >= props.currentPage+2){
            pageNumbers.push(props.currentPage+2);
        }
    }
    else if(props.currentPage>1){
        if(props.currentPage>=3){
            pageNumbers.push(props.currentPage-2);
            pageNumbers.push(props.currentPage-1);
        }
        else{
            pageNumbers.push(props.currentPage-1);
        }
        if(props.totalPages >= props.currentPage+1){
            pageNumbers.push(props.currentPage+1);
        }
        if(props.totalPages >= props.currentPage+2){
            pageNumbers.push(props.currentPage+2);
        }
    }
    
    return(
        <nav aria-label="Pagination Navigation">
            <ul className="flex justify-center items-center space-x-2 mt-4">
                <li onClick={() => props.paginate(1)}>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-blue-500 hover:text-white transition dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-blue-600 dark:hover:text-white">
                        First Page
                    </button>
                </li>
                {pageNumbers.map( number => (
                    <li key={number} onClick={() => props.paginate(number)}
                    className={`px-4 py-2 rounded transition${props.currentPage === number ? "bg-blue-500 text-black dark:bg-blue-600 dark:text-white" : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-blue-600 dark:hover:text-white"}`}>
                        <button className="page-link">
                            {number}
                        </button>
                    </li>
                ))}
                <li onClick={() => props.paginate(props.totalPages)}>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-blue-500 hover:text-white transition dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-blue-600 dark:hover:text-white">
                        Last Page
                    </button>
                </li>
            </ul>
        </nav>
    )
}