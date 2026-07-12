<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Product extends Model
{
    protected $with = ['categories']; // Fazer o eager loading das categorias para evitar queries N+1

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class);
    }
}
