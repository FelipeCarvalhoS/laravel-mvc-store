<?php

use App\Http\Controllers\ApiProductController;
use Illuminate\Support\Facades\Route;

Route::resource('/products', ApiProductController::class)->only('index');
