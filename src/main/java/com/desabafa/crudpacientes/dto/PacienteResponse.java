package com.desabafa.crudpacientes.dto;

import com.desabafa.crudpacientes.domain.Gravidade;

public class PacienteResponse {

  private Long id;
  private String nome;
  private String email;
  private String telefone;
  private Long psicologoId;
  private Gravidade gravidade;

  public PacienteResponse(Long id,
                          String nome,
                          String email,
                          String telefone,
                          Long psicologoId,
                          Gravidade gravidade) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
    this.psicologoId = psicologoId;
    this.gravidade = gravidade;
  }

  public Long getId() { return id; }
  public String getNome() { return nome; }
  public String getEmail() { return email; }
  public String getTelefone() { return telefone; }
  public Long getPsicologoId() { return psicologoId; }
  public Gravidade getGravidade() { return gravidade; }
}
