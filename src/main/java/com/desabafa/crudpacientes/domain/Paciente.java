package com.desabafa.crudpacientes.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "pacientes")
public class Paciente {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 120)
  private String nome;

  @Column(nullable = false, unique = true, length = 120)
  private String email;

  @Column(length = 20)
  private String telefone;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "psicologo_id")
  private Psicologo psicologo;

  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  private Gravidade gravidade;

  public Paciente() {}

  public Paciente(String nome, String email, String telefone) {
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
  }

  public Long getId() { return id; }
  public String getNome() { return nome; }
  public String getEmail() { return email; }
  public String getTelefone() { return telefone; }
  public Psicologo getPsicologo() { return psicologo; }
  public Gravidade getGravidade() { return gravidade; }

  public void setNome(String nome) { this.nome = nome; }
  public void setEmail(String email) { this.email = email; }
  public void setTelefone(String telefone) { this.telefone = telefone; }
  public void setPsicologo(Psicologo psicologo) { this.psicologo = psicologo; }
  public void setGravidade(Gravidade gravidade) { this.gravidade = gravidade; }
}
