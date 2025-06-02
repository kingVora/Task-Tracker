import axios from "axios";
import { useEffect, useState } from "react";
import TaskModel from "../../../Models/TaskModel";
import { ChevronDown, Edit } from 'lucide-react';
import { Pagination } from "../../../Utils/Pagination";
import TaskModal from "./TaskModal";
import AddTaskModel from "../../../Models/AddTaskModel";

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
    const [addingTask, setAddingTask] = useState(false);

    useEffect(() => {
        const fetchTasks = async() => {
            try{
                const response = await axios.get(`${baseURL}/tasks?page=${currentPage-1}&size=${tasksPerPage}`);
                const dueTasks = response.data.filter((task: TaskModel) => task.status === 'due' || task.status === 'overdue');
                const sorted = dueTasks.sort((a: TaskModel,b: TaskModel) => priorityValue(a.priority) - priorityValue(b.priority));
                setTasks(sorted);
                setTasksCountForPagination(sorted.length);
                setTotalPages(Math.ceil(sorted.length / tasksPerPage));
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
                    </div>
                  </div>
                  {expandedTask === task.taskId && (
                    <p className="text-gray-600 mt-2">{task.description}</p>
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
        </div>
    )
}