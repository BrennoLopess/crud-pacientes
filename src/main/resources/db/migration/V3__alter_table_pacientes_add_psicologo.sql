ALTER TABLE pacientes
ADD COLUMN psicologo_id BIGINT;

ALTER TABLE pacientes
ADD CONSTRAINT fk_paciente_psicologo
FOREIGN KEY (psicologo_id)
REFERENCES psicologos(id);