# 20232BSET03P2
Inteli - Engenharia de Software | Avaliação 2023-2B P2

# Prova Carol

## SQL Injection
Para evitar o SQL Injection eu coloquei um if para não deixar um animal ser cadastrado se ele se o tamanho da informação passada for igual a 0.

## Correção da logica de votação
Para não permitir que um voto seja cadastrado sem um animal fiz uma funcao que verifica a existencia do id na tabela e caso ele não ache o id pela row ele não computa o voto.

## Implementação dos metodos que tinham assinatura
Adicionei o metodo post para o animal cachorro que não existia. E tambem o metodo get para a tabela cachorro. 
Agora pode ser inserido um novo cachorro e tambem pode ser mostrado toda a base de dados.

## Erros
Anteriormnte só aparecia o erro que não podia ser computado, agora todos os erros são especificados do motivo.

# Para rodar
Primeiro instale todas as dependencias com 'npm i' 
Depois rode o arquivo index.js 'node index.js'

