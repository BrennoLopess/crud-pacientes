package com.desabafa.crudpacientes.dto;

public class PacienteResponse {

  private Long id;
  private String nome;
  private String email;
  private String telefone;

  public PacienteResponse(Long id, String nome, String email, String telefone) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
  }

  public Long getId() { return id; }
  public String getNome() { return nome; }
  public String getEmail() { return email; }
  public String getTelefone() { return telefone; }
}
