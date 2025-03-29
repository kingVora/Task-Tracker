import { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { BarChart, Clock, ClipboardCheck, Tag } from "lucide-react";


export const Dashboard = () => {

  const [tasks, setTasks] = useState([
    { taskId: "1", title: "Finish project report", description: "Complete the final report for the project", status: "Pending", date: "2025-03-30", tags: "Work" },
    { taskId: "2", title: "Code review", description: "Review the newly committed code", status: "In Progress", date: "2025-04-01", tags: "Development" },
    { taskId: "3", title: "Submit expense report", description: "Submit the travel expense report", status: "Overdue", date: "2025-03-25", tags: "Finance" },
  ])

    return (
       <div className="grid grid-cols-4 gap-4 p-4 h-screen w-screen">
        {/* Sidebar */}
          <aside className="col-span-1 bg-gray-800 text-white p-4 rounded-2xl h-full">
            <h2 className="text-xl font-bold mb-4">Task Tracker</h2>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 p-2 rounded-lg bg-gray-700 cursor-pointer">📊 Dashboard</li>
              <li className="flex items-center gap-2 p-2 rounded-lg cursor-pointer">📝 Task Log</li>
              <li className="flex items-center gap-2 p-2 rounded-lg cursor-pointer">📅 Calendar</li>
              <li className="flex items-center gap-2 p-2 rounded-lg cursor-pointer">📊 Reports</li>
            </ul>
          </aside>

        {/* Main Content */}
        <main className="col-span-3 h-full overflow-y-auto">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          
          {/* Task Summary Cards */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="p-4 bg-blue-500 text-white flex items-center gap-4 rounded-2xl w-full">
              <CardContent className="flex items-center gap-4">
                <ClipboardCheck size={24} />
                <div>
                  <p className="text-lg font-semibold">Total Tasks</p>
                  <p className="text-2xl">{tasks.length}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="p-4 bg-green-500 text-white flex items-center gap-4 rounded-2xl w-full">
              <CardContent className="flex items-center gap-4">
                <BarChart size={24} />
                <div>
                  <p className="text-lg font-semibold">Completed</p>
                  <p className="text-2xl">{tasks.filter(task => task.status === "Completed").length}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="p-4 bg-red-500 text-white flex items-center gap-4 rounded-2xl w-full">
              <CardContent className="flex items-center gap-4">
                <Clock size={24} />
                <div>
                  <p className="text-lg font-semibold">Overdue</p>
                  <p className="text-2xl">{tasks.filter(task => task.status === "Overdue").length}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming & Overdue Tasks */}
          <section>
            <h2 className="text-xl font-bold mb-2">Upcoming & Overdue Tasks</h2>
            <ul className="space-y-2">
              {tasks.map((task) => (
                <li
                  key={task.taskId}
                  className={`p-3 rounded-xl shadow-md ${
                    task.status === "Overdue" ? "bg-red-100" : "bg-gray-100"
                  }`}
                >
                  <p className="text-lg font-medium">{task.title}</p>
                  <p className="text-sm text-gray-600">{task.description}</p>
                  <p className="text-sm text-gray-600">Due: {task.date}</p>
                  <p className="text-sm text-gray-600 flex items-center gap-1"><Tag size={16} /> {task.tags}</p>
                </li>
              ))}
            </ul>
          </section>
        </main>
       </div>
      );
}