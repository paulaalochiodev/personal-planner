package com.example.personalplanner.repository;

import com.example.personalplanner.model.Tarefa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

// ...
@Repository
public interface TarefaRepository extends JpaRepository<Tarefa, UUID> {
}