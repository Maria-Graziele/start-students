🎓 StartStudents – Sistema de Cadastro de Alunos
<p align="center">

<img src="https://img.shields.io/github/last-commit/Maria-Graziele/start-students?style=for-the-badge" />
<img src="https://img.shields.io/github/languages/top/Maria-Graziele/start-students?style=for-the-badge" />
<img src="https://img.shields.io/github/repo-size/Maria-Graziele/start-students?style=for-the-badge" />
<img src="https://img.shields.io/github/issues/Maria-Graziele/start-students?style=for-the-badge" />
<img src="https://img.shields.io/github/license/Maria-Graziele/start-students?style=for-the-badge" />
<img src="https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=java&logoColor=white" />
<img src="https://img.shields.io/badge/Spring_Boot-Backend-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" />
<img src="https://img.shields.io/badge/Angular-8-DD0031?style=for-the-badge&logo=angular&logoColor=white" />
<img src="https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />

</p>
📌 Descrição

O StartStudents é uma aplicação Fullstack desenvolvida para gerenciamento completo de alunos, implementando operações CRUD com arquitetura organizada, validações robustas e testes automatizados tanto no backend quanto no frontend.

O projeto aplica boas práticas de desenvolvimento, separação de responsabilidades e estrutura escalável.

⸻

🎯 Objetivo

Desenvolver um sistema completo de cadastro de alunos aplicando:
	•	Arquitetura em camadas
	•	Boas práticas REST
	•	DTO Pattern
	•	Tratamento global de exceções
	•	Validações customizadas
	•	Testes automatizados
	•	Organização por features no Angular

⸻

🛠 Tecnologias Utilizadas

🔹 Backend
	•	Java
	•	Spring Boot
	•	Spring Data JPA
	•	PostgreSQL
	•	Maven
	•	JUnit
	•	Mockito

🔹 Frontend
	•	Angular 8
	•	TypeScript
	•	SCSS
	•	Jasmine
	•	Karma

⸻

🏗 Arquitetura do Backend

src/main/java/com.backend.startstudents
├── config
├── controller
├── dto
│   ├── request
│   └── response
├── exception
├── model
├── repository
└── service

✔ Estrutura aplicada:
	•	Controller → Camada de exposição da API
	•	Service → Regras de negócio
	•	Repository → Persistência de dados
	•	DTO → Controle de entrada e saída
	•	Exception → Tratamento global de erros

⸻

🎨 Estrutura do Frontend
src/app
├── core
├── features
│   ├── alunos
│   └── auth
├── shared
│   ├── components
│   ├── directives
│   ├── validators
│   └── utils

✔ Organização:
	•	Estrutura baseada em features
	•	Componentes reutilizáveis
	•	Diretivas customizadas (CPF, telefone)
	•	Validações personalizadas
	•	Separação clara de responsabilidades

⸻

🚀 Funcionalidades
	•	✅ Cadastro de aluno
	•	✅ Atualização de aluno
	•	✅ Exclusão de aluno
	•	✅ Listagem com paginação
	•	✅ Busca
	•	✅ Upload de foto
	•	✅ Tratamento global de erros
	•	✅ Validações customizadas
	•	✅ Testes unitários no backend
	•	✅ Testes unitários no frontend

⸻

🧪 Testes Automatizados

🔹 Backend
	•	JUnit
	•	Mockito
	•	Testes por camada:
	•	Controller
	•	Service
	•	Repository
	•	Exception Handler

Executar:
mvn test

⸻

🔹 Frontend
	•	Jasmine
	•	Karma

Executar:
ng test

⸻

⚙️ Como Executar o Projeto

🔹 Backend

1️⃣ Criar banco PostgreSQL
CREATE DATABASE startstudents;

2️⃣ Configurar application.properties:
spring.datasource.url=jdbc:postgresql://localhost:5432/startstudents
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha

3️⃣ Rodar aplicação:
mvn clean install
mvn spring-boot:run

API disponível em:
http://localhost:8080

⸻

🔹 Frontend

Instalar dependências:
npm install

Rodar aplicação:
ng serve

Aplicação disponível em:
http://localhost:4200

⸻

📊 Diferenciais do Projeto
	•	Arquitetura limpa e organizada
	•	Separação de responsabilidades
	•	Uso de DTOs para segurança da API
	•	Tratamento global de exceções
	•	Validações customizadas
	•	Código escalável
	•	Testes automatizados no backend e frontend
	•	Estrutura preparada para crescimento

⸻

👩‍💻 Desenvolvido por

Maria Graziele
Desenvolvedora Fullstack Java + Angular

