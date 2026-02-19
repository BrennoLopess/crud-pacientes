package com.desabafa.crudpacientes.repository;

import com.desabafa.crudpacientes.domain.Psicologo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PsicologoRepository extends JpaRepository<Psicologo, Long> {

  Optional<Psicologo> findByCrp(String crp);

  boolean existsByCrp(String crp);
}