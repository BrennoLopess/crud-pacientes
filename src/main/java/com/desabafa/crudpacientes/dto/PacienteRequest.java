package com.desabafa.crudpacientes.dto;

import com.desabafa.crudpacientes.domain.Gravidade;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class PacienteRequest {

  @NotBlank(message = "nome é obrigatório")
  @Size(max = 120, message = "nome deve ter no máximo 120 caracteres")
  private String nome;

  @NotBlank(message = "email é obrigatório")
  @Email(message = "email inválido")
  @Size(max = 120, message = "email deve ter no máximo 120 caracteres")
  private String email;

  @Size(max = 20, message = "telefone deve ter no máximo 20 caracteres")
  private String telefone;

  private Long psicologoId;

  // novo
  private Gravidade gravidade;

  public PacienteRequest() {}

  public String getNome() { return nome; }
  public String getEmail() { return email; }
  public String getTelefone() { return telefone; }
  public Long getPsicologoId() { return psicologoId; }
  public Gravidade getGravidade() { return gravidade; }

  public void setNome(String nome) { this.nome = nome; }
  public void setEmail(String email) { this.email = email; }
  public void setTelefone(String telefone) { this.telefone = telefone; }
  public void setPsicologoId(Long psicologoId) { this.psicologoId = psicologoId; }
  public void setGravidade(Gravidade gravidade) { this.gravidade = gravidade; }
}
