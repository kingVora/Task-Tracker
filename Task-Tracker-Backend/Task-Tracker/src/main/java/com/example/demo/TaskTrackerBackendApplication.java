package com.example.demo;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.nio.file.Paths;

@SpringBootApplication
public class TaskTrackerBackendApplication {

	public static void main(String[] args) {
		String projectRoot = Paths.get(System.getProperty("user.dir"), "task-tracker").toString();
		Dotenv dotenv = Dotenv.configure().directory(projectRoot).ignoreIfMissing().load();
		System.setProperty("DB_URL", dotenv.get("DB_URL"));
		System.setProperty("DB_USER", dotenv.get("DB_USER"));
		System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
		SpringApplication.run(TaskTrackerBackendApplication.class, args);
	}

}
