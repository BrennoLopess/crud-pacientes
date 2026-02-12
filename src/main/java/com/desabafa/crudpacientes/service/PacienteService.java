package com.desabafa.crudpacientes.service;

import com.desabafa.crudpacientes.domain.Paciente;
import com.desabafa.crudpacientes.dto.PacienteRequest;
import com.desabafa.crudpacientes.dto.PacienteResponse;
import com.desabafa.crudpacientes.repository.PacienteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PacienteService {

  private final PacienteRepository repository;

  public PacienteService(PacienteRepository repository) {
    this.repository = repository;
  }

  private PacienteResponse toResponse(Paciente p) {
    return new PacienteResponse(p.getId(), p.getNome(), p.getEmail(), p.getTelefone());
  }

  @Transactional
  public PacienteResponse criar(PacienteRequest req) {
    Paciente p = new Paciente(req.getNome(), req.getEmail(), req.getTelefone());
    return toResponse(repository.save(p));
  }

  @Transactional(readOnly = true)
  public List<PacienteResponse> listar() {
    return repository.findAll().stream().map(this::toResponse).toList();
  }

  @Transactional(readOnly = true)
  public PacienteResponse buscar(Long id) {
    Paciente p = repository.findById(id)
        .orElseThrow(() -> new NotFoundException("Paciente não encontrado (id=" + id + ")"));
    return toResponse(p);
  }

  @Transactional
  public PacienteResponse atualizar(Long id, PacienteRequest req) {
    Paciente p = repository.findById(id)
        .orElseThrow(() -> new NotFoundException("Paciente não encontrado (id=" + id + ")"));

    p.setNome(req.getNome());
    p.setEmail(req.getEmail());
    p.setTelefone(req.getTelefone());

    return toResponse(repository.save(p));
  }

  @Transactional
  public void deletar(Long id) {
    if (!repository.existsById(id)) {
      throw new NotFoundException("Paciente não encontrado (id=" + id + ")");
    }
    repository.deleteById(id);
  }
}
