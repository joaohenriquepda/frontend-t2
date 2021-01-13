# T2 - Frontend

## Ambiente de desenvolvimento 

O ambiente de desenvolvimento consta com suas dependências em containers do Docker. Caso precise instalar o docker na raíz do projeto já tem dois scripts de instalação do Docker e Docker compose para ambientes Linux.

Para utilizar o docker para executar o projeto basta executar o comando abaixo na raíz do projeto
```
$ docker-compose up
```
O Docker irá realizar o download de todas as dependências necessárias e ao final do processo o projeto estará disponível para acesso em **https://localhost:4201**


## Comandos úteis

### server local
Caso não queria usar o Docker para gerenciar as dependências do projeto e já tenha sua máquina configurada com Node e o Angular CLI, poderá usar o comando a seguir para colocar o sistema em funcionamento

```
$ ng server
```

Se tudo ocorrer conforme o esperado poderá acessar o projeto em *https://localhost:4200**

## Processo de deploy e CI/CD

 Atualmente o projeto não conta com integração contínua e deploy contínuo integrado, o processo ainda é manual. Segue abaixo as instruçõe para realizar o deploy no  servidor **Firebase**

 Primeiro precisamos gerar a build dos arquivos, o comando a seguir irá gerar os arquivos e configurar as váriáveis necessárias em modo de produção.

 ```
$ ng build --prod
```

Com os arquivos da build gerados agora será possível realizar o deploy. Primeiro irá precisar logar no firebase, estou levando em consideração que está utilizando o container docker, caso contrário irá precisar instalar a dependência do firebase.

 ```
$ firebase login
```
Será solicitado no terminal que acesse um link para dar permissão da conta, acesse o link. Para finalmente poder executar o deploy

 ```
$ firebase deploy
```


### Pontos de destaque sobre regra de negócios
Algumas das soluções apresentadas aqui foram desenvolvidas pensando na continuidade do desenvolvimento.

- O sistema armazena localmente o token (padrão JWT) de acesso que expira em um determinado período de tempo.
- A API para algumas consultas é necessário passar o token de acesso;




## Links de acesso
O projeto está hospedado no firebase e pode ser acessado em

https://t2solution.web.app/login

A API do projeto está
https://api-t2.herokuapp.com/
