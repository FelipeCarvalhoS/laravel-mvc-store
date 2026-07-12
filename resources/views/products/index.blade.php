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
        <main class="py-5 bg-body-secondary">
            <div class="container">
                <h1 class="mb-4">Catálogo de Produtos</h1>
                <div class="row g-2 mb-3">
                    <div class="col-12 col-md-10">
                        <form action=""">
                            <div class="row g-2">
                                <div class="col-7 col-sm-9">
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Pesquisar por nome..."
                                    >
                                </div>
                                <div class="col">
                                    <select class="form-select">
                                        <option selected>Categoria</option>
                                        @foreach ($categories as $category)
                                            <option value="{{ $category->id }}">{{ $category->name }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="col">
                        <button class="w-100 btn btn-success text-white">Adicionar...</button>
                    </div>
                </div>
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
                    @foreach ($products as $product)
                        <div class="col">
                            <div class="card shadow-sm h-100">
                                <div class="border-bottom d-flex justify-content-center bg-body-tertiary">
                                    <img class="p-4 w-50 mx-auto" src="{{ Vite::asset('resources/img/logo.png') }}">
                                </div>
                                <div class="card-body d-flex flex-column justify-content-between gap-3">
                                    <div>
                                        <h2 class="card-text font-base fs-6 fw-normal mb-1">
                                            {{ $product->name }}
                                        </h2>
                                        <div>
                                            <small
                                                class="text-body-secondary">{{ Str::limit($product->description, 100, preserveWords: true) }}</small>
                                        </div>
                                    </div>


                                    <div class="d-flex flex-column gap-3">
                                        <div class="hstack gap-2 flex-wrap">
                                            @foreach ($product->categories as $category)
                                                <span class="badge rounded-pill bg-primary text-white">
                                                    {{ $category->name }}
                                                </span>
                                            @endforeach
                                        </div>
                                        <div>
                                            <div class="mb-1">
                                                <small>Quantidade: {{ $product->stock }}</small>
                                            </div>
                                            <div class="d-flex justify-content-between align-items-center">
                                                <div class="h5">
                                                    {{ Number::currency($product->price, 'BRL') }}
                                                </div>
                                                <div class="d-flex gap-2 fs-5 text-body-tertiary">
                                                    <button
                                                        class="icon-btn icon-btn-info"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#modalEdit"
                                                        data-bs-name="{{ $product->name }}"
                                                        data-bs-price="{{ $product->price }}"
                                                        data-bs-stock="{{ $product->stock }}"
                                                        data-bs-description="{{ $product->description }}"
                                                    >
                                                        <span class="visually-hidden">Editar</span>
                                                        <i class="bi bi-pencil"></i>
                                                    </button>
                                                    <button class="icon-btn icon-btn-danger">
                                                        <span class="visually-hidden">Deletar</span>
                                                        <i class="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </main>

        {{-- <div
            class="modal fade"
            id="modalEdit"
            tabindex="-1"
            aria-labelledby="modalEditLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="modalEditLabel">New message</h1>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label for="recipient-name" class="col-form-label">Recipient:</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="recipient-name"
                                >
                            </div>
                            <div class="mb-3">
                                <label for="message-text" class="col-form-label">Message:</label>
                                <textarea class="form-control" id="message-text"></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >Close</button>
                        <button type="button" class="btn btn-primary">Send message</button>
                    </div>
                </div>
            </div>
        </div>

        <script>
            const modalEdit = document.getElementById('modalEdit')

            modalEdit.addEventListener('show.bs.modal', event => {
                const button = event.relatedTarget
                const name = button.getAttribute('data-bs-name')
                const price = button.getAttribute('data-bs-price')
                const stock = button.getAttribute('data-bs-stock')
                const description = button.getAttribute('data-bs-description')
                const categories = button.getAttribute('data-bs-categories')

                const modalTitle = modalEdit.querySelector('.modal-title')
                const modalBodyInput = modalEdit.querySelector('.modal-body input')

                modalTitle.textContent = `New message to ${recipient}`
                modalBodyInput.value = recipient
            })
        </script> --}}
    </body>

</html>
