package com.example.demo.Service;

import com.example.demo.DAO.TaskRepository;
import com.example.demo.Entities.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepository repository;

    public TaskService(TaskRepository repository){
        this.repository = repository;
    }

    public List<Task> fetchTasks(){
        return repository.findAll();
    }

    public Page<Task> fetchTasksBasedOnStatus(int page, int size, List<String> status){
        Pageable pageable = PageRequest.of(page,size);
        return repository.findByStatusIn(status,pageable);
    }

    public Page<Task> fetchTasksBasedOnPriority(int page, int size, String priority){
        Pageable pageable = PageRequest.of(page,size);
        return repository.findByPriority(priority,pageable);
    }


    public Page<Task> fetchAllTasks(int page, int size) {
        Pageable pageable = PageRequest.of(page,size);
        return repository.findAll(pageable);
    }

    public long fetchCount() {
        System.out.println(repository.count());
        return repository.count();
    }

    public long fetchCountOfCompletedTasks() {
        return (repository.findByStatus("completed")).size();
    }

    public long fetchCountOfDueTasks() {
        return (repository.findByStatus("due")).size();
    }

    public long fetchCountOfOverdueTasks() {
        return (repository.findByStatus("overdue")).size();
    }

    public void markTaskAsCompleted(Integer taskId) throws Exception {
        Optional<Task> task = repository.findById(taskId);
        if(task.isEmpty())
            throw new Exception("Task does not exist");
        Task fetchedTask = task.get();
        fetchedTask.setStatus("completed");
        repository.save(fetchedTask);
    }

    public Optional<Task> editTask(Integer taskId, Task task) throws Exception {
        System.out.println("Reached");
        System.out.println(taskId);
        repository.findById(taskId)
                .map(existingTask -> {
                    existingTask.setTitle(task.getTitle());
                    existingTask.setDescription(task.getDescription());
                    existingTask.setDueDate(task.getDueDate());
                    existingTask.setAssignedDate(task.getAssignedDate());
                    existingTask.setPriority(task.getPriority());
                    existingTask.setStatus(task.getStatus());
                    System.out.println("Going to save");
                    System.out.println(existingTask.getDescription());
                    repository.save(existingTask);
                    System.out.println("Have saved");
                    return existingTask;
                }).orElseThrow(() -> new Exception("Task does not exist!"));
        return Optional.empty();
    }

    public void addTask(Task task) {
        repository.save(new Task(task.getTitle(),task.getDescription(),task.getAssignedDate(),task.getDueDate(),task.getStatus(),task.getPriority()));
    }

    public void deleteTask(int taskId) {
        repository.deleteById(taskId);
    }
}
