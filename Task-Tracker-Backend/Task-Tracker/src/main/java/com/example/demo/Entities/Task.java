package com.example.demo.Entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "Task")
@Data
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer taskId;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "assigned_date")
    private String assignedDate;

    @Column(name = "due_date")
    private String dueDate;

    @Column(name = "status")
    private String status;

    @Column(name = "priority")
    private String priority;

}
