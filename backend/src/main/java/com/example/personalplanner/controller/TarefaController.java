package com.example.personalplanner.controller;

import com.example.personalplanner.model.Tarefa;
import com.example.personalplanner.model.User;
import com.example.personalplanner.repository.TarefaRepository;
import com.example.personalplanner.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/tarefas")
public class TarefaController {

    @Autowired
    private TarefaRepository tarefaRepository;

    @Autowired
    private UserRepository userRepository;

    private User getAuthenticatedUser(Authentication authentication) {
        String username = authentication.getName();

        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuário autenticado não encontrado"));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Tarefa insert(@RequestBody Tarefa tarefa, Authentication authentication) {
        User user = getAuthenticatedUser(authentication);
        tarefa.setUser(user);
        return tarefaRepository.save(tarefa);
    }

    @GetMapping
    public List<Tarefa> list(Authentication authentication) {
        User user = getAuthenticatedUser(authentication);
        return tarefaRepository.findByUser(user);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tarefa> findById(@PathVariable UUID id, Authentication authentication) {
        User user = getAuthenticatedUser(authentication);
        return tarefaRepository.findByIdAndUser(id, user)
                .map(tarefa -> ResponseEntity.ok(tarefa))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tarefa> update(@PathVariable UUID id, @RequestBody Tarefa tarefaDetalhes, Authentication authentication) {
        User user = getAuthenticatedUser(authentication);
        return tarefaRepository.findByIdAndUser(id, user)
                .map(tarefa -> {
                    tarefa.setTitulo(tarefaDetalhes.getTitulo());
                    tarefa.setDescricao(tarefaDetalhes.getDescricao());
                    tarefa.setConcluida(tarefaDetalhes.getConcluida());
                    tarefa.setData(tarefaDetalhes.getData());
                    Tarefa tarefaAtualizada = tarefaRepository.save(tarefa);
                    return ResponseEntity.ok(tarefaAtualizada);
                })
                .orElse(ResponseEntity.notFound().build());
    }


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID id, Authentication authentication) {
        User user = getAuthenticatedUser(authentication);

        tarefaRepository.findByIdAndUser(id, user)
                .map(tarefa -> {
                    tarefaRepository.delete(tarefa);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
