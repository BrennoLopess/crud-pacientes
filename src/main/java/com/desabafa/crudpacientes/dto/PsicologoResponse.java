package com.desabafa.crudpacientes.dto;

public record PsicologoResponse(
    Long id,
    String nome,
    String crp,
    String especializacao
) {}