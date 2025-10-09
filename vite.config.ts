import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
// vite.config.ts – falls noch nicht vorhanden:
import svgr from 'vite-plugin-svgr'

const LAN_IP = process.env.VITE_LAN_IP || undefined

export default defineConfig({
  plugins: [          
    svgr(),  
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  envDir: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    host: true,            // <= IMPORTANT: listen on 0.0.0.0 (LAN)
    port: 5173,
    strictPort: true,
    fs: { strict: true, deny: ["**/.*"] },
    hmr: LAN_IP
      ? { host: LAN_IP, protocol: "ws", port: 5173 }
      : undefined,
  },
});
