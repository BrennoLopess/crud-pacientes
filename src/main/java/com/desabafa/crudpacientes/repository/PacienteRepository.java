package com.desabafa.crudpacientes.repository;

import com.desabafa.crudpacientes.domain.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {

  List<Paciente> findByPsicologoId(Long psicologoId);

}
