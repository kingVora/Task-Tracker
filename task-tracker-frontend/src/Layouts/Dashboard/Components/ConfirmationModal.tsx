import TaskModel from "../../../Models/TaskModel";

interface ConfirmationModalProps {
    task: TaskModel;
    onConfirm: (taskId: number) => void;
    onCancel: () => void;
}

export default function ConfirmationModal({task, onConfirm, onCancel}: ConfirmationModalProps) {
    const handleConfirm = () => {
        onConfirm(task.taskId);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-lg font-semibold mb-4">Confirm Action</h2>
                <p>Are you sure you want to delete the task: <strong>{task.title}</strong>?</p>
                <div className="mt-4 flex justify-end space-x-2">
                    <button 
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        onClick={handleConfirm}
                    >
                        Confirm
                    </button>
                    <button 
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );

}