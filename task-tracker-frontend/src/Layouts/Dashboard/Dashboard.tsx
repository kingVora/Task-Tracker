import TaskMetrics from "./Components/TaskMetrics"

export const Dashboard = () => {
    return (
        <div className="grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-12 space-y-6 xl:col-span-7">
            <TaskMetrics />
            </div>
        </div>
    )
};