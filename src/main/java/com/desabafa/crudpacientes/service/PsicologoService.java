package com.desabafa.crudpacientes.service;

import com.desabafa.crudpacientes.domain.Paciente;
import com.desabafa.crudpacientes.domain.Psicologo;
import com.desabafa.crudpacientes.dto.PacienteResponse;
import com.desabafa.crudpacientes.dto.PsicologoRequest;
import com.desabafa.crudpacientes.dto.PsicologoResponse;
import com.desabafa.crudpacientes.repository.PacienteRepository;
import com.desabafa.crudpacientes.repository.PsicologoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PsicologoService {

  private final PsicologoRepository repository;
  private final PacienteRepository pacienteRepository;

  public PsicologoService(PsicologoRepository repository,
                          PacienteRepository pacienteRepository) {
    this.repository = repository;
    this.pacienteRepository = pacienteRepository;
  }

  private PsicologoResponse toResponse(Psicologo p) {
    return new PsicologoResponse(
        p.getId(),
        p.getNome(),
        p.getCrp(),
        p.getEspecializacao()
    );
  }

  private PacienteResponse toPacienteResponse(Paciente p) {
    return new PacienteResponse(
        p.getId(),
        p.getNome(),
        p.getEmail(),
        p.getTelefone(),
        p.getPsicologo() != null ? p.getPsicologo().getId() : null,
        p.getGravidade()
    );
  }

  @Transactional
  public PsicologoResponse criar(PsicologoRequest req) {

    if (repository.existsByCrp(req.getCrp())) {
      throw new IllegalArgumentException("Já existe psicólogo com esse CRP.");
    }

    Psicologo p = new Psicologo(
        req.getNome(),
        req.getCrp(),
        req.getEspecializacao()
    );

    return toResponse(repository.save(p));
  }

  @Transactional(readOnly = true)
  public List<PsicologoResponse> listar() {
    return repository.findAll()
        .stream()
        .map(this::toResponse)
        .toList();
  }

  @Transactional(readOnly = true)
  public PsicologoResponse buscar(Long id) {
    Psicologo p = repository.findById(id)
        .orElseThrow(() -> new NotFoundException("Psicólogo não encontrado (id=" + id + ")"));
    return toResponse(p);
  }

  @Transactional(readOnly = true)
  public List<PacienteResponse> listarPacientes(Long psicologoId) {

    if (!repository.existsById(psicologoId)) {
      throw new NotFoundException("Psicólogo não encontrado (id=" + psicologoId + ")");
    }

    return pacienteRepository.findByPsicologoId(psicologoId)
        .stream()
        .map(this::toPacienteResponse)
        .toList();
  }

  @Transactional
  public PsicologoResponse atualizar(Long id, PsicologoRequest req) {

    Psicologo p = repository.findById(id)
        .orElseThrow(() -> new NotFoundException("Psicólogo não encontrado (id=" + id + ")"));

    if (!p.getCrp().equals(req.getCrp()) &&
        repository.existsByCrp(req.getCrp())) {
      throw new IllegalArgumentException("Já existe psicólogo com esse CRP.");
    }

    p.setNome(req.getNome());
    p.setCrp(req.getCrp());
    p.setEspecializacao(req.getEspecializacao());

    return toResponse(repository.save(p));
  }

  @Transactional
  public void deletar(Long id) {

    if (!repository.existsById(id)) {
      throw new NotFoundException("Psicólogo não encontrado (id=" + id + ")");
    }

    if (!pacienteRepository.findByPsicologoId(id).isEmpty()) {
      throw new IllegalStateException(
          "Não é possível deletar: existem pacientes vinculados a este psicólogo."
      );
    }

    repository.deleteById(id);
  }
}
