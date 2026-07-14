import "../scss/app.scss";

import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";

createInertiaApp({
    strictMode: true,
    pages: {
        path: "./Pages",
    },
});
