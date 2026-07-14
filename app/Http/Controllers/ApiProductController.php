<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ApiProductController extends Controller
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

        return response()->json($filtered_products);
    }
}
