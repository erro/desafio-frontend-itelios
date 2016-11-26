# desafio-frontend-itelios

Desafio para concorrer a vaga na Itelios.

## O que é?

Carousel de produtos desenvolvido em JavaScript puro para venda relacionada em e-commerce.

## Funcionamento

O Componente desenvolvido faz uma requisição HTTP no JSON/API enviada 'http://rh.itelios.com.br/Arquivos/TesteFront/produtos.php' e após tratar e montar os elementos, mostra ao usuário um carousel de produtos com paginação

## Como rodar?

O componente desenvolvido não tem auto-start, mas o arquivo 'index.html' já está com a chamada 'Erro.Carousel.create();' para iniciar o carousel


## Observação

A API enviada não está devidamente configurada e por isso impossibilitou de acessá-la diretamente via *XMLHttpRequest*. Copiei o JSON de resultado e criei um arquivo físico dentro do projeto - sem alteração de estrutura - para pode funcionar localmente ou em qualquer ambiente.