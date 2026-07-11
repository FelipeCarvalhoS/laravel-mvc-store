<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class CategoryAndProductSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('category_product')->delete();
        DB::table('products')->delete();
        DB::table('categories')->delete();

        $categoryNames = [
            'Bebidas',
            'Laticínios',
            'Snacks',
            'Doces',
            'Mercearia',
            'Higiene',
        ];

        $categoryIds = [];
        
        foreach ($categoryNames as $name) {
            $categoryIds[$name] = DB::table('categories')->insertGetId([
                'name'       => $name,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $products = [
            [
                'name'        => 'Coca-Cola Lata 350ml',
                'price'       => 4.50,
                'stock'       => 120,
                'description' => 'Refrigerante de cola gelado, lata de 350ml.',
                'categories'  => ['Bebidas'],
            ],
            [
                'name'        => 'Coca-Cola Zero Açúcar 2L',
                'price'       => 9.90,
                'stock'       => 40,
                'description' => 'Refrigerante de cola sem açúcar, garrafa de 2 litros.',
                'categories'  => ['Bebidas'],
            ],
            [
                'name'        => 'Guaraná Antarctica Lata 350ml',
                'price'       => 4.00,
                'stock'       => 100,
                'description' => 'Refrigerante sabor guaraná, produzido pela Ambev.',
                'categories'  => ['Bebidas'],
            ],
            [
                'name'        => 'Skol Cerveja Lata 350ml',
                'price'       => 5.50,
                'stock'       => 80,
                'description' => 'Cerveja pilsen gelada, lata de 350ml, produzida pela Ambev.',
                'categories'  => ['Bebidas'],
            ],
            [
                'name'        => 'Kibon Cornetto Chocolate',
                'price'       => 8.90,
                'stock'       => 35,
                'description' => 'Casquinha de sorvete sabor chocolate com cobertura crocante.',
                'categories'  => ['Laticínios'],
            ],
            [
                'name'        => 'Kibon Picolé Fruttare Morango',
                'price'       => 5.00,
                'stock'       => 50,
                'description' => 'Picolé de fruta sabor morango, sem conservantes.',
                'categories'  => ['Laticínios'],
            ],
            [
                'name'        => 'Toddynho 200ml',
                'price'       => 3.00,
                'stock'       => 150,
                'description' => 'Achocolatado pronto para beber, embalagem de 200ml.',
                'categories'  => ['Bebidas'],
            ],
            [
                'name'        => 'Achocolatado Toddy 400g',
                'price'       => 12.50,
                'stock'       => 60,
                'description' => 'Achocolatado em pó Toddy, lata de 400 gramas.',
                'categories'  => ['Mercearia'],
            ],
            [
                'name'        => 'Leite em Pó Ninho Nestlé 400g',
                'price'       => 22.90,
                'stock'       => 45,
                'description' => 'Leite em pó integral Ninho, lata de 400 gramas.',
                'categories'  => ['Laticínios', 'Mercearia'],
            ],
            [
                'name'        => 'Chocolate Nestlé Classic 90g',
                'price'       => 7.50,
                'stock'       => 70,
                'description' => 'Barra de chocolate ao leite Nestlé Classic, 90 gramas.',
                'categories'  => ['Doces'],
            ],
            [
                'name'        => 'Maionese Hellmann\'s 500g',
                'price'       => 14.90,
                'stock'       => 55,
                'description' => 'Maionese tradicional Hellmann\'s, pote de 500 gramas.',
                'categories'  => ['Mercearia'],
            ],
            [
                'name'        => 'Cheetos Lua Requeijão',
                'price'       => 8.00,
                'stock'       => 65,
                'description' => 'Salgadinho de milho sabor requeijão, formato luinha.',
                'categories'  => ['Snacks'],
            ],
            [
                'name'        => 'Cheetos Onda Requeijão',
                'price'       => 8.00,
                'stock'       => 65,
                'description' => 'Salgadinho de milho crocante sabor requeijão.',
                'categories'  => ['Snacks'],
            ],
            [
                'name'        => 'Fini Bala de Goma Ursinhos',
                'price'       => 6.50,
                'stock'       => 90,
                'description' => 'Bala de goma sabor variado, formato de ursinhos.',
                'categories'  => ['Doces'],
            ],
            [
                'name'        => 'Fini Tubes Morango',
                'price'       => 6.00,
                'stock'       => 90,
                'description' => 'Bala de goma recheada sabor morango em formato de tubo.',
                'categories'  => ['Doces'],
            ],
            [
                'name'        => 'Café 3 Corações Tradicional 500g',
                'price'       => 15.90,
                'stock'       => 75,
                'description' => 'Café torrado e moído tradicional, pacote de 500 gramas.',
                'categories'  => ['Mercearia', 'Bebidas'],
            ],
            [
                'name'        => 'Café 3 Corações Extraforte 250g',
                'price'       => 9.90,
                'stock'       => 60,
                'description' => 'Café torrado e moído extraforte, pacote de 250 gramas.',
                'categories'  => ['Mercearia', 'Bebidas'],
            ],
            [
                'name'        => 'Água Mineral Crystal 500ml',
                'price'       => 2.50,
                'stock'       => 200,
                'description' => 'Água mineral sem gás, garrafa de 500ml.',
                'categories'  => ['Bebidas'],
            ],
            [
                'name'        => 'Pão de Forma Wickbold Tradicional',
                'price'       => 8.90,
                'stock'       => 30,
                'description' => 'Pão de forma tradicional, pacote de 500 gramas.',
                'categories'  => ['Mercearia'],
            ],
            [
                'name'        => 'Bolacha Recheada Trakinas Chocolate',
                'price'       => 4.50,
                'stock'       => 110,
                'description' => 'Biscoito recheado sabor chocolate, pacote de 126 gramas.',
                'categories'  => ['Doces'],
            ],
            [
                'name'        => 'Sabonete Dove Original 90g',
                'price'       => 3.90,
                'stock'       => 85,
                'description' => 'Sabonete em barra hidratante, 90 gramas.',
                'categories'  => ['Higiene'],
            ],
            [
                'name'        => 'Detergente Ypê Neutro 500ml',
                'price'       => 2.90,
                'stock'       => 130,
                'description' => 'Detergente líquido para lavar louças, frasco de 500ml.',
                'categories'  => ['Higiene'],
            ],
        ];

        foreach ($products as $product) {
            $productId = DB::table('products')->insertGetId([
                'name'        => $product['name'],
                'price'       => $product['price'],
                'stock'       => $product['stock'],
                'description' => $product['description'],
                'created_at'  => now(),
                'updated_at'  => now(),
            ]);

            $pivotRows = [];
            
            foreach ($product['categories'] as $categoryName) {
                $pivotRows[] = [
                    'category_id' => $categoryIds[$categoryName],
                    'product_id'  => $productId,
                    'created_at'  => now(),
                    'updated_at'  => now(),
                ];
            }

            DB::table('category_product')->insert($pivotRows);
        }
    }
}
