import { useState } from "react";
import TaskMetrics from "./Components/TaskMetrics"
import Tasks from "./Components/Tasks";

export const Dashboard = () => {

    const [updateMetrics, setUpdateMetrics] = useState(false);

    return (
        <div className="grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-12 space-y-6">
            <TaskMetrics updateTrigger = {updateMetrics}/>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Stay on Track! Here Are Your Due and Overdue Tasks
            </h2>
            <Tasks onUpdate = { () => setUpdateMetrics(prev => !prev)} tasksPerPageProp = {4} backendUrl="tasksDashboard"/>
            </div>
        </div>
    )
};