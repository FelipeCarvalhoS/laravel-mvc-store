# Detalhes de como realizei o teste

> **Nota**: Escrevi o código em inglês por questão de costume e, ao meu ver, por deixar o código mais limpo. Em alguns arquivos, deixei comentários em português quando achei que seria importante clarificar algo para quem fosse avaliar o teste.

## Tech stack

**Backend**: Laravel

- Framework full-stack em PHP (linguagem solicitada pelo enunciado).
- Ele segue o padrão MVC.

**Frontend**: React

- Framework frontend em JavaScript (linguagem solictada pelo enunciado).
- Integrado ao Laravel usando a biblioteca Inertia.
- Acrescentei TypeScript para ter checagem de tipos.
- Usei o Wayfinder para poder usar rotas definidas nos meus controllers do Laravel

**Estilos**: Bootstrap e React Bootstrap

- Escolhi usá-los para facilitar a estilização de componentes comuns como formulários, cards, inputs, etc.

**Banco de dados**: MySQL (banco solicitado pelo enunciado)

- Usei um banco de dados gratuito do FreeDB.

**Deployment**: Laravel Cloud

- Visite o app em https://laravel-mvc-store-production-hp2vgt.laravel.cloud.

## Arquivos mais importantes

O Laravel já vem com uma estrutura de diretórios bem robusta, porém, para esse teste, os diretórios/arquivos que mais interessam são:

- `database/migrations/`: defini as migrations para criar as tabelas de produto (`products`) e categoria (`categories`). Veja os arquivos que têm "products" ou "categories" no nome; o restante são migrações criadas automaticamente pelo Laravel.
- `app/Models/`: defini as models `Product` e `Category` com uma relação N:N.
- `app/Http/Controllers/ProductController.php`: defini a lógica de criação, edição, remoção e filtragem de produtos.
- `routes/web.php`: registrei as rotas do `ProductController`.
- `app/Http/Requests/`: defini a lógica de validação de requests para criação e edição de produtos.
- `resources/js/Pages/`: criei as páginas/componentes do React que são invocados nas rotas do Laravel por meio do Inertia.
- `database/seeders/CategoryAndProductSeeder.php`: defini o seeder para popular o banco.

## Como fiz consultas ao banco de dados

O Laravel possui uma ORM para consultas ao banco de dados chamada de Eloquent. Decidi usá-la para realizar consultas no lugar de escrever SQL pelo fato de ser mais simples e ergonômico. No entanto, como o enunciado exige "usar consultas SQL avançadas", achei que seria importante mostrar o SQL que é executado pelo Eloquent, visto que ORMs costumam abstrair isso. Por isso, coloquei comentários no arquivo `ProductController.php` mostrando o SQL que é executado.

## Em relação à busca de produtos sem recarregar a página com AJAX

Visto que eu já estava utilizando Inertia, que é uma biblioteca que pode fazer requisições ao Laravel diretamente do frontend também sem recarregar a página, decidi utilizá-la para a busca de produtos em vez de usar o `fetch()`, pois dessa forma eu poderia alcançar a mesma funcionalidade com menos código para deixá-lo mais limpo e fácil de compreender. Quando a pesquisa está sendo processada pelo Inertia, uma barra de carregamento aparece no topo da página e, quando o processamento termina, os resultados são exibidos sem recarregar a página.
