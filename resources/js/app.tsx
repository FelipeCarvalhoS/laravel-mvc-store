import "../scss/app.scss";

import { createInertiaApp } from "@inertiajs/react";

createInertiaApp({
    strictMode: true,
    pages: {
        path: "./Pages",
    },
});
