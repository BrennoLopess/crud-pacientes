package com.desabafa.crudpacientes.controller;

import com.desabafa.crudpacientes.dto.PacienteRequest;
import com.desabafa.crudpacientes.dto.PacienteResponse;
import com.desabafa.crudpacientes.service.PacienteService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pacientes")
@CrossOrigin(origins = "*")
public class PacienteController {

  private final PacienteService service;

  public PacienteController(PacienteService service) {
    this.service = service;
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public PacienteResponse criar(@Valid @RequestBody PacienteRequest req) {
    return service.criar(req);
  }

  @GetMapping
  public List<PacienteResponse> listar() {
    return service.listar();
  }

  @GetMapping("/{id}")
  public PacienteResponse buscar(@PathVariable Long id) {
    return service.buscar(id);
  }

  @PutMapping("/{id}")
  public PacienteResponse atualizar(@PathVariable Long id,
                                    @Valid @RequestBody PacienteRequest req) {
    return service.atualizar(id, req);
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deletar(@PathVariable Long id) {
    service.deletar(id);
  }
}