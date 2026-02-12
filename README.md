# CRUD Pacientes - Spring Boot + PostgreSQL + Docker

## 📌 Sobre o Projeto

Sistema completo de CRUD (Create, Read, Update, Delete) de pacientes, desenvolvido com arquitetura profissional utilizando:

- Spring Boot 3
- PostgreSQL 15
- Flyway (controle de migrations)
- Docker + Docker Compose
- Persistência em volume
- Interface Web integrada

O projeto foi estruturado com foco em qualidade, organização, containerização e boas práticas de backend.

---

## 🚀 Como Executar (um comando)

### Pré-requisito
- Docker instalado

No diretório do projeto, execute:

```bash
docker compose up --build
```

A aplicação estará disponível em:

```
http://localhost:8080
```

---

## 🏗️ Arquitetura

- Container 1: Aplicação Spring Boot  
- Container 2: Banco PostgreSQL  
- Volume Docker: Persistência dos dados  

O banco é gerenciado por migrations Flyway.

O DDL automático do Hibernate está desabilitado, garantindo ambiente controlado por versionamento.

---

## 🧪 Testes Realizados

### ✅ Teste 1 - Criar Paciente
- Cadastro realizado com sucesso
- Registro persistido no PostgreSQL

### ✅ Teste 2 - Atualização (PUT)
- Edição realizada corretamente
- Dados atualizados refletidos no banco

### ✅ Teste 3 - Remoção (DELETE)
- Registro removido corretamente

### ✅ Teste 4 - Persistência em Volume Docker
- Após `docker compose down` e `docker compose up`, os dados permaneceram
- Com `docker compose down -v`, os dados foram apagados (reset controlado)

### ✅ Teste 5 - Consulta Direta no PostgreSQL

Executado via terminal:

```bash
docker exec -it crud_pacientes_db psql -U postgres -d crud_pacientes
```

Dentro do PostgreSQL:

```sql
select * from pacientes;
```

Dados confirmados diretamente no banco.

---

## 📂 Estrutura do Projeto

```
src/main/java                    → Controllers, Services, Repositories
src/main/resources/db/migration  → Scripts Flyway
Dockerfile                       → Build da aplicação
docker-compose.yml               → Orquestração dos containers
```

---

## 🔐 Boas Práticas Implementadas

- Separação clara de responsabilidades (Controller / Service / Repository)
- Banco isolado em container
- Uso de variáveis de ambiente
- Migrations versionadas
- Persistência em volume Docker
- Estrutura pronta para produção

---

## 📈 Considerações Finais

Este projeto demonstra:

- Backend Java moderno
- Integração com banco relacional
- Controle de schema com Flyway
- Containerização com Docker
- Persistência de dados
- Estrutura profissional organizada

Desenvolvido para avaliação técnica demonstrando boas práticas e organização de projeto.
