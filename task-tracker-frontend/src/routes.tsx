import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./Layouts/Dashboard/Dashboard";
import { TaskLog } from "./Layouts/Tasklog";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/task-log" element={<TaskLog />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;