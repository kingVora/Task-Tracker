package com.example.demo.Controller;

import com.example.demo.Entities.Task;
import com.example.demo.Service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
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

    @GetMapping("/overdueTasksCount")
    public long getOverdueTasksCount(){
        return service.fetchCountOfOverdueTasks();
    }

    @PatchMapping("/completedTask/{id}")
    public String markTaskAsCompleted(@PathVariable("id") Integer taskId) throws Exception {
        service.markTaskAsCompleted(taskId);
        return "Updated!";
    }

    @PutMapping("/editTask/{id}")
    public void editTask(@PathVariable("id") Integer taskId, @RequestBody Task task) throws Exception{
        System.out.println("Inside editTask");
        System.out.println(task.getDescription());
        Optional<Task> task1 = service.editTask(taskId,task);
    }

    @PostMapping("/addTask")
    public void addTask(@RequestBody Task task){
        service.addTask(task);
    }
}
