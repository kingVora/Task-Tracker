class AddTaskModel {
    title: string;
    description: string;
    assignedDate: Date;
    dueDate: Date;
    status: 'completed' | 'due' | 'overdue';
    priority: 'low' | 'medium' | 'high';

    constructor(
        title: string,
        description: string,
        assignedDate: Date,
        dueDate: Date,
        status: 'completed' | 'due' | 'overdue',
        priority: 'low' | 'medium' | 'high',
    ) {
        this.title = title;
        this.description = description;
        this.assignedDate = assignedDate;
        this.dueDate = dueDate;
        this.status = status;
        this.priority = priority;
    }
}

export default AddTaskModel;