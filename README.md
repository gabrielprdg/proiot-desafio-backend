# proiot-desafio-backend
Backend challenge of the company proiot, this challenge is summarized in a rest api that is crud of Iot devices

# Aplicação Node - ProIot

API HTTP em Node.js com TypeScript, Express e Docker e MongoDB.

## Guia de desenvolvimento

Prerequisites:
-  caso não utilize docker é recomendado ter uma versao do node mais atual.
- `yarn` ou `npm` (para gerenciamento de dependências e execução de scripts)
- `docker` e `docker-compose` (para executar o servidor, banco de dados localmente de forma isolada e reproduzível)

### Backend: 


Em primeiro lugar se faz necessário preencher as variáveis de ambiente, lembrando que a porta usada e mapeada pelo docker é a 8081 da aplicação.
Crie um arquivo .env na raíz do projeto.
```
PORT=
MONGOURL=
```

A mongo url é basicamente essa mongodb://mongo:27017/nomedobanco
o nome do banco coloquei proiot

Realizando build da aplicação
```
npm run build
yarn build
```

Em seguida é so subir o container docker:

```
sudo docker compose up
```

Sem o docker:
```
npm i
npm run start
yarn start
```

### Testes
Foi realizado alguns testes unitários e para rodar basta executar o comando:
```
npm run test
```

Qualquer duvida só me chamar pelo linkedin
```
https://www.linkedin.com/in/gabriel-rodrigues-aaa352207/
```


