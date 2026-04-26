package com.example.personalplanner.repository;

import com.example.personalplanner.model.Tarefa;
import com.example.personalplanner.model.Tarefa;
import com.example.personalplanner.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
import java.util.List;
import java.util.Optional;

// ...
@Repository
public interface TarefaRepository extends JpaRepository<Tarefa, UUID> {

    List<Tarefa> findByUser (User user);

    Optional<Tarefa> findByIdAndUser (UUID id, User user);

}