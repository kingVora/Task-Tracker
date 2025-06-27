package com.example.demo.DAO;

import com.example.demo.Entities.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Integer> {

    List<Task> findByStatus(String status);

    Page<Task> findByStatusIn(List<String> status, Pageable pageable);

    Page<Task> findByPriority(String priority, Pageable pageable);

    Page<Task> findByTitleContainingIgnoreCase(String title, Pageable pageable);
}
