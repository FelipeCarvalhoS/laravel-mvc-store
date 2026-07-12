@use('Illuminate\Support\Number')

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{ config('app.name') }}</title>

        @fonts
        @vite(['resources/js/app.js'])
    </head>

    <body>
        <nav class="navbar navbar-expand-md bg-body p-2 shadow-sm sticky-top">
            <div class="container-fluid">
                <img src="{{ Vite::asset('resources/img/full-logo.png') }}" alt="SmartStore">
                {{-- <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                    aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Link</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Dropdown
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Action</a></li>
                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li><a class="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                        </li>
                    </ul>
                </div> --}}
            </div>
        </nav>
        <main>
            <div class="py-5 bg-body-secondary">
                <div class="container">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
                        @foreach ($products as $product)
                            <div class="col">
                                <div class="card shadow-sm h-100">
                                    <div class="border-bottom d-flex justify-content-center bg-body-tertiary">
                                        <img class="p-4 w-50 mx-auto" src="{{ Vite::asset('resources/img/logo.png') }}">
                                    </div>
                                    <div class="card-body d-flex flex-column justify-content-between gap-3">
                                        <div>
                                            <h1 class="card-text font-base fs-6 fw-normal mb-1">
                                                {{ $product->name }}
                                            </h1>
                                            <small class="text-body-secondary">Quantidade: {{ $product->stock }}</small>
                                        </div>

                                        <div class="hstack gap-2 flex-wrap">
                                            @foreach ($product->categories as $category)
                                                <span class="badge rounded-pill bg-tertiary text-white">
                                                    {{ $category->name }}
                                                </span>
                                            @endforeach
                                        </div>

                                        <div class="h5">
                                            {{ Number::currency($product->price, 'BRL') }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </main>
    </body>

</html>
