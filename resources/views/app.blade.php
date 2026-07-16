<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{ config('app.name') }}</title>

        @fonts
        @viteReactRefresh
        @vite('resources/js/app.tsx')
        <x-inertia::head />
    </head>

    <body>
        <nav class="navbar navbar-expand-md bg-body p-2 shadow-sm sticky-top">
            <div class="container-fluid">
                <img src="{{ Vite::asset('resources/img/full-logo.png') }}" alt="SmartStore">
            </div>
        </nav>
        <x-inertia::app />
    </body>

</html>
