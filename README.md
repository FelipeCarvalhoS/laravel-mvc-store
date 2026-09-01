# Tech stack

**Backend**: Laravel

- Framework full-stack em PHP.
- Ele segue o padrão MVC.

**Frontend**: React

- Framework frontend em JavaScript.
- Integrado ao Laravel usando a biblioteca Inertia.
- Acrescentei TypeScript para ter checagem de tipos.
- Usei o Wayfinder para poder usar rotas definidas nos meus controllers do Laravel dentro do React.

**Estilos**: Bootstrap e React Bootstrap

- Escolhi usá-los para facilitar a estilização de componentes comuns como formulários, cards, inputs, etc.

**Banco de dados**: MySQL

# Arquivos mais importantes

O Laravel já vem com uma estrutura de diretórios bem robusta, porém, para esse teste, os diretórios/arquivos que mais interessam são:

- `database/migrations/`: defini as migrations para criar as tabelas de produto (`products`) e categoria (`categories`). Veja os arquivos que têm "products" ou "categories" no nome; o restante são migrações criadas automaticamente pelo Laravel.
- `app/Models/`: defini as models `Product` e `Category` com uma relação N:N.
- `app/Http/Controllers/ProductController.php`: defini a lógica de criação, edição, remoção e filtragem de produtos.
- `routes/web.php`: registrei as rotas do `ProductController`.
- `app/Http/Requests/`: defini a lógica de validação de requests para criação e edição de produtos.
- `resources/js/Pages/`: criei as páginas/componentes do React que são invocados nas rotas do Laravel por meio do Inertia.
- `database/seeders/CategoryAndProductSeeder.php`: defini o seeder para popular o banco.
