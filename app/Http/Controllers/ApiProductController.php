<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ApiProductController extends Controller
{
    public function index(Request $request)
    {
        $name = $request->query('name');
        $filtered_products = Product::where('name', 'like', "%$name%")->get();
        return response()->json($filtered_products);
    }
}
