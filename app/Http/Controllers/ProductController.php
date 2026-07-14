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
        $name = $request->query('name');
        $category = $request->query('category');

        $filtered_products = Product::query();

        if ($category) {
            $filtered_products = $filtered_products->whereHas('categories', function ($q) use ($category) {
                $q->where('name', $category);
            });
        }

        $filtered_products = $filtered_products->where('name', 'like', "%$name%")->get();

        return Inertia::render('ProductsIndex', [
            'products' => $filtered_products,
            'categories' => Category::all(),
            'filters' => [
                'name' => $name,
                'category' => $category,
            ],
        ]);
    }

    public function create()
    {
        //
    }

    public function store(StoreProductRequest $request)
    {
        //
    }

    public function show(Product $product)
    {
        //
    }

    public function edit(Product $product)
    {
        //
    }

    public function update(UpdateProductRequest $request, Product $product)
    {
        $validated = $request->validated();

        $product->update([
            'name' => $validated['name'],
            'price' => $validated['price'],
            'stock' => $validated['stock'],
            'description' => $validated['description'],
        ]);

        $product->categories()->sync($validated['categories']);

        return redirect()->back();
    }
    
    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->back();
    }
}
