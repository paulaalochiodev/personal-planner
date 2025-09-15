package com.example.personalplanner.controller;

import com.example.personalplanner.model.Tarefa;
import com.example.personalplanner.repository.TarefaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/tarefas")
public class TarefaController {

    @Autowired
    private TarefaRepository tarefaRepository;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Tarefa insert(@RequestBody Tarefa tarefa) {
        return tarefaRepository.save(tarefa);
    }

    @GetMapping
    public List<Tarefa> list() {
        return tarefaRepository.findAll();
    }

    // NOVO: Endpoint para BUSCAR uma tarefa por ID
    // Ex: GET http://localhost:8080/api/tarefas/1
    @GetMapping("/{id}")
    public ResponseEntity<Tarefa> findById(@PathVariable Long id) {
        return tarefaRepository.findById(id)
                .map(tarefa -> ResponseEntity.ok(tarefa))
                .orElse(ResponseEntity.notFound().build());
    }

    // NOVO: Endpoint para ATUALIZAR uma tarefa
    // Ex: PUT http://localhost:8080/api/tarefas/1
    @PutMapping("/{id}")
    public ResponseEntity<Tarefa> update(@PathVariable Long id, @RequestBody Tarefa tarefaDetalhes) {
        return tarefaRepository.findById(id)
                .map(tarefa -> {
                    tarefa.setTitulo(tarefaDetalhes.getTitulo());
                    tarefa.setDescricao(tarefaDetalhes.getDescricao());
                    tarefa.setConcluida(tarefaDetalhes.getConcluida());
                    Tarefa tarefaAtualizada = tarefaRepository.save(tarefa);
                    return ResponseEntity.ok(tarefaAtualizada);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // NOVO: Endpoint para DELETAR uma tarefa
    // Ex: DELETE http://localhost:8080/api/tarefas/1
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT) // Sucesso, mas não retorna conteúdo
    public void delete(@PathVariable Long id) {
        tarefaRepository.deleteById(id);
    }
}
