# WebApp Gestão de Clínica
Aplicação web para gestão de atendimento de clínica médica 

## 📦 Api (.NET 8 Web API)

Esta é uma API RESTful desenvolvida com **.NET 8** e **ASP.NET Core**, com foco em performance, escalabilidade e boas práticas de arquitetura.

### 🚀 Funcionalidades

- CRUD completo de entidades (Pacientes, Atendimentos, Triagem)
- Autenticação JWT
- Validações com FluentValidation
- Suporte a CORS
- Documentação com Swagger
- Versionamento de API

### 🛠️ Tecnologias Utilizadas

- [.NET 8](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- ASP.NET Core
- Entity Framework Core
- SQL Server (ou outro banco configurado)
- Swagger / Swashbuckle
- AutoMapper
- MediatR (opcional)
- FluentValidation

### 📋 Pré-requisitos

- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- Banco de dados SQL Server (ou altere a string de conexão)

### ⚙️ Configuração e Execução
```bash
git clone https://github.com/seu-usuario/MyApi.git
cd webAppGestaoClinica/ApiGestaoClinica
````
### Execute a aplicação
````bash
dotnet run
````
A API estará disponível em https://localhost:44394 ou http://localhost:5024

### 📖 Documentação Swagger
Após iniciar o projeto, acesse:

````bash
https://localhost:5001/swagger
````

### 🔐 Autenticação
A API usa JWT Bearer. Após realizar o login, envie o token no header:
````bash
Authorization: Bearer {seu_token}
````
### 📌 Principais Endpoints
| Método | Rota                   | Descrição                 |
| ------ | -----------------------| ------------------------- |
| GET    | /api/pacientes         | Lista todos os pacientes  |
| GET    | /api/pacientes/{id}    | Retorna um paciente       |
| POST   | /api/pacientes         | Cria um novo paciente     |
| GET    | /api/atendimentos      | Lista todos atendimentos  |
| GET    | /api/atendimentos/{id} | Lista um atendiemento     |
| POST   | /api/atendimentos      | Cria um novo atendimento  |
| PUT    | /api/atendimentos/{id} | Atualiza um atendimento   |
| GET    | /api/triagem           | Lista todas as triagens   |
| GET    | /api/triagem/{id}      | Retorna uma triagem       |
| POST    | /api/triagem          | Cria uma nova triagem     |
| PUT    | /api/triagem/{id}      | Atualiza uma triagem      |
| POST   | /api/auth/login        | Autentica e gera um token |


## 🚀 Aplicação Angular

Projeto frontend desenvolvido com **Angular 19** e **Angular Material**, utilizando arquitetura modular, tema customizado e boas práticas de UI/UX com Material Design.

### ✨ Tecnologias

- [Angular 19](https://angular.io/)
- [Angular Material](https://material.angular.io/)
- [TypeScript 5+](https://www.typescriptlang.org/)
- [RxJS 7+](https://rxjs.dev/)
- SCSS com theming avançado
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/) (opcional)

### 📦 Instalação
#### Instale as dependências
```bash
npm install
````
#### Rode o projeto
````bash
ng serve
````
Acesse em: http://localhost:4200

### 🧪 Scripts
| Comando         | Descrição                            |
| --------------- | ------------------------------------ |
| `npm start`     | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a versão de produção            |
| `npm run lint`  | Roda o lint com ESLint               |
| `npm run test`  | Roda os testes unitários com Karma   |
| `npm run e2e`   | Roda testes de ponta a ponta (e2e)   |
