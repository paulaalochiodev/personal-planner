package com.example.personalplanner.model;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
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

    private LocalDateTime dataInicio;

    private LocalDateTime dataFim;

    private Boolean incluirHora;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}