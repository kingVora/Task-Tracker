package com.example.demo.Service;

import com.example.demo.DAO.TaskRepository;
import com.example.demo.Entities.Task;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository repository;

    public TaskService(TaskRepository repository){
        this.repository = repository;
    }

    public List<Task> fetchTasks(){
        return repository.findAll();
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
}
