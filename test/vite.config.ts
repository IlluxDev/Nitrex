import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    base: "./" /* NOTICE: This path must never be changed or the app UI may never load */
});
