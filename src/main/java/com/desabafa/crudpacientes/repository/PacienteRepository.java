package com.desabafa.crudpacientes.repository;

import com.desabafa.crudpacientes.domain.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {
}
