import { useState } from "react";
import TaskMetrics from "./Components/TaskMetrics"
import Tasks from "./Components/Tasks";

export const Dashboard = () => {

    const [updateMetrics, setUpdateMetrics] = useState(false);

    return (
        <div className="grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-12 space-y-6">
            <TaskMetrics updateTrigger = {updateMetrics}/>

            <Tasks onUpdate = { () => setUpdateMetrics(prev => !prev)}/>
            </div>
        </div>
    )
};