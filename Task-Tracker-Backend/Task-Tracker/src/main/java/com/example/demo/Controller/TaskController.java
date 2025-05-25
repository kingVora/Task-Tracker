package com.example.demo.Controller;

import com.example.demo.Entities.Task;
import com.example.demo.Service.TaskService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173")
public class TaskController {

    private final TaskService service;

    public TaskController(TaskService service){
        this.service = service;
    }

    @GetMapping("/tasks")
    public List<Task> getTasks(){
        return service.fetchTasks();
    }

    @GetMapping("/totaltasks")
    public long getCountTasks(){
        return service.fetchCount();
    }

    @GetMapping("/completedTasksCount")
    public long getCompletedTasksCount(){
        return service.fetchCountOfCompletedTasks();
    }

    @GetMapping("/dueTasksCount")
    public long getDueTasksCount(){
        return service.fetchCountOfDueTasks();
    }
}
