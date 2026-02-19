package com.desabafa.crudpacientes.controller;

import com.desabafa.crudpacientes.dto.PacienteResponse;
import com.desabafa.crudpacientes.dto.PsicologoRequest;
import com.desabafa.crudpacientes.dto.PsicologoResponse;
import com.desabafa.crudpacientes.service.PsicologoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/psicologos")
@CrossOrigin(origins = "*")
public class PsicologoController {

  private final PsicologoService service;

  public PsicologoController(PsicologoService service) {
    this.service = service;
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public PsicologoResponse criar(@Valid @RequestBody PsicologoRequest req) {
    return service.criar(req);
  }

  @GetMapping
  public List<PsicologoResponse> listar() {
    return service.listar();
  }

  @GetMapping("/{id}")
  public PsicologoResponse buscar(@PathVariable Long id) {
    return service.buscar(id);
  }

  @GetMapping("/{id}/pacientes")
  public List<PacienteResponse> listarPacientes(@PathVariable Long id) {
    return service.listarPacientes(id);
  }

  @PutMapping("/{id}")
  public PsicologoResponse atualizar(@PathVariable Long id,
                                     @Valid @RequestBody PsicologoRequest req) {
    return service.atualizar(id, req);
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deletar(@PathVariable Long id) {
    service.deletar(id);
  }
}
