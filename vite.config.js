import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": "/src",
            "@assets": "/src/assets",
            "@components": "/src/components",
            "@layouts": "/src/layouts/",
            "@pages": "/src/pages/",
            "@contexts": "/src/hooks/contexts",
            "@data": "/src/data",
        },
    },
});
