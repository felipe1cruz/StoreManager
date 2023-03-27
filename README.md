## Store Manager Project

## Sobre
&nbsp;&nbsp; Store Manager é um projeto do curso de Desenvolvedor Web Full Stack da Trybe, para o módulo de backend,  aonde foi desenvolvido uma API utilizando a arquitetura MSC (model-service-controller), uma variação bem próxima da mais conhecida "Arquitetura de Camadas", dividindo as funções das camadas: quem faz a requisição, quem faz a validação, quem faz a chamada para o banco de dados, etc.
Para esse projeto também foi desenvolvido testes unitários utilizando o Chai e o Sinon. Também foi utilizado a biblioteca JOI para fazer as validações das informações e retorno da mensagem de erro.

## Desafios
&nbsp;&nbsp; Desafio desse projeto foi a familização da arquitetura de camadas, mas bem gratificante ao final em ver como a organização facilita o trabalho. Também foi o primeiro contato com testes em backend com Chai e Sinon, mas depois que entendi o funcionamento vi que era bem parecido com o RTL, no qual já estava acostumado no frontend.

## Arquivos
&nbsp;&nbsp; A Trybe desenvolveu previamente toda a configuração do projeto e alguns arquivos como migration.sql e seed.sql
</br>
</br>
&nbsp;&nbsp; Arquivos desenvolvidos por mim:
- tudo nas pastas /src e /test.

## Tecnologias
Tecnologias aplicadas por mim nesse projeto:
- NodeJS;
- Express;
- MySQL;
- Sinon;
- Chai;
- Docker;

## Como executar esse projeto (com docker)
- Certifique-se de ter o docker instalado com as versões 1.29 ou superior;
- Clone o repositório;
- Execute o container do banco de dados e Node com o comando `docker-compose up -d`;
- Acesse o container de Node com o comando `docker exec -it store_manager bash`; 
- Instale todas as dependências do projeto com o comando `npm install`;
- Rode o aplicativo com `npm start`; 


![Captura de tela de 2022-12-09 17-10-21](https://user-images.githubusercontent.com/96309898/206790170-1697a7b9-f42e-4b77-a65e-512979d01c7b.png)
printscreen da rota GET /products que trás um status 200 com um JSON com todos os produtos do banco de dados
