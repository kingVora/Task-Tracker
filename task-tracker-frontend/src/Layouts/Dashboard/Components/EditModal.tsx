import { useEffect, useState } from "react";
import TaskModel from "../../../Models/TaskModel";


interface EditModalProps {
    task: TaskModel;
    onClose: () => void;
    onSave: (updatedTask: TaskModel) => void;
}

export default function EditModal({task, onClose, onSave}: EditModalProps) {
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [dueDate,setDueDate] = useState('');
    const [priority,setPriority] = useState<'low'|'high'|'medium'>('low');
    const [assignedDate,setAssignedDate] = useState('');

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setDueDate(new Date(task.dueDate).toISOString().split('T')[0]);
            setPriority(task.priority);
            setAssignedDate(new Date(task.assignedDate).toISOString().split('T')[0]);
        }

    },[task]);

    const handleSave = async () => {
        console.log("Saving task:", task);
        console.log(description);
        const updatedTask = new TaskModel(
            task.taskId,
            title || task.title,
            description,
            new Date(assignedDate || new Date(task.assignedDate).toISOString().split('T')[0]),
            new Date(dueDate || new Date(task.dueDate).toISOString().split('T')[0]),
            task.status,
            priority || task.priority
        );
        console.log(description);
        console.log("Updated task:", updatedTask);
        onSave(updatedTask);
        onClose();
    }
    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div style={{backgroundColor: '#EFE4D2'}} className="rounded-xl shadow p-6 w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Edit Task</h2>
        <div className="mb-3">
          <label className="block mb-1">Title</label>
          <input className="w-full border border-black rounded px-3 py-1" value={title} onChange={e => setTitle(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="block mb-1">Description</label>
          <textarea className="w-full border border-black rounded px-3 py-1" value={description} onChange={e => setDescription(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="block mb-1">Priority</label>
          <select className="w-full border border-black rounded px-3 py-1" value={priority} onChange={e => setPriority(e.target.value as 'low' | 'medium' | 'high')}>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="block mb-1">Assigned Date</label>
          <input type="date" className="w-full border border-black rounded px-3 py-1" value={assignedDate} onChange={e => setAssignedDate(e.target.value)} />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Due Date</label>
          <input type="date" className="w-full border border-black rounded px-3 py-1" value={dueDate} onChange={e => setDueDate(e.target.value)} />
        </div>

        <div className="flex justify-end gap-2">
          <button 
            onClick={onClose}
             className="px-4 py-2 border border-black rounded bg-[#AF3E3E] text-white hover:bg-[#8E2F2F] focus:outline-none focus:ring-2 focus:ring-black"
          >Cancel</button>
          <button 
          onClick={() => handleSave()}
          className="flex items-center gap-2 px-4 py-2 border border-black rounded bg-[#9EBC8A] text-white hover:bg-[#537D5D] focus:outline-none focus:ring-2 focus:ring-black"
          >Save</button>
        </div>
      </div>
    </div>
    )
}