import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// NOTE: May Not work, used in attempt to use secure cookies from backend
// Waiting on redirect_uri in google developer console to recognize...
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), basicSsl()],
    // plugins: [react()],
})
