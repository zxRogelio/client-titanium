import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // 👇 O quita base por completo, pero NO uses /titanium/ ni nada raro
  base: '/',
})
