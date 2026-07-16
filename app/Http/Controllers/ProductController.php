<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        /**
         * Abaixo, uma sequência de queries é executada para filtrar os produtos
         * utilizando o Eloquent ORM do Laravel. Como o enunciado mencionou consultas
         * com joins e subconsultas, vou colocar aqui o equivalente em SQL para mostrar
         * o que a ORM executa nos bastidores. Você pode observar que há, de fato,
         * um join e uma subconsulta.
         * 
         * SELECT p.*
         * FROM products p
         * WHERE EXISTS (
         *    SELECT 1
         *    FROM category_product cp
         *    INNER JOIN categories c ON c.id = cp.category_id
         *    WHERE cp.product_id = p.id
         *      AND c.name = <categoria_da_query_string>
         * )
         * AND p.name LIKE '%<nome_da_query_string>%'
         */

        $name = (string) $request->query('name');
        $category = (string) $request->query('category');

        $filtered_products = Product::query();

        if ($request->filled('category')) {
            $filtered_products = $filtered_products->whereHas('categories', function ($q) use ($category) {
                $q->where('name', $category);
            });
        }

        if ($request->filled('name')) {
            $filtered_products = $filtered_products->where('name', 'like', "%$name%");
        }

        $filtered_products = $filtered_products->get();

        if ($request->expectsJson()) {
            // Retornar apenas os dados em JSON no caso da request AJAX
            return response()->json($filtered_products);
        }

        return Inertia::render('ProductsIndex', [
            'products' => $filtered_products,
            'categories' => Category::all(),
            'filters' => [
                'name' => $name,
                'category' => $category,
            ],
        ]);
    }

    public function store(StoreProductRequest $request)
    {
        $validated = $request->validated();

        /**
         * Aqui, o Eloquent realiza um INSERT na tabela de produtos (e retorna o produto criado).
         * 
         * INSERT INTO products (name, price, stock, description)
         * VALUES (<novo_nome>, <novo_preco>, <novo_estoque>, <nova_descricao>)
         */

        $product = Product::create([
            'name' => $validated['name'],
            'price' => $validated['price'],
            'stock' => $validated['stock'],
            'description' => $validated['description'],
        ]);

        /** 
         * Aqui, o Eloquent realiza INSERTs na tabela intermediária entre categoria e produto
         * para relacionar o produto recém-criado às categorias enviadas na request.
         */

        $product->categories()->attach($validated['categories']);

        return redirect()->back();
    }

    public function update(UpdateProductRequest $request, Product $product)
    {
        $validated = $request->validated();

        /**
         * Aqui, o Eloquent realiza um UPDATE na tabela de produtos para atualizar os campos do produto.
         * 
         * UPDATE products
         * SET name = <novo_nome>, price = <novo_preco>, stock = <novo_estoque>, description = <nova_descricao>
         * WHERE id = <id_do_produto>
         */

        $product->update([
            'name' => $validated['name'],
            'price' => $validated['price'],
            'stock' => $validated['stock'],
            'description' => $validated['description'],
        ]);

        /**
         * Aqui, o Eloquent realiza INSERTs e DELETEs na tabela intermediária entre categoria e produto
         * para relacionar o produto somente às categorias enviadas na request.
         */

        $product->categories()->sync($validated['categories']);

        return redirect()->back();
    }
    
    public function destroy(Product $product)
    {
        /**
         * Aqui, o Eloquent realiza um DELETE para remover o produto.
         * 
         * DELETE FROM products WHERE id = <id_do_produto>
         */

        $product->delete();
        return redirect()->back();
    }
}
