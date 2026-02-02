import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: "stats.html", 
      open: true, 
      gzipSize: true, 
      brotliSize: true, 
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
      "@app": "/src/app",
      "@pages": "/src/pages",
      "@entities": "/src/entities",
      "@features": "/src/features",
      "@shared": "/src/shared",
    },
  },
  build: {
    target: "es2020",
    sourcemap: true, 
    minify: "esbuild", 
    chunkSizeWarningLimit: 600, 
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          vendor: ["gsap", "framer-motion", "zustand"],
        },
      },
    },
  },
});


//---------

// import { defineConfig } from "vite";
// import { visualizer } from "rollup-plugin-visualizer";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [
//     react(),
//     visualizer({
//       filename: "stats.html", // файл с отчётом
//       open: true, // открывает в браузере после билда
//       gzipSize: true, // показывает gzipped размеры
//       brotliSize: true, // показывает brotli размеры
//     }),
//   ],
//   resolve: {
//     alias: {
//       "@": "/src",
//       "@app": "/src/app",
//       "@pages": "/src/pages",
//       "@entities": "/src/entities",
//       "@features": "/src/features",
//       "@shared": "/src/shared",
//     },
//   },
//   build: {
//     target: "es2020",
//     sourcemap: true, // удобно для дебага в проде
//     minify: "esbuild", // быстрый минификатор, по умолчанию esbuild
//     chunkSizeWarningLimit: 600, // порог для предупреждений больших чанков
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           react: ["react", "react-dom"],
//           vendor: ["gsap", "framer-motion", "zustand"],
//         },
//       },
//     },
//   },
// });
