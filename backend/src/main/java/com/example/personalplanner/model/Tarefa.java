package com.example.personalplanner.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;
import org.hibernate.annotations.UuidGenerator;

@Entity
@Data
public class Tarefa {

    @Id
    @GeneratedValue
    @UuidGenerator
    private UUID id;

    private String titulo;

    private String descricao;

    private Boolean concluida;

    private LocalDate data;
}