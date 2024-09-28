
# Vylex

Serviço para gerenciar usuários, assinatura de pacotes e relatório de filmes assistidos pelos usuários.

## Pré-requisitos

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Configuração e Execução do Projeto

Siga os passos abaixo para configurar e executar o projeto:

### ENVs

Preencher a env abaixo com a sua API KEY do [TheMovieDB](https://www.themoviedb.org/settings/api) e [Resend](https://resend.com)
```sh
THE_MOVIE_API_KEY="*"
RESEND_API_KEY="*"
```

### 1. Rodando a aplicação

A aplicação está configurada com containers docker, então a inicialização será bem simples.
Utilize o comando abaixo para subir os contêineres e aguarde a inicialização:

```sh
docker-compose up --build
```

### 2. Acesse a documentação

A API foi documentada utilizando o swagger, e a mesma pode ser acessada na rota ```http://localhost:3000/docs``` assim que a aplicação estiver rodando.

## Arquitetura e estrutura de dados

### Estrutura do projeto

O projeto foi estruturando seguindo o padrão de **Domain-Driven Design (DDD)**
```
src/
├── modules/
│   ├── module/                     # Representa um contexto ou funcionalidade do domínio
│   │   ├── application/            # Casos de uso e serviços que orquestram as regras de negócio
│   │   │   └── use-cases/
│   │   ├── domain/                 # Entidades e interfaces do domínio
│   │   │   ├── entities/
│   │   │   ├── repositories/
│   │   ├── infrastructure/         # Implementações específicas da infraestrutura
│   │   │   ├── database/           # Configuração de repositórios
│   │   │   ├── http/               # Controladores e rotas para interfaces HTTP
│   │   │   |  ├── controllers/
│   │   │   |  └── routes/
│   │   │   └── externals/          # Integrações com serviços externos
│   │   └── shared/                 # Componentes compartilhados dentro do módulo
└── shared/                         # Componentes globais que podem ser utilizados por diferentes módulos
```

#### MySQL

<img width="581" alt="image" src="https://github.com/user-attachments/assets/4abcb830-8acd-417a-95d0-fe769f18923d">

#### MongoDB

<img width="498" alt="image" src="https://github.com/user-attachments/assets/31bac182-a24f-40ea-b567-74572a6eacfd">

## Fluxo de redefinição de senha

O fluxo de **reset de senha** possibilita que os usuários redefinam suas senhas de forma segura e eficiente. Para isso, foi implementada uma integração com a plataforma [Resend](https://resend.com/), que envia um e-mail ao usuário contendo um link para redefinir a senha. 

Para facilitar os testes, o **token de redefinição** será incluído diretamente na resposta da API `POST /request-password-reset`. Vale ressaltar que, em um cenário real, esse token seria enviado exclusivamente para o e-mail do usuário, garantindo maior segurança e privacidade.

