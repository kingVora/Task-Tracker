package com.example.demo.Controller;

import com.example.demo.Entities.Task;
import com.example.demo.Service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@RestController
public class TaskController {

    private final TaskService service;

    public TaskController(TaskService service){
        this.service = service;
    }

    @GetMapping("/tasks")
    public List<Task> getTasks(){
        List<Task> fetchedTasks = service.fetchTasks();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        fetchedTasks.forEach(task -> {
            try {
                if(task.getStatus().equals("due")) {
                    System.out.println("Inside getTasks");
                    System.out.println(task.getTitle());
                    Date today = sdf.parse(LocalDate.now().toString());
                    Date due = sdf.parse(task.getDueDate());

                    TimeUnit time = TimeUnit.DAYS;

                    double difference = time.convert(today.getTime() - due.getTime(), TimeUnit.MILLISECONDS);
                    System.out.println("The difference is" + difference);

                    if (difference > 0) {
                        System.out.println("Task is now Overdue!!");
                        task.setStatus("overdue");
                        service.editTask(task.getTaskId(), task);
                    }
                }
            } catch (Exception e) {
                throw new RuntimeException(e.getMessage());
            }
        });
        return fetchedTasks;
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
