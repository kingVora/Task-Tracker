package com.example.demo.DAO;

import com.example.demo.Entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task,String> {

    List<Task> findByStatus(String status);
}
