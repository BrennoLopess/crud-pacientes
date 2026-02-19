package com.desabafa.crudpacientes.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class PsicologoRequest {

  @NotBlank
  @Size(max = 120)
  private String nome;

  @NotBlank
  @Size(max = 20)
  private String crp;

  @Size(max = 120)
  private String especializacao;

  public PsicologoRequest() {}

  public String getNome() { return nome; }
  public String getCrp() { return crp; }
  public String getEspecializacao() { return especializacao; }

  public void setNome(String nome) { this.nome = nome; }
  public void setCrp(String crp) { this.crp = crp; }
  public void setEspecializacao(String especializacao) { this.especializacao = especializacao; }
}