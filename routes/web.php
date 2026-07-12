<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

Route::get('/', fn () => redirect(route('produtos.index')));
Route::resource('produtos', ProductController::class);
