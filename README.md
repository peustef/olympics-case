# Olimpíadas
Registre competições, resultados e veja o ranking.
## Primeiros Passos

* Clonar este repositório
* Executar `npm install` para adicionar as dependências
* Criar as tabelas olympic_competitions e olympic_results no MySQL
* Criar um arquivo .env na raiz do projeto e preencher as chaves a seguir com os valores apropriados:
   ```
   DB_HOST = 
   DB_USER = 
   DB_PASSWORD = 
   DB_SCHEMA = 
   ```
* Caso deseje apenas acessar os endpoints da API, acesse o link do Postman abaixo

## Documentação dos endpoints no Postman

https://documenter.getpostman.com/view/15825757/UUxuipwM


## ENDPOINTS:

### COMPETIÇÃO:
* ### Criar competição
  
    Cria uma nova competição. É necessário passar apenas o nome da mesma. 

* ### Finalizar competição

    Encerra uma competição, para que resultados não possam mais ser cadastrados. É necessário passar apenas o nome da competição a ser encerrada.

### RESULTADO:
* ### Ver ranking

    Visualizar o resultado da competição de acordo com a colocação dos atletas. É necessário passar apenas o nome da competição que deseja ver os resultados.

* ### Registrar resultado

     Registra o resultado de um atleta para determinada competição. É necessário passar a competição, o nome do atleta, o valor do resultado e a unidade de medida do resultado (m ou s) 


    
  
## Autores

<table>
  <tr>
   
  <td align="center"><a href="https://github.com/peustef">
    <img src="https://avatars.githubusercontent.com/u/20777850?v=4" width="100px" alt="Imagem do perfil de Pedro Stefani"/>
    <br />
    <sub><b>Pedro Stefani Saldanha</b></sub>

</table>
