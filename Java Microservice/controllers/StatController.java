package com.saraf.hdstats.controllers;

import com.saraf.hdstats.beans.Stat;
import com.saraf.hdstats.repository.StatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;

@RestController
public class StatController {

	private StatRepository repo; // Correct way to autowire a repo

	@Autowired
	public StatController(StatRepository repo) {
		this.repo = repo;
	}

	@Configuration // CORS filter
	@EnableWebMvc
	public class WebConfig implements WebMvcConfigurer {

		@Override
		public void addCorsMappings(CorsRegistry registry) {
			registry.addMapping("/**");
		}
	}

	@GetMapping
	public long getUniversalCounter() {
		return repo.getUniversalCounter();
	}

	@GetMapping("/stats")
	public ArrayList<Stat> getAllStats() {
		return (ArrayList<Stat>) repo.findAll();
	}

	@PostMapping
	public void addStats(@RequestBody ArrayList<Stat> stats) {
		for (Stat stat : stats) {
			if (repo.existsByTitle(stat.getTitle())) {
				repo.updateCounter(stat.getCounter(),
					stat.getTitle());
			} else {
				repo.save(stat);
			}
		}
	}

}
