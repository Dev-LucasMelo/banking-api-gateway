# Banking-api-gateway

## Descrição

- Esse serviço tem como objetivo centralizar todas as interfaces da aplicação e realizar a chamada para cada serviço correspondente seja por http ou mensageria, devido a essa abordagem o serviço também centraliza o cache de aplicação utilizando redis. <br><br> 
Em resumo o serviço roteia requisições 

## Tecnologias utilizadas

- NestJS (TypeScript)

- Docker / Docker Compose

- Redis

- Kafka (producer)

- HTTP inter-service  

## Arquitetura do serviço

- Esse serviço utiliza a arquitetura modular baseada no domínio (padrão nest) provomento uma boa escalabilidade da aplicação com modulos desacoplados. 

## Comunicação entre os serviços

- HTTP: A API Gateway realiza chamadas HTTP para microsserviços quando é necessário obter ou enviar dados de forma síncrona.

- Kafka: Em casos específicos, a API Gateway emite eventos para tópicos Kafka, permitindo que outros serviços processem essas informações de forma assíncrona.

 ## Swagger

  - link 

## Inicialização da aplicação 
 
### 1. Requisitos  
 - docker
 - docker compose
### 2. Estrutura de rede
 - Foi utilizado uma rede personalizada no docker chamada <strong> loomi_network</strong> para comunicação entre os containers essa rede faz com que todos os arquivos docker-compose.yml se conectem de forma eficiente favorecendo a arquitetura distribuida.  
 
### 3. Como iniciar o projeto

 1. Clonar o projeto

  ```bash
  git clone https://github.com/Dev-LucasMelo/banking-api-gateway.git
  ```
 2. Acessar diretorio 
  
  ```bash
  cd banking-api-gateway
  ```

3. iniciar contêineres com Docker Compose:
 
  ```bash
  docker-compose up --build
  ```

4. Acessar da api gateway: 

  ```bash
  http://localhost:4000/
  ```

