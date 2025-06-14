import axios from "axios";
import { useEffect, useState } from "react";
import TaskModel from "../../../Models/TaskModel";
import { ChevronDown, Edit } from 'lucide-react';
import { Pagination } from "../../../Utils/Pagination";
import TaskModal from "./TaskModal";
import AddTaskModel from "../../../Models/AddTaskModel";
import ConfirmationModal from "./ConfirmationModal";

export default function Tasks({onUpdate} : {onUpdate: () => void}) {

    const baseURL = import.meta.env.VITE_BACKEND_BASE_URL;

    const [tasks,setTasks] = useState<TaskModel[]>([]);
    const [expandedTask,setExpandedTask] = useState<number|null>(null);
    const [updateTask,setUpdateTask] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage] = useState(4);
    const [totalPages, setTotalPages] = useState(0);
    const [tasksCountForPagination, setTasksCountForPagination] = useState(0);
    const [editingTask, setEditingTask] = useState<TaskModel | null>(null);
    const [deleteTask, setDeleteTask] = useState<TaskModel | null>(null);
    const [addingTask, setAddingTask] = useState(false);

    useEffect(() => {
        const fetchTasks = async() => {
            try{
                const response = await axios.get(`${baseURL}/tasks?page=${currentPage-1}&size=${tasksPerPage}`);
                console.log("Tasks fetched:", response.data.content);
                const dueTasks = response.data.content;
                const sorted = dueTasks.sort((a: TaskModel,b: TaskModel) => priorityValue(a.priority) - priorityValue(b.priority));
                setTasks(sorted);
                setTasksCountForPagination(response.data.totalElements);
                setTotalPages(response.data.totalPages);
            }   
            catch(error) {
                console.error("Error fetching tasks:", error);
            }
        }
        fetchTasks();
    },[currentPage, updateTask, addingTask]);

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
                onUpdate();
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
            // Better approach as we are updating it locally instead of making an additional API call.
            setTasks(prev => prev.map(t => t.taskId == task.taskId ? task : t));
            setEditingTask(null);
            onUpdate();
        } catch(error) {
            console.error("Error editing task:", error);
        }
    }

    const handleDeleteTask = async (taskId: number) => {
        try {
            await axios.delete(`${baseURL}/deleteTask/${taskId}`);
            setTasks(prev => prev.filter(t => t.taskId !== taskId));
            setDeleteTask(null);
            onUpdate();
        }
        catch (error) {
            console.error("Error deleting task:",error);
        }
    }

    const handleAddTask = async (task: AddTaskModel) => {
        try {
            await axios.post(`${baseURL}/addTask`,task);
            setUpdateTask(prev => !prev);
            setAddingTask(false);
            onUpdate();
        } catch (error) {
            console.error("Error adding task:",error);
        }
    }

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const lastTask = indexOfLastTask > tasksCountForPagination ? tasksCountForPagination : indexOfLastTask;
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Stay on Track! Here Are Your Due and Overdue Tasks
            </h2>
            <div className="flex items-center justify-between mt-3">
                {tasksCountForPagination > 0 && (
                    <div className="text-white">
                    <h5>Number of results: {tasksCountForPagination}</h5>
                    <p>
                        {indexOfFirstTask + 1} to {lastTask} of {tasksCountForPagination} tasks:
                    </p>
                    </div>
                )}
                <button
                    onClick={() => setAddingTask(true)}
                    className="px-4 py-2 bg-[#954C2E] text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Add Task
                </button>
            </div>
          {tasks.map(task => (
            <div key={task.taskId} className="bg-[#EFE4D2] rounded-xl shadow p-4 flex items-start justify-between">
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
                      <button
                            className="text-red-600 hover:text-red-800"
                            onClick={() => setDeleteTask(task)}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                        </svg>           
                    </button>
                    </div>
                  </div>
                  {expandedTask === task.taskId && (
                    <div className="flex justify-between items-center mt-2">
                        {/* Task Description */}
                        <p className="text-gray-600">{task.description}</p>
                
                        {/* Priority and Status */}
                        <div className="flex items-center gap-4">
                            {/* Priority Badge */}
                            <span
                                className={`px-2 py-1 text-sm font-medium rounded ${
                                    task.priority === 'high'
                                        ? 'bg-red-500 text-white dark:bg-red-600'
                                        : task.priority === 'medium'
                                        ? 'bg-yellow-500 text-white dark:bg-yellow-600'
                                        : 'bg-green-500 text-white dark:bg-green-600'
                                }`}
                            >
                                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                            </span>
                            <span
                                className={`px-2 py-1 text-sm font-medium rounded ${
                                    task.status === 'completed'
                                        ? 'bg-green-500 text-white dark:bg-green-600'
                                        : task.status === 'due'
                                        ? 'bg-yellow-500 text-white dark:bg-yellow-600'
                                        : 'bg-red-500 text-white dark:bg-red-600'
                                }`}
                            >
                                {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                            </span>
                        </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {totalPages > 1 &&  
             <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>}
          {editingTask && (
            <TaskModal 
                mode = "edit"
                task = {editingTask}
                onClose = {() => setEditingTask(null)}
                onSave = {handleEditTask}/>
          )}
          {addingTask && (
            <TaskModal
                mode = "add"
                task = {null}
                onClose = { () => setAddingTask(false) }
                onSave = {handleAddTask}
                />
          )}
          {deleteTask && (
            <ConfirmationModal
                task = {deleteTask}
                onConfirm = {handleDeleteTask}
                onCancel = { () => setDeleteTask(null)}
                />
          )}
        </div>
    )
}