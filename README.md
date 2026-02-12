CRUD PACIENTES - Spring Boot + PostgreSQL + Docker

================================================== 📌 SOBRE O PROJETO
==================================================

Sistema completo de CRUD (Create, Read, Update, Delete) de pacientes,
desenvolvido com arquitetura profissional utilizando:

-   Spring Boot 3
-   PostgreSQL 15
-   Flyway (controle de migrations)
-   Docker + Docker Compose
-   Persistência em volume
-   Interface Web integrada

O projeto foi estruturado com foco em qualidade, organização,
containerização e boas práticas de backend.

================================================== 🚀 COMO EXECUTAR (UM
COMANDO) ==================================================

Pré-requisito: - Docker instalado

No diretório do projeto, execute:

docker compose up –build

A aplicação estará disponível em: http://localhost:8080

================================================== 🏗️ ARQUITETURA
==================================================

Container 1: Aplicação Spring Boot Container 2: Banco PostgreSQL Volume
Docker: Persistência dos dados

Banco gerenciado por migrations Flyway. DDL automático do Hibernate está
desabilitado (ambiente profissional controlado por versionamento).

================================================== 🧪 TESTES REALIZADOS
==================================================

TESTE 1 - Criar Paciente ✔ Cadastro realizado com sucesso. ✔ Registro
persistido no banco PostgreSQL.

TESTE 2 - Atualização (PUT) ✔ Edição realizada corretamente. ✔ Dados
atualizados refletidos no banco.

TESTE 3 - Remoção (DELETE) ✔ Registro removido corretamente.

TESTE 4 - Persistência em Volume Docker ✔ Após docker compose down e
docker compose up, os dados permaneceram no banco. ✔ Com docker compose
down -v os dados foram apagados como esperado (reset controlado).

TESTE 5 - Consulta Direta no PostgreSQL Executado via terminal:

docker exec -it crud_pacientes_db psql -U postgres -d crud_pacientes

select * from pacientes;

✔ Dados confirmados diretamente no banco.

================================================== 📂 ESTRUTURA DO
PROJETO ==================================================

-   src/main/java → Camadas Controller, Service, Repository
-   src/main/resources/db/migration → Scripts Flyway
-   Dockerfile → Build da aplicação
-   docker-compose.yml → Orquestração dos containers

================================================== 🔐 BOAS PRÁTICAS
IMPLEMENTADAS ==================================================

-   Separação clara de responsabilidades (Controller / Service /
    Repository)
-   Banco isolado em container
-   Healthcheck do PostgreSQL
-   Uso de variáveis de ambiente
-   Migrations versionadas
-   Persistência em volume Docker

================================================== 📈 CONSIDERAÇÕES
FINAIS ==================================================

Este projeto demonstra:

✔ Conhecimento em backend Java moderno ✔ Integração com banco relacional
✔ Controle de schema com Flyway ✔ Containerização com Docker ✔
Persistência de dados ✔ Estrutura profissional pronta para produção

Desenvolvido para avaliação técnica demonstrando boas práticas e
organização de projeto.
