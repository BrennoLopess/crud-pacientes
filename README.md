# CRUD Pacientes • Spring Boot + PostgreSQL + Docker

Sistema completo de gestão de **Pacientes e Psicólogos**, com arquitetura moderna, containerização e interface web integrada.

Projeto desenvolvido com foco em:

- Organização arquitetural
- Boas práticas de backend
- Versionamento de banco
- Containerização profissional
- Experiência de usuário no front-end

---

# 🚀 Stack Tecnológica

## Backend
- Java 17+
- Spring Boot 3
- Spring Web
- Spring Data JPA
- Flyway

## Banco de Dados
- PostgreSQL 15
- Migrations versionadas

## Infraestrutura
- Docker
- Docker Compose
- Volume persistente

## Front-end
- HTML5
- CSS3 moderno (layout responsivo + UI estilizada)
- JavaScript Vanilla
- Consumo direto da API REST

---

# 🧠 Funcionalidades Implementadas

## 👨‍⚕️ Psicólogos
- Criar psicólogo
- Listar psicólogos
- Selecionar psicólogo para visualizar pacientes vinculados
- Regra de negócio: bloqueio de exclusão se houver pacientes vinculados

## 🧑‍🤝‍🧑 Pacientes
- Criar paciente
- Editar paciente
- Remover paciente
- Vincular paciente a psicólogo
- Classificação por gravidade:
  - BAIXO
  - MODERADO
  - CRITICO
- Filtro por gravidade
- Filtro por psicólogo
- Busca textual

---

# 🗄️ Estrutura do Banco

Controlada via **Flyway migrations**:

```
V1__create_table_pacientes.sql
V2__create_table_psicologos.sql
V3__alter_table_pacientes_add_psicologo.sql
V4__add_gravidade_to_pacientes.sql
```

✔️ DDL automático do Hibernate está desabilitado  
✔️ Estrutura controlada exclusivamente por versionamento  

---

# 🐳 Como Executar

## Pré-requisitos
- Docker instalado

## Subir aplicação

```bash
docker compose up --build
```

Aplicação disponível em:

```
http://localhost:8080
```

API REST:

```
GET /api/pacientes
GET /api/psicologos
```

---

# 🧪 Testes Realizados

## ✅ CRUD Completo de Pacientes
- POST funcionando
- PUT funcionando
- DELETE funcionando
- Persistência validada

## ✅ CRUD de Psicólogos
- Criação validada
- Vínculo com pacientes funcionando
- Regra de negócio aplicada corretamente

## ✅ Persistência com Volume Docker

Após:

```bash
docker compose down
docker compose up
```

Os dados permaneceram.

Após:

```bash
docker compose down -v
```

Os dados foram resetados (comportamento esperado).

## ✅ Validação Direta no Banco

Acesso via:

```bash
docker exec -it crud_pacientes_db psql -U postgres -d crud_pacientes
```

Consulta:

```sql
select * from pacientes;
select * from psicologos;
```

Dados confirmados diretamente no PostgreSQL.

---

# 🏗️ Arquitetura do Projeto

```
src/main/java/com/desabafa/crudpacientes
 ├── controller
 ├── service
 ├── repository
 ├── domain
 └── dto

src/main/resources
 ├── db/migration
 └── static (front-end)

Dockerfile
docker-compose.yml
```

### Padrão Arquitetural

- Controller → Camada de entrada REST
- Service → Regras de negócio
- Repository → Persistência JPA
- DTO → Isolamento de modelo externo
- Domain → Entidades e enum

---

# 🔐 Boas Práticas Aplicadas

- Separação clara de responsabilidades
- DTO para evitar exposição direta de entidades
- Enum tipado para gravidade
- Tratamento global de exceções
- Flyway para versionamento de schema
- Containerização desacoplada
- Volume persistente
- Front-end desacoplado consumindo API REST
- Código organizado e preparado para evolução

---

# 📈 Diferenciais Técnicos

- Implementação de regra de integridade relacional
- Filtros no front-end integrados à API
- Enum mapeado corretamente no banco
- Interface moderna com feedback visual
- Estrutura preparada para deploy em ambiente real

---

# 🎯 Objetivo do Projeto

Demonstrar domínio em:

- Backend Java moderno
- Integração com banco relacional
- Versionamento de banco com Flyway
- Containerização com Docker
- Boas práticas arquiteturais
- Organização de código profissional
- Construção de API REST estruturada

---

# 👨‍💻 Autor

Brenno Lopes  
Projeto desenvolvido para demonstração técnica e evolução profissional.
