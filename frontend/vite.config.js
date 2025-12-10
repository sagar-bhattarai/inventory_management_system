// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";

// // https://vite.dev/config/
// export default defineConfig({
//   server: {
//     proxy: {
//       "/api": "http://localhost:8000",
//     },
//   },
//   plugins: [react(), tailwindcss()],
// });





import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      scopeBehaviour: "local" // Only *.module.scss are CSS modules
    }
  },
  server: {
    proxy: {
      "/api": "http://localhost:8000"
    }
  }
});
