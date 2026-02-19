package com.desabafa.crudpacientes.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "psicologos")
public class Psicologo {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 120)
  private String nome;

  @Column(nullable = false, unique = true, length = 20)
  private String crp;

  @Column(length = 120)
  private String especializacao;

  public Psicologo() {}

  public Psicologo(String nome, String crp, String especializacao) {
    this.nome = nome;
    this.crp = crp;
    this.especializacao = especializacao;
  }

  public Long getId() { return id; }
  public String getNome() { return nome; }
  public String getCrp() { return crp; }
  public String getEspecializacao() { return especializacao; }

  public void setNome(String nome) { this.nome = nome; }
  public void setCrp(String crp) { this.crp = crp; }
  public void setEspecializacao(String especializacao) { this.especializacao = especializacao; }
}