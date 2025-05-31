import axios from "axios";
import { useEffect, useState } from "react";
import TaskModel from "../../../Models/TaskModel";
import { ChevronDown, Edit } from 'lucide-react';
import EditModal from "./EditModal";

export default function Tasks() {

    const baseURL = import.meta.env.VITE_BACKEND_BASE_URL;

    const [tasks,setTasks] = useState<TaskModel[]>([]);
    const [expandedTask,setExpandedTask] = useState<number|null>(null);
    const [updateTask,setUpdateTask] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage] = useState(4);
    const [editingTask, setEditingTask] = useState<TaskModel | null>(null);

    useEffect(() => {
        const fetchTasks = async() => {
            try{
                const response = await axios.get(`${baseURL}/tasks?page=${currentPage-1}&size=${tasksPerPage}`);
                const dueTasks = response.data.filter((task: TaskModel) => task.status === 'due' || task.status === 'overdue');
                const sorted = dueTasks.sort((a: TaskModel,b: TaskModel) => priorityValue(a.priority) - priorityValue(b.priority));
                setTasks(sorted);
            }   
            catch(error) {
                console.error("Error fetching tasks:", error);
            }
        }
        fetchTasks();
    },[updateTask]);

    const priorityValue = (priority: string): number => {
        switch(priority) {
            case 'high':
                return 1;
            case 'medium':
                return 2;
            default:
                return 3;
        }
    }

    const handleToggleExpand = (taskId: number) => {
        setExpandedTask(prev => prev === taskId? null : taskId);
    }

    const handleCheckboxChange = async (taskId: number) => {
            try{
                await axios.patch(`${baseURL}/completedTask/${taskId}`);
                setUpdateTask(prev => !prev);
            }
            catch(error) {
                console.error("Error updating task status:", error);
            }
    }

    const handleEditTask = async (task: TaskModel) => {
        try{
            console.log(task.description);
            await axios.put(`${baseURL}/editTask/${task.taskId}`,task);
            setTasks(prev => prev.map(t => t.taskId == task.taskId ? task : t));
            setEditingTask(null);
        } catch(error) {
            console.error("Error editing task:", error);
        }
    }

    return (
        <div className="space-y-4">
          {tasks.map(task => (
            <div key={task.taskId} className="bg-white rounded-xl shadow p-4 flex items-start justify-between">
              <div className="flex items-start gap-3 w-full">
                <input type="checkbox" className="mt-1" checked={task.status === 'completed'} onChange={() => handleCheckboxChange(task.taskId)}/>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleToggleExpand(task.taskId)}>
                        <ChevronDown className={`transition-transform ${expandedTask === task.taskId ? 'rotate-180' : ''}`} />
                      </button>
                      <button className="text-blue-600 hover:underline" onClick={() => setEditingTask(task)}>
                        <Edit size={18} />
                      </button>
                    </div>
                  </div>
                  {expandedTask === task.taskId && (
                    <p className="text-gray-600 mt-2">{task.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
          {editingTask && (
            <EditModal 
                task = {editingTask}
                onClose = {() => setEditingTask(null)}
                onSave = {(updatedTask) => handleEditTask(updatedTask)}/>
          )}
        </div>
    )
}