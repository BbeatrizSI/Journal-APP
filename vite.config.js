import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Mi Aplicación",
        short_name: "MiApp",
        description: "Una PWA creada con React",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#1976d2",
        icons: [
          {
            src: "/icons/logo192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/icons/logo512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ],
  base: '/Journal-APP/'
})
